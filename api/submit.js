const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Only handle POST requests
  if (req.method === 'POST') {
    const formData = req.body;

    // The FastAPI backend URL
    const fastApiUrl = "http://<your-ec2-ip>:8000/submissions"; // Replace with your EC2 FastAPI URL

    try {
      // Send the data to FastAPI with the required authorization token
      const response = await fetch(fastApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '202829Jo3L08',  // This should match your SECRET_TOKEN in FastAPI
        },
        body: JSON.stringify(formData),
      });

      const responseBody = await response.json();

      if (response.ok) {
        return res.status(200).json({ message: "Form submitted successfully", data: responseBody });
      } else {
        return res.status(response.status).json({ error: responseBody });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
