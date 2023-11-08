const server = require("./src/server")
const sequelize = require("./src/db")
require("dotenv").config()


const PORT = process.env.PORT || 3001
sequelize.sync({force: false})
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error during database synchronization: ${error}`);
  });
