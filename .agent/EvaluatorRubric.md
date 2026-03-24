# Evaluator Rubric

Use a 1-5 scale for each category.

## Product depth
- 5: the milestone fully satisfies the contract with a repo-specific, implementation-ready outcome
- 4: minor gap, but still clearly useful and grounded
- 3: partial or shallow outcome that leaves major questions unanswered
- 2: mostly generic or missing important repo realities
- 1: does not meaningfully satisfy the contract

## Functionality
- 5: required files, routes, commands, and validation evidence are all present and internally consistent
- 4: one minor omission with no major impact on execution
- 3: noticeable mismatch or missing evidence
- 2: critical planning or verification details are absent
- 1: the milestone does not function as a reliable source of truth

## Design quality
- 5: the design direction is coherent, specific, and aligned with the actual strengths of the current site
- 4: solid direction with minor ambiguity
- 3: functional but generic or under-specified
- 2: confusing or visually ungrounded
- 1: obstructs decision-making

## Code quality
- 5: the plan respects repo conventions, cites real files and commands, and keeps milestone scope tight
- 4: generally strong with a few rough edges
- 3: acceptable but loose or weakly validated
- 2: risky, inconsistent, or hard to execute
- 1: unreviewable or disconnected from the repo

## Hard fail conditions
Automatically fail the milestone when:
- a required planning file is missing
- the contract is too vague to test
- required verification was skipped
- the outcome ignores the Sanity-backed websites funnel, legacy repo drift, or current validation baseline
- the brief is generic enough that it could have been written without reading the repo
