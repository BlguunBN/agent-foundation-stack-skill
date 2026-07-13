---
name: personal-skill-router
description: Route prompts to exact installed Hermes skills, toolsets, and plugins; use when you need to choose or preload the right skill(s) or toolset(s) for a task, or when the user asks which installed capabilities should be used.
---

# Personal Skill Router

Use this skill before starting work on any non-trivial task.

## Do
1. Classify the request into one primary intent.
2. Pick the exact installed skills that match that intent.
3. Pick the minimum toolsets needed to execute safely.
4. Load the foundation skills first when the task is broad or ambiguous.
5. Prefer explicit loading over guessing.

## Default foundation trio
- `personal-spec-kit-foundation`
- `personal-harness-agent-teams`
- `personal-agent-governance-toolkit`

## Rules
- Use the manifest and routing map as the source of truth.
- If a skill is missing, say so and fall back to the closest installed skill.
- If the task can be done with fewer skills, do that.
- If the task is risky, include governance before execution.

## References
- `references/routing-map.md`
- `scripts/recommend_skill_routes.py`
