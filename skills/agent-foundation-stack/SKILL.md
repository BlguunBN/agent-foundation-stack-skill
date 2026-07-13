---
name: agent-foundation-stack
description: Set up an agent foundation with phase 1 and phase 2 together: operating modes, workspace layout, task flow, persistent memory, reusable skills, and safety/governance. Use when the user wants the base agent stack applied and verified before specialty workflows.
---

# Agent Foundation Stack

Use this for the base rollout before adding domain-specific agents.

## Phase 1: Foundation

1. Pick the operating modes you will support.
   - fast: short, low-friction tasks
   - deep: hard reasoning and debugging
   - business: planning, communication, external-facing work

2. Define the root workspace and where durable artifacts live.
   - skills for reusable procedures
   - memory for stable preferences and environment facts
   - notes/checklists for setup and verification

3. Set the control rules.
   - what agents may edit
   - what requires approval
   - what must stay isolated

4. Confirm the active profile and model map before changing anything else.

## Phase 2: Base Stack

1. Create the spec/task loop.
   - one task list
   - one implementation target
   - one verification pass

2. Establish memory rules.
   - store stable preferences and environment facts only
   - do not store temporary progress or task state
   - keep entries short and reusable

3. Promote repeatable workflows into skills.
   - one skill per recurring workflow
   - include trigger, steps, pitfalls, verification
   - keep the body lean; move details into references if needed

4. Add governance.
   - explicit approval for destructive or external actions
   - narrow write scopes
   - safe defaults for automation

## Verification

Before calling the foundation done, verify all of these:

- `hermes status` shows a healthy agent setup
- `hermes skills list` shows the foundation skill
- `hermes memory status` reflects the desired memory setup
- `hermes config check` passes or only reports known, accepted warnings
- a tiny harmless task runs successfully with the chosen mode/profile

If verification fails, fix the smallest thing first, rerun the check, and only then expand the stack.

## Output Standard

When reporting completion, include:
- what changed
- what was verified
- what remains optional

If the user later adds specialty workflows, build them on top of this base rather than mixing them into the foundation.
