# UI primitives

Small, generic, reusable building blocks with no page specific meaning.
Content agnostic so they can be reused anywhere in the site.

- `Button.jsx` primary, secondary, and outline variants. Renders as a
  `<button>` by default, or a router `<Link>` (`to`) or `<a>` (`href`).
- `SectionHeading.jsx` eyebrow, title, and description block used at the
  top of a page section.
- `Card.jsx` flexible surface for services, pricing, reviews, team info,
  and anything else that needs a consistent bordered block. Renders as a
  `<div>`, or a `<Link>`/`<a>` when `to`/`href` is passed.
- `Container.jsx` max width and horizontal padding wrapper, matches the
  width already used by the Header and Footer.
- `Section.jsx` consistent vertical spacing for a page section, wraps
  `Container` internally.
- `GlowOrb.jsx` a single soft blurred color accent (purple, blue, or cyan)
  for section backgrounds. Position and size are set via `className`.
- `PagePlaceholder.jsx` the placeholder every page currently renders,
  built on `Section` and `SectionHeading`.
- `index.js` barrel export, so multiple primitives can be imported from
  one path: `import { Button, Card } from "../components/ui"`.
