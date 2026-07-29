# Part 2 — Design Decisions

**What changed:** the three vertical cards are now a horizontal timeline — numbered circles joined by a connector line, title and description below each circle. Below 768px it pivots to a vertical timeline (circle left, text right, connector running down the circle column).

- **Semantic markup.** Steps are an `<ol>` — it's an ordered sequence. Each `<li>` holds a `.tl-num` circle and a `.tl-body` text wrapper (the wrapper enables the mobile side-by-side layout).
- **Connector via pseudo-elements.** Each step draws `::before`/`::after` line segments at circle mid-height; first/last outer segments are hidden. No extra DOM, and alignment holds at any width. On mobile, `::after` becomes the vertical segment.
- **Hover = motion, not just color.** The circle lifts and scales (`translateY(-4px) scale(1.12)`) with a deeper violet shadow on a 0.3s transition; the title tints sky-blue.
- **Flexbox over Grid.** Three equal columns → one column is a single `flex-direction` change.
- **Bonus: Intersection Observer.** Steps fade in and slide up with a 0.15s stagger when the section is 35% visible. The hidden state is added by JS (no-JS users still see content), the observer fires once, and `prefers-reduced-motion` skips it.
- **Visual continuity.** Reused the existing tokens — sky→violet gradient circles, sky palette connectors, same shadows and type scale.
- **Split into separate files.** The inline `<style>` and `<script>` blocks moved to `styles.css` and `script.js`, linked from the HTML. A 1,700-line single file is hard to navigate; separate files make each layer easier to read and review, let the browser cache styles/scripts independently, and mirror how a real project would be organized.
