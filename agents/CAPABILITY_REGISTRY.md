# 🔌 Capability Registry — Phase D (Community)

> **Generated:** 2026-03-11T20:49:30Z
> **Phase:** D (Community) — Pipeline + community skills with differentiated trust levels
> **Source:** Auto-generated from `manifest.json` files by `scripts/build-capability-registry.sh`
> **Do NOT edit manually** — regenerate with: `bash scripts/build-capability-registry.sh`

---

## Registry Stats

| Metric | Value |
|--------|-------|
| Total Manifests Scanned | 32 |
| Valid Skills Registered | 32 |
| Pipeline Skills | 32 |
| Community Skills | 0 |
| Unique Capabilities | 106 |
| Unique Domains | 59 |

---

## Scoring Algorithm

When an agent begins a task, the registry scores all skills against the current context:



| Score Range | Action |
|------------|--------|
| **≥ 5** | **Auto-invoke** — read SKILL.md and apply |
| **3–4** | **Suggest** — note skill availability in DECISIONS.md |
| **< 3** | **Ignore** — not relevant to current context |

---

## Capability Index

Capabilities are the primary lookup key. When an agent needs a specific capability, it queries this index.

| Capability | Registered Skills | Count |
|------------|------------------|-------|
| `alerting` | `observability-designer` | 1 |
| `api-design` | `api-design-reviewer` | 1 |
| `api-review` | `api-design-reviewer` | 1 |
| `automation` | `ci-cd-pipeline-builder` | 1 |
| `benchmarking` | `performance-profiler` | 1 |
| `best-practices` | `code-reviewer` | 1 |
| `brainstorming` | `brainstorming` | 1 |
| `branch-completion` | `finishing-a-development-branch` | 1 |
| `brand-audit` | `brand-guidelines`, `brand-guidelines` | 2 |
| `brand-matching` | `theme-factory` | 1 |
| `brand-validation` | `brand-guidelines`, `brand-guidelines` | 2 |
| `browser-testing` | `playwright-pro` | 1 |
| `changelog` | `release-manager` | 1 |
| `ci-cd` | `ci-cd-pipeline-builder` | 1 |
| `cleanup` | `finishing-a-development-branch` | 1 |
| `code-review` | `code-reviewer` | 1 |
| `code-review-practices` | `pr-review-expert` | 1 |
| `commit-hygiene` | `pr-review-expert` | 1 |
| `competitive-analysis` | `competitive-intel` | 1 |
| `competitive-positioning` | `cs-product-strategist` | 1 |
| `credential-security` | `env-secrets-manager` | 1 |
| `css` | `frontend-design` | 1 |
| `data-architecture` | `database-designer` | 1 |
| `database-design` | `database-designer` | 1 |
| `debt-quantification` | `tech-debt-tracker` | 1 |
| `debugging` | `systematic-debugging`, `tdd-guide` | 2 |
| `dependency-audit` | `dependency-auditor` | 1 |
| `deployment` | `ci-cd-pipeline-builder` | 1 |
| `design-system` | `theme-factory` | 1 |
| `design-tokens` | `theme-factory` | 1 |
| `distribution` | `release-manager` | 1 |
| `documentation` | `writing-plans` | 1 |
| `e2e-testing` | `playwright-pro`, `webapp-testing` | 2 |
| `env-config` | `env-secrets-manager` | 1 |
| `feature-gaps` | `competitive-intel` | 1 |
| `framework-comparison` | `tech-stack-evaluator` | 1 |
| `frontend` | `frontend-design` | 1 |
| `git-ops` | `finishing-a-development-branch` | 1 |
| `graphql-review` | `api-design-reviewer` | 1 |
| `ideation` | `brainstorming` | 1 |
| `incident-response` | `runbook-generator` | 1 |
| `index-optimization` | `database-schema-designer` | 1 |
| `journey-mapping` | `cs-ux-researcher` | 1 |
| `logging` | `observability-designer` | 1 |
| `maintainability-assessment` | `tech-debt-tracker` | 1 |
| `market-positioning` | `competitive-intel` | 1 |
| `market-sizing` | `cs-product-strategist` | 1 |
| `merge-prep` | `finishing-a-development-branch` | 1 |
| `monitoring` | `observability-designer` | 1 |
| `normalization` | `database-schema-designer` | 1 |
| `observability` | `observability-designer` | 1 |
| `operations-docs` | `runbook-generator` | 1 |
| `optimization` | `performance-profiler` | 1 |
| `owasp-review` | `security-audit` | 1 |
| `parallel-execution` | `subagent-driven-development` | 1 |
| `performance` | `performance-profiler` | 1 |
| `persona-analysis` | `cs-ux-researcher` | 1 |
| `pipeline-design` | `ci-cd-pipeline-builder` | 1 |
| `planning` | `writing-plans` | 1 |
| `playwright` | `playwright-pro` | 1 |
| `pr-review` | `pr-review-expert` | 1 |
| `pre-ship-check` | `verification-before-completion` | 1 |
| `prioritization` | `cs-product-manager` | 1 |
| `product-management` | `cs-product-manager` | 1 |
| `product-strategy` | `cs-product-strategist` | 1 |
| `profiling` | `performance-profiler` | 1 |
| `quality-assurance` | `verification-before-completion` | 1 |
| `quality-check` | `code-reviewer` | 1 |
| `release-management` | `release-manager` | 1 |
| `repair-mode` | `systematic-debugging` | 1 |
| `requirement-extraction` | `brainstorming` | 1 |
| `responsive-design` | `frontend-design` | 1 |
| `rest-review` | `api-design-reviewer` | 1 |
| `rice-scoring` | `cs-product-manager` | 1 |
| `root-cause-analysis` | `systematic-debugging` | 1 |
| `runbook` | `runbook-generator` | 1 |
| `schema-design` | `database-schema-designer` | 1 |
| `schema-modeling` | `database-designer` | 1 |
| `scope-management` | `cs-product-manager` | 1 |
| `secrets-management` | `env-secrets-manager` | 1 |
| `security-audit` | `security-audit` | 1 |
| `stack-selection` | `tech-stack-evaluator` | 1 |
| `sub-agent-coordination` | `subagent-driven-development` | 1 |
| `supply-chain-security` | `dependency-auditor` | 1 |
| `task-dispatch` | `subagent-driven-development` | 1 |
| `tdd` | `tdd-guide` | 1 |
| `tech-debt` | `tech-debt-tracker` | 1 |
| `tech-evaluation` | `tech-stack-evaluator` | 1 |
| `technical-design` | `writing-plans` | 1 |
| `test-driven-development` | `tdd-guide` | 1 |
| `test-generation` | `webapp-testing` | 1 |
| `testing` | `tdd-guide`, `webapp-testing` | 2 |
| `theming` | `theme-factory` | 1 |
| `threat-modeling` | `security-audit` | 1 |
| `tracing` | `observability-designer` | 1 |
| `ui-implementation` | `frontend-design` | 1 |
| `usability-heuristics` | `cs-ux-researcher` | 1 |
| `ux-research` | `cs-ux-researcher` | 1 |
| `verification` | `verification-before-completion` | 1 |
| `version-bumping` | `release-manager` | 1 |
| `visual-identity` | `brand-guidelines`, `brand-guidelines` | 2 |
| `visual-regression` | `playwright-pro` | 1 |
| `vulnerability-assessment` | `security-audit` | 1 |
| `vulnerability-scan` | `dependency-auditor` | 1 |
| `web-testing` | `webapp-testing` | 1 |
| `workflow-quality` | `pr-review-expert` | 1 |

---

## Domain Index

Domains represent the problem space. When a task involves a specific domain, matching skills are surfaced.

| Domain | Registered Skills | Count |
|--------|------------------|-------|
| `api-design` | `api-design-reviewer` | 1 |
| `application-security` | `security-audit` | 1 |
| `architecture` | `tech-debt-tracker`, `tech-stack-evaluator`, `writing-plans` | 3 |
| `backend` | `api-design-reviewer`, `database-designer`, `database-schema-designer` | 3 |
| `best-practices` | `code-reviewer` | 1 |
| `brand-identity` | `brand-guidelines`, `brand-guidelines`, `theme-factory` | 3 |
| `build-execution` | `subagent-driven-development` | 1 |
| `business-strategy` | `cs-product-strategist` | 1 |
| `ci-cd` | `release-manager` | 1 |
| `ci-gate-failure` | `systematic-debugging` | 1 |
| `code-quality` | `code-reviewer`, `pr-review-expert`, `systematic-debugging`, `tdd-guide`, `tech-debt-tracker`, `webapp-testing` | 6 |
| `competitive-landscape` | `competitive-intel` | 1 |
| `compliance` | `security-audit` | 1 |
| `configuration` | `env-secrets-manager` | 1 |
| `context-ingestion` | `brainstorming` | 1 |
| `data-layer` | `database-designer`, `database-schema-designer` | 2 |
| `database` | `database-schema-designer` | 1 |
| `dependencies` | `dependency-auditor` | 1 |
| `deployment` | `ci-cd-pipeline-builder`, `finishing-a-development-branch`, `release-manager` | 3 |
| `design-contract` | `brand-guidelines`, `brand-guidelines`, `theme-factory` | 3 |
| `developer-experience` | `pr-review-expert` | 1 |
| `development-methodology` | `tdd-guide` | 1 |
| `documentation` | `runbook-generator`, `writing-plans` | 2 |
| `e2e` | `playwright-pro` | 1 |
| `feature-prioritization` | `cs-product-manager` | 1 |
| `frontend` | `frontend-design` | 1 |
| `git` | `finishing-a-development-branch`, `pr-review-expert` | 2 |
| `infrastructure` | `ci-cd-pipeline-builder`, `observability-designer` | 2 |
| `integration` | `api-design-reviewer` | 1 |
| `maintainability` | `tech-debt-tracker` | 1 |
| `market-analysis` | `competitive-intel`, `cs-product-strategist` | 2 |
| `marketing` | `brand-guidelines`, `brand-guidelines` | 2 |
| `multi-platform` | `release-manager` | 1 |
| `mvp-scope` | `cs-product-manager` | 1 |
| `operations` | `observability-designer`, `runbook-generator` | 2 |
| `optimization` | `performance-profiler` | 1 |
| `performance` | `performance-profiler` | 1 |
| `persistence` | `database-designer` | 1 |
| `planning` | `tech-stack-evaluator`, `writing-plans` | 2 |
| `product-discovery` | `brainstorming`, `cs-product-manager`, `cs-product-strategist`, `cs-ux-researcher` | 4 |
| `product-strategy` | `competitive-intel` | 1 |
| `quality-assurance` | `verification-before-completion` | 1 |
| `reliability` | `observability-designer`, `runbook-generator` | 2 |
| `review` | `code-reviewer` | 1 |
| `secrets` | `env-secrets-manager` | 1 |
| `security` | `dependency-auditor`, `env-secrets-manager`, `security-audit` | 3 |
| `ship-readiness` | `verification-before-completion` | 1 |
| `supply-chain` | `dependency-auditor` | 1 |
| `task-management` | `subagent-driven-development` | 1 |
| `technology-selection` | `tech-stack-evaluator` | 1 |
| `test-failure` | `systematic-debugging` | 1 |
| `testing` | `ci-cd-pipeline-builder`, `playwright-pro`, `tdd-guide`, `webapp-testing` | 4 |
| `ui-design` | `frontend-design`, `theme-factory` | 2 |
| `user-experience` | `cs-ux-researcher` | 1 |
| `user-research` | `cs-ux-researcher` | 1 |
| `verification` | `verification-before-completion` | 1 |
| `version-control` | `finishing-a-development-branch` | 1 |
| `web` | `frontend-design`, `playwright-pro`, `webapp-testing` | 3 |
| `web-vitals` | `performance-profiler` | 1 |

---

## Agent Index

Skills registered per agent. In Plugin-First mode, this index is the **exclusive** source for runtime skill discovery.

> 🔐 = pipeline (trusted) | 🌐 = community (third-party)

### Agent 0 — Orchestrator (4 skills)

| Skill ID | Priority | Capabilities | Path |
|----------|----------|-------------|------|
| `brand-guidelines` | 🟡 high | brand-validation, brand-audit, visual-identity | `skills/skills/brand-guidelines` |
| `brand-guidelines` | 🟡 high | brand-validation, brand-audit, visual-identity | `skills/skills/brand-guidelines` |
| `release-manager` | 🟡 high | release-management, changelog, version-bumping… | `claude-skills/engineering/release-manager` |
| `theme-factory` | 🟡 high | design-system, theming, brand-matching… | `skills/skills/theme-factory` |

### Agent 1 — Discovery (4 skills)

| Skill ID | Priority | Capabilities | Path |
|----------|----------|-------------|------|
| `brainstorming` | 🟢 medium | brainstorming, ideation, requirement-extraction | `superpowers/skills/brainstorming` |
| `cs-product-manager` | 🟡 high | product-management, prioritization, scope-management… | `claude-skills/product-team/product-manager-toolkit` |
| `cs-product-strategist` | 🟡 high | product-strategy, market-sizing, competitive-positioning | `claude-skills/product-team/product-strategist` |
| `cs-ux-researcher` | 🟡 high | ux-research, persona-analysis, journey-mapping… | `claude-skills/product-team/ux-researcher-designer` |

### Agent 2 — Planner (10 skills)

| Skill ID | Priority | Capabilities | Path |
|----------|----------|-------------|------|
| `api-design-reviewer` | 🟡 high | api-review, api-design, rest-review… | `claude-skills/engineering/api-design-reviewer` |
| `brand-guidelines` | 🟡 high | brand-validation, brand-audit, visual-identity | `skills/skills/brand-guidelines` |
| `brand-guidelines` | 🟡 high | brand-validation, brand-audit, visual-identity | `skills/skills/brand-guidelines` |
| `ci-cd-pipeline-builder` | 🟡 high | ci-cd, pipeline-design, automation… | `claude-skills/engineering/ci-cd-pipeline-builder` |
| `database-designer` | 🟡 high | database-design, schema-modeling, data-architecture | `claude-skills/engineering/database-designer` |
| `database-schema-designer` | 🟡 high | schema-design, normalization, index-optimization | `claude-skills/engineering/database-schema-designer` |
| `observability-designer` | 🟡 high | observability, monitoring, logging… | `claude-skills/engineering/observability-designer` |
| `tech-stack-evaluator` | 🟡 high | tech-evaluation, stack-selection, framework-comparison | `claude-skills/engineering-team/tech-stack-evaluator` |
| `theme-factory` | 🟡 high | design-system, theming, brand-matching… | `skills/skills/theme-factory` |
| `writing-plans` | 🟡 high | planning, documentation, technical-design | `superpowers/skills/writing-plans` |

### Agent 3 — Builder (7 skills)

| Skill ID | Priority | Capabilities | Path |
|----------|----------|-------------|------|
| `finishing-a-development-branch` | 🟡 high | git-ops, branch-completion, merge-prep… | `superpowers/skills/finishing-a-development-branch` |
| `frontend-design` | 🟡 high | frontend, ui-implementation, css… | `skills/skills/frontend-design` |
| `subagent-driven-development` | 🟢 medium | task-dispatch, parallel-execution, sub-agent-coordination | `superpowers/skills/subagent-driven-development` |
| `systematic-debugging` | 🔴 critical | debugging, root-cause-analysis, repair-mode | `superpowers/skills/systematic-debugging` |
| `tdd-guide` | 🟡 high | tdd, test-driven-development, testing… | `claude-skills/engineering-team/tdd-guide` |
| `theme-factory` | 🟡 high | design-system, theming, brand-matching… | `skills/skills/theme-factory` |
| `webapp-testing` | 🔴 critical | testing, e2e-testing, web-testing… | `skills/skills/webapp-testing` |

### Agent 4 — Security (4 skills)

| Skill ID | Priority | Capabilities | Path |
|----------|----------|-------------|------|
| `dependency-auditor` | 🔴 critical | dependency-audit, vulnerability-scan, supply-chain-security | `claude-skills/engineering/dependency-auditor` |
| `env-secrets-manager` | 🟡 high | secrets-management, env-config, credential-security | `claude-skills/engineering/env-secrets-manager` |
| `runbook-generator` | 🟡 high | runbook, incident-response, operations-docs | `claude-skills/engineering/runbook-generator` |
| `security-audit` | 🔴 critical | security-audit, owasp-review, threat-modeling… | `claude-skills/engineering/skill-security-auditor` |

### Agent 5 — Verifier (6 skills)

| Skill ID | Priority | Capabilities | Path |
|----------|----------|-------------|------|
| `api-design-reviewer` | 🟡 high | api-review, api-design, rest-review… | `claude-skills/engineering/api-design-reviewer` |
| `code-reviewer` | 🟡 high | code-review, quality-check, best-practices | `claude-skills/engineering-team/code-reviewer` |
| `performance-profiler` | 🟡 high | performance, profiling, optimization… | `claude-skills/engineering/performance-profiler` |
| `playwright-pro` | 🔴 critical | playwright, e2e-testing, browser-testing… | `claude-skills/engineering-team/playwright-pro` |
| `verification-before-completion` | 🟡 high | verification, pre-ship-check, quality-assurance | `superpowers/skills/verification-before-completion` |
| `webapp-testing` | 🔴 critical | testing, e2e-testing, web-testing… | `skills/skills/webapp-testing` |

### Agent 6 — Critic (3 skills)

| Skill ID | Priority | Capabilities | Path |
|----------|----------|-------------|------|
| `competitive-intel` | 🟡 high | competitive-analysis, market-positioning, feature-gaps | `claude-skills/c-level-advisor/competitive-intel` |
| `pr-review-expert` | 🟡 high | pr-review, commit-hygiene, code-review-practices… | `claude-skills/engineering/pr-review-expert` |
| `tech-debt-tracker` | 🟡 high | tech-debt, debt-quantification, maintainability-assessment | `claude-skills/engineering/tech-debt-tracker` |

---

## Priority Index

Skills grouped by pipeline priority. Critical skills are auto-invoked when their context matches; lower priorities are scored normally.

### 🔴 Critical (5 skills)

- `dependency-auditor` → A4
- `playwright-pro` → A5
- `security-audit` → A4
- `systematic-debugging` → A3
- `webapp-testing` → A3, A5

### 🟡 High (25 skills)

- `api-design-reviewer` → A2, A5
- `brand-guidelines` → A0, A2
- `brand-guidelines` → A0, A2
- `ci-cd-pipeline-builder` → A2
- `code-reviewer` → A5
- `competitive-intel` → A6
- `cs-product-manager` → A1
- `cs-product-strategist` → A1
- `cs-ux-researcher` → A1
- `database-designer` → A2
- `database-schema-designer` → A2
- `env-secrets-manager` → A4
- `finishing-a-development-branch` → A3
- `frontend-design` → A3
- `observability-designer` → A2
- `performance-profiler` → A5
- `pr-review-expert` → A6
- `release-manager` → A0
- `runbook-generator` → A4
- `tdd-guide` → A3
- `tech-debt-tracker` → A6
- `tech-stack-evaluator` → A2
- `theme-factory` → A0, A2, A3
- `verification-before-completion` → A5
- `writing-plans` → A2

### 🟢 Medium (2 skills)

- `brainstorming` → A1
- `subagent-driven-development` → A3

---

## Full Skill Detail

Complete manifest data for every registered skill.

### `api-design-reviewer` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/api-design-reviewer` |
| **SKILL.md** | `skills/claude-skills/engineering/api-design-reviewer/SKILL.md` |
| **Priority** | high |
| **Agents** | A2, A5 |
| **Phases** | api-design, api-verification |
| **Capabilities** | `api-review`, `api-design`, `rest-review`, `graphql-review` |
| **Domains** | `api-design`, `backend`, `integration` |
| **Required Inputs** | `api_spec` |
| **Optional Inputs** | `existing_api`, `openapi_doc` |
| **Outputs** | `api_review`, `design_recommendations`, `breaking_changes` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file` |
| **Side Effects** | No |

### `brainstorming` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/superpowers/skills/brainstorming` |
| **SKILL.md** | `skills/superpowers/skills/brainstorming/SKILL.md` |
| **Priority** | medium |
| **Agents** | A1 |
| **Phases** | context-ingestion, braindump |
| **Capabilities** | `brainstorming`, `ideation`, `requirement-extraction` |
| **Domains** | `product-discovery`, `context-ingestion` |
| **Required Inputs** | `raw_user_input` |
| **Optional Inputs** | `domain_context` |
| **Outputs** | `extracted_themes`, `hidden_requirements`, `connections` |
| **Max Tokens** | 4000 |
| **Tools Required** | `view_file` |
| **Side Effects** | No |

### `brand-guidelines` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/skills/skills/brand-guidelines` |
| **SKILL.md** | `skills/skills/skills/brand-guidelines/SKILL.md` |
| **Priority** | high |
| **Agents** | A0, A2 |
| **Phases** | design-contract-detection, brand-validation |
| **Capabilities** | `brand-validation`, `brand-audit`, `visual-identity` |
| **Domains** | `brand-identity`, `design-contract`, `marketing` |
| **Required Inputs** | `brand_inputs` |
| **Optional Inputs** | `logo_assets`, `brand_book`, `competitor_references` |
| **Outputs** | `brand_audit_result`, `completeness_score`, `missing_elements` |
| **Max Tokens** | 4000 |
| **Tools Required** | `view_file` |
| **Side Effects** | No |

### `ci-cd-pipeline-builder` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/ci-cd-pipeline-builder` |
| **SKILL.md** | `skills/claude-skills/engineering/ci-cd-pipeline-builder/SKILL.md` |
| **Priority** | high |
| **Agents** | A2 |
| **Phases** | ci-cd-planning, deployment-strategy |
| **Capabilities** | `ci-cd`, `pipeline-design`, `automation`, `deployment` |
| **Domains** | `infrastructure`, `deployment`, `testing` |
| **Required Inputs** | `platform_list`, `tech_stack` |
| **Optional Inputs** | `existing_ci_config`, `hosting_provider` |
| **Outputs** | `pipeline_config`, `workflow_files`, `deployment_scripts` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file`, `write_to_file` |
| **Side Effects** | Yes |

### `code-reviewer` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering-team/code-reviewer` |
| **SKILL.md** | `skills/claude-skills/engineering-team/code-reviewer/SKILL.md` |
| **Priority** | high |
| **Agents** | A5 |
| **Phases** | code-review, verification |
| **Capabilities** | `code-review`, `quality-check`, `best-practices` |
| **Domains** | `code-quality`, `review`, `best-practices` |
| **Required Inputs** | `changed_files` |
| **Optional Inputs** | `review_checklist`, `style_guide` |
| **Outputs** | `review_comments`, `approval_status`, `suggestions` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file` |
| **Side Effects** | No |

### `competitive-intel` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/c-level-advisor/competitive-intel` |
| **SKILL.md** | `skills/claude-skills/c-level-advisor/competitive-intel/SKILL.md` |
| **Priority** | high |
| **Agents** | A6 |
| **Phases** | deep-review, product-critique |
| **Capabilities** | `competitive-analysis`, `market-positioning`, `feature-gaps` |
| **Domains** | `product-strategy`, `market-analysis`, `competitive-landscape` |
| **Required Inputs** | `product_description` |
| **Optional Inputs** | `competitor_list`, `market_data` |
| **Outputs** | `competitive_landscape`, `feature_gap_analysis`, `positioning_assessment` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file` |
| **Side Effects** | No |

### `cs-product-manager` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/product-team/product-manager-toolkit` |
| **SKILL.md** | `skills/claude-skills/product-team/product-manager-toolkit/SKILL.md` |
| **Priority** | high |
| **Agents** | A1 |
| **Phases** | scope-boundaries |
| **Capabilities** | `product-management`, `prioritization`, `scope-management`, `rice-scoring` |
| **Domains** | `product-discovery`, `feature-prioritization`, `mvp-scope` |
| **Required Inputs** | `feature_list` |
| **Optional Inputs** | `user_feedback`, `resource_constraints` |
| **Outputs** | `prioritized_backlog`, `rice_scores`, `mvp_scope` |
| **Max Tokens** | 4000 |
| **Tools Required** | `view_file` |
| **Side Effects** | No |

### `cs-product-strategist` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/product-team/product-strategist` |
| **SKILL.md** | `skills/claude-skills/product-team/product-strategist/SKILL.md` |
| **Priority** | high |
| **Agents** | A1 |
| **Phases** | problem-outcome, monetization |
| **Capabilities** | `product-strategy`, `market-sizing`, `competitive-positioning` |
| **Domains** | `product-discovery`, `business-strategy`, `market-analysis` |
| **Required Inputs** | `product_description`, `target_market` |
| **Optional Inputs** | `competitor_list`, `market_data` |
| **Outputs** | `market_analysis`, `positioning_recommendation`, `business_case` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file` |
| **Side Effects** | No |

### `cs-ux-researcher` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/product-team/ux-researcher-designer` |
| **SKILL.md** | `skills/claude-skills/product-team/ux-researcher-designer/SKILL.md` |
| **Priority** | high |
| **Agents** | A1 |
| **Phases** | core-user-flow, ux-requirements |
| **Capabilities** | `ux-research`, `persona-analysis`, `journey-mapping`, `usability-heuristics` |
| **Domains** | `user-experience`, `product-discovery`, `user-research` |
| **Required Inputs** | `user_context`, `product_description` |
| **Optional Inputs** | `competitor_products`, `target_demographics` |
| **Outputs** | `persona_profiles`, `journey_maps`, `usability_findings` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file` |
| **Side Effects** | No |

### `database-designer` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/database-designer` |
| **SKILL.md** | `skills/claude-skills/engineering/database-designer/SKILL.md` |
| **Priority** | high |
| **Agents** | A2 |
| **Phases** | data-layer-design, schema-planning |
| **Capabilities** | `database-design`, `schema-modeling`, `data-architecture` |
| **Domains** | `data-layer`, `backend`, `persistence` |
| **Required Inputs** | `entity_list`, `relationships` |
| **Optional Inputs** | `existing_schema`, `migration_history` |
| **Outputs** | `schema_design`, `er_diagram`, `migration_plan`, `index_strategy` |
| **Max Tokens** | 6000 |
| **Tools Required** | `view_file`, `write_to_file` |
| **Side Effects** | No |

### `database-schema-designer` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/database-schema-designer` |
| **SKILL.md** | `skills/claude-skills/engineering/database-schema-designer/SKILL.md` |
| **Priority** | high |
| **Agents** | A2 |
| **Phases** | schema-planning, data-model-review |
| **Capabilities** | `schema-design`, `normalization`, `index-optimization` |
| **Domains** | `data-layer`, `backend`, `database` |
| **Required Inputs** | `entity_model` |
| **Optional Inputs** | `performance_requirements`, `scale_targets` |
| **Outputs** | `schema_sql`, `index_recommendations`, `normalization_analysis` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file`, `write_to_file` |
| **Side Effects** | No |

### `dependency-auditor` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/dependency-auditor` |
| **SKILL.md** | `skills/claude-skills/engineering/dependency-auditor/SKILL.md` |
| **Priority** | critical |
| **Agents** | A4 |
| **Phases** | security-review, dependency-check |
| **Capabilities** | `dependency-audit`, `vulnerability-scan`, `supply-chain-security` |
| **Domains** | `security`, `dependencies`, `supply-chain` |
| **Required Inputs** | `package_manifest` |
| **Optional Inputs** | `lockfile`, `previous_audit` |
| **Outputs** | `vulnerability_report`, `upgrade_recommendations`, `risk_assessment` |
| **Max Tokens** | 4000 |
| **Tools Required** | `run_command`, `view_file` |
| **Side Effects** | No |

### `env-secrets-manager` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/env-secrets-manager` |
| **SKILL.md** | `skills/claude-skills/engineering/env-secrets-manager/SKILL.md` |
| **Priority** | high |
| **Agents** | A4 |
| **Phases** | security-review, secrets-audit |
| **Capabilities** | `secrets-management`, `env-config`, `credential-security` |
| **Domains** | `security`, `configuration`, `secrets` |
| **Required Inputs** | `project_path` |
| **Optional Inputs** | `existing_env_files`, `secrets_provider` |
| **Outputs** | `secrets_audit`, `env_template`, `rotation_plan` |
| **Max Tokens** | 3000 |
| **Tools Required** | `run_command`, `view_file` |
| **Side Effects** | No |

### `finishing-a-development-branch` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/superpowers/skills/finishing-a-development-branch` |
| **SKILL.md** | `skills/superpowers/skills/finishing-a-development-branch/SKILL.md` |
| **Priority** | high |
| **Agents** | A3 |
| **Phases** | ship-preparation, branch-completion |
| **Capabilities** | `git-ops`, `branch-completion`, `merge-prep`, `cleanup` |
| **Domains** | `git`, `version-control`, `deployment` |
| **Required Inputs** | `branch_name`, `main_branch` |
| **Optional Inputs** | `ci_status`, `review_status` |
| **Outputs** | `merge_checklist`, `cleanup_report` |
| **Max Tokens** | 3000 |
| **Tools Required** | `run_command`, `view_file` |
| **Side Effects** | Yes |

### `frontend-design` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/skills/skills/frontend-design` |
| **SKILL.md** | `skills/skills/skills/frontend-design/SKILL.md` |
| **Priority** | high |
| **Agents** | A3 |
| **Phases** | building, ui-implementation |
| **Capabilities** | `frontend`, `ui-implementation`, `css`, `responsive-design` |
| **Domains** | `ui-design`, `web`, `frontend` |
| **Required Inputs** | `design_contract`, `component_list` |
| **Optional Inputs** | `figma_link`, `existing_styles` |
| **Outputs** | `component_code`, `css_styles`, `responsive_layout` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file`, `write_to_file` |
| **Side Effects** | Yes |

### `observability-designer` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/observability-designer` |
| **SKILL.md** | `skills/claude-skills/engineering/observability-designer/SKILL.md` |
| **Priority** | high |
| **Agents** | A2 |
| **Phases** | infrastructure-planning, observability-design |
| **Capabilities** | `observability`, `monitoring`, `logging`, `tracing`, `alerting` |
| **Domains** | `infrastructure`, `operations`, `reliability` |
| **Required Inputs** | `architecture_overview`, `service_list` |
| **Optional Inputs** | `sla_targets`, `existing_monitoring` |
| **Outputs** | `observability_plan`, `dashboard_specs`, `alert_rules`, `log_schema` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file`, `write_to_file` |
| **Side Effects** | No |

### `performance-profiler` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/performance-profiler` |
| **SKILL.md** | `skills/claude-skills/engineering/performance-profiler/SKILL.md` |
| **Priority** | high |
| **Agents** | A5 |
| **Phases** | performance-verification, benchmark-review |
| **Capabilities** | `performance`, `profiling`, `optimization`, `benchmarking` |
| **Domains** | `performance`, `optimization`, `web-vitals` |
| **Required Inputs** | `app_url_or_path` |
| **Optional Inputs** | `baseline_metrics`, `performance_budget` |
| **Outputs** | `performance_report`, `bottleneck_analysis`, `optimization_recommendations` |
| **Max Tokens** | 4000 |
| **Tools Required** | `run_command`, `view_file` |
| **Side Effects** | No |

### `playwright-pro` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering-team/playwright-pro` |
| **SKILL.md** | `skills/claude-skills/engineering-team/playwright-pro/SKILL.md` |
| **Priority** | critical |
| **Agents** | A5 |
| **Phases** | e2e-verification, visual-regression |
| **Capabilities** | `playwright`, `e2e-testing`, `browser-testing`, `visual-regression` |
| **Domains** | `testing`, `web`, `e2e` |
| **Required Inputs** | `app_url`, `test_scenarios` |
| **Optional Inputs** | `existing_playwright_config`, `viewport_list` |
| **Outputs** | `playwright_tests`, `test_report`, `screenshots` |
| **Max Tokens** | 5000 |
| **Tools Required** | `run_command`, `view_file`, `write_to_file` |
| **Side Effects** | Yes |

### `pr-review-expert` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/pr-review-expert` |
| **SKILL.md** | `skills/claude-skills/engineering/pr-review-expert/SKILL.md` |
| **Priority** | high |
| **Agents** | A6 |
| **Phases** | deep-review, developer-experience-assessment |
| **Capabilities** | `pr-review`, `commit-hygiene`, `code-review-practices`, `workflow-quality` |
| **Domains** | `developer-experience`, `code-quality`, `git` |
| **Required Inputs** | `repository_path` |
| **Optional Inputs** | `pr_templates`, `branch_strategy` |
| **Outputs** | `workflow_assessment`, `commit_quality_score`, `pr_size_analysis` |
| **Max Tokens** | 4000 |
| **Tools Required** | `run_command`, `view_file` |
| **Side Effects** | No |

### `release-manager` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/release-manager` |
| **SKILL.md** | `skills/claude-skills/engineering/release-manager/SKILL.md` |
| **Priority** | high |
| **Agents** | A0 |
| **Phases** | ship-declaration, release-review |
| **Capabilities** | `release-management`, `changelog`, `version-bumping`, `distribution` |
| **Domains** | `ci-cd`, `deployment`, `multi-platform` |
| **Required Inputs** | `build_changelog`, `version_current` |
| **Optional Inputs** | `platform_list`, `signing_status` |
| **Outputs** | `release_plan`, `changelog`, `version_bump` |
| **Max Tokens** | 4000 |
| **Tools Required** | `run_command`, `view_file` |
| **Side Effects** | Yes |

### `runbook-generator` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/runbook-generator` |
| **SKILL.md** | `skills/claude-skills/engineering/runbook-generator/SKILL.md` |
| **Priority** | high |
| **Agents** | A4 |
| **Phases** | security-review, operations-planning |
| **Capabilities** | `runbook`, `incident-response`, `operations-docs` |
| **Domains** | `operations`, `reliability`, `documentation` |
| **Required Inputs** | `service_architecture`, `deployment_info` |
| **Optional Inputs** | `existing_runbooks`, `monitoring_config` |
| **Outputs** | `runbook_doc`, `incident_playbooks` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file`, `write_to_file` |
| **Side Effects** | No |

### `security-audit` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/skill-security-auditor` |
| **SKILL.md** | `skills/claude-skills/engineering/skill-security-auditor/SKILL.md` |
| **Priority** | critical |
| **Agents** | A4 |
| **Phases** | security-review, threat-assessment |
| **Capabilities** | `security-audit`, `owasp-review`, `threat-modeling`, `vulnerability-assessment` |
| **Domains** | `security`, `compliance`, `application-security` |
| **Required Inputs** | `codebase_path`, `tech_stack` |
| **Optional Inputs** | `previous_audit`, `compliance_requirements` |
| **Outputs** | `security_findings`, `threat_model`, `remediation_plan` |
| **Max Tokens** | 6000 |
| **Tools Required** | `run_command`, `view_file` |
| **Side Effects** | No |

### `subagent-driven-development` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/superpowers/skills/subagent-driven-development` |
| **SKILL.md** | `skills/superpowers/skills/subagent-driven-development/SKILL.md` |
| **Priority** | medium |
| **Agents** | A3 |
| **Phases** | building, parallel-tasks |
| **Capabilities** | `task-dispatch`, `parallel-execution`, `sub-agent-coordination` |
| **Domains** | `build-execution`, `task-management` |
| **Required Inputs** | `task_graph`, `available_sub_agents` |
| **Optional Inputs** | `concurrency_limit` |
| **Outputs** | `task_results`, `combined_output` |
| **Max Tokens** | 6000 |
| **Tools Required** | `run_command`, `view_file`, `write_to_file` |
| **Side Effects** | Yes |

### `systematic-debugging` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/superpowers/skills/systematic-debugging` |
| **SKILL.md** | `skills/superpowers/skills/systematic-debugging/SKILL.md` |
| **Priority** | critical |
| **Agents** | A3 |
| **Phases** | repair-mode, gate-failure |
| **Capabilities** | `debugging`, `root-cause-analysis`, `repair-mode` |
| **Domains** | `code-quality`, `ci-gate-failure`, `test-failure` |
| **Required Inputs** | `error_output`, `failing_command` |
| **Optional Inputs** | `stack_trace`, `recent_changes` |
| **Outputs** | `root_cause`, `fix_patch`, `evidence_log` |
| **Max Tokens** | 4000 |
| **Tools Required** | `run_command`, `view_file` |
| **Side Effects** | No |

### `tdd-guide` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering-team/tdd-guide` |
| **SKILL.md** | `skills/claude-skills/engineering-team/tdd-guide/SKILL.md` |
| **Priority** | high |
| **Agents** | A3 |
| **Phases** | building, testing |
| **Capabilities** | `tdd`, `test-driven-development`, `testing`, `debugging` |
| **Domains** | `code-quality`, `testing`, `development-methodology` |
| **Required Inputs** | `feature_spec` |
| **Optional Inputs** | `existing_tests`, `test_framework` |
| **Outputs** | `test_cases`, `implementation_guide` |
| **Max Tokens** | 4000 |
| **Tools Required** | `run_command`, `view_file`, `write_to_file` |
| **Side Effects** | Yes |

### `tech-debt-tracker` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering/tech-debt-tracker` |
| **SKILL.md** | `skills/claude-skills/engineering/tech-debt-tracker/SKILL.md` |
| **Priority** | high |
| **Agents** | A6 |
| **Phases** | deep-review, maintainability-assessment |
| **Capabilities** | `tech-debt`, `debt-quantification`, `maintainability-assessment` |
| **Domains** | `code-quality`, `maintainability`, `architecture` |
| **Required Inputs** | `codebase_path` |
| **Optional Inputs** | `previous_debt_assessment`, `architecture_doc` |
| **Outputs** | `debt_inventory`, `priority_scores`, `remediation_costs` |
| **Max Tokens** | 5000 |
| **Tools Required** | `view_file`, `run_command` |
| **Side Effects** | No |

### `tech-stack-evaluator` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/claude-skills/engineering-team/tech-stack-evaluator` |
| **SKILL.md** | `skills/claude-skills/engineering-team/tech-stack-evaluator/SKILL.md` |
| **Priority** | high |
| **Agents** | A2 |
| **Phases** | tech-stack-selection, architecture-planning |
| **Capabilities** | `tech-evaluation`, `stack-selection`, `framework-comparison` |
| **Domains** | `architecture`, `technology-selection`, `planning` |
| **Required Inputs** | `project_requirements`, `platform_targets` |
| **Optional Inputs** | `team_skills`, `existing_infrastructure` |
| **Outputs** | `stack_recommendation`, `comparison_matrix`, `risk_assessment` |
| **Max Tokens** | 4000 |
| **Tools Required** | `view_file` |
| **Side Effects** | No |

### `theme-factory` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/skills/skills/theme-factory` |
| **SKILL.md** | `skills/skills/skills/theme-factory/SKILL.md` |
| **Priority** | high |
| **Agents** | A0, A2, A3 |
| **Phases** | design-contract-detection, design-system-generation, design-token-implementation |
| **Capabilities** | `design-system`, `theming`, `brand-matching`, `design-tokens` |
| **Domains** | `ui-design`, `design-contract`, `brand-identity` |
| **Required Inputs** | `brand_inputs` |
| **Optional Inputs** | `color_palette`, `font_preferences`, `aesthetic_labels`, `competitor_references` |
| **Outputs** | `design_contract`, `css_variables`, `tailwind_config`, `theme_name` |
| **Max Tokens** | 6000 |
| **Tools Required** | `view_file`, `write_to_file` |
| **Side Effects** | Yes |

### `verification-before-completion` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/superpowers/skills/verification-before-completion` |
| **SKILL.md** | `skills/superpowers/skills/verification-before-completion/SKILL.md` |
| **Priority** | high |
| **Agents** | A5 |
| **Phases** | verification, pre-ship |
| **Capabilities** | `verification`, `pre-ship-check`, `quality-assurance` |
| **Domains** | `quality-assurance`, `verification`, `ship-readiness` |
| **Required Inputs** | `task_list`, `acceptance_criteria` |
| **Optional Inputs** | `test_results`, `gate_outputs` |
| **Outputs** | `verification_report`, `pass_fail_matrix` |
| **Max Tokens** | 4000 |
| **Tools Required** | `run_command`, `view_file` |
| **Side Effects** | No |

### `webapp-testing` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/skills/skills/webapp-testing` |
| **SKILL.md** | `skills/skills/skills/webapp-testing/SKILL.md` |
| **Priority** | critical |
| **Agents** | A3, A5 |
| **Phases** | testing, gate-verification, e2e-suite |
| **Capabilities** | `testing`, `e2e-testing`, `web-testing`, `test-generation` |
| **Domains** | `code-quality`, `testing`, `web` |
| **Required Inputs** | `app_url`, `test_framework` |
| **Optional Inputs** | `existing_tests`, `page_map` |
| **Outputs** | `test_suite`, `test_results`, `coverage_report` |
| **Max Tokens** | 5000 |
| **Tools Required** | `run_command`, `view_file`, `write_to_file` |
| **Side Effects** | Yes |

### `writing-plans` (v1.0.0)

| Field | Value |
|-------|-------|
| **Path** | `skills/superpowers/skills/writing-plans` |
| **SKILL.md** | `skills/superpowers/skills/writing-plans/SKILL.md` |
| **Priority** | high |
| **Agents** | A2 |
| **Phases** | technical-design, plan-writing |
| **Capabilities** | `planning`, `documentation`, `technical-design` |
| **Domains** | `architecture`, `planning`, `documentation` |
| **Required Inputs** | `feature_spec`, `architecture_decisions` |
| **Optional Inputs** | `existing_codebase`, `constraints` |
| **Outputs** | `technical_design_doc`, `implementation_plan`, `task_graph` |
| **Max Tokens** | 6000 |
| **Tools Required** | `view_file`, `write_to_file` |
| **Side Effects** | No |

---

> **Plugin-First Behavior (Phase D):** Agents use this registry exclusively for all skill resolution. Pipeline skills (🔐) follow standard scoring (auto-invoke ≥ 5). Community skills (🌐) require elevated scores (auto-invoke ≥ 7) and community skills with side effects are never auto-invoked. The Orchestrator retains veto authority over all community skills.
