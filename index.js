const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { verifySignature } = require("./verify-multiversx");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/verify", async (req, res) => {
  const { address, message, signature } = req.body;

  if (!address || !message || !signature) {
    return res.status(400).json({ verified: false, error: "Missing fields" });
  }

  try {
    const isValid = verifySignature(address, message, signature);
    res.json({ verified: isValid });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ verified: false, error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`RealmO² backend running on port ${port}`);
});
