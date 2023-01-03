import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as dotenv from "dotenv";

dotenv.config;

const transport = nodemailer.createTransport({
  service: "hotmail",
  auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve("../resources/mail/"),
    },
    viewPath: path.resolve("../resources/mail/"),
    extName: ".html",
  })
);
export { transport };
