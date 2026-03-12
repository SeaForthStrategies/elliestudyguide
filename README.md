# Chemistry 103 Study Hub

Static single-user study site built with plain HTML/CSS/JS.

## Local run

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Deploy on Vercel

### Option A: Vercel dashboard (recommended)
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, click **Add New Project**.
3. Import the repository.
4. Framework preset: **Other**.
5. Build command: *(leave empty)*.
6. Output directory: *(leave empty / root)*.
7. Deploy.

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```

The included `vercel.json` configures clean URLs and basic security headers.

## Notes
- No backend or database required.
- Progress is saved in browser `localStorage` for one user on one device.
