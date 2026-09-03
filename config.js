/* ============================================================
   ClaimFacts — configuration
   THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Every page reads from it.
   ============================================================ */

window.CLAIMFACTS = {

  // Where booking requests go.
  email: "hello@claimfacts.co",

  // Optional. Paste a Formspree endpoint to have submissions land in your
  // inbox silently. Leave blank and the form opens the visitor's email app
  // with everything pre-filled — works today, no account needed.
  formEndpoint: "",

  // Stripe Payment Links. Paste the https://buy.stripe.com/... URL for each.
  // Any left blank simply sends the visitor to the contact form instead,
  // so the site works before Stripe is set up.
  stripe: {
    claimReview:   "",   // $500     one-time
    diagnostic:    "",   // $3,500   one-time
    standing:      "",   // $2,000   per month
    scale:         "",   // $7,000   per month
    portfolio:     "",   // $10,000  per month
    reinstatement: ""    // $4,500   one-time
  }

};
