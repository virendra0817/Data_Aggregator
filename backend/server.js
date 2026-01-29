require('dotenv').config();
const app = require("./app");
const { connectRedis } = require("./src/config/redis");

const PORT = process.env.PORT  || 3000;

(async () => {
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();