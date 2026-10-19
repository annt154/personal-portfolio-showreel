# Portfolio content — 4 October 2026

## Corrected project grouping

The user clarified that Rosé Vinyl and Dress Up Game are two separate Interface (UI/UX) projects. They are not channels of The Odyssey. Both now have independent entries and pages under `DATA.ui`. The Odyssey remains a separate Motion Design work with its original `TheOdyssey.jpeg` image. The three-channel narrative and Channel 03 placeholder have been removed. No new Odyssey description has been inferred.


The site keeps its existing homepage, beach navigation, fonts, collection browser and fixed side panels. `project-content.js` stores the revised case-study copy. `project-pages.js` renders it after the existing page modules; `project-pages.css` contains the scoped layout rules. `project-assets.js` lists available local media so missing legacy filenames are not requested.

`publication-drafts.json` contains the four supplied YouTube descriptions verbatim, marked `draft` and `published: false`. It is not loaded by the website and nothing has been sent to YouTube.

## Source checks

- [Assignment 2](https://annt154.github.io/assignment2/): read `index.html`, `style.css`, `script.js` and `data.js`. Verified array-based playlist, `querySelector`, arrow functions, play/pause, track changes, seeking, mute, disc rotation, hover and `nth-child` styling.
- This live build uses p-hase tracks. It does **not** contain the Rosé artist biography, three-column artist layout, responsive breakpoints or credits panel described in the supplied design notes. The page distinguishes the documented direction from the current build rather than presenting those features as live.
- [Assignment 3](https://annt154.github.io/assignment3/): read `index.html`, `style.css` and `script.js`. Verified title **Dress Up Game**, drag/drop placement using data attributes, opacity feedback, used-item marking, removal, history-based Back and Reset. The current code does not provide keyboard/touch drag alternatives. Responsive controls and opt-in music are described only as possible next steps.
- Its footer year is not reliable project dating, so the case-study year remains unconfirmed.
- Existing `case-studies.js` and `case-media.js` connect the ballet study to the uncanny investigation. The local `ballet-study.webm` is an excerpt; it is not labelled as a full film or assigned Endless Lullaby's story or credits.
- The Odyssey uses its original projection photograph. The earlier three-channel interpretation was incorrect and is no longer used.

## Preview assets

The two `assets/works/odyssey/channel-0*-preview.html` files are static copies of the public interfaces, captured on 4 October 2026. All scripts and audio are removed. They run in permission-free sandboxed iframes and are labelled as static source previews, **not screenshots**. Images remain referenced from their original project websites; an internet connection is needed for them. The music preview's initial track text and cover are taken from `data.js`.

`channels.svg` is an unused artifact of the discarded grouping. `vinyl.svg` is a small schematic cover illustration, not a fabricated screenshot. Browser captures of interactive states are still needed. Keep screenshot order as documented on each channel page; do not substitute invented state images.

## Information and assets still needed

- **The Odyssey:** its own project description, year, role, tools and credits. No Interface project should be merged into it.
- **Rosé Vinyl:** the revised build with the artist panel; full interface, three-column detail, playback detail and mobile screenshot.
- **Dress Up Game:** project year; interaction-in-progress and changed-state captures, original planning document and final browser screenshot.
- **Endless Lullaby:** correct sound designer name. The exact placeholder `[INSERT SOUND DESIGNER’S NAME]` remains.
- **When Eyes Don’t Blink:** exact role, collaborators, year, tools and additional process assets. The supplied credit placeholder remains intact.
- **Beyond the Frame:** software details. Solo credits are corrected throughout the existing and revised content.
- **Fresh Up:** final external audio/media credits.
- **Water, out of form:** exhibition documentation and music/external material credits.
- **The Sun:** final music and sound credits.
- **Regret:** year and external media credits.
- **Everything everywhere all at once:** source imagery and soundtrack credits.
- **The A.B.C Story:** software details and any further process images.
- **Posthumanism:** software details, names for the initial group proposal and further process images.
- **Juicy:** project information, year, role, tools, reflection and finished work.

## Validation

Validation covers JavaScript parsing, generated DOM for all 12 projects, local media existence, semantic headings/metadata, previous/next destinations, draft fidelity, sandboxed silent previews and desktop/mobile CSS rules. The DOM test accounts explicitly for LinkeDOM's template serialization difference from browsers.

The Interface projects each have a standalone responsive case-study page. Below 750px, the entries panel becomes a horizontal navigation strip so the article has the full available width. Each article remains independently scrollable on desktop; its side panels remain outside that scroll container. Videos use controls and deferred loading; no new player autoplays sound. Reduced-motion and visible keyboard focus styles are included.

**Visual desktop/mobile browser testing is not completed:** the available browser runtime returned no browsers. DOM and stylesheet checks do not substitute for screenshots or real pointer/keyboard tests. Check the preview at 1440px, 1024px, 768px, 390px and 320px before publication, especially the source-preview frames, fixed header/rails, mobile entries strip, focus after navigation and long titles.

No deployment or external publication was performed.

## Files changed

- Updated: `index.html` (load order/cache versions), `case-studies.js` (corrected legacy solo/sound credits), `refinements.js` (readable case-study text and no selection handles around new editorial images).
- Added: `project-content.js`, `project-pages.js`, `project-pages.css`, `project-assets.js`.
- Added content: `content/publication-drafts.json`, this `content/README.md`.
- Added media: `assets/works/odyssey/channel-01-preview.html`, `channel-02-preview.html`, `channels.svg`, `vinyl.svg`.
- Local ignored checks: `.checks/portfolio-20261004/check.mjs`, DOM parser, generated page fragments and `report.json`. These are not part of the published site.

## Follow-up fixes

- Water and The Sun now use one-column metadata below 750px.
- The current entry is automatically revealed in the mobile horizontal strip or desktop vertical rail without scrolling the article. DOM interaction checks cover both directions and focus retention.
- Embedded films include a direct viewing link; local video excerpts include a file link. Existing Vimeo private-link query parameters are preserved.
- All 12 project DOM checks pass after these changes. Visual browser QA is still pending; browser discovery again returned an empty list.

Grouping correction: all 13 project DOM checks pass, including separate UI entries for Rosé Vinyl and Dress Up Game, and no channel/interface narrative in The Odyssey.

## Supplied final video links

- Beyond the Frame: https://youtu.be/G0cSvIk3nr0
- Fresh Up: https://youtu.be/VAt1Eha2OrI
- When Eyes Don’t Blink: https://youtu.be/kAn4HqIJGyM
- Endless Lullaby: https://youtu.be/xlfaU6L3B9w
- Water, out of form: https://youtu.be/_b1gxwKPz6g

All five IDs are checked against rendered iframe URLs. These are the user-supplied full-film links; live YouTube playback has not been browser-tested. Fish texture strips now use natural proportions at 100% of their viewport-height container instead of cover scaling.
