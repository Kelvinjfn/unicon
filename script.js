const app = document.getElementById("app");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userInfo = document.getElementById("user-info");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

document.addEventListener("DOMContentLoaded", () => {
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
      menuToggle.textContent = menu.classList.contains("show") ? "✕" : "☰";
    });
  }

  try {
    const user = JSON.parse(localStorage.getItem("uniconUser"));
    if (user) showUser(user);
  } catch (e) {
    console.warn("Erro ao acessar localStorage:", e);
  }

  navigate("home");
});

function navigate(view) {
  setActive(view);
  switch (view) {
    case "assistant": renderAssistant(); break;
    case "home": renderHome(); break;
    case "vacancies": renderVacancies(); break;
    case "mentors": renderMentors(); break;
    case "resume": renderResume(); break;
    case "simulator": renderSimulator(); break;
    case "login": renderLoginPage(); break;
    case "register": renderRegisterPage(); break;
    case "company": renderCompanyDashboard(); break;
    default: renderHome();
  }
}

function setActive(navId) {
  document.querySelectorAll('button[id^="nav-"]').forEach(b => b.classList.remove("active"));
  const el = document.getElementById(`nav-${navId}`);
  if (el) el.classList.add("active");
}

function renderHome() {
  app.innerHTML = `
    <section class="card center">
      <h1>Bem-vindo ao Conecta Uni</h1>
      <p class="small">A plataforma que conecta estudantes, professores, universidades e empresas.</p>

      <div class="home-buttons">
        <button class="primary" id="explorar-btn" onclick="activateHomeButton('explorar-btn'); navigate('vacancies')">Explorar Vagas</button>
        <button class="secondary" id="mentoria-btn" onclick="activateHomeButton('mentoria-btn'); navigate('mentors')">Mentoria</button>
      </div>
    </section>

    <section class="features" style="margin-top:30px;">
      <div class="feature">
        <img src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png" alt="Oportunidades" />
        <h3>Oportunidades</h3>
        <p>Conecte-se com empresas e programas de estágio alinhados ao seu curso.</p>
      </div>

      <div class="feature">
        <img src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt="Mentoria Acadêmica" />
        <h3>Mentoria Acadêmica</h3>
        <p>Aprenda com professores e pesquisadores de diversas áreas.</p>
      </div>

      <div class="feature">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Projetos e Pesquisas" />
        <h3>Projetos e Pesquisas</h3>
        <p>Participe de projetos interdisciplinares e publique seus resultados.</p>
      </div>
    </section>

    <blockquote class="quote">"Educação e trabalho caminham juntos para transformar o futuro."</blockquote>
  `;
}
function activateHomeButton(id) {
  document.querySelectorAll('.home-buttons button').forEach(btn => {
    btn.classList.remove('active-home');
  });
  document.getElementById(id).classList.add('active-home');
}


function renderVacancies() {
  const vacancies = [
    { title: "Estágio em Engenharia", company: "Casa Freitas", desc: "Atuação em projetos industriais e inovação." },
    { title: "Auxiliar de Marketing", company: "Startup X", desc: "Campanhas digitais e branding." },
  ];
  app.innerHTML = `<section class="card"><h1>Vagas Disponíveis</h1></section>`;
  const container = document.createElement("div");

  vacancies.forEach(v => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h4>${v.title}</h4>
      <p><strong>${v.company}</strong></p>
      <p class="small">${v.desc}</p>
      <div style="margin-top:8px">
        <button class="primary" onclick="applyVacancy('${escapeHtml(v.title)}','${escapeHtml(v.company)}')">Candidatar</button>
      </div>
    `;
    container.appendChild(div);
  });
  app.appendChild(container);
}

function applyVacancy(title, company) {
  alert(`Candidatura enviada para ${company} (vaga: ${title}).`);
}

function renderMentors() {
  const mentors = [
    { name: "Prof. Ana Letícia", area: "Inteligência Artificial (IA)", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png" },
    { name: "Dr. Erik Jhones", area: "Python e Ciência de Dados", avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    { name: "Prof. Gabriela Torres", area: "Desenvolvimento Web (Front-end e Back-end)", avatar: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png" }
  ];

  app.innerHTML = `
    <section class="card">
      <h1>Mentoria Acadêmica</h1>
      <p class="small">Conecte-se com professores e especialistas em tecnologia, ciência e inovação.</p>
    </section>
  `;

  const container = document.createElement("div");
  container.classList.add("features");

  mentors.forEach(m => {
    const card = document.createElement("div");
    card.classList.add("feature");
    card.innerHTML = `
      <img src="${m.avatar}" alt="${m.name}" />
      <h3>${m.name}</h3>
      <p>${m.area}</p>
      <button class="primary" onclick="alert('Solicitação de mentoria enviada para ${m.name}.')">
        Solicitar Mentoria
      </button>
    `;
    container.appendChild(card);
  });

  app.appendChild(container);
}


function renderResume() {
  app.innerHTML = `
    <section class="card">
      <h1>Construtor de Currículo</h1>
      <p class="small">Preencha suas informações e gere automaticamente um currículo em PDF.</p>

      <h3>Informações Pessoais</h3>
      <input id="name" placeholder="Nome completo" />
      <input id="email" placeholder="E-mail" />
      <input id="phone" placeholder="Telefone" />
      <input id="linkedin" placeholder="LinkedIn (opcional)" />
      <input id="address" placeholder="Endereço (opcional)" />

      <h3>Objetivo Profissional</h3>
      <textarea id="objective" placeholder="Ex: Busco estágio na área de..." rows="2"></textarea>

      <h3>Formação Acadêmica</h3>
      <input id="course" placeholder="Curso" />
      <input id="institution" placeholder="Instituição de ensino" />
      <input id="academic-years" placeholder="Ano de início e conclusão (ou 'em andamento')" />

      <h3>Experiência Profissional</h3>
      <input id="job-company" placeholder="Empresa" />
      <input id="job-role" placeholder="Cargo" />
      <input id="job-period" placeholder="Período (ex: jan/2023 - atual)" />
      <textarea id="job-description" placeholder="Descreva suas atividades e resultados" rows="3"></textarea>

      <h3>Projetos e Pesquisas</h3>
      <textarea id="projects" placeholder="Descreva seus projetos, TCCs ou pesquisas relevantes" rows="3"></textarea>

      <h3>Habilidades e Competências</h3>
      <textarea id="skills" placeholder="Liste suas principais habilidades" rows="3"></textarea>

      <h3>Idiomas</h3>
      <textarea id="languages" placeholder="Ex: Inglês - intermediário, Espanhol - básico" rows="2"></textarea>

      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="primary" onclick="generateResumePDF()">Gerar Currículo em PDF</button>
        <button class="ghost" onclick="navigate('home')">Cancelar</button>
      </div>
    </section>
  `;
}

function generateResumePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const field = id => (document.getElementById(id)?.value.trim() || "-");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(11, 99, 214);
  doc.text("UNICON — Conecta Uni", doc.internal.pageSize.getWidth() / 2, 40, { align: "center" });

  let y = 70;
  const addSection = (title, text) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(11,99,214);
    doc.setFontSize(12);
    doc.text(title, 40, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0,0,0);
    const split = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 80);
    doc.text(split, 40, y);
    y += split.length * 14 + 10;
    if (y > doc.internal.pageSize.getHeight() - 80) {
      doc.addPage(); y = 40;
    }
  };

  addSection("Informações Pessoais", `Nome: ${field("name")}\nE-mail: ${field("email")}\nTelefone: ${field("phone")}\nLinkedIn: ${field("linkedin")}\nEndereço: ${field("address")}`);
  addSection("Objetivo Profissional", field("objective"));
  addSection("Formação Acadêmica", `${field("course")} — ${field("institution")} (${field("academic-years")})`);
  addSection("Experiência Profissional", `${field("job-company")} — ${field("job-role")} (${field("job-period")})\n${field("job-description")}`);
  addSection("Projetos e Pesquisas", field("projects"));
  addSection("Habilidades e Competências", field("skills"));
  addSection("Idiomas", field("languages"));

  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text("Gerado automaticamente via Conecta Uni — UNICON", doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 30, { align: "center" });

  const firstName = field("name") !== "-" ? field("name").split(" ")[0] : "curriculo";
  doc.save(`${firstName}_curriculo.pdf`);
}

function renderSimulator() {
  app.innerHTML = `
    <section class="card">
      <h1>Simulador de Entrevista</h1>
      <p class="small">Responda às perguntas como se estivesse em uma entrevista real.</p>
      <div id="questions"></div>
      <div style="margin-top:12px"><button class="ghost" onclick="navigate('home')">Voltar</button></div>
    </section>
  `;
  renderInterview();
}

function renderInterview() {
  const questions = [
    "Fale um pouco sobre você.",
    "Por que você quer trabalhar nesta empresa?",
    "Quais são seus pontos fortes e fracos?",
    "Conte sobre um desafio que superou.",
    "Como você lida com prazos apertados?",
    "Como você se vê profissionalmente em 5 anos?",
    "O que te motiva a dar o seu melhor no trabalho?",
    "Como você lida com feedbacks negativos?",
    "Descreva um momento em que trabalhou bem em equipe.",
    "O que diferencia você de outros candidatos?",
    "Fale sobre um projeto técnico/academic que você realizou.",
    "Como você organiza seu tempo em múltiplas responsabilidades?"
  ];

  const container = document.getElementById("questions");
  container.innerHTML = "";
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.style.marginBottom = "10px";
    div.innerHTML = `<h4>${i + 1}. ${q}</h4><textarea rows="3" id="q${i}"></textarea>`;
    container.appendChild(div);
  });

  const btn = document.createElement("button");
  btn.className = "primary";
  btn.textContent = "Avaliar Minhas Respostas";
  btn.onclick = evaluateInterview;
  container.appendChild(btn);
}

function evaluateInterview() {
  const total = 12;
  let score = 0;
  for (let i = 0; i < total; i++) {
    const val = document.getElementById(`q${i}`).value.trim();
    if (val.length > 50) score += 1;
    const kws = ["projeto","resultado","aprendi","resolver","impacto","trabalhei","equipe","objetivo","metas"];
    for (const kw of kws) {
      if (val.toLowerCase().includes(kw)) { score += 0.3; break; }
    }
  }
  const normalized = Math.min(100, Math.round((score / (total * 1.3)) * 100));
  const feedback = normalized > 80 ? "Excelente desempenho!" : normalized > 60 ? "Bom, mas pode melhorar!" : "Continue praticando!";
  alert(`Avaliação rápida: ${normalized}%\n${feedback}\nDica: use exemplos concretos, números e resultados.`);
}

function renderLoginPage() {
  app.innerHTML = `
    <section class="card">
      <h1>Entrar no Conecta Uni</h1>
      <input id="login-email" placeholder="E-mail" />
      <input id="login-password" type="password" placeholder="Senha" />
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="primary" onclick="login()">Entrar</button>
        <button class="ghost" onclick="renderRegisterPage()">Cadastrar</button>
      </div>
    </section>
  `;
}

function renderRegisterPage() {
  app.innerHTML = `
    <section class="card">
      <h1>Criar Conta no Conecta Uni</h1>
      <input id="reg-name" placeholder="Nome completo" />
      <input id="reg-email" placeholder="E-mail" />
      <input id="reg-password" type="password" placeholder="Senha" />
      <select id="reg-role">
        <option value="estudante">Estudante</option>
        <option value="professor">Professor</option>
        <option value="empresa">Empresa</option>
      </select>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="primary" onclick="register()">Cadastrar</button>
        <button class="ghost" onclick="renderLoginPage()">Voltar</button>
      </div>
    </section>
  `;
}

function register() {
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const role = document.getElementById("reg-role").value;
  if (!name || !email || !password) return alert("Preencha todos os campos.");
  localStorage.setItem(`user_${email}`, JSON.stringify({ name, email, password, role }));
  alert("Cadastro realizado com sucesso! Agora faça login.");
  renderLoginPage();
}

function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const stored = localStorage.getItem(`user_${email}`);
  if (!stored) return alert("Usuário não encontrado.");
  const user = JSON.parse(stored);
  if (user.password !== password) return alert("Senha incorreta.");
  localStorage.setItem("uniconUser", JSON.stringify(user));
  showUser(user);
  navigate("home");
}

function showUser(user) {
  if (loginBtn) loginBtn.classList.add("hidden");
  if (logoutBtn) logoutBtn.classList.remove("hidden");
  if (userInfo) {
    userInfo.classList.remove("hidden");
    userInfo.textContent = `Bem-vindo, ${user.name.split(" ")[0]}`;
  }
}

function logout() {
  localStorage.removeItem("uniconUser");
  if (loginBtn) loginBtn.classList.remove("hidden");
  if (logoutBtn) logoutBtn.classList.add("hidden");
  if (userInfo) {
    userInfo.classList.add("hidden");
    userInfo.textContent = "";
  }
  navigate("home");
}

function renderAssistant() {
  app.innerHTML = `
    <section class="card">
      <h1>Assistente Conecta Uni 🤖</h1>
      <p class="small">Converse comigo! Posso te ajudar a entender as funções da plataforma.</p>
      <div id="chat-box" class="chat-box"></div>
      <div class="chat-input">
        <input id="chat-input" placeholder="Digite sua pergunta..." onkeydown="if(event.key==='Enter')sendMessage()" />
        <button class="primary" onclick="sendMessage()">Enviar</button>
      </div>
    </section>
  `;
  document.getElementById("chat-box").innerHTML += `<div class="bot-msg">Olá 👋 Sou o assistente da Conecta Uni. Posso te ajudar com informações sobre vagas, currículo, mentoria ou simulador.</div>`;
}

const respostasIA = {
  vagas: "A seção 'Vagas' conecta você a oportunidades de estágio e emprego.",
  currículo: "Na aba 'Currículo', você gera automaticamente um PDF com suas informações.",
  mentoria: "A 'Mentoria' conecta estudantes a professores e especialistas.",
  simulador: "O 'Simulador' te ajuda a praticar entrevistas reais.",
  conta: "Você pode criar uma conta clicando em 'Entrar / Cadastrar'.",
  unicon: "A UNICON é a identidade visual do Conecta Uni — unindo universidades e o mercado de trabalho.",
  default: "Sou o assistente da Conecta Uni! Posso te ajudar com vagas, currículo, mentoria, simulador ou cadastro."
};

function sendMessage() {
  const input = document.getElementById("chat-input");
  const box = document.getElementById("chat-box");
  const msg = input.value.trim();
  if (!msg) return;

  box.innerHTML += `<div class="user-msg">${msg}</div>`;
  input.value = "";
  box.scrollTop = box.scrollHeight;

  let resposta = respostasIA.default;
  for (let chave in respostasIA) {
    if (msg.toLowerCase().includes(chave)) { resposta = respostasIA[chave]; break; }
  }

  setTimeout(() => {
    box.innerHTML += `<div class="bot-msg">${resposta}</div>`;
    box.scrollTop = box.scrollHeight;
  }, 600);
}

function toggleAssistant() {
  let popup = document.getElementById("assistant-popup");

  if (!popup) {
    popup = document.createElement("div");
    popup.id = "assistant-popup";
    popup.innerHTML = `
      <div id="assistant-header">
        Assistente Conecta Uni 🤖
        <button onclick="toggleAssistant()">×</button>
      </div>
      <div id="assistant-body"></div>
      <div id="assistant-input">
        <input id="assistant-text" placeholder="Digite aqui..." onkeydown="if(event.key==='Enter')sendAssistantMsg()" />
        <button onclick="sendAssistantMsg()">Enviar</button>
      </div>
    `;
    document.body.appendChild(popup);
    document.getElementById("assistant-body").innerHTML += `<div class="bot-msg">Olá 👋 Sou o assistente da Conecta Uni. Posso te ajudar com vagas, currículo, mentoria ou simulador.</div>`;
  }

  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}

const respostasFlutuante = {
  vagas: "Na aba 'Vagas', visualize oportunidades e se candidate diretamente.",
  currículo: "Em 'Currículo', preencha seus dados e gere um PDF pronto.",
  mentoria: "A seção 'Mentoria' conecta alunos com professores experientes.",
  simulador: "O simulador ajuda você a treinar respostas e ganhar confiança.",
  conta: "Crie uma conta em 'Entrar / Cadastrar'.",
  unicon: "A UNICON é a identidade visual do Conecta Uni.",
  default: "Posso te ajudar com vagas, currículo, mentoria, simulador ou cadastro."
};

function sendAssistantMsg() {
  const input = document.getElementById("assistant-text");
  const body = document.getElementById("assistant-body");
  const msg = input.value.trim();
  if (!msg) return;

  body.innerHTML += `<div class="user-msg">${msg}</div>`;
  input.value = "";

  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = "Digitando...";
  body.appendChild(typing);
  body.scrollTop = body.scrollHeight;

  let resposta = respostasFlutuante.default;
  for (let chave in respostasFlutuante) {
    if (msg.toLowerCase().includes(chave)) resposta = respostasFlutuante[chave];
  }

  setTimeout(() => {
    typing.remove();
    body.innerHTML += `<div class="bot-msg">${resposta}</div>`;
    document.getElementById("ping-sound").play();
    body.scrollTop = body.scrollHeight;
  }, 1000);
}

function renderCompanyDashboard() {
  const user = JSON.parse(localStorage.getItem("uniconUser"));
  if (!user || user.role !== "empresa") {
    alert("Apenas contas de empresa podem acessar esta área.");
    navigate("login");
    return;
  }

  const vagas = JSON.parse(localStorage.getItem(`vagas_${user.email}`) || "[]");

  app.innerHTML = `
    <section class="card">
      <h1>Painel da Empresa</h1>
      <p class="small">Gerencie suas vagas e visualize candidatos interessados.</p>
      <button class="primary" onclick="showNewJobForm()">+ Publicar Nova Vaga</button>
    </section>

    <section class="card">
      <h2>Minhas Vagas</h2>
      <div id="company-vacancies"></div>
    </section>
  `;

  const container = document.getElementById("company-vacancies");
  if (vagas.length === 0) {
    container.innerHTML = `<p class="small">Nenhuma vaga publicada ainda.</p>`;
  } else {
    vagas.forEach((v, i) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${v.title}</h3>
        <p><strong>Área:</strong> ${v.area}</p>
        <p><strong>Tipo:</strong> ${v.tipo} • ${v.modalidade}</p>
        <p>${v.desc}</p>
        <p class="small"><em>Data limite: ${v.data}</em></p>
        <button class="ghost" onclick="deleteJob(${i})">Excluir</button>
      `;
      container.appendChild(div);
    });
  }
}

function showNewJobForm() {
  const user = JSON.parse(localStorage.getItem("uniconUser"));
  if (!user || user.role !== "empresa") return navigate("login");

  app.innerHTML = `
    <section class="card">
      <h1>Publicar Nova Vaga</h1>
      <input id="job-title" placeholder="Título da vaga" />
      <input id="job-area" placeholder="Área de atuação (ex: TI, Marketing...)" />
      <select id="job-tipo">
        <option>Estágio</option>
        <option>Emprego</option>
        <option>Projeto Acadêmico</option>
      </select>
      <select id="job-modalidade">
        <option>Presencial</option>
        <option>Remoto</option>
        <option>Híbrido</option>
      </select>
      <textarea id="job-desc" placeholder="Descrição detalhada da vaga" rows="4"></textarea>
      <input id="job-data" type="date" />

      <div style="display:flex;gap:10px;margin-top:10px;">
        <button class="primary" onclick="saveJob()">Salvar Vaga</button>
        <button class="ghost" onclick="renderCompanyDashboard()">Cancelar</button>
      </div>
    </section>
  `;
}

function saveJob() {
  const user = JSON.parse(localStorage.getItem("uniconUser"));
  if (!user || user.role !== "empresa") return navigate("login");

  const job = {
    title: document.getElementById("job-title").value.trim(),
    area: document.getElementById("job-area").value.trim(),
    tipo: document.getElementById("job-tipo").value,
    modalidade: document.getElementById("job-modalidade").value,
    desc: document.getElementById("job-desc").value.trim(),
    data: document.getElementById("job-data").value,
  };

  if (!job.title || !job.area || !job.desc) {
    alert("Preencha os campos obrigatórios: título, área e descrição.");
    return;
  }

  const vagas = JSON.parse(localStorage.getItem(`vagas_${user.email}`) || "[]");
  vagas.push(job);
  localStorage.setItem(`vagas_${user.email}`, JSON.stringify(vagas));

  alert("Vaga publicada com sucesso!");
  renderCompanyDashboard();
}

function deleteJob(index) {
  const user = JSON.parse(localStorage.getItem("uniconUser"));
  const vagas = JSON.parse(localStorage.getItem(`vagas_${user.email}`) || "[]");
  vagas.splice(index, 1);
  localStorage.setItem(`vagas_${user.email}`, JSON.stringify(vagas));
  renderCompanyDashboard();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"'`=\/]/g, s => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
  }[s]));
}
