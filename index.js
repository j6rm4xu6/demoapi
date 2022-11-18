const Koa = require('koa');
const compress = require('koa-compress');
const bodyParser = require('koa-body');
const mongoose = require('mongoose');

require('dotenv').config()

const app = new Koa();

const connect = async () => {
	try{
		await mongoose.connect(process.env.MONGODB);
		console.log("Connected to mongoDB");
	}catch(error){
		console.log("disconnected to mongoDB");
	}
}
// mongoose.connection.on("connected", () => {
//   console.log("MongoDB connected!");
// });
// mongoose.connection.on("disconnected", () => {
//   console.log("MongoDB disconnected!");
// });
app.proxy = true;

app.use(compress({ br: false }));

// require('./lib/configration')(app);

app.use(bodyParser({
	parsedMethods: ['POST', 'PUT', 'GET', 'DELETE'],
	multipart: true,
}));
require('./controller')(app);

const port = 5000;

app.listen(port, () => {
  connect();
  console.log(`connected to ${port} backend`);
});

module.exports = app;
