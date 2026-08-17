// Importa as funções necessárias do SDK Web do Firebase v10+
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Suas credenciais copiadas do Firebase Console
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializa o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Seleciona os elementos do DOM
const form = document.getElementById("cadastroForm");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const btnSalvar = document.getElementById("btnSalvar");
const mensagemDiv = document.getElementById("mensagem");

// Evento de envio do formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();

  // Bloqueia o botão durante a requisição
  btnSalvar.disabled = true;
  btnSalvar.textContent = "Cadastrando...";
  esconderMensagem();

  try {
    // Adiciona um novo documento na coleção "usuarios"
    const docRef = await addDoc(collection(db, "usuarios"), {
      nome: nome,
      email: email,
      criadoEm: serverTimestamp()
    });

    exibirMensagem("Usuário cadastrado com sucesso!", "sucesso");
    form.reset(); // Limpa os campos
  } catch (error) {
    console.error("Erro ao salvar no Firestore:", error);
    exibirMensagem("Falha ao salvar os dados. Verifique as configurações.", "erro");
  } finally {
    btnSalvar.disabled = false;
    btnSalvar.textContent = "Cadastrar";
  }
});

function exibirMensagem(texto, tipo) {
  mensagemDiv.textContent = texto;
  mensagemDiv.className = tipo;
}

function esconderMensagem() {
  mensagemDiv.className = "hidden";
  mensagemDiv.textContent = "";
}
