const API_BASE = "/api";

async function cadastrarUsuario() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  if (!nome || !email) return alert("Preencha nome e e-mail.");

  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email })
  });
  const data = await res.json();
  alert(data.message);
}

async function fazerAgendamento() {
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;

  if (!servico || !data || !hora) return alert("Preencha todos os campos.");

  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ servico, data, hora })
  });
  const r = await res.json();
  alert(r.message);
}

async function listarAgendamentos() {
  const res = await fetch(`${API_BASE}/bookings`);
  const agendamentos = await res.json();

  const ul = document.getElementById("agendamentos");
  ul.innerHTML = "";

  agendamentos.forEach(a => {
    const li = document.createElement("li");
    li.textContent = `${a.servico} - ${a.data} às ${a.hora}`;
    ul.appendChild(li);
  });
}
