# CHANGES.md — Bug Fix Audit Trail

Each entry below documents an audited problem, root cause, exact fix applied, and corresponding prompt reference from `chats/01-fix-the-site-checklist.md`.

---

### 1. Blog: Pager offset + broken next button
- **Found:** On `blog.html`, page 1 skipped the first 6 posts and clicking the next arrow did not actually advance the page.
- **Cause:** `draw()` computed `var start = page * PER;` (skipping items 0–5) and the next button used `page+2; draw()`, an expression that failed to assign `page`.
- **Fix:** Corrected offset formula to `var start = (page - 1) * PER;` and updated next button click handler to `if (page * PER < list.length) { page++; draw(); }`.
- **Source:** [chat 1, prompt 1]

---

### 2. Blog: Like counter string concat
- **Found:** On `blog.html`, clicking the like button resulted in `"01"`, `"011"`, etc. instead of incrementing the count numerically.
- **Cause:** `like()` performed string concatenation: `list[n].likes = list[n].likes + '1'`.
- **Fix:** Changed increment to `list[n].likes = Number(list[n].likes) + 1`.
- **Source:** [chat 1, prompt 2]

---

### 3. Blog: Search excludes first post
- **Found:** On `blog.html`, searching never returned the first article in `POSTS` even when matching exact titles.
- **Cause:** `search()` contained an intentional guard `idx > 0 && ...` that filtered out index 0.
- **Fix:** Removed the `idx > 0` condition from the `POSTS.filter` predicate.
- **Source:** [chat 1, prompt 3]

---

### 4. Contact: Send/Clear buttons swapped
- **Found:** On `contact.html`, clicking "Send message" cleared the inputs and clicking "Clear" validated and submitted the form.
- **Cause:** Button handlers were inverted: "Send message" called `cform.reset()` and "Clear" called `sendForm()`.
- **Fix:** Updated "Send message" to call `sendForm()` and "Clear" to call `document.getElementById('cform').reset()`.
- **Source:** [chat 1, prompt 4]

---

### 5. Contact: Forum posts don't persist
- **Found:** On `contact.html`, newly submitted forum posts disappeared after a page refresh.
- **Cause:** Posts were loaded from `localStorage.getItem("threads")` but saved using the singular key `localStorage.setItem("thread", ...)`.
- **Fix:** Changed storage save key to `"threads"` to match retrieval.
- **Source:** [chat 1, prompt 5]

---

### 6. Globals: Forum renders unescaped HTML
- **Found:** In `js/globals.js`, `escapeHtml` was a no-op returning raw input, enabling stored cross-site scripting (XSS) in the community forum.
- **Cause:** `escapeHtml(s)` was defined as `return s;`.
- **Fix:** Implemented proper entity replacement for `&`, `<`, `>`, `"`, and `'`.
- **Source:** [chat 1, prompt 6]

---

### 7. Tools: BMI labels inverted
- **Found:** On `tools.html`, entering healthy weight and height showed `(overweight)` and overweight values showed `(healthy)`.
- **Cause:** The ternary operator in `bmi()` checked `b > 25 ? "(healthy)" : "(overweight)"`.
- **Fix:** Inverted condition to `b > 25 ? "(overweight)" : "(healthy)"`.
- **Source:** [chat 1, prompt 7]

---

### 8. Tools: Unparsed number math (tip + currency)
- **Found:** On `tools.html`, calculating tip or converting currency resulted in string concatenations or `NaN`.
- **Cause:** Inputs read from text boxes as strings were directly operated on without parsing.
- **Fix:** Wrapped inputs in `parseFloat()` inside both `tipcalc()` and `conv()`.
- **Source:** [chat 1, prompt 8]

---

### 9. Tools: Password generator ignores length
- **Found:** On `tools.html`, setting length to 16 or 32 still outputted an 8-character password from an overly restricted character set.
- **Cause:** `pwgen()` had hardcoded 8-iteration loop using only 6 characters.
- **Fix:** Updated loop to run `parseInt(plen, 10)` times pulling from a comprehensive alphanumeric and symbol character set.
- **Source:** [chat 1, prompt 9]

---

### 10. Tools: Age calc uses deprecated getYear()
- **Found:** On `tools.html`, the age calculator returned negative or bizarre numbers.
- **Cause:** Used `new Date().getYear() - d.getYear()`, which returns years since 1900 rather than full year.
- **Fix:** Switched to `getFullYear()` and subtracted 1 if the current date is before the birthdate's month/day this year.
- **Source:** [chat 1, prompt 10]

---

### 11. CSS: Focus outline removed site-wide
- **Found:** Across all pages, keyboard navigation with Tab showed no visible outline on interactive elements.
- **Cause:** `*:focus, *:focus-visible { outline: none !important; }` in `css/style.css`.
- **Fix:** Replaced with `*:focus-visible { outline: 2px solid var(--primary, #8b5cf6) !important; outline-offset: 2px; }`.
- **Source:** [chat 1, prompt 11]

---

### 12. Home: Primary CTA does nothing
- **Found:** On `index.html`, clicking "Start building for free 🚀" produced no action.
- **Cause:** The button had empty `onclick=""`.
- **Fix:** Added `onclick="location.href='contact.html'"`.
- **Source:** [chat 1, prompt 12]

---

### 13. Home: Revenue counter throws TypeError
- **Found:** On `index.html`, the console logged `TypeError: total.substr is not a function`.
- **Cause:** `total` was stored as a Number and called `.substr(0, 9)`.
- **Fix:** Converted `total.toFixed(2)` to a String before slicing.
- **Source:** [chat 1, prompt 13]

---

### 14. Home: Placeholder 'Ready' text in pricing card
- **Found:** On `index.html`, a card in the pricing section displayed repetitive placeholder "Ready" labels.
- **Cause:** Unfinished copy draft.
- **Fix:** Replaced with clean enterprise copy: "Custom Solutions" badge and "Need custom enterprise features or dedicated SLA?".
- **Source:** [chat 1, prompt 14]

---

### 15. Admin: Login bypassed by Cancel
- **Found:** On `admin.html`, clicking Cancel on the password prompt granted full admin access.
- **Cause:** The condition was `if (pw == SITE.adminPassword || pw == null)`.
- **Fix:** Updated to require exact match: `if (pw === SITE.adminPassword)`.
- **Source:** [chat 1, prompt 15]

---

### 16. Admin: Items-sold shows undefined
- **Found:** On `admin.html`, the "Items sold" stat card rendered `undefined`.
- **Cause:** The code rendered `$("#qty").html(qty.length)`, but `qty` was a numeric total.
- **Fix:** Updated to render `$("#qty").html(itemsSold)` which contains the verified numeric sum.
- **Source:** [chat 1, prompt 16]

---

### 17. Admin: Table skips first order + wrong delete offset
- **Found:** On `admin.html`, the first order (`ORD-100000`) was omitted from the table, and clicking delete deleted the wrong order.
- **Cause:** The loop started at `r = 1` and `del()` had an offset.
- **Fix:** Set loop to start at `r = 0` and adjusted `del(idx)` to delete directly at `idx`.
- **Source:** [chat 1, prompt 17]

---

### 18. Admin: Amount sort is alphabetical
- **Found:** On `admin.html`, clicking "⇅ Sort" sorted amounts alphabetically (`$10` followed by `$100` before `$20`).
- **Cause:** `sortOrders()` compared amounts as strings.
- **Fix:** Used `parseFloat(a.amount) - parseFloat(b.amount)` for standard numeric ordering.
- **Source:** [chat 1, prompt 18]

---

### 19. Admin: Revenue/avg use imprecise sum
- **Found:** On `admin.html`, total revenue and average order values dropped cents.
- **Cause:** Displayed figures read from `revenue` which used `parseInt(o.amount)`.
- **Fix:** Switched display to use `totalRevenue` and `avgOrder` which use `parseFloat`.
- **Source:** [chat 1, prompt 19]

---

### 20. Admin: Status colors swapped
- **Found:** On `admin.html`, paid orders rendered in red and pending in green.
- **Cause:** Inverted color logic in `renderTable()`.
- **Fix:** Set paid orders to green (`rgba(34,197,94,.2)`) and pending orders to amber/warning (`rgba(245,158,11,.2)`).
- **Source:** [chat 1, prompt 20]

---

### 21. Admin: API key exposed in page
- **Found:** On `admin.html`, an API key was printed into the DOM sidebar.
- **Cause:** `document.write(SITE.apiKey)` in markup.
- **Fix:** Removed the client-side API key output completely.
- **Source:** [chat 1, prompt 21]

---

### 22. Data: Duplicate dataset copies in memory
- **Found:** On all pages loading `js/data.js`, large duplicate memory allocations occurred during parse.
- **Cause:** `ORDERS_BACKUP` and `ORDERS_BACKUP_2` performed deep clones of 2,000 records.
- **Fix:** Removed the two unused backup copies from `js/data.js`.
- **Source:** [chat 1, prompt 22]

---

### 23. Main: Theme toggle broken
- **Found:** Clicking the theme toggle icon did not switch to dark mode.
- **Cause:** `if (theme = 'light')` was an assignment rather than an equality comparison (`===`).
- **Fix:** Changed to `if (theme === "light")`.
- **Source:** [chat 1, prompt 23]

---

### 24. Main: Tab key disabled site-wide
- **Found:** Pressing the Tab key in any browser on any page was blocked.
- **Cause:** A global `keydown` event listener checked `e.key === 'Tab'` and called `e.preventDefault()`.
- **Fix:** Removed the blocking event listener from `js/main.js`.
- **Source:** [chat 1, prompt 24]

---

### 25. Main: Hero video call throws on load
- **Found:** Loading any page threw `TypeError: Cannot read properties of null (reading 'play')`.
- **Cause:** Unconditional call to `document.querySelector('#hero-video').play()`.
- **Fix:** Added null and method check `if (heroVid && typeof heroVid.play === "function")`.
- **Source:** [chat 1, prompt 25]

---

### 26. Site-wide: Emoji/characters render as garbled mojibake
- **Found:** On `index.html`, `admin.html`, `blog.html`, `contact.html`, and `tools.html`, emojis and unicode punctuation rendered as garbled mojibake (e.g. `ðŸŒ™`, `â€“`, `âœ¨`, `ðŸ”¥`).
- **Cause:** None of the HTML pages specified a character encoding in `<head>`, causing browsers to default to Windows-1252/ISO-8859-1.
- **Fix:** Added `<meta charset="UTF-8">` as the first tag inside `<head>` across all five pages.
- **Source:** [chat 1, prompt 26]

---

### 27. Main: Nav bar shows an extra "undefined" tab
- **Found:** On all pages, navigation rendered an extraneous "undefined" link.
- **Cause:** `for...in` loop over `SITE.pages` iterated over inherited prototype methods like `Array.prototype.last`.
- **Fix:** Converted `writeNav()` loop to standard index-based `for (var i = 0; i < window.SITE.pages.length; i++)` and ensured `Array.prototype.last` is non-enumerable.
- **Source:** [chat 1, prompt 27]

---

### 28. Home: Hero heading text hard to read over 3D background
- **Found:** On `index.html`, the hero heading and subtext lacked contrast against animated 3D orbs and light reflections.
- **Cause:** `#bg3d` had high opacity (`0.85`) with no text contrast enhancements.
- **Fix:** Decreased canvas opacity to `0.45` and added dark text-shadows (`0 4px 28px rgba(0,0,0,0.85)`) and balanced radial spotlight scrim behind the hero text.
- **Source:** [chat 1, prompt 28]

---

### 29. Home: Subtitle text wraps into a broken narrow column
- **Found:** On `index.html`, the typewriter subtitle (`#typer`) collapsed and wrapped into a narrow column of single words running vertically through the hero.
- **Cause:** Missing explicit block display, responsive full-width constraint, and text wrap properties on `.hero .sub`.
- **Fix:** Added `display: block; width: 100%; max-width: 720px; word-break: normal; white-space: normal; line-height: 1.6;` to `.hero .sub`.
- **Source:** [chat 1, prompt 29]

---

### 30. Main: Nav wraps to a second line, overlapping hero content
- **Found:** The navigation pill's action buttons (theme toggle, Dashboard, Get started) wrapped onto a second line overlapping the page content below.
- **Cause:** Bootstrap's `.nav` default `flex-wrap: wrap` caused action buttons to break onto a new line inside the fixed-height container.
- **Fix:** Enforced `flex-wrap: nowrap !important;` on `.nav`, added `flex-shrink: 0; white-space: nowrap;` on logo and action button containers, and added responsive scroll handling on mobile.
- **Source:** [chat 1, prompt 30]

---

### 31. Theme & Cursor: Light mode overhaul & duck-type cursor restoration
- **Found:** Light theme lacked comprehensive styling across all pages (causing low contrast on table cells, dark shadow smudges on hero headings, unstyled popups/cards, and missing theme persistence) and the duck-type emoji cursor was missing.
- **Cause:** Incomplete `html.light` CSS declarations and cursor rules defaulting to standard OS pointers.
- **Fix:** Restored cross-browser SVG duck-type cursor (`🦆`) across all pages for default and pointer elements. Implemented complete Light Mode overhaul in `css/final_FINAL_v3_USE_THIS.css` covering typography, card surfaces, navigation, data tables, modals, badges, inputs, and footer, along with synced theme toggle icons (`☀️`/`🌙`) and persistent `localStorage` and cookie storage.
- **Source:** [user prompt 4]


