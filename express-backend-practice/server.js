const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`server spinning on port ${PORT}`);
});
