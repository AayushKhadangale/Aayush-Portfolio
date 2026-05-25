Live Portfolio :- https://aayush-portfolio-ruby.vercel.app
# 🚀 Premium Developer Portfolio

A clean, elegant, soothing, and modern personal portfolio website built with pure HTML, CSS, and JavaScript — no frameworks, no backend.

---

## 📁 Folder Structure

```
portfolio/
├── index.html          ← Main HTML (all sections)
├── css/
│   └── style.css       ← All styles, themes, animations
├── js/
│   └── main.js         ← All interactions & animations
├── assets/
│   ├── resume.pdf      ← Your resume (add this file)
│   └── photo.jpg       ← Your photo (optional)
└── README.md           ← This guide
```

---

## ⚡ Quick Start (Run Locally)

### Option 1 — VS Code Live Server (Recommended)
1. Install VS Code → https://code.visualstudio.com
2. Install the "Live Server" extension (by Ritwick Dey)
3. Open the `portfolio/` folder in VS Code
4. Right-click `index.html` → **Open with Live Server**
5. Browser opens at `http://127.0.0.1:5500`

### Option 2 — Python (No Install)
```bash
cd portfolio
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option 3 — Node.js
```bash
npx serve portfolio
```

### Option 4 — Just double-click
Open `index.html` directly in your browser.
(Particles and some effects work best via a server.)

---

## ✏️ How to Customise Content

### 🧑 Your Name & Bio
Open `index.html` and find/replace:

| Placeholder        | What to change                            |
|--------------------|-------------------------------------------|
| `Your Name`        | Your full name                            |
| `yourusername`     | Your GitHub & LinkedIn username           |
| `yourmail@example.com` | Your email address                   |
| `YN.`              | Your initials (navbar logo)               |

### 🖊️ Typed Phrases
In `js/main.js`, find the `phrases` array (line ~90):
```js
const phrases = [
  'Full Stack Developer',   // ← Change these
  'Java Engineer',
  'Spring Boot Specialist',
  // Add more...
];
```

### 🛠️ Skills
In `index.html`, inside the Skills section, edit:
- `data-width="90"` → skill level (0–100)
- Label text (`Java`, `CSS`, etc.)

### 📋 Experience & Projects
Scroll to the `<!-- EXPERIENCE TIMELINE -->` and `<!-- PROJECTS -->` sections in `index.html` and update the text, dates, and tech tags.

### 🎓 Certifications
Edit the `.cert-card` blocks in the Certifications section.

### 📊 GitHub Stats
Replace `yourusername` in the `src` attributes of the `<img>` tags in the GitHub section:
```html
src="https://github-readme-stats.vercel.app/api?username=YOUR_GITHUB_USERNAME&..."
```

---

## 🖼️ Adding Your Photo

Replace the placeholder block in the About section:
```html
<!-- BEFORE (placeholder) -->
<div class="about__avatar-placeholder">...</div>

<!-- AFTER (your photo) -->
<img src="assets/photo.jpg" alt="Your Name" />
```
Save your photo as `assets/photo.jpg` (ideally 400×400px, square).

---

## 📄 Resume Download
Save your resume as `assets/resume.pdf`.
The Download button in the navbar links to it automatically.

---

## 📧 Activating the Contact Form

By default the form shows a simulated "sent" message.
To receive real emails:

1. Go to **https://formspree.io** and sign up free
2. Create a new form → copy your endpoint (e.g. `https://formspree.io/f/abcdefgh`)
3. In `js/main.js`, find the comment `HOW TO ACTIVATE REAL EMAILS` and:
   - Set `const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_ID'`
   - Uncomment the `fetch` block
   - Delete the `setTimeout` simulation block

---

## 🎨 Changing Colours / Fonts

### Colours
Edit the CSS variables at the top of `css/style.css`:
```css
:root {
  --accent:   #7aa2f7;   /* Main accent colour (calm blue)   */
  --accent-2: #bb9af7;   /* Secondary accent (soft violet)   */
  --accent-3: #7dcfff;   /* Tertiary accent (sky blue)       */
  --bg-base:  #0a0c12;   /* Page background                  */
}
```

For the **light theme**, edit the `[data-theme="light"]` block lower in `style.css`.

### Fonts
The portfolio uses **Syne** (headings) and **DM Sans** (body).
To change them:
1. Pick a pair from https://fonts.google.com
2. Update the `<link>` tag in `index.html`
3. Update `--font-display` and `--font-body` in `style.css`

---

## 📱 Responsive Design

The layout is mobile-first and fully responsive:
- **Desktop** (>860px): full split layouts, side-by-side grids
- **Tablet** (~640–860px): stacked sections, visible hamburger menu
- **Mobile** (<640px): single column, touch-optimised

---

## 🌐 Deployment

### GitHub Pages (Free)
1. Push your `portfolio/` folder to a GitHub repository
2. Go to **Settings → Pages**
3. Under "Source", select `main` branch and `/ (root)`
4. Your site is live at `https://yourusername.github.io/portfolio`

### Netlify (Free, Custom Domain)
**Drag & drop:**
1. Go to https://netlify.com → Log in → "Add new site"
2. Drag and drop your `portfolio/` folder
3. Done! You get a URL like `https://random-name.netlify.app`

**GitHub integration:**
1. Push to GitHub
2. Netlify → "Add new site" → "Import from Git"
3. Connect GitHub → select your repo → Deploy

Both support **custom domains** (e.g. `yourname.dev`) in their free tier.

---

## 📦 Libraries Used (CDN — No Install)

| Library         | Purpose                        | Size  |
|-----------------|--------------------------------|-------|
| AOS 2.3.4       | Scroll-reveal animations       | ~6 KB |
| VanillaTilt 1.8 | 3D card tilt on hover          | ~4 KB |
| Google Fonts    | Syne + DM Sans typography      | ~8 KB |

All loaded via CDN — no npm, no build step.

---

## 🛠️ Section Quick Reference

| Section         | HTML id             | Customise                        |
|-----------------|---------------------|----------------------------------|
| Hero            | `#hero`             | Name, bio, typed phrases, socials|
| About           | `#about`            | Photo, highlights, stats         |
| Skills          | `#skills`           | Skill names & levels (0–100)     |
| Experience      | `#experience`       | Jobs/education, dates, tags      |
| Projects        | `#projects`         | Project cards, links, tags       |
| Certifications  | `#certifications`   | Cert name, issuer, date, link    |
| GitHub          | `#github`           | Replace `yourusername`           |
| Contact         | `#contact`          | Email, city, form endpoint       |

---

## ✅ Checklist Before Going Live

- [ ] Replace all `yourusername` with your GitHub/LinkedIn handle
- [ ] Replace `yourmail@example.com` with your real email
- [ ] Replace `Your Name` with your real name
- [ ] Replace `YN.` with your real initials
- [ ] Add `assets/resume.pdf`
- [ ] Add `assets/photo.jpg`
- [ ] Update typed phrases in `main.js`
- [ ] Update GitHub stats URLs
- [ ] Test on mobile
- [ ] (Optional) Connect Formspree for the contact form

---

## 💡 Tips

- Use **Ctrl+F** in your code editor to find `yourusername` / `Your Name` and replace all at once
- The `<!-- ═══ SECTION NAME ═══ -->` comments make navigation easy
- Inline comments in `style.css` and `main.js` explain every major block
- Add `loading="lazy"` to any additional images you add
- Test both dark and light themes after customisation

---

Made with ♥ — Pure HTML, CSS & JS. No frameworks. No build step. Free forever.
