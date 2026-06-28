# AI Coding Assistant Instructions

Welcome to the **jaikay** studio codebase. This workspace is configured to support agent-assisted development using structured rules and skills compatible with all LLM engines (Gemini, Claude, ChatGPT) across different IDE integrations (Antigravity, Cursor, Claude Code, Cline).

## Workspace Guidelines & Standards

Before performing any tasks, please refer to the following rules and skills configured in the repository:

### 1. Project Rules (`.cursor/rules/*.mdc`)
These rules outline global style guides, coding conventions, and architectural standards. They are automatically applied based on active file patterns:

*   **[general.mdc](file://./.cursor/rules/general.mdc)**: General workspace guidelines, Git workflow, TypeScript conventions, and documentation styles.
*   **[web-development.mdc](file://./.cursor/rules/web-development.mdc)**: Frontend coding standards using Next.js App Router, Tailwind CSS, premium typography, and animations.
*   **[payload-cms.mdc](file://./.cursor/rules/payload-cms.mdc)**: Configuration guidelines for Payload CMS 3.x, schema definitions, custom blocks, and data model best practices.

### 2. Specialized Agent Skills (`.agents/skills/`)
These on-demand skills contain detailed instructions, step-by-step procedures, and code templates for specific tasks. They are loaded dynamically when a task matches their description:

*   **[find-skills](file://./.agents/skills/find-skills/SKILL.md)**: Search for and install new agent skills using the `npx skills` package manager.
*   **[payload](file://./.agents/skills/payload/SKILL.md)**: Official guide for configuring Payload CMS collections, globals, hooks, and localized schemas.
*   **[nextjs-app-router-patterns](file://./.agents/skills/nextjs-app-router-patterns/SKILL.md)**: Best practices for React Server Components, Suspense, routing, server actions, and Next.js performance optimizations.
*   **[nextjs-expert](file://./.agents/skills/nextjs-expert/SKILL.md)**: Next.js framework expert knowledge for App Router, Server Components, and API routes.
*   **[tailwind-design-system](file://./.agents/skills/tailwind-design-system/SKILL.md)**: Guidelines for configuring `tailwind.config.ts`, designing responsive grids, and setting up fluid typography.
*   **[web-ui-best-practices](file://./.agents/skills/web-ui-best-practices/SKILL.md)**: Standards for high-quality web UI design, focusing on interaction speed, visual restraint, and polished user experiences.
*   **[mongodb-schema-design](file://./.agents/skills/mongodb-schema-design/SKILL.md)**: MongoDB indexing, query performance, and document relationships schema design.
*   **[cms-migration](file://./.agents/skills/cms-migration/SKILL.md)**: Use when migrating content from another CMS (WordPress, Contentful, etc.) to Payload CMS.
*   **[generate-translations](file://./.agents/skills/generate-translations/SKILL.md)**: Instructions for generating new translation strings when translation keys are added.
*   **[webapp-testing](file://./.agents/skills/webapp-testing/SKILL.md)**: Toolkit for testing web applications, verifying frontend functionality, and writing robust assertions.
*   **[qa](file://./.agents/skills/qa/SKILL.md)**: QA practices, strong type safety strategies, and procedures for squashing bugs before they become tech debt.
*   **[e2e-testing-patterns](file://./.agents/skills/e2e-testing-patterns/SKILL.md)**: Architectural patterns for writing end-to-end tests using frameworks like Playwright or Cypress.
*   **[agent-analyze-code-quality](file://./.agents/skills/agent-analyze-code-quality/SKILL.md)**: Specialized skill for analyzing code quality, detecting architectural smells, and managing technical debt.

---

## Technical Stack
*   **Frontend & Routing**: Next.js 15+ App Router, React 19
*   **Content Management**: Payload CMS 3.x (Next.js Native Headless CMS)
*   **Database Adapter**: `@payloadcms/db-mongodb` (MongoDB)
*   **Styling**: Tailwind CSS v4, Vanilla CSS Modules
*   **Language**: TypeScript (strict mode)
