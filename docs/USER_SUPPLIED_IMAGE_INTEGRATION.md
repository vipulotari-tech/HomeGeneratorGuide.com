# User-supplied editorial imagery integration

The user supplied ten JPEG images for HomeGeneratorGuide. Ten optimized WebP files
(approximately 2 MB combined) are now **committed to this Git repository** under
`public/images/user-editorial/`. During every build the local files are verified
against their pinned SHA-256 values. There are **no build-time image downloads**. The
rural-context photo is retained in the repo for reference but is not published as
an actual generator installation.

Image placements are intentionally visual-only. Existing title/meta description,
canonical, sitemap, robots, JSON-LD, headings, source dates, article prose and URLs
are unchanged. The homepage hero image is replaced and eight topic images are
inserted on existing pages with accurate, illustrated-scene captions.

The rural utility enclosure image remains in the approved asset inventory but is
not inserted in an article: visually it is not reliable evidence of a standby
generator or propane installation.

## Offline build integrity

All ten binary files are vendored and verified against their SHA-256 digests by
`tools/sync-user-editorial-images.mjs` on **staging and production** builds.
Missing, modified or excessively large images fail the build. The previous
external cloud archive is not used and can expire without breaking deployments.

The staging build still emits `noindex, nofollow` and does not publish a sitemap.
