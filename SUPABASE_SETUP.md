# Supabase Setup — Global Resume Upload

This portfolio is already coded so **Admin → Resume → Upload & Publish Resume** can publish a new PDF for every visitor.

The only remaining step is connecting your own Supabase project.

## 1. Create a Supabase project

Create a free project at Supabase.

From **Project Settings → API Keys**, copy only:

- Project URL
- Publishable key (or legacy anon key)

Never place a secret key or service-role key in this React project.

## 2. Add the public client configuration

Open `.env` in the project root and fill:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
VITE_RESUME_BUCKET=resumes
```

Keep your existing `VITE_WEB3FORMS_ACCESS_KEY` unchanged.

## 3. Create the public Storage bucket

In Supabase:

1. Open **Storage**.
2. Create a bucket named `resumes`.
3. Make the bucket **Public**.
4. Set a file-size limit of at least 10 MB.
5. If MIME restrictions are enabled, allow `application/pdf` and `application/json`.

The portfolio uploads timestamped PDF files and a small `latest.json` file. `latest.json` tells visitors which PDF is the newest resume.

## 4. Create your Admin user

Go to **Authentication → Users** and create one user for yourself with your admin email and a strong password.

There is no public signup page in this portfolio.

## 5. Add Storage policies

Resume storage policies are already configured in Supabase. Upload, update, and metadata access are restricted to authenticated portfolio admins using is_portfolio_admin(). The bucket is public only so visitors can download the published resume by its URL. Do not add broad policies for all authenticated users.

## 6. Test locally

Run:

```bash
npm run dev
```

Then:

1. Open the Admin Login page.
2. Sign in with the Supabase user you created.
3. Open **Resume**.
4. Choose a PDF.
5. Click **Upload & Publish Resume**.
6. Open the public Resume page and click **Download Resume**.

## 7. Deploy to GitHub Pages

Because Vite environment variables are bundled at build time, deploy again after adding the Supabase values:

```bash
git add .
git commit -m "Add new portfolio theme and global resume publishing"
git push
npm run deploy
```

After Supabase is configured, future resume uploads from the Admin Dashboard do **not** require another GitHub Pages deployment.
