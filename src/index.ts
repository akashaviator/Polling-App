import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import bodyparser from "body-parser";
import Router from "./routes";
import redocUI from "redoc-express";
const PORT = process.env.PORT || 8000;

const app: Application = express();

//app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
// support parsing of application/json type post data
app.use(bodyparser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({ extended: false }));

app.get(
  "/docs2",
  redocUI({
    title: "API Docs",
    specUrl: "/swagger.json",
  })
);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);
/*
app.get("/ping", async (req, res) => {
  //const parser = new UAParser(req.headers["user-agent"]).getResult();
  return res.send(
    
    //parser["os"]["name"] + parser["cpu"]["architecture"] + req.ip
  );
});
*/
createConnection()
  .then(async (connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
