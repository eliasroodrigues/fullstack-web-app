const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./models');
const PORT = 3001;

app.use(express.json());
app.use(cors());


// Routers
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`App listening on PORT ${PORT}`);
	});
});
