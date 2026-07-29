# Part 2 — Process Notes

1. **Audit.** Read the existing `.steps` CSS/markup and the `:root` design tokens so the redesign would inherit the site's look.
2. **Structure.** An `<ol>` of steps, each with a circle and a `.tl-body` wrapper — the wrapper makes the mobile layout possible without new HTML.
3. **Connector first** (the only tricky part). Per-step `::before`/`::after` segments beat one absolutely-positioned line: alignment is automatic and the outer edges hide with `:first-child`/`:last-child`.
4. **Mobile pivot.** At 768px: `flex-direction: column`, each step becomes a row, `::after` reused as the vertical connector.
5. **Hover + bonus.** Circle lift/scale with shadow on a 0.3s transition; IntersectionObserver adds one class, CSS `transition-delay` does the stagger.
6. **Verify.** Desktop and 375px both render correctly, animation classes flip on scroll, console clean, no trailing connector after step 3.

**Tools:** browser DevTools, Claude Code — transcript included with the submission.

## AI prompt used for the animation

> Add the Intersection Observer bonus to the "How It Works" timeline. When the section scrolls into view, each step should fade in and slide up with a staggered delay. Requirements: the hidden state must be applied by JavaScript so users without JS still see the content; trigger once when about a third of the section is visible, then disconnect; do the stagger with CSS transition-delay, not JS timers; skip the animation when prefers-reduced-motion is enabled.
