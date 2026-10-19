# THE UNDER-FOREST: A MACRO ODYSSEY

2026 · Three-Channel Immersive Video Installation

This page uses the latest user-supplied project brief. It is independent of Rosé Vinyl and Dress Up Game, which remain separate Interface projects. Those pages now have an Open website link immediately below their headings, in addition to their existing links.

## Implementation

- `underforest-content.js`: exact supplied paragraphs, project metadata and media configuration.
- `underforest.js`: scoped project renderer, installation/layer schematics, shared player UI and lifecycle.
- `underforest-player.js`: middle-channel master clock, drift correction above 0.1 seconds, shared play/pause/seek/loop, buffering coordination and one audible channel.
- `underforest.css`: dark treatment limited to this detail page. The three playback screens remain side by side on mobile, with fullscreen support where the browser provides it.
- `index.html`: loads the new modules after existing project pages.
- `refinements.js`: excludes this dark page from fish-background text gradients and image selection handles.
- `project-pages.js`: adds prominent website links for the two Interface projects.

Only the project detail treatment changes. The existing category navigation, fonts and surrounding portfolio remain in place. The complete title is also used in navigation so it is not shortened to The Odyssey.

## Media still required

The repository contains `assets/works/TheOdyssey.jpeg`, inspected and used as an **installation test photograph**, not passed off as a final animation frame.

The Downloads folder contains `A Macro Odyssey_Left.mp4` (1,204,597,324 bytes). It has not been copied into the public site: this is a large original file, and Middle and Right have not yet been supplied. No three-channel playback is claimed while the files are absent.

Set the following `UNDER_FOREST.media` fields after receiving web-ready files or direct video URLs:

| Field | Required media |
| --- | --- |
| `left`, `middle`, `right` | The actual Left, Middle and Right video exports, in that order |
| `combined` | Combined triptych video URL/file |
| `overview` | Final worm’s-eye-view still |
| `story` | Four stills: Enter, Search, Impact, Endure |
| `reference`, `assets`, `colour`, `final` | Selected reference/process/final imagery, not whole presentation slides |
| `transition` | Short multiplane-to-360° comparison video |
| `before`, `after` | Centre-screen composition comparison |
| `finalStills` | Entering the Forest, Revealing Scale, Biological Resilience |

Playback controls remain disabled until all three sources are configured. The combined-version button remains disabled until its real URL is provided. Both viewer locations show the labelled installation photograph in the meantime. Other unavailable images are explicitly labelled Asset to be supplied.

The installation and exploded-layer diagrams are new explanatory schematics based on the supplied text. They are labelled as schematics, not original production documents. The sound diagram is conceptual and does not claim verified speaker routing.

Audio currently comes from the middle video only to avoid tripled sound. Confirm where the final mix resides before adding actual exports. All videos seek and loop together; if durations differ, the shortest available duration bounds the shared timeline. Matching export lengths are preferable.

## Credits to confirm

External sound sources/licences, external footage, AI tools/models and reference/source-material credits still need to be supplied. Named creators, contributions and tools match the brief.

## Validation

- All 13 project DOM/media/navigation checks pass, including the full project title and two viewer placements.
- Transport checks pass for shared play/pause, middle master, drift correction, single audio source, shared seek, buffering, looping, media failures, rejected playback and cleanup when leaving the page.
- These transport checks use simulated media elements. Actual three-video playback, audio alignment, fullscreen and visual desktop/mobile QA remain unverified until Middle/Right files and a browser connection are available.
- No deployment or publication performed.
