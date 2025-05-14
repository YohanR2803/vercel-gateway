const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'OK' });
  }

  if (req.method === 'POST') {
    const formData = req.body;

    // 🔧 Remap 'phone' to 'mobile_no'
    const payload = {
      email: formData.email,
      discord_id: formData.discord_id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      mobile_no: formData.phone, // <-- Key fix here
      country: formData.country
    };

    const fastApiUrl = "http://16.16.26.192:8000/submissions";

    try {
      const response = await fetch(fastApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '202829Jo3L08',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err) {
      console.error("Forwarding error:", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
};
