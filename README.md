# Verification Suite — portal

Static entry page for the two examination verification tools. It signs a user
in, describes what each tool does, and links out to the two applications.

It contains **no verification logic**. The two tools stay in their own
repositories and are not modified by anything here.

```
verification-portal/
├── index.html      sign-in screen + portal markup
├── style.css       all styling
├── script.js       CONFIG block, session gate, navigation
├── assets/
│   ├── logo.png    ← you add this
│   └── README.txt  notes about the logo
└── README.md
```

---

## What to change before uploading

Everything editable is in the `CONFIG` block at the top of `script.js`.

**1. Tool URLs** — already filled in with the links you gave:

```js
TOOL_URLS: {
  allInOne:        "https://msu581.github.io/AllinONE/",
  whiteVsOriginal: "https://msu581.github.io/white-Vs-Original/"
}
```

**2. Credentials** — currently `Admin123` / `Medhavi@128`. Add teammates by
copying the object in the `CREDENTIALS` array. The ID is matched
case-insensitively; the password is matched exactly.

**3. Names** — `ORG_NAME` and `ORG_UNIT` fill the header, footer and sign-in
panel.

**4. Logo** — drop your file at `assets/logo.png`. Until it exists, the page
shows a text monogram instead. See `assets/README.txt`, especially if your
logo is dark (the sign-in panel is dark).

Optional: `OPEN_IN_NEW_TAB` (tools open in a new tab by default),
`SESSION_HOURS`, `MAX_ATTEMPTS`, `LOCKOUT_SECONDS`.

---

## Deploying

1. Create a repository, e.g. `verification-portal`.
2. Upload `index.html`, `style.css`, `script.js` and the `assets/` folder to
   the **root** of the repository — not inside a subfolder. `index.html` must
   sit at the top level.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`,
   folder: `/ (root)` → **Save**.
4. Wait a minute, then open the URL GitHub shows, e.g.
   `https://msu581.github.io/verification-portal/`.

Everything is plain HTML/CSS/JS. No build step, no server, no local tooling.

Note: on a free GitHub account, Pages can only publish from a **public**
repository. Publishing from a private repository requires GitHub Pro or an
organisation plan. Check GitHub's current Pages documentation for your account
type before assuming the repo can stay private.

---

## Testing the flow

1. Open the Pages URL in a private/incognito window.
2. You should see the sign-in screen, never a flash of the portal.
3. Enter a wrong password → "Access denied", the card shakes, the message
   doesn't say which field was wrong. Five wrong tries in a row start a 30
   second cooldown.
4. Enter the correct details → "Access granted" stamp, then the portal.
5. Click **Open All-in-One Verification** → the AllinONE app loads. Same for
   **Open White vs Original**.
6. Reload the portal tab → you stay signed in (session lasts 8 hours; tick
   "Keep me signed in" to survive closing the browser).
7. Click **Sign out** → back to the sign-in screen with a confirmation.
8. Narrow the window below ~860px → the menu button appears, cards stack, no
   horizontal scrolling.

---

## How sign-in works, and what it does not do

The check runs entirely in the browser. `script.js` compares what you type
against the values in `CONFIG.CREDENTIALS`, and on a match writes a small
session record to `sessionStorage` (or `localStorage` if "keep me signed in"
is ticked) holding the user name and an expiry timestamp. On every page load
the script reads that record before deciding whether to render the portal, so
the protected page is never shown to someone without a valid session.

**This is a shared team gate, not authentication.**

- `script.js` is served to every visitor. Anyone who opens the page can read
  the credentials in it — "view source" is enough. A private repository hides
  the *source repository*, but the *published site* is still on the open
  internet, and the published site includes `script.js`.
- The gate only controls whether this page renders. It does not protect the
  two tools: their GitHub Pages URLs work perfectly well if someone types them
  directly, and nothing here can change that.
- The session record is ordinary browser storage. It can be edited by anyone
  with access to the browser's developer tools.
- The 30-second cooldown after repeated failures slows down someone guessing
  by hand. It is not a defence against anything automated.

So: treat this as a front door with a sign on it and a lock a determined
person can open, which is reasonable if the aim is "keep the tools tidy and
out of casual reach for people inside the university". Do not treat it as a
control that keeps examination documents or the tools themselves confidential.

If you later need real access control on a static site, the usual options are
Cloudflare Access in front of the domain, Netlify's password protection, or a
proper auth provider (Firebase Auth, Supabase Auth, Auth0) with the tools
themselves gated too. Each of those needs setup outside this repository.

---

## Accuracy of the descriptions

The two tool descriptions on the portal were written from the current source
of both applications — the checks, formats, rules and report names they
actually implement. If you change a tool's behaviour, update the matching card
in `index.html` so the portal doesn't drift out of date.

The privacy wording says the tools are *built* to process files in the
browser, which is what both applications state and how they are written. It
deliberately stops short of guaranteeing anything on your behalf.
