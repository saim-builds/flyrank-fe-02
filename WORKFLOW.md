# AI-Assisted Development Workflow Comparison

## Objective

This experiment compares two implementations of a user settings form. The first implementation used a vague AI prompt, while the second used a precise prompt containing requirements, constraints, accessibility guidance, and verification instructions.

## Correctness

The second implementation includes five automated tests. All five passed, with zero failures. The tests cover valid submission and display-name trimming, empty names, whitespace-only names, invalid email addresses, and preventing success feedback for invalid submissions.

These results provide evidence that the validation functions behave correctly for the tested cases. Browser testing is also needed to confirm that the form displays errors and feedback correctly.

## Accessibility

The second implementation adds explicit labels for the display-name and email fields. It also includes error-message elements connected to the inputs through `aria-describedby`, along with live feedback elements. These changes provide a stronger accessibility foundation, although keyboard and screen-reader behavior still need verification.

## Edge Cases

The automated tests cover several important input edge cases, especially whitespace-only names and invalid email addresses. Additional manual checks should verify keyboard navigation and the behavior of the complete form.

## Review Effort and AI Mistakes

The Git diff shows that the second implementation adds automated tests and changes the HTML form structure. It also removes `package-lock.json`, `tsconfig.json`, and `src/vite-env.d.ts`, and changes the frontend entry point. These changes require review because they may be unrelated to the requested feature or affect the existing Vite and TypeScript setup.

The removed configuration and entry-point changes are potential AI mistakes that should be investigated before being classified as confirmed defects.

## Conclusion

The precise-prompt workflow produced five passing automated tests and introduced explicit accessibility markup. However, successful tests alone do not establish that the entire application builds and runs correctly. Reviewing the Git diff, checking the build, and testing the UI remain essential parts of AI-assisted development.
