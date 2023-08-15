const express = require("express");
const connectToMongo = require("./db");
const port = 5000;
const application = express();
const cors = require('cors');

connectToMongo();

// application.get('/', (req, res) => {
//   res.send("Hello World !!");
// });
application.use(cors());
application.use(express.json());

application.use('/api/auth', require('./routes/auth'));
application.use('/api/notes', require('./routes/notes'));

application.listen(port, () => {
  console.log(`iNotebook app is listening at http://localhost:${port}`);
});
