---
name: agent-governance-toolkit
description: Policy enforcement, approvals, and destructive-action guardrails for agents
---

# Agent Governance Toolkit

Use this skill when an agent can take risky actions and needs guardrails.

## Core ideas
- Policy rules before execution
- Human approval for destructive or sensitive actions
- Sandbox or execution restrictions
- Clear denial messages when an action is not allowed

## Example rules
- Block destructive database actions
- Require approval for email sends
- Deny file deletion unless explicitly approved

## References
- `references/policy-example.yaml`
