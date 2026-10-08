# User-supplied editorial imagery integration

The user supplied ten JPEG images for HomeGeneratorGuide. A previously prepared ZIP
contains ten optimized WebP files (approximately 2 MB combined). The source was
checked against its SHA-256 digest before integration. The build downloads this
immutable archive, verifies the entire ZIP and each WebP, then copies **only the
listed assets** into the static site. It **does not run code inside the ZIP**.

Image placements are intentionally visual-only. Existing title/meta description,
canonical, sitemap, robots, JSON-LD, headings, source dates, article prose and URLs
are unchanged. The homepage hero image is replaced and eight topic images are
inserted on existing pages with accurate, illustrated-scene captions.

The rural utility enclosure image remains in the approved asset inventory but is
not inserted in an article: visually it is not reliable evidence of a standby
generator or propane installation.

## Important availability note

The ZIP is referenced by an external, pinned URL because this GitHub integration
cannot transmit binary blobs directly. The build FAILS CLOSED if the source is
unavailable or does not match the digest. For permanent reproducibility the ten
WebP files should eventually be committed directly to
`public/images/user-editorial/` in a follow-up authorized binary-upload workflow.
A local developer can extract the previously supplied ZIP into the same folder;
the synchronizer detects and verifies all ten files and then works offline.

The staging build continues to output noindex/no sitemap as before.
