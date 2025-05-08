// api/submit.js
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const payload = req.body;

  try {
    const response = await fetch(process.env.PERSIST_API_URL + "/submissions", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:      payload.email,
        discord_id: payload.discord_id,
        first_name: payload.first_name,
        last_name:  payload.last_name,
        mobile_no:  payload.mobile_no,
        country:    payload.country
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Persistence API error:", text);
      return res.status(502).json({ error: 'Failed to store data', details: text });
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Forwarding error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
