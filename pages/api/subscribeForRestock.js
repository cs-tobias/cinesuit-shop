// pages/api/subscribeForRestock.js
export default async function handler(req, res) {
  const { email } = req.body; // Removed productHandle as it's no longer needed
  const RESTOCK_FORM_ID = process.env.CONVERTKIT_RESTOCK_FORM_ID; // Ensure you have this in your .env

  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${RESTOCK_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        email,
        api_key: process.env.CONVERTKIT_API_KEY,
      }),
    });

    // Await the JSON response to ensure we can parse it correctly
    const data = await response.json();

    if (response.ok) {
      // Send back the success message from the ConvertKit response or a custom message
      return res.status(200).json({ message: "You've been added to the waitlist!" });
    } else {
      // Use the message from ConvertKit's response if available, else a generic error message
      const message = data.error ? data.error.message : "There was a problem with your request.";
      return res.status(response.status).json({ message });
    }
  } catch (error) {
    console.error("Error in /api/subscribeForRestock:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
