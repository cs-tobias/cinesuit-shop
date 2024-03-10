//ConvertkitCustomMessageSubscribe.js
export default async function handler(req, res) {
  const { email, message } = req.body; // Change 'Lensrequest' to 'message'

  // Ensure both email and message are present
  if (!email || !message) {
    return res.status(400).json({ message: "Email and message are required." });
  }

  // Simplified logic to subscribe to ConvertKit
  const response = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CUSTOM_MESSAGE_FORM_ID}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.CONVERTKIT_API_KEY,
      email,
      fields: { messagecustom: message }, // Use 'messagecustom' to match ConvertKit
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("ConvertKit error:", data);
    return res.status(500).json({ message: "There was an issue with ConvertKit.", details: data });
  }

  return res.status(200).json({ message: "Success" });
}