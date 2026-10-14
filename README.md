# AI-Assisted Development Workflow Comparison

## Objective

Compare two implementations of the same settings form. The first used a vague prompt, while the second used explicit requirements, constraints, and verification instructions.

## Experiment Setup

Both implementations were developed on separate Git branches from the same baseline. The first branch used a single broad instruction. The second used an explore-plan-implement-test-review workflow.

## Correctness

Describe the specific validation behaviors supported by each implementation. Reference actual files and tests. Explain whether empty names, whitespace-only names, and invalid email addresses were handled correctly.

## Accessibility

Compare input labels, error-message associations, keyboard interaction, and feedback for invalid submissions. Mention only issues confirmed during code review or testing.

## Edge Cases

Explain which edge cases were considered and which automated tests verified them. Document any remaining failures or limitations.

## Review Effort

Describe the changes required after AI generation, including incorrect assumptions, unnecessary edits, missing tests, or implementation defects. Include concrete examples from the Git diff.

## AI Mistake Caught

Document at least one actual AI-generated mistake, the evidence used to identify it, and how it was corrected. Do not invent a mistake if none was observed.

## Conclusion

Summarize which workflow produced the more reliable result and why. Discuss the value of explicit requirements, automated tests, and human review rather than prompt length alone.
