const { UserVerifier } = require("@multiversx/sdk-wallet/out");

function verifySignature(address, message, signature) {
  try {
    const verifier = new UserVerifier();
    return verifier.verifyMessage(message, signature, address);
  } catch (e) {
    console.error("Error verifying signature:", e);
    return false;
  }
}

module.exports = { verifySignature };
