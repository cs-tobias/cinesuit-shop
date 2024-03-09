const API_KEY = process.env.CONVERTKIT_API_KEY;
const FORM_ID_1 = process.env.CONVERTKIT_FORM_ID_1;
const BASE_URL = 'https://api.convertkit.com/v3';
const email_required_message = 'Email is required';
const error_message = `There was a problem, please try again or contact support.`;
const success_message = `You have been added to the wait list! Check your email for more info!`;

async function getTagIdByTitle(productTitle) {
  const tagsResponse = await fetch(`${BASE_URL}/tags?api_key=${API_KEY}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
  const tagsData = await tagsResponse.json();
  // Assuming a naming convention "Product-{handle}"
  // Adjust this logic based on your actual naming convention in ConvertKit
  const tag = tagsData.tags.find(tag => tag.name === `${productTitle}`);
  return tag ? tag.id : null;
}

async function convertkitSubscribeHandler(req, res) {
  const { email, productTitle } = req.body;

  if (!email || !productTitle) {
    return res.status(400).json({ message: email_required_message });
  }

  const tagId = await getTagIdByTitle(productTitle);

  if (!tagId) {
    return res.status(400).json({ message: "Invalid product handle or tag not found" });
  }

  try {
    // Subscribe the user to the form/list
    const subscribeData = {
      api_key: API_KEY,
      email: email,
    };
    const subscribeUrl = `${BASE_URL}/forms/${FORM_ID_1}/subscribe`;

    let subscribeResponse = await fetch(subscribeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(subscribeData),
    });

    if (!subscribeResponse.ok) {
      return res.status(500).json({ message: error_message });
    }

    // Then, apply the tag to the subscriber
    const taggingData = {
      api_key: API_KEY,
      email: email,
    };
    const taggingUrl = `${BASE_URL}/tags/${tagId}/subscribe`;

    let tagResponse = await fetch(taggingUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(taggingData),
    });

    if (!tagResponse.ok) {
      return res.status(500).json({ message: error_message });
    }

    return res.status(200).json({ message: success_message });
  } catch (error) {
    console.error("Error in convertkitSubscribeHandler:", error);
    return res.status(500).json({ message: error_message });
  }
}

export default convertkitSubscribeHandler;