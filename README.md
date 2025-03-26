# Main Bootstrap Theme for Hugo

This is a reusable **Bootstrap-ready Hugo theme**, designed to give your static site instant access to Bootstrap styles, utility JS, and helpful templates.

It includes:

- **Assets** – SCSS files including Bootstrap + customizable overrides  
- **Templates** – A library of partials to drop into your layouts  
- **JS** – Modular JavaScript (ES Modules) for tracking, consent, and general utilities  

---

## Prerequisites

- **Hugo extended** ≥ `0.145.0`
- **Node.js + npm** (for building assets with Webpack)

---

## Getting Started
There are a number of steps for you to complete to import this into your hugo website.
### 1. Integrate the repo into your project
```bash
    git submodule add https://github.com/J-Morgan-Consulting/gohugo-theme-bootstrap.git themes/bootstrap
```

### 2. Set Up Webpack Build (from Theme)
Copy build-related files into your project root:
```bash
cp themes/bootstrap/build/webpack.config.js .
cp themes/bootstrap/build/package.template.json .
```
Then:
```bash
# Merge package.template.json into your root package.json
npm install
npm run build
```
### 3. Configure Site Settings
You have two options:
**Option A: Use Settings Page**
- Copy everything from ```themes/bootstrap/content/settings/``` into your root ```content/settings/```
- Edit the front matter (```ldjson```, ```contactForm```, etc.) to reflect your business details

**Option B: Disable Structured Data**
Set this in your config:
```toml
[params.bootstrap]
ldjson = false
```

### 4. Customize Fonts
- Add fonts to ```/themes/bootstrap/static/webfonts```
- Modify font settings in ```/themes/bootstrap/assets/sass/core/_global.scss```

### 5. Adjust Bootstrap Variables
For color and general overrides, edit:
- ```/themes/bootstrap/assets/sass/_variables-colors-overrides.scss```
- ```/themes/bootstrap/assets/sass/_variables-overrides.scss```

### 6. Build Your Templates & Content
Continue building your Hugo site in the root project directory:
- Layouts
- Pages

---
## Other Notes
- The theme supports theme stacking – you can layer another override theme on top.
- All reusable components are modular and overridable from the root project.