const createError = require("http-errors"); // for development
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// const csurf = require("csurf");	// consider the cases where cors is required, and remove cors itself if not really required
// const cparser = require("cookie-parser");
const { join } = require("path");
const rateLimit = require("express-rate-limit");
const app = express();

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
// app.use(cparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

express.static( join(__dirname, "public") );


app.use((req, res) => {
    return res.send("Kaam kar raha hai");
})

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.code + " - " + err.message;
	res.locals.error = req.app.get("env") !== "production" ? err : {};
	console.error(`Error, Code - ${err.code} and Message - ${err.message}`);

	// render the error page
	res.sendStatus(err.status || 500);
});

module.exports = app;
