# Part 1 — Technical Explanation

## The Problem

Clicking any nav link did nothing — no scroll. On mobile the hamburger menu closed but the page stayed put. Every click threw:

```
Uncaught SyntaxError: Failed to execute 'querySelector' on 'Document':
'file:///.../breezy-fulltime-test.html#features' is not a valid selector.  (L916)
```

## Root Cause

The smooth-scroll handler called `document.querySelector(a.href)`. The `href` DOM **property** returns the fully resolved absolute URL (`file:///...#features`), not the literal `#features` written in the markup — that's what `getAttribute('href')` returns. A full URL is not a valid CSS selector, so `querySelector` throws a `SyntaxError`.

The page did _nothing_ (instead of a normal jump) because `e.preventDefault()` ran first — cancelling the browser's native anchor-jump — and then the exception killed the handler before `scrollIntoView` was reached.

Mobile was misleading because those links have a separate inline `onclick="closeMobile()"` handler. An exception in one handler doesn't stop the others, so the menu closed (looked like success) while the scroll silently failed.

## The Fix

```js
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const href = a.getAttribute("href");
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
```

1. **`getAttribute('href')` instead of `a.href`** — reads the literal `#features`, a valid ID selector.
2. **Skip bare-`#` placeholder links** — `querySelector('#')` would throw the same error. Bonus: those links no longer jump the page to the top.

All section IDs (`#features`, `#how`, `#pricing`, `#testimonials`, `#faq`, `#signup`) already existed — no HTML changes needed.

## Console Error: Meaningful or Misleading?

**Meaningful — it contains the whole diagnosis** — but easy to misread:

- It quotes the string passed in: seeing a full URL where a CSS selector belongs _is_ the root cause.
- It's a `SyntaxError`, not a "not found" — so the selector is malformed, and auditing the HTML for missing/misspelled IDs is a wrong turn (`querySelector` returns `null` for missing elements; it only throws on bad syntax).
- The `file:///` prefix invites blaming local hosting — a red herring. On a server the resolved `https://...#features` URL is equally invalid as a selector.
- It only fires on click, and on mobile the closing menu masks the failure entirely.
