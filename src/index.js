const app = require("./app");
const port = process.env.port || 3001;

const {
  googleStorageKeyGenerator
} = require("./utils/googleStorageKeyGenerator");

googleStorageKeyGenerator();

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
