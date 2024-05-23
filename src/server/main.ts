import express from "express";
import ViteExpress from "vite-express";

import '../services/firebase'

const app = express();

const PORT = Number(process.env.VITE_PORT) || 3000;

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`),
);
