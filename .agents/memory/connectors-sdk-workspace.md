---
name: Connectors SDK in workspace
description: How to reuse the existing root-scoped Replit Connectors SDK from artifact servers.
---

Use the existing root-scoped Replit Connectors SDK for server-side integration calls instead of attempting a duplicate artifact-level installation.

**Why:** The generic package installer cannot target a specific pnpm workspace package and reported failure even though the SDK was already available and the API build could resolve and bundle it successfully.

**How to apply:** Before installing the connectors SDK for an artifact server, check the workspace root dependency. Reuse it when the artifact typecheck and bundled build both resolve it; only install again if the root dependency has been removed.