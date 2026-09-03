# ClaimFacts — going live today

Four files. Two accounts. Roughly fifteen minutes of actual work.

---

## 0. Add your photo (2 minutes)

Save a headshot as **`haris.jpg`** in the same folder as `index.html`. Square or slightly portrait, at least 600px wide, under about 400KB. It appears twice: small and round beside your name on the home page, and larger on the About page.

If the file is missing the site still works — it falls back to a circle with your initials — but the photo is doing real work here. It's the difference between a page that reads as a person and one that reads as a template.

Good headshot: plain background, natural light, looking at the camera, from the chest up. A phone photo against a blank wall near a window beats anything staged.

---

## 1. Stripe payment links (about 10 minutes)

Stripe has no monthly fee and no setup cost. It takes 2.9% + 30¢ per charge, deducted from the payment — nothing out of pocket.

1. Create an account at stripe.com. Have your bank details ready; payouts need them.
2. In the dashboard, go to **Product catalog → Payment links → New**.
3. Create six links:

| Product name | Price | Type |
|---|---|---|
| Claim Review | $500 | One-time |
| Catalog Diagnostic | $3,500 | One-time |
| Standing Review | $2,000 | Recurring, monthly |
| Scale | $7,000 | Recurring, monthly |
| Portfolio | $10,000 | Recurring, monthly |
| Platform Reinstatement | $4,500 | One-time |

4. On each link, turn on **Collect customer name** and **Collect business address**.
5. Copy each URL. They look like `https://buy.stripe.com/xxxxx`.

**Note:** Stripe may hold your first payout 7–14 days while the account is reviewed. Money arrives, just not instantly.

## 2. Fill in the config block (2 minutes)

Open **`config.js`**. That is the only file you edit — every page reads from it.

```js
window.CLAIMFACTS = {
  email:        "hello@claimfacts.co",
  formEndpoint: "",
  stripe: {
    claimReview:   "",   // $500     one-time
    diagnostic:    "",   // $3,500   one-time
    standing:      "",   // $2,000   per month
    scale:         "",   // $7,000   per month
    portfolio:     "",   // $10,000  per month
    reinstatement: ""    // $4,500   one-time
  }
};
```

Paste your six Stripe URLs and your email address. Any link left blank simply sends the visitor to the contact form, so the site works before Stripe exists.

Leave `formEndpoint` blank and the booking form opens the visitor's email app with everything pre-filled — no account needed. If you'd rather submissions land silently in your inbox, make a free form at formspree.io and paste the endpoint URL there.

## 3. Put it online with Vercel (about 5 minutes)

This is a plain static site — no build step, no framework, no configuration file needed. Vercel will detect "Other" and serve the folder as-is.

**Option A — CLI, fastest if you already have it:**

```bash
cd claimfacts
vercel          # first run: links the project, gives you a preview URL
vercel --prod   # promotes it to the live domain
```

When it asks for the framework preset, choose **Other**. Leave build command and output directory blank.

**Option B — dashboard upload:** go to `vercel.com/new` and drag the `claimfacts` folder onto the page.

**Option C — Git, best long-term:** push the folder to a GitHub repo, then import it at `vercel.com/new`. Every push redeploys automatically, which matters once you're editing copy regularly.

You'll land on something like `claimfacts.vercel.app`. Rename it under **Project Settings → General → Project Name** if the generated name is ugly.

A custom domain is free to attach — Project Settings → Domains — and the domain itself runs about $12/year at Cloudflare or Namecheap. Worth doing before cold outreach, actually: a `.vercel.app` address in a compliance pitch undercuts you slightly. It's the one expense I'd make an exception for.

---

## 4. Test it before you send anything (2 minutes)

- Load the site on your phone. The hero markup should animate.
- Click each pricing button — all three should open Stripe checkout.
- Submit the booking form and confirm it reaches you.
- Open `agreement.html`, fill the bar at the top, hit **Fill agreement**, then print to PDF.
- Open `invoice.html`, generate one, print to PDF.

If checkout works on your phone, you are open for business.

---

## The files

**The site — seven pages plus three shared assets**

| File | What it is |
|---|---|
| `index.html` | Home. Your byline and photo, live specimen, who you work with, how it works. |
| `risk.html` | What a restriction costs, plus the ad-spend calculator. |
| `findings.html` | Eleven phrasings found on almost every page. |
| `pricing.html` | All six products, grouped. |
| `about.html` | Your photo, your story, credentials, and the legal-advice line. |
| `faq.html` | Twelve questions answered. |
| `contact.html` | The free-review form. |
| `styles.css` | Every style, shared. Edit once, changes everywhere. |
| `config.js` | **The only file you need to edit.** |
| `site.js` | Shared behavior. Each block no-ops on pages that don't need it. |

**The paperwork**

| File | What it is |
|---|---|
| `msa.html` | Master services agreement. Signed once with larger clients. |
| `sow.html` | Statement of work. One per engagement, sits under the MSA. |
| `agreement.html` | Simplified single-document agreement for small one-time work. |
| `invoice.html` | Invoice generator. |

**One more file to add**

| File | What it is |
|---|---|
| `haris.jpg` | Your headshot. You supply this — see step 0. |

The claim scanner stays separate — it's your internal tool, not a customer-facing one.

### Which contract to use

- **Under $1,000, one-time** — no contract. Invoice terms are enough. A contract in front of a small purchase gives the buyer something to think about.
- **$1,000–$5,000, one-time** — the simplified `agreement.html`. Covers Claim Review and Catalog Diagnostic.
- **Any retainer, or anything above $5,000** — `msa.html` signed once, then a `sow.html` per engagement. Every retainer tier lands here now, as does Platform Reinstatement. This is the structure procurement expects, and having it ready signals you have done this before.

---

## Order of operations for a real client

1. Run their page through the scanner. Produce the full report.
2. Send the outbound email with the top three findings.
3. They reply. Send the Stripe link and the invoice PDF — plus the MSA and SOW if it's a retainer.
4. They pay. Send the full report.

**Editing copy later:** change the text in the relevant page file, or a style in `styles.css`, commit, and Vercel redeploys in about thirty seconds. Because the nav, footer, and styles are shared files, a change to any of them applies to all seven pages at once.

The Catalog Diagnostic is your main entry product for brands of any size. It goes on a corporate card without procurement getting involved, it produces the document that justifies a retainer, and its fee is credited against the first month if they convert within 30 days.

---

## Month two, funded by the first sales

- **Errors and omissions insurance.** Roughly $1,000–$2,500/year at $1M per claim. Section 10 of the MSA commits you to carrying it — do not sign that document until the policy is in force.
- **LLC registration in California** plus a Santa Clarita business license. The LLC keeps a claim pointed at the company rather than at you personally. Worth doing before the first invoice.
- **Have a lawyer read the MSA.** Sections 3, 11, 12, and 13 carry your risk.
- **Ask your first two clients for permission to use them as references.** Ask while they are pleased with you, not six months later.
