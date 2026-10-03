import re
p = 'src/data/generator-brands.ts'
t = open(p, encoding='utf-8').read()
fixes = {
  "'$3,769 unit / $4,619 w/ ATS'": "'$3,769 unit / $4,419–$4,619 w/ ATS'",
  "'$4,889 unit / $5,949 w/ ATS'": "'$4,889 unit / $5,709–$5,949 w/ ATS'",
  "'$5,709 unit / $6,769 w/ ATS'": "'$5,709 unit / $6,529–$6,769 w/ ATS'",
  "'$6,309 unit / $7,369 w/ ATS'": "'$6,289–$6,309 unit / $7,129–$7,369 w/ ATS'",
  "'$6,729 unit / $7,789 w/ ATS'": "'$6,729 unit / $7,569–$7,789 w/ ATS'",
  "'$7,159 unit / $8,219 w/ ATS'": "'$7,159 unit / $7,999–$8,219 w/ ATS'",
  "'$8,159 unit / $9,509 w/ ATS'": "'$8,159 unit / $9,349–$9,509 w/ ATS'",
}
for old, new in fixes.items():
    assert old in t, old
    t = t.replace(old, new)
open(p, 'w', encoding='utf-8').write(t)
print('ranges restored:', len(fixes))
