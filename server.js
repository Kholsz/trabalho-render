import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

const DB_BOOKINGS = "bookings.json";
const DB_USERS = "users.json";
const DB_SETTINGS = "settings.json";

function ensureFiles() {
  if (!fs.existsSync(DB_BOOKINGS)) fs.writeFileSync(DB_BOOKINGS, "[]", "utf8");
  if (!fs.existsSync(DB_USERS)) fs.writeFileSync(DB_USERS, "[]", "utf8");
  if (!fs.existsSync(DB_SETTINGS))
    fs.writeFileSync(DB_SETTINGS, JSON.stringify({ capacidadePorHorario: 3 }, null, 2));
}
ensureFiles();

app.get("/api/users", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_USERS, "utf8"));
  res.json(data);
});

app.post("/api/users", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_USERS, "utf8"));
  const novo = req.body;
  data.push(novo);
  fs.writeFileSync(DB_USERS, JSON.stringify(data, null, 2));
  res.json({ message: "Usuário cadastrado!" });
});

app.get("/api/bookings", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_BOOKINGS, "utf8"));
  res.json(data);
});

app.post("/api/bookings", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_BOOKINGS, "utf8"));
  const novo = req.body;
  novo.id = Date.now();
  data.push(novo);
  fs.writeFileSync(DB_BOOKINGS, JSON.stringify(data, null, 2));
  res.json({ message: "Agendamento salvo!", data: novo });
});

app.delete("/api/bookings/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_BOOKINGS, "utf8"));
  const novo = data.filter(a => a.id != req.params.id);
  fs.writeFileSync(DB_BOOKINGS, JSON.stringify(novo, null, 2));
  res.json({ message: "Agendamento removido!" });
});

app.get("/api/settings", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_SETTINGS, "utf8"));
  res.json(data);
});

app.post("/api/settings", (req, res) => {
  fs.writeFileSync(DB_SETTINGS, JSON.stringify(req.body, null, 2));
  res.json({ message: "Configuração atualizada!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Servidor rodando na porta ${PORT}`)
);
