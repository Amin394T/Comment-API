import express from "express";
import { sequelize } from "./models.js";
import { readMessages, createMessage, deleteMessage, registerUser } from "./controllers.js";


const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.json());
app.get("/api/messages/:id", readMessages);
app.post("/api/messages/", createMessage);
app.delete("/api/messages/:id", deleteMessage);
app.post("/api/users/register", registerUser);

sequelize.sync().then(() => {
  app.listen(3000);
});
