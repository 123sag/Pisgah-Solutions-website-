# Pisgah Solutions Website

Static website for Pisgah Solutions with Supabase-backed contact form and security audit tool.

## Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/123sag/Pisgah-Solutions-website-.git
   cd Pisgah-Solutions-website-
   ```

2. **Create Supabase tables**

   Open [Supabase SQL Editor](https://supabase.com/dashboard/project/kcgnhwfedkmptstfntsd/sql) and run the SQL in `supabase/schema.sql`.

   This creates:
   - `contacts` — contact form submissions
   - `audit_responses` — security assessment results

3. **Run locally**

   Open `index.html` in a browser, or serve with any static server:

   ```bash
   npx serve .
   ```

## Supabase

- **Project URL:** `https://kcgnhwfedkmptstfntsd.supabase.co`
- **Client key:** publishable key (safe for browser use, configured in `index.html`)
- **Secret key:** server-side only — never commit or embed in frontend code

## Fork on GitHub

To create your own fork on GitHub, visit the repo and click **Fork**, or install the [GitHub CLI](https://cli.github.com/) and run:

```bash
gh repo fork 123sag/Pisgah-Solutions-website-
```
