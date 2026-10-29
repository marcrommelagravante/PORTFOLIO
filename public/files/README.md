# Public Files Directory

Place downloadable static files (such as your approved PDF résumé) in this directory.

## Adding Your Résumé

1. Place your real résumé PDF here (for example, `public/files/resume.pdf`).
2. Update `resumeUrl` in `src/content/site.ts` to `"/files/resume.pdf"`.
3. The **Download résumé** button will automatically appear once `resumeUrl` is configured.

> **Template Rule:** Do not commit a fake or sample résumé that could be mistaken for real credentials. Leave `resumeUrl` empty (`""` or `undefined`) until your real file is added.
