Cutout Poetry Journal Website

How to use:
1. Open index.html in your browser for the homepage.
2. Use poems/index.html, essays/index.html, and exploration/index.html as category landing pages.
3. Open poems/familiar.html for the poem page.
4. Edit the poem words directly in poems/familiar.html.
5. Edit the title text in the .note-top element.
6. Adjust page spacing, animations, and falling-line placement in css/style.css.

File organization:
- poems/ contains the poems landing page and individual poem pages.
- essays/ contains the essays landing page and individual essay pages.
- exploration/ contains the exploration landing page and individual exploration pages.
- exploration/NewMexico/ contains the New Mexico exploration page, source HEIC photos, and converted web images.
- assets/art-history/ contains downloaded artwork images for art history essays.
- assets/vases/ contains homepage vase artwork.
- css/ contains shared styling for the whole site.
- js/ contains shared scripts for the whole site.

Adding new writing:
- Add a new HTML file inside the right category folder.
- Link it from that category's index.html.
- Pages inside category folders should link shared files with ../css/style.css and ../js/script.js.
- Art history essay images should use clear filenames in assets/art-history/.
- Art history essay cards in essays/index.html should link to their full essay pages inside essays/.
- Exploration photo pages should keep browser-ready images in an images/ folder beside that page.

Good places to customize:
- .home-content controls the homepage layout.
- .category-content controls the category landing pages.
- .site-nav controls the folder navigation.
- .poem controls the left text area.
- .cutout controls the magazine cutout look.
- .falling-lines controls the right-side animated line fragments.
- --accent controls the red accent color.

To host it yourself:
Upload the whole folder to Netlify, GitHub Pages, Vercel, or your own web host.
