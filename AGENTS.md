## Portfolio UI

When creating or updating UI, use the committed reference mock and agent guide:

- Image: `design/reference/portfolio-ui-reference.jpg`
- Guide: `design/reference/AGENT-UI.md`
- Styles: `src/shared/styles/portfolio.css` · Conventions: `.cursor/rules/ponytail.mdc`

**Custom agent (Cursor 2.1+):** not in the Agent/Ask mode dropdown. Use **`/portfolio-ui`** in Agent chat (skill), or **Customize → Skills → portfolio-ui**. Pin as a session mode: type `/portfolio-ui`, then **Option+Enter** (Mac) or **Alt+Enter** (Windows), or choose **Use as Mode**. Subagent for delegation: `.cursor/agents/portfolio-ui.md` (**Customize → Subagents**). If missing after edits: **Developer: Reload Window** and open the **`/Users/apple/portfolio`** folder as the workspace root.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
