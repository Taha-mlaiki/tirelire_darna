import express from "express";
import "./config/dbconfig";
import { responseHandler } from "./middleware/responseHandler";
import { validatorHandler } from "./middleware/validatorHamdler";
import v1 from "./routes/v1/index";

const app = express();
app.use(express.json());
app.use(responseHandler);

//auth v1
app.use("/api/v1", v1);
app.use(validatorHandler);

app.use((req: express.Request, res: express.Response) => {
  res.error(`Cannot ${req.method} ${req.originalUrl}`, 404, "Not Found");
});

export default app;
