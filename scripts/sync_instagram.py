#!/usr/bin/env python3
"""
Fetch recent Instagram posts for the portfolio content carousel.

Uses instaloader (pip install -r scripts/requirements-sync.txt).

Instagram often blocks anonymous API access. For reliable sync, use one of:
  - INSTAGRAM_USERNAME + INSTAGRAM_PASSWORD (login each run; use a dedicated account if possible)
  - Session file: run once with login, then set INSTAGRAM_SESSION_USER to the IG username
    (instaloader writes session-<user> in the repo root)
  - Or keep using post URLs / INSTAGRAM_ACCESS_TOKEN in the Node sync instead.

Writes:
  src/features/content/data/instagram.generated.json
  src/features/content/data/instagram.sync-meta.json  (follower count when available)
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SEED_PATH = ROOT / "src/features/content/data/content.seed.json"
OUT_PATH = ROOT / "src/features/content/data/instagram.generated.json"
META_PATH = ROOT / "src/features/content/data/instagram.sync-meta.json"
MAX_POSTS = 12


def log(msg: str) -> None:
    print(msg, file=sys.stderr)


def username_from_instagram_url(url: str) -> str | None:
    match = re.search(r"instagram\.com/([^/?#]+)", url, re.I)
    if not match:
        return None
    name = match.group(1).strip("/").lower()
    if name in ("p", "reel", "tv", "stories", "explore"):
        return None
    return name


def format_title(caption: str | None) -> str:
    line = (caption or "Instagram post").split("\n", 1)[0].strip()
    if not line:
        return "Instagram post"
    return line if len(line) <= 120 else f"{line[:117]}…"


def post_meta(typename: str, is_video: bool) -> str:
    if is_video or typename == "GraphVideo":
        return "Reel"
    if typename == "GraphSidecar":
        return "Carousel"
    return "Post"


def post_href(shortcode: str, is_video: bool) -> str:
    if is_video:
        return f"https://www.instagram.com/reel/{shortcode}/"
    return f"https://www.instagram.com/p/{shortcode}/"


def post_image_url(post) -> str | None:
    url = getattr(post, "url", None)
    if url:
        return url
    return getattr(post, "display_url", None)


def load_seed() -> dict:
    with SEED_PATH.open(encoding="utf-8") as f:
        return json.load(f)


def write_outputs(posts: list[dict], followers: int | None) -> None:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUT_PATH.open("w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2)
        f.write("\n")
    meta = {"followers": followers}
    with META_PATH.open("w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2)
        f.write("\n")


def main() -> int:
    try:
        import instaloader
    except ImportError:
        log("instaloader not installed — pip install -r scripts/requirements-sync.txt")
        return 2

    seed = load_seed()
    target = username_from_instagram_url(seed.get("instagram", {}).get("url", ""))
    if not target:
        log("Could not parse Instagram username from content.seed.json")
        return 1

    handle = seed.get("instagram", {}).get("handle") or f"@{target}"

    loader = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        save_metadata=False,
        compress_json=False,
        quiet=True,
    )

    login_user = os.environ.get("INSTAGRAM_USERNAME", "").strip()
    login_pass = os.environ.get("INSTAGRAM_PASSWORD", "").strip()
    session_user = os.environ.get("INSTAGRAM_SESSION_USER", "").strip() or login_user or target

    if login_user and login_pass:
        try:
            loader.login(login_user, login_pass)
            loader.save_session_to_file(session_user)
        except Exception as err:  # noqa: BLE001 — CLI script
            log(f"Instagram login failed: {err}")
            return 1
    else:
        try:
            loader.load_session_from_file(session_user)
        except FileNotFoundError:
            log(
                "No Instagram session — set INSTAGRAM_USERNAME/PASSWORD or run login once "
                f"(session file session-{session_user} in repo root)."
            )

    try:
        profile = instaloader.Profile.from_username(loader.context, target)
    except Exception as err:  # noqa: BLE001
        log(f"Could not load profile @{target}: {err}")
        return 1

    followers: int | None = getattr(profile, "followers", None)
    posts: list[dict] = []

    try:
        for post in profile.get_posts():
            is_video = bool(getattr(post, "is_video", False))
            shortcode = post.shortcode
            posts.append(
                {
                    "title": format_title(getattr(post, "caption", None)),
                    "meta": post_meta(getattr(post, "typename", ""), is_video),
                    "href": post_href(shortcode, is_video),
                    "image": post_image_url(post),
                }
            )
            if len(posts) >= MAX_POSTS:
                break
    except Exception as err:  # noqa: BLE001
        log(f"Could not list posts for @{target}: {err}")
        if not posts:
            return 1

    write_outputs(posts, followers)
    log(f"Instagram @{target}: {len(posts)} posts" + (f", {followers} followers" if followers else ""))
    return 0 if posts else 1


if __name__ == "__main__":
    sys.exit(main())
