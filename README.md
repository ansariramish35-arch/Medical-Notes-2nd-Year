# Medical Notes 2nd Year

MedMaster Notes — a university-focused medical notes, question-bank, revision, atlas, self-test and viva platform.

## Stack

- Next.js
- React
- TypeScript
- Drizzle ORM
- PostgreSQL

## Run locally

```bash
npm install
DATABASE_URL=postgresql://... npm run dev
```

The application uses PostgreSQL for the question bank and progress tracking, so it requires a server-capable deployment. GitHub Pages is not suitable for this application because it only serves static files.
