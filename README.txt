Put your logo in this folder and name it exactly:

    logo.png

The page loads it from assets/logo.png in three places: the sign-in panel,
the portal header and the footer. Aspect ratio is preserved — the CSS only
sets a height (44px on sign-in, 34px in the header/footer) and lets the
width follow.

Recommendations
- PNG with a transparent background, roughly 400-600px wide.
- The sign-in panel has a dark background, so a logo with dark ink on a
  transparent background will disappear there. If yours is dark, either use
  a white/reversed version, or open style.css and change the .auth__brand
  background from var(--ink) to var(--surface) (the text colours in that
  block will need changing too).
- If the file is missing, the page falls back to a text monogram taken from
  ORG_NAME in script.js. Nothing breaks.

A different filename or format (logo.svg, logo.jpg) is fine — update the
three <img src="assets/logo.png"> references in index.html to match.
