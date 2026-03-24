# Execution Plan Rules

An execution plan is a living document for long-running work. It should be detailed enough that a fresh agent with only the working tree and the plan can continue without guessing.

## Use an execution plan when

Use an execution plan for:
- new features with multiple moving parts
- significant refactors
- tasks that need careful sequencing
- anything where "done" is not obvious from one sentence

Do not use a heavyweight plan for trivial edits.

## Properties of a good plan

A good plan is:
- self-contained
- concrete
- milestone-based
- testable
- continuously updated
- understandable by a new reader

The plan must define terms instead of assuming shared context.

## Required sections

Every plan should include:

1. Goal
   - what is being built
   - who it is for
   - why it matters

2. Non-goals
   - what this task will not try to solve

3. Hard constraints
   - platform limits
   - performance limits
   - safety or compliance limits
   - UX or determinism requirements

4. Deliverables
   - what must exist when the project is complete

5. Architecture
   - intended shape of the solution
   - main components and their responsibilities
   - key integration boundaries

6. Milestones
   - each milestone must be small enough for one build -> verify -> repair loop
   - each milestone must include:
     - scope
     - non-goals
     - acceptance criteria
     - validation commands
     - demo or smoke test
     - failure conditions

7. Stop-and-fix rule
   - if validation fails, stop and repair before continuing

8. Decision log
   - decisions made
   - why they were made
   - alternatives rejected

9. Final demo flow
   - a short end-to-end path that proves the project actually works

## Style rules

- prefer working behavior over vague aspirations
- prefer named files, commands, and user flows over abstractions
- keep milestones narrow
- remove ambiguity before implementation
- revise the plan as reality changes

## Related files

- `.agent/Prompt.md` defines the target
- `.agent/Plan.md` is the active milestone map
- `.agent/Implement.md` defines generator behavior
- `.agent/Documentation.md` is the status log and audit trail
- `.agent/contracts/current.md` is the active milestone contract
- `.agent/reports/latest.md` is the latest evaluator verdict
