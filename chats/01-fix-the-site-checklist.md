# Chat 01: Fix the Site — Bug Checklist Resolution

- **Tool:** Google AI Studio (Gemini 3.8 Flash)
- **Date:** 2026-09-27
- **Topic:** Targeted fixes across the 25 audited issues from Fix the Site Checklist

## User Prompt 1
On blog.html, the pagination is wrong: draw() computes `var start = page * PER;`, so page 1 skips the first 6 posts instead of showing them. Also the '→' button's `onclick="page+2; draw()"` doesn't actually change page. Fix the offset formula to `(page - 1) * PER` and fix the next button so it increments page by 1. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 2
On blog.html, clicking the ♡ like button runs `list[n].likes = list[n].likes + '1'`, appending the character '1' as a string instead of incrementing numerically. Fix `like()` to add 1 numerically. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 3
On blog.html, `search()` filters with `idx > 0 && ...`, always excluding the first post in POSTS from search results. Remove that guard. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 4
On contact.html, the 'Send message' button calls `cform.reset()` and 'Clear' calls `sendForm()` — swapped. Fix each button's onclick so it matches its label. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 5
On contact.html, posts load from `localStorage.getItem('threads')` but save to `localStorage.setItem('thread', ...)` — mismatched key. Fix the key so it's consistent. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 6
In js/globals.js, `escapeHtml`, `sanitize`, and `isSafeHtml` are no-ops, so contact.html's forum renders raw user HTML. Fix `escapeHtml` to actually escape `< > & " '`. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 7
On tools.html, `bmi()` labels `b > 25` as '(healthy)' and otherwise '(overweight)' — backwards. Fix the condition/labels. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 8
On tools.html, both `tipcalc()` and `conv()` do arithmetic directly on string input values (bill, tip, ppl, amt), producing string concatenation or NaN. Fix both to parse inputs with parseFloat before calculating. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 9
On tools.html, `pwgen()` always generates a fixed 8-char password from a 6-character set, ignoring the `plen` state bound to the length input. Fix it to generate `plen` characters from a proper mixed character set. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 10
On tools.html, `age()` computes `new Date().getYear() - d.getYear()`, using deprecated, unreliable getYear(). Fix it to use getFullYear() and account for whether the birthday has occurred yet this year. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 11
In css/style.css, `*:focus, *:focus-visible { outline: none !important; }` removes keyboard focus indicators on all five pages. Remove this rule or replace it with a visible focus style. Keep the existing UI/UX and styling otherwise — fix only this specific issue.

## User Prompt 12
On index.html, the hero's primary CTA ('Start building for free') has `onclick=""` and does nothing. Give it a working action (e.g. link to signup or contact.html). Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 13
On index.html, the live counter does `total = total + o.amount` (a Number) then calls `total.substr(0,9)` — substr doesn't exist on numbers, so this throws. Fix it to build the display string correctly, converting to a string first. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 14
On index.html, a pricing-section card's badge and heading both just say 'Ready' with no real content. Replace with real copy that fits the existing card design. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 15
On admin.html, `if (pw == SITE.adminPassword || pw == null)` logs in on Cancel (null) as well as the correct password. Fix the condition so only a correct password grants access. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 16
On admin.html, `qty` is a running numeric total, but the stat card renders `qty.length` (numbers have no .length). Fix it to display `qty` directly or use the existing `itemsSold` variable. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 17
On admin.html, `renderTable()` starts its loop at r=1 assuming index 0 is a header, but ORDERS[0] is a real order. Fix the loop to start at 0, and remove the matching +1 offset in `del()`. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 18
On admin.html, `sortOrders()` compares `a.amount > b.amount` as strings, sorting lexicographically. Fix it to compare as numbers. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 19
On admin.html, the '#rev' and '#avg' cards use `revenue` (parseInt, drops decimals) instead of the already-computed `totalRevenue`/`avgOrder` (parseFloat). Switch the displayed figures to use those. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 20
On admin.html, 'paid' orders render red and 'pending' render green — backwards from convention. Swap so 'paid' is green and 'pending' is amber/warning. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 21
On admin.html, `document.write(SITE.apiKey)` renders an API key directly into visible markup. Remove this from client-side code entirely. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 22
js/data.js creates ORDERS_BACKUP and ORDERS_BACKUP_2 as full deep copies of the ~2,000-record ORDERS array via JSON.parse(JSON.stringify(...)), tripling memory/parse cost for backups that are never read. Remove the two unused copies. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 23
In js/main.js, `toggleTheme()` starts with `if (theme = 'light')` — a single `=` assignment, always truthy, so dark mode can never apply. Fix it to compare theme with `==`/`===`. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 24
In js/main.js, a keydown listener calls `e.preventDefault()` whenever `e.key === 'Tab'`, blocking all keyboard tab navigation. Remove this listener. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 25
On js/main.js, the last line calls `document.querySelector('#hero-video').play()`, but no #hero-video element exists in index.html, throwing a TypeError on every load. Remove this line or guard it to only run if the element exists. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 26
None of the five HTML pages declare a character encoding — there's no `<meta charset="UTF-8">` in `<head>`. This causes every emoji and special character (announcement bar, buttons, nav badges, chat widget) to render as garbled mojibake instead of the intended character. Add `<meta charset="UTF-8">` as the first line inside `<head>` on all five pages. Keep the existing UI/UX and styling — fix only this specific issue, don't change any visible text content.

## User Prompt 27
In js/main.js, `writeNav()` loops over `SITE.pages` with `for (i in SITE.pages)`. Because `js/globals.js` adds `Array.prototype.last = function(){...}` as an enumerable property, this `for...in` loop also iterates over that inherited `last` property, rendering an extra nav item that displays as "undefined" and links to "undefined" when clicked. Fix `writeNav()`'s loop to use a standard indexed `for` loop (`for (var i = 0; i < SITE.pages.length; i++)`) instead of `for...in`, so only the real page entries render. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 28
On index.html, the hero heading and subtext sit directly on top of the animated 3D neural-network canvas (`#bg3d`) with no contrast treatment, making the text hard to read against the moving orbs and connecting lines behind it. Add a subtle text-shadow, background scrim, or reduced canvas opacity behind the heading so the text stays clearly legible over the animation. Keep the existing UI/UX and styling — fix only this specific legibility issue, don't remove the 3D background.

## User Prompt 29
On index.html, the `.sub` paragraph (the typewriter subtitle under the hero heading) isn't constrained to a readable width and wraps character-by-character down a narrow vertical column, overlapping the CTA buttons and other hero elements instead of flowing as normal centered paragraph text. Fix the `.sub` element's width/max-width and text wrapping so it displays as a normal, centered paragraph at its intended width. Keep the existing UI/UX and styling — fix only this specific issue.

## User Prompt 30
On the shared navigation (writeNav() in js/main.js), the theme-toggle icon, auth button, and 'Get started' button wrap below the main nav links instead of staying on one row, and this wrapped row overlaps the content underneath. Fix the nav layout so all items stay on a single row without wrapping/overlapping. Don't change any cursor styling — if the duck-emoji cursor in css/style.css was altered by a previous change, restore it exactly as it was; otherwise leave cursor behavior untouched. Keep the existing UI/UX and styling — fix only this specific overlap issue.

