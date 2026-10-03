# Validation guide

1. Run `npm.cmd run build` and `npm.cmd run typecheck` from the project root.
2. Run `python tools/qa-brand.py` using the installed workspace Python with the existing QA/browser dependencies.
3. Run the existing schema and link checks against the built output.
4. Start `npm.cmd run dev -- --host 127.0.0.1 --port 8321`.
5. Check homepage and article at 320px, 390px, and 1440px: no overflow; logo/tagline fit; mobile menu opens/closes and Escape returns focus.
6. Inspect /about/, /editorial-policy/, /affiliate-disclosure/, /privacy-policy/, /404, and /500.html. Exact mission/promise and pending status must agree.
7. Inspect favicon at 16px and logo at its natural size. Source SVG exports must use supplied navy and clear house/bolt shapes.

Browser screenshots and logs stay in the workspace QA artifact directory. These checks verify implementation and never imply licensed professional review of existing technical content.
