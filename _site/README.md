# PhD Student Portfolio

A Jekyll-based academic portfolio website designed for PhD students to showcase their research, publications, and other interests.

## Features

- Responsive, minimalist design
- Publication list managed through YAML data files
- CV/Resume page with downloadable PDF
- News/updates section
- Additional content area (e.g., for blog posts, projects, favorite albums)

## Local Development

### Prerequisites

- Ruby (version 2.5.0 or higher)
- RubyGems
- GCC and Make

### Setup

1. Install Jekyll and Bundler:
   ```
   gem install jekyll bundler
   ```

2. Install dependencies:
   ```
   bundle install
   ```

3. Start the local server:
   ```
   bundle exec jekyll serve
   ```

4. Open your browser and visit: `http://localhost:4000`

## Customization

### Site Configuration

Edit `_config.yml` to update:
- Site title and description
- Contact information
- Social media usernames
- Other Jekyll settings

### Content

- **Home**: Edit `index.md` to update your bio and profile information
- **Publications**: Add your publications to `_data/publications.yml`
- **CV**: Update `cv.md` with your education and skills, and add your CV PDF to the `files` directory
- **News**: Add news items as markdown files in the `_news` directory
- **Other**: Update `other.md` and add your favorite albums to `_data/albums.yml`

### Styling

Modify `assets/css/styles.css` to customize the site's appearance.

## Deployment to GitHub Pages

1. Create a GitHub repository with the name `username.github.io` (where `username` is your GitHub username)

2. Update your `_config.yml`:
   ```yaml
   baseurl: "" # Keep empty for user sites
   url: "https://username.github.io" # Replace with your GitHub Pages URL
   ```

3. Push your code to GitHub:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main
   ```

4. Configure GitHub Pages in the repository settings to build from the main branch

## License

This project is open source and available under the [MIT License](LICENSE).