<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/731b3bf2-5d1a-4de9-898e-dc10def82009

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set `VITE_GEMINI_API_KEY` or `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. For GitHub Pages project deployment, keep `VITE_BASE_PATH=/MyPortofolio/` in `.env.local` or rely on the production default
4. Run the app:
   `npm run dev`
