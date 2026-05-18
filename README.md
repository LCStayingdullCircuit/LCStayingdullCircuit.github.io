# Dull Circuit Notes

Static personal blog for `LCStayingdullCircuit.github.io`.

## Local preview

```powershell
cd C:\Users\22162\LCStayingdullCircuit.github.io
python -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy to GitHub Pages

Create a GitHub repository named `LCStayingdullCircuit.github.io`, then push this folder:

```powershell
git init
git add .
git commit -m "Create personal blog"
git branch -M main
git remote add origin https://github.com/LCStayingdullCircuit/LCStayingdullCircuit.github.io.git
git push -u origin main
```

GitHub Pages will serve the site at:

```text
https://LCStayingdullCircuit.github.io/
```

## Add a post

1. Add a new HTML file under `posts/`.
2. Add its metadata to `assets/js/posts.js`.
3. Link it from `index.html` if you want it displayed in the hand-written homepage list.

