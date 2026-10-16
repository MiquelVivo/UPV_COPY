const profiles = {
  vivo: {
    firstName: "Miquel",
    fullName: "Miquel Vivo Pons",
    photo: "profiles/Miquel_Vivo_Pons.jpeg",
    internalId: "2053718426",
    passedCredits: 174,
    subjects: [
      ["Aerodinámica II", 8.7, 6],
      ["Estructuras Aeroespaciales", 9.1, 6],
      ["Mecánica de Vuelo", 8.4, 6],
      ["Propulsión Aeroespacial", 7.9, 6],
      ["Sistemas de Navegación", 9.3, 4.5],
      ["Diseño de Aeronaves", 8.8, 6],
      ["Aeroelasticidad", 8.2, 4.5],
      ["Instrumentación Aeroespacial", 7.7, 6],
      ["Motores de Reacción", 8.5, 6],
      ["Mantenimiento de Aeronaves", 9.0, 4.5],
      ["Gestión del Tráfico Aéreo", 8.1, 6],
      ["Proyecto de Ingeniería Aeroespacial", 9.4, 6],
    ],
  },
  neves: {
    firstName: "Oskar",
    fullName: "Oskar Neves",
    photo: "profiles/Oskar_Neves.jpeg",
    internalId: "2054927183",
    passedCredits: 126,
    subjects: [
      ["Mecánica de Fluidos", 6.8, 6],
      ["Termodinámica Aplicada", 7.4, 6],
      ["Materiales Aeroespaciales", 8.2, 4.5],
      ["Cálculo de Aeronaves", 6.5, 6],
      ["Electrónica de a Bordo", 7.9, 6],
      ["Ingeniería Aeroportuaria", 8.6, 4.5],
      ["Resistencia de Materiales", 6.2, 6],
      ["Sistemas Eléctricos de Aeronaves", 7.1, 6],
      ["Meteorología Aeronáutica", 8.0, 4.5],
      ["Producción Aeroespacial", 7.6, 6],
      ["Seguridad Operacional", 8.4, 4.5],
      ["Aeropuertos y Transporte Aéreo", 7.3, 6],
    ],
  },
  font: {
    firstName: "Pablo",
    fullName: "Pablo Font Setó",
    photo: "profiles/Pablo_Font_Seto.jpeg",
    internalId: "2053869295",
    passedCredits: 198,
    subjects: [
      ["Dinámica Orbital", 9.4, 6],
      ["Vehículos Espaciales", 8.9, 6],
      ["Propulsión de Cohetes", 9.6, 4.5],
      ["Control Automático", 8.7, 6],
      ["Sistemas de Comunicaciones", 9.2, 6],
      ["Diseño de Satélites", 9.5, 6],
      ["Teledetección Espacial", 8.8, 4.5],
      ["Guiado, Navegación y Control", 9.3, 6],
      ["Estructuras Orbitales", 8.6, 6],
      ["Sistemas de Potencia Espacial", 9.0, 4.5],
      ["Misiones Interplanetarias", 9.7, 6],
      ["Proyecto de Vehículos Espaciales", 9.4, 6],
    ],
  },
  gandia: {
    firstName: "Pablo",
    fullName: "Pablo Gandia Miñana",
    photo: "profiles/Pablo_Gandia_Minana.jpg",
    internalId: "2054873156",
    passedCredits: 72,
    subjects: [
      ["Matemáticas II", 5.8, 6],
      ["Física Aeroespacial", 6.4, 6],
      ["Expresión Gráfica", 7.1, 6],
      ["Fundamentos de Aerodinámica", 6.9, 6],
      ["Programación Científica", 7.6, 6],
      ["Tecnología de Fabricación", 6.2, 4.5],
      ["Álgebra y Geometría", 5.9, 6],
      ["Química para Ingeniería", 6.7, 4.5],
      ["Estadística Aplicada", 7.3, 6],
      ["Mecánica de Sólidos", 6.5, 6],
      ["Circuitos Eléctricos", 7.0, 6],
      ["Introducción a la Ingeniería Espacial", 7.8, 4.5],
    ],
  },
  zapater: {
    firstName: "Sofia",
    fullName: "Sofia Zapater Castle",
    photo: "profiles/Sofia_Zapater_Castle.jpeg",
    internalId: "2056147392",
    passedCredits: 144,
    degree: "Grado en Podología Marina (Bilingüe)",
    school: "Escuela Técnica Superior de Magia y Artes Místicas",
    subjects: [
      ["Anatomía Podal de Sirenas / Mermaid Foot Anatomy", 8.9, 6],
      ["Biomecánica de Aletas / Fin Biomechanics", 9.2, 6],
      ["Patología del Pie Sumergido / Submerged Foot Pathology", 8.4, 6],
      ["Runas Clínicas / Clinical Runes", 9.5, 4.5],
      ["Pociones Salinas / Saline Potions", 8.7, 6],
      ["Criaturas Abisales / Abyssal Creatures", 9.0, 4.5],
      ["Cirugía Coralina / Coral Surgery", 8.2, 6],
      ["Ortopodología Acuática / Aquatic Orthopodiatry", 9.3, 6],
      ["Encantamientos Terapéuticos / Therapeutic Spells", 9.6, 4.5],
      ["Micología Marina / Marine Mycology", 8.1, 6],
      ["Prácticas en Arrecifes / Reef Clinical Practice", 9.1, 6],
      ["Ética de las Artes Místicas / Mystic Arts Ethics", 8.8, 4.5],
    ],
  },
};

const defaultDegree = "Grado en Ingeniería Aeroespacial";
const defaultSchool = "Escuela Técnica Superior de Ingeniería Aeroespacial";

const loginView = document.querySelector("#login-view");
const appView = document.querySelector("#app-view");
const loginForm = document.querySelector("#login-form");
const loginError = document.querySelector("#login-error");
const passwordInput = document.querySelector("#password");
const showPasswordButton = document.querySelector(".show-password");
const subjectsList = document.querySelector("#subjects-list");

function normalizeCredential(value) {
  return value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function gradeLabel(grade) {
  if (grade >= 9) return "Sobresaliente";
  if (grade >= 7) return "Notable";
  return "Aprobado";
}

function renderProfile(profile) {
  const average = profile.subjects.reduce((total, subject) => total + subject[1], 0) / profile.subjects.length;
  document.querySelector("#home-first-name").textContent = profile.firstName;
  document.querySelector("#average-grade").textContent = average.toFixed(1).replace(".", ",");
  document.querySelector("#passed-credits").textContent = profile.passedCredits;
  document.querySelector("#degree-title").textContent = (profile.degree || defaultDegree).toUpperCase();
  document.querySelector("#student-name").textContent = profile.fullName.toUpperCase();
  document.querySelector("#student-school").textContent = profile.school || defaultSchool;
  document.querySelector("#barcode-number").textContent = profile.internalId;
  const studentPhoto = document.querySelector("#student-photo");
  studentPhoto.src = profile.photo;
  studentPhoto.alt = `Foto de ${profile.fullName}`;
  subjectsList.innerHTML = profile.subjects.map(([name, grade, credits]) => `
    <article class="subject">
      <button class="subject-summary" type="button" aria-expanded="false">
        <span class="subject-name">${name}</span>
        <span class="subject-grade">${grade.toFixed(1).replace(".", ",")} <small>${grade >= 9 ? "S" : grade >= 7 ? "N" : "A"}</small></span>
        <svg aria-hidden="true"><use href="#icon-chevron"></use></svg>
      </button>
      <div class="subject-detail">${credits} ECTS · ${gradeLabel(grade)} · Convocatoria ordinaria</div>
    </article>
  `).join("");
}

function openApp() {
  loginView.hidden = true;
  appView.hidden = false;
  document.body.classList.add("app-active");
  window.scrollTo(0, 0);
}

function closeApp() {
  appView.hidden = true;
  loginView.hidden = false;
  document.body.classList.remove("app-active");
  loginForm.reset();
  window.scrollTo(0, 0);
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);
  const username = normalizeCredential(data.get("username"));
  const password = normalizeCredential(data.get("password"));
  if (!username || !password) {
    loginError.textContent = "Introduce tu usuario y clave para continuar.";
    return;
  }
  const profile = profiles[username];
  if (!profile || password !== username) {
    loginError.textContent = "El usuario o la clave no son correctos.";
    return;
  }
  loginError.textContent = "";
  renderProfile(profile);
  openApp();
});

showPasswordButton.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  showPasswordButton.setAttribute("aria-label", isPassword ? "Ocultar clave" : "Mostrar clave");
});

document.querySelector("#logout-button").addEventListener("click", closeApp);

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#${button.dataset.target}`).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

subjectsList.addEventListener("click", (event) => {
  const summary = event.target.closest(".subject-summary");
  if (!summary) return;
  const subject = summary.closest(".subject");
  const open = subject.classList.toggle("open");
  summary.setAttribute("aria-expanded", String(open));
});
