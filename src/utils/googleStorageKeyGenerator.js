const fs = require("fs");
const path = require("path");
const storageKey = path.join(__dirname, "../../googleStorageOptions.json");
const googleStorageKeyGenerator = () => {
  try {
    if (!fs.existsSync(storageKey)) {
      const key = {
        type: process.env.GOOGLE_STORAGE_TYPE,
        project_id: process.env.GOOGLE_STORAGE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_STORAGE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_STORAGE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_STORAGE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_STORAGE_AUTH_URI,
        token_uri: process.env.GOOGLE_STORAGE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_STORAGE_AUTH_PROVIDER,
        client_x509_cert_url: process.env.GOOGLE_STORAGE_CLIENT_CERT
      };
      let data = JSON.stringify(key);
      fs.writeFileSync("googleStorageOptions.json", data);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  googleStorageKeyGenerator
};
