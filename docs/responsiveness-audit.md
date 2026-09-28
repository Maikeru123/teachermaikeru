# Portfolio refinement and responsiveness audit

## Design and layout

The page uses the full browser width. The outer width cap, side borders, rounded
frame, and page shadow are removed. Shared section and navigation padding is
`clamp(16px, 4vw, 80px)`. Headings, paragraphs, portrait, illustrations, and the
contact form retain component-level limits for readable proportions.

Poppins, light `#F1F1F1`, dark `#010101`, the portrait/wordmark composition, hero
tech rotation, project stories, colored project images inside stories,
resume download, theme toggle, contact form, and Lenis scrolling are retained.

## Refinements

| Area | Result |
| --- | --- |
| Page and sections | Full browser width with internal padding; no boxed outer frame. |
| Hero | Equal outside grid columns keep the portrait centered. Portrait and side details retain bounded sizes on large monitors. |
| Navigation | Projects, Teaching, Technical, Education, Certificates, Contact. Resume and theme toggle remain accessible. |
| Projects anchor | `#projects` targets the whole Featured Work section. The hero CTA uses the same anchor. The old `#work` anchor is removed. |
| Featured Work | Compact editorial index with four numbered, full-width rows in the original source order. Names, categories, and Explore Story actions remain visible on mobile; short descriptions appear where space allows. Entire rows open the existing stories. Overview images, card shadows, and bento spans are removed; story content and assets are retained. |
| Teaching Areas | Concise descriptions of teaching at the University of Mindanao. Each card toggles a monochrome browser, mobile interface, or database relationship illustration. |
| Technical Skills | A category explorer with wrapping technology labels and a stable panel height. Supports click, tap, arrow keys, Home/End, and focusable panels. Inactive panels are inert and hidden from assistive technology. |
| Teaching to skills | Short chapter labels and a subtle arrow divider connect what Michael shares with students to what he builds with. |
| Education | Balanced editorial timeline from the University of Mindanao undergraduate degree and Magna Cum Laude to Ateneo de Davao University, Master in Information Technology, Currently pursuing. No master's dates added. |
| Certifications | Continued Learning label and divider follow Education. Original previews, source files, and viewing links remain. |
| Contact | Full-width section, stacked mobile layout, and a bounded form on desktop. Delivery behavior is unchanged. |
| Motion | Existing animation systems retained; new teaching/explorer transitions respect reduced motion. No scroll snapping or forced category scrolling. |

## Technology content

All 18 technologies were already listed in the existing hero tech stack; project
stories additionally substantiate Supabase, ASP.NET, HTML, CSS, JavaScript, C#,
and Entity Framework. No new skills were inferred.

- Web Development: Next.js, React, TypeScript, JavaScript, Tailwind CSS, Laravel, PHP, HTML, CSS.
- Mobile Development: Flutter, Dart, Firebase.
- Backend and Database: MySQL, Supabase, C#, ASP.NET, Entity Framework.
- Development Tools: Git.

## Reproduce verification

### Featured Work editorial index

The overview now uses four equal-height rows sized by their contents, thin
separators, and a single native button per project with a full-row hit area.
Names and arrows move only a few pixels on devices with hover; reduced motion
disables those movements. Keyboard focus outlines the entire row. CSS is scoped
to the Projects component. Other sections, global CSS, story components, story
data, and project assets are unchanged by this update.

Measured section heights, including its existing heading and section padding:

| Viewport | Previous bento | Editorial index | Reduction |
| --- | --- | --- | --- |
| 375x667 | 2260px | 808px | 64% |
| 768x1024 | 1310px | 707px | 46% |
| 1440x900 | 2641px | 730px | 72% |
| 2560x1440 | 3725px | 757px | 80% |

Verification for this update:

- Final layout checks: **7 passed**, in both themes, at 320x568, 375x667,
  768x1024, 1024x768, 1440x900, 1920x1080, and 2560x1440. Assertions cover
  compact, equal-height full-width rows, no overview images, no overflow,
  accessible actions, and the existing page interactions.
- Story and motion checks: **14 passed** across those same viewports, covering
  all 26 scenes, whole-row activation, Enter/Space, focus restoration, scroll
  locking, reduced motion, and orientation changes.
- Production build, ESLint, TypeScript, and Git whitespace checks: passed.

### Full portfolio audit before the editorial index update

- Production build: passed.
- ESLint: passed.
- TypeScript: passed.
- Contact endpoint contract: passed with mocked delivery.
- Browser suite: **51 passed across all 17 viewports** (7.4 minutes).
- Git whitespace check: passed.

The final browser run found no horizontal overflow or tested element overlap.
Full-width sections, both themes, teaching interactions, category switching,
all four project stories, and the ongoing master's entry passed their assertions.

### Commands

```bash
npm run build
npm run test:responsive
npm run lint
npm run typecheck
npm run test:contact
```

The browser suite uses installed Google Chrome, with touch emulation for phones
and tablets. Its 51 checks cover layout/interactions in both themes, all 26
project scenes at each viewport, reduced motion, and orientation changes.

Additional assertions verify full-width sections, centered navigation, the six
navigation links, the Featured Work heading, teaching illustrations by touch and
keyboard, exact category contents, stable panel height, and the current master's
institution/status. The existing checks cover overflow, hero/story overlap,
images, touch targets, focus restoration, modal scrolling, and the contact form.

Contact submissions are intercepted in browser tests; the endpoint contract also
uses mocked delivery. Tests do not send real emails. Browser emulation does not
replace physical-device or Safari/Firefox testing.

## Viewport matrix

| Group | Sizes |
| --- | --- |
| Phones | 320x568, 360x800, 375x667, 390x844, 414x896 |
| Phone landscape | 667x375, 844x390 |
| Tablets | 768x1024, 820x1180, 1024x768 |
| Laptops/desktops | 1280x720, 1366x768, 1440x900, 1536x864, 1600x900 |
| Large monitors | 1920x1080, 2560x1440 |

Screenshots are saved in `test-results/`; the latest test report is in
`playwright-report/`.
