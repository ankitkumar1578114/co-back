const createError = require("http-errors"); // for development
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// const csurf = require("csurf");	// consider the cases where cors is required, and remove cors itself if not really required
const { join } = require("path");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const app = express().disable('x-powered-by');

// Routes START
const plasmaRouter = require("./routes/plasma");
const supplierRouter = require("./routes/oxygen/supplier");
const hospitalRouter = require("./routes/hospital");
const oxygenRouter = require("./routes/oxygen");
const medicineRouter = require("./routes/medicine");
// Routes END

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/";
const mongoose = require("mongoose");
// the default database options for each new connection
const conn = mongoose.connection;
mongoose.connect(
	MONGODB_URI,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		dbName: "coback",
		retryWrites: true
	}
).catch(_err => {
		if (MONGODB_URI !== "mongodb://localhost/") {
			console.log("Unable to connect to MONGODB cluster... Trying to connect to localhost");

			// change connection to the localhost URI 
			mongoose.connect("mongodb://localhost/", dbOptions)
				.then((conn) => {
					console.log("Connection to Localhost mongod established");
					conn
						.once("open", () => console.log(`Connected to Localhost MongoDB, database: ${conn.db.databaseName}`))
						.on("error", function (err) {
							console.error(`Error in DB connection -> code: ${err.code} at host: ${err.hostname}`);
						});
				}).catch((err) => {
					console.error("Couldn't connect to MongoDB, neither online cluster, nor localhost", "Start mongod, or connect to internet");

					return err;
				});
		} else {
			console.error("Couldn't connect to Localhost MongoDB.", "Start mongod, or connect to internet");

			return new Error("Couldn't Connect to Localhost MongoDB");
		}
});
mongoose.connection
	.once("open", () => console.log(`Connected to MongoDB, database: ${conn.db.databaseName}, at source: ${MONGODB_URI.substr(0, 15)}`))
	.on("error", function (err) {
		/**@note - `this` is the conn object itself, change the connection and try again */
		console.error(`Error in DB connection -> code: ${err.code} at host: ${err.hostname}`);
	});

/**
 * @note -> In your own deployment, you should likely increase the rateLimit,
 * 			currently it's 100 requests per 30 minutes for the public deployment linked in README
 */
app.use(rateLimit({
	windowMs: 30 * 60000,
	max: 500,
	message: "The api usage is limited for public use currently, read the @note above"
}));

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
// app.use(csurf({cookie: true}));	// misconfigured csurf
// {	// by default ["GET", "HEAD", "OPTIONS"] methods are ignored
// 	// httpOnly: true,
// 	// secure: true,
// }
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

express.static(join(__dirname, "public"));

app.get('/', (req, res) => {
	return res.send("Kaam kar raha hai");
});
app.use("/supplier", supplierRouter);
app.use('/plasma', plasmaRouter);
app.use('/hospital', hospitalRouter);
app.use('/oxygen', oxygenRouter);
app.use('/medicine', medicineRouter);

  // catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)));

// error handler
app.use((err, req, res, _next) => {
	// set locals, only providing error in development
	res.locals.message = err.code + " - " + err.message;
	res.locals.error = req.app.get("env") !== "production" ? err : {};
	console.error(`Error, Code - ${err.code} and Message - ${err.message}`);

	// render the error page
	res.sendStatus(err.status || 500);
});
module.exports = app;
