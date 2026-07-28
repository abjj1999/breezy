# Part 1 — Process Notes

**1. Reproduce.** Opened the file in the browser, clicked each nav link. Confirmed: no scroll on desktop; on mobile the hamburger closed but nothing scrolled.

**2. Read the console.** Every click threw a `SyntaxError` from `querySelector` at line 916. Two clues stood out: the error type meant the *selector itself* was malformed (not "element not found"), and the quoted selector was a full `file:///...` URL instead of `#features`.

**3. Trace it.** Line 916 used `document.querySelector(a.href)`. The `href` property resolves to an absolute URL; the attribute is the literal hash. Since `e.preventDefault()` ran before the throw, the native jump was suppressed too — hence total silence. The mobile menu closed because its inline `onclick="closeMobile()"` is a separate handler that still ran.

**4. Rule out other causes.** Grepped all `id=` attributes — every nav target exists, so the HTML was fine. Also noticed the many placeholder `href="#"` links, which would throw the same error, so the fix needed a guard for those.

**5. Fix and verify.** Swapped in `getAttribute('href')` and added an early return for bare-`#` links. Retested: all nav links smooth-scroll on desktop (including the More dropdown and footer links), the mobile hamburger flow closes *and* scrolls, and the console is clean.

**Dead ends avoided:** blaming missing/misspelled section IDs (the SyntaxError type rules that out) and blaming the `file:///` protocol (a hosted URL would be just as invalid a selector).

**Tools:** browser DevTools (desktop + mobile viewport), editor grep, and Claude Code — transcript included with the submission.
