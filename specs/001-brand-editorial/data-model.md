# Brand data

All values are source constants; there is no persistence service.

| Field | Constraint | Consumer |
| --- | --- | --- |
| SITE_NAME | Exactly HomeGeneratorGuide | Logo and metadata |
| TAGLINE | Exactly Power When It Matters Most | Logo, header, footer |
| MISSION | Exact supplied wording, punctuation preserved | Homepage, About, all-page footer |
| EDITORIAL_PROMISE | Exact supplied wording, punctuation preserved | Every HTML page |
| INDEPENDENCE | No affiliation or payments from brands, dealers, installers | Footer and editorial policy |
| REVIEW_STATUS | Licensed electrician review pending | All article metadata and editorial notes |
| ADS_ENABLED | false | Existing advertisement component |
| AUTHOR | Existing real publisher identity; no electrician credentials | Articles and author page |

A completed review requires a real name, verified jurisdiction/license, article-specific scope, and review date. This implementation introduces no completed-review record without that evidence.
