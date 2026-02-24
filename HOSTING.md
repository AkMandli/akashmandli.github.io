# 🚀 GitHub Pages Hosting Guide
## Akash Mandli Portfolio — Deploy in 15 Minutes

---

## 📁 YOUR FILE STRUCTURE

Make sure your files are organized exactly like this:

```
portfolio/
├── index.html      ← Main website file
├── styles.css      ← All styling
├── script.js       ← Animations & interactions
└── HOSTING.md      ← This guide (optional, can delete)
```

When you want to add your resume PDF later:
```
portfolio/
├── index.html
├── styles.css
├── script.js
└── resume-akash-mandli.pdf    ← Add this
```

---

## STEP 1 — Create a GitHub Account

1. Go to https://github.com
2. Click **Sign Up**
3. Use your email: mandliakash@gmail.com
4. Choose a username — recommended: `akashmandli` or `akash-mandli`
5. Verify your email address

---

## STEP 2 — Create Your Repository

1. After logging in, click the **+** icon (top right) → **New repository**
2. Fill in the form:
   - **Repository name:** `akashmandli.github.io`
     ⚠️ IMPORTANT: The name MUST follow this exact format: `yourusername.github.io`
     Example: if your GitHub username is `akashmandli`, the repo name is `akashmandli.github.io`
   - **Description:** My personal portfolio website
   - **Visibility:** ✅ Public (required for free GitHub Pages)
   - **Add README:** Leave unchecked
3. Click **Create repository**

---

## STEP 3 — Upload Your Files

### Option A — Using GitHub Web (Easiest, No Terminal)

1. Inside your new repository, click **uploading an existing file** (or drag & drop)
2. Drag all 3 files into the upload area:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Scroll down to **Commit changes**
4. Add message: `Initial portfolio upload`
5. Click **Commit changes** (green button)

### Option B — Using Git Terminal (If You Have Git Installed)

Open your terminal / command prompt and run:

```bash
# Navigate to your portfolio folder
cd path/to/portfolio

# Initialize git
git init

# Add GitHub remote (replace USERNAME with your actual GitHub username)
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git

# Add all files
git add .

# Commit
git commit -m "Initial portfolio launch"

# Push to GitHub
git push -u origin main
```

---

## STEP 4 — Enable GitHub Pages

1. In your repository, click **Settings** (top tab)
2. In the left sidebar, scroll to **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 2–3 minutes ⏳

---

## STEP 5 — Visit Your Live Website

Your portfolio is now live at:
**https://akashmandli.github.io**

(Replace `akashmandli` with your actual GitHub username)

GitHub will show you the URL in the Pages settings once it's ready.

---

## 🔧 MAKING UPDATES LATER

Every time you change something:

### Via GitHub Web:
1. Go to your repository
2. Click the file you want to edit (e.g., `index.html`)
3. Click the pencil ✏️ icon (top right of file)
4. Make your changes
5. Click **Commit changes**
6. Wait 1–2 minutes, then refresh your live site

### Via Git Terminal:
```bash
git add .
git commit -m "Updated about section"
git push
```

---

## 🌐 ADDING A CUSTOM DOMAIN (Optional — Future Step)

To use `akashmandli.com` instead of `akashmandli.github.io`:

1. Buy domain from: GoDaddy, Namecheap, or Google Domains (~₹800–1200/year)
2. In repo Settings → Pages → Custom domain: enter your domain
3. In your domain registrar's DNS settings, add these records:
   ```
   Type: A    Name: @    Value: 185.199.108.153
   Type: A    Name: @    Value: 185.199.109.153
   Type: A    Name: @    Value: 185.199.110.153
   Type: A    Name: @    Value: 185.199.111.153
   Type: CNAME  Name: www  Value: akashmandli.github.io
   ```
4. Wait 24–48 hours for DNS propagation

---

## 📧 MAKING THE CONTACT FORM WORK

The contact form currently has a simulated response. To make it actually send emails:

### Using Formspree (Free, No Backend Needed):

1. Go to https://formspree.io
2. Sign up with your email
3. Click **New Form** → get your form endpoint (looks like: `https://formspree.io/f/xabcdefg`)
4. In `index.html`, find the `<form>` tag and change it to:
   ```html
   <form class="contact__form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. In `script.js`, find the form submit handler and replace the setTimeout simulation with:
   ```javascript
   contactForm.addEventListener('submit', async (e) => {
     e.preventDefault();
     const btn = contactForm.querySelector('.btn--primary');
     btn.textContent = 'Sending...';
     
     const response = await fetch(contactForm.action, {
       method: 'POST',
       body: new FormData(contactForm),
       headers: { 'Accept': 'application/json' }
     });
     
     if (response.ok) {
       btn.textContent = '✓ Message Sent!';
       contactForm.reset();
     } else {
       btn.textContent = 'Error. Try again.';
     }
   });
   ```

---

## 📸 ADDING YOUR PHOTO

Currently the site shows your initials "AM" as a placeholder.

To add your actual photo:

1. Prepare a square photo (recommended: 400x400px, `.jpg` or `.webp`)
2. Name it: `akash-photo.jpg`
3. Upload it to your GitHub repository
4. In `index.html`, find the `about__photo-placeholder` div and replace the `about__initials` div with:
   ```html
   <img src="akash-photo.jpg" alt="Akash Mandli" style="width:90px; height:90px; border-radius:50%; object-fit:cover; border: 2px solid rgba(0, 201, 177, 0.3);" />
   ```

---

## ✅ LAUNCH CHECKLIST

Before sharing your portfolio link, verify:

- [ ] Website loads correctly: https://yourusername.github.io
- [ ] Navigation scrolls to correct sections
- [ ] Mobile view looks good (test on your phone)
- [ ] Your name and LinkedIn URL are correct
- [ ] Email address is correct (mandliakash@gmail.com)
- [ ] Phone number is correct (+91-8866905830)
- [ ] Resume PDF uploaded and download button works
- [ ] Contact form tested (submit and check your email)
- [ ] No broken images or missing fonts

---

## 🆘 TROUBLESHOOTING

**Site shows 404 error:**
- Ensure the repository name is exactly `yourusername.github.io`
- Wait 5–10 minutes after enabling Pages

**Styles not loading:**
- Ensure `styles.css` is in the same folder as `index.html`
- Check capitalization — file names are case-sensitive

**Changes not showing:**
- Hard refresh your browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- GitHub Pages can take 1–5 minutes to update

**Form not submitting:**
- Set up Formspree as described above

---

## 📞 NEXT STEPS AFTER LAUNCH

1. Add the URL to your LinkedIn profile (Edit → Contact Info → Website)
2. Add to your email signature
3. Share with 3–5 trusted connections for feedback first
4. Start collecting LinkedIn recommendations (focus on pre-sales + documentation work)
5. Build your 3 case study pages (Claude will help you with this)

---

*Built for Akash Mandli | Portfolio v1.0 | 2025*
