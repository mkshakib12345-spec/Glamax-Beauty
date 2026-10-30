# Glamax Beauty — Demo Storefront

A responsive static e-commerce demo made with HTML, CSS and vanilla JavaScript. It is ready to upload to GitHub and deploy as a Render Static Site.

## Run locally
Open `index.html` in a browser. No build step or package installation is required.

## Deploy with GitHub + Render
1. Create a new GitHub repository, for example `glamax-beauty`.
2. Upload all files and folders in this project to the repository root (keep `index.html` at the root).
3. In Render, choose **New + → Static Site** and connect the repository.
4. Use the following settings:
   - Build command: leave empty
   - Publish directory: `.`
5. Click **Create Static Site**. Render will publish the website and provide a live URL.

The included `render.yaml` describes the same static-site configuration when using Render Blueprint.

## Before showing the demo
- In `script.js`, replace `WHATSAPP_NUMBER` with the business WhatsApp number, digits only, including country code (Bangladesh: 8801XXXXXXXXX).
- Replace sample product names, prices, categories and image URLs in the `products` array in `script.js`.
- Replace sample brand names and business text in `index.html`.
- Add the real Facebook page, contact details, delivery policy and social links when provided.

## Demo limitations
This is a frontend-only demo. Cart and wishlist are stored in the visitor's browser using localStorage; the cart opens a WhatsApp message to place an enquiry. There is no database, admin dashboard, customer login, payment gateway or order-management backend yet. Product details and discounts are sample content, not verified inventory or offers.
