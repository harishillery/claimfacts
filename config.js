/* ============================================================
   ClaimFacts — configuration
   THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Every page reads from it.
   ============================================================ */

window.CLAIMFACTS = {

  // Where booking requests go.
  email: "harishillery@gmail.com",

  // Kit landing page for the newsletter. Every "Subscribe" button on the site
  // opens this page. Leave blank and the buttons email a subscribe request
  // to the address above instead.
  kitLandingPage: "https://haris-23.kit.com/119349074f",

  // Optional. Paste a Formspree endpoint to have submissions land in your
  // inbox silently. Leave blank and the form opens the visitor's email app
  // with everything pre-filled — works today, no account needed.
  formEndpoint: "",

  // Stripe Payment Links. Paste the https://buy.stripe.com/... URL for each.
  // Any left blank simply sends the visitor to the contact form instead,
  // so the site works before Stripe is set up.
  stripe: {
    claimReview:   "https://buy.stripe.com/cNi14p528ezZ1O11As3sI00",   // $500     one-time
    diagnostic:    "https://buy.stripe.com/bJe7sN8ek0J9gIV1As3sI01",   // $3,500   one-time
    standing:      "https://buy.stripe.com/8x228tcuA4ZpgIVcf63sI03",   // $2,000   per month
    scale:         "https://buy.stripe.com/eVqbJ30LS1NdfER7YQ3sI04",   // $7,000   per month
    portfolio:     "https://buy.stripe.com/6oU00lgKQezZcsFene3sI05",   // $10,000  per month
    reinstatement: "https://buy.stripe.com/28E28t9io4ZpcsF1As3sI02"    // $4,500   one-time
  }

};
