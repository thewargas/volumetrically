const allowedCors = [
  "http://localhost:3000",
  "https://localhost:3000",
  "https://thewargas.nomoredomains.monster",
  "http://thewargas.nomoredomains.monster",
  "https://api.thewargas.nomoredomains.monster",
  "http://api.thewargas.nomoredomains.monster",
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const parsedOrigin = url.parse(origin).hostname;

  console.log(parsedOrigin);

  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS";
  const requestHeaders = req.headers["access-control-request-headers"];

  if (allowedCors.includes(parsedOrigin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }

  return next();
};

// module.exports = (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//      return next();
// }
