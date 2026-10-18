#!/usr/bin/env bash
# Paths written by sync-external-data.mjs, apply-instagram-feed.mjs, and optional screenshot capture.
set -euo pipefail

paths=(
  public/data/instagram-feed.json
  src/shared/config/profile.generated.json
  src/features/projects/data/projects.generated.json
  src/features/open-source/data/repos.generated.json
  src/features/content/data/medium.generated.json
  src/features/content/data/instagram.generated.json
  src/features/content/data/instagram.sync-meta.json
  src/features/content/data/content.generated.json
  src/features/journey/data/journey.generated.json
  src/features/journey/data/journey.sync-meta.json
  src/features/recommendations/data/recommendations.generated.json
)

for path in "${paths[@]}"; do
  if [[ -e "$path" ]]; then
    git add "$path"
  fi
done

if [[ -d public/assets/projects ]]; then
  git add public/assets/projects/*.webp 2>/dev/null || true
fi
