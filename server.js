const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helper");

const emailjs = require("emailjs-com");
emailjs.init(process.env.EMAILJS_PUBLIC_KEY);

app.post("https://api.emailjs.com/api/v1.0/email/send-form", (req, res) => {
  formData.append("service_id", process.env.SERVICE_ID);
  formData.append("template_id", process.env.TEMPLATE_ID);
  formData.append("user_id", process.env.EMAILJS_PUBLIC_KEY);
});

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.static(path.join(__dirname, "public")));

app.get("/email-js-config", (req, res) => {
  res.json({ emailJSPublicKey });
});

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
