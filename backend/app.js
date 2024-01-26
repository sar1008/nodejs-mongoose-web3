import express from "express";
import routes from "./routes/index.js";
import helmet from "helmet";
import cors from "cors";
import passport from "./config/passport.js";

const app = express();


app.use(helmet());

app.use(express.json());

app.use(cors());

app.use(passport.initialize());

app.use(express.static("public"));

app.use("/api",routes);

export default app