# GitHub Pages Setup — one-time steps

Same workflow as the Apex Elite Plumbing site: push to GitHub, and a GitHub Actions
workflow automatically builds and publishes it — no Vercel, no separate hosting
account needed.

This assumes your repo will be **https://github.com/versatile-canada/versatile-agency**
and the live site will be **https://versatile-canada.github.io/versatile-agency/**.

**If you use a different GitHub username/org or repo name**, update these three spots
to match before deploying:
- `vite.config.js` → the `base:` value
- `deploy.bat` → the two URLs printed at the end
- The `git remote add origin ...` command below

## 0. Unblock the .bat files (do this first, once)

Because `apply-update.bat` and `deploy.bat` were downloaded from a browser, Windows
marks them "from the internet" and shows a "publisher could not be verified" warning
the first time you run them. Worse, when that warning appears while you're
**drag-and-dropping a file** onto `apply-update.bat`, Windows can lose the file you
dropped — the script then runs with nothing attached (it now falls back to a file
picker if that happens, but unblocking avoids the extra prompt entirely).

1. Right-click **`apply-update.bat`** → **Properties**
2. At the bottom of the **General** tab, check the **Unblock** checkbox (only appears
   if the file is actually blocked)
3. Click **Apply** → **OK**
4. Repeat for **`deploy.bat`**

## 1. Make sure the GitHub repo exists

1. Go to **https://github.com/new**
2. Repository name: `versatile-agency` (or your choice — see the note above if different)
3. Choose **Public** (so GitHub Pages can serve it on the free tier) or **Private** with GitHub Pro/Team
4. **Do NOT** check "Add a README" — this project already has one
5. Click **Create repository**

## 2. Push this project to GitHub

Open Command Prompt inside this project folder and run, once:

```bat
git init
git branch -M main
git remote add origin https://github.com/versatile-canada/versatile-agency.git
git add -A
git commit -m "Initial commit"
git push -u origin main
```

(Skip `git remote add origin ...` if it says the remote already exists.)

If `git push` asks for a username/password: GitHub no longer accepts your account
password here. Use a **Personal Access Token** instead:

1. Go to **https://github.com/settings/tokens** → **Generate new token (classic)**
2. Check the **repo** scope, generate it, and copy it
3. When prompted: username = your GitHub username, password = paste the token

Windows will remember this after the first successful push.

## 3. Turn on GitHub Pages "via GitHub Actions"

1. Go to **https://github.com/versatile-canada/versatile-agency/settings/pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not "Deploy from a branch")

The workflow file is already included at `.github/workflows/deploy.yml` and runs
automatically on every push to `main`.

**Important:** the workflow file has to exist in the repo *before* Pages can find and
run it. If you ever see a `Site not found` / 404 page, check
**https://github.com/versatile-canada/versatile-agency/tree/main/.github/workflows**
to confirm `deploy.yml` is actually there with real content — if it's missing or
empty, re-add it (see the file in this project) and commit again.

## 4. Deploy

From now on, just double-click **`deploy.bat`**. It will:
1. Commit and push your changes to GitHub
2. Print a link to watch the build
3. Once that build shows a green checkmark, your changes are live

A build typically takes 1–2 minutes. Hard refresh with **Ctrl+Shift+R** if your
browser shows an old cached version.

## Updating files first

To pull in a new `.zip` export before deploying, drag it onto **`apply-update.bat`**
first (updates your local files and lets you preview at `localhost:5174`), then run
**`deploy.bat`** to publish it.
