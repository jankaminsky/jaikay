# Workspace Purpose
This workspace is a modern web development environment integrating **Next.js 14+ App Router** with **Payload CMS**. It is explicitly configured for AI-assisted development, enforcing high-quality design aesthetics, consistent architectural patterns, and reliable CMS integrations through a curated set of Agent Skills.

# Available Agent Skills
Before making architectural or design decisions, you MUST consult the relevant skills in `.agents/skills/`:
- **Payload CMS**: `payload`, `cms-migration`, `generate-translations`
- **Next.js & Frontend**: `nextjs-expert`, `nextjs-app-router-patterns`
- **UI & Design**: `web-ui-best-practices`, `tailwind-design-system`
- **Database**: `mongodb-schema-design`
- **Testing & QA**: `webapp-testing`, `qa`, `e2e-testing-patterns`, `agent-analyze-code-quality`
- **Agent Capabilities**: `find-skills`

For more detailed instructions on the tech stack and conventions, read `AI_INSTRUCTIONS.md` in the project root.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
