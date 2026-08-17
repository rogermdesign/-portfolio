// 1. Imports sempre no topo do arquivo
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Credenciais reais do seu projeto do Firebase
// Certifique-se de substituir apiKey e appId pelas chaves reais geradas no Firebase Console
const firebaseConfig = {
  apiKey: "SUA_API_KEY_REAL_AQUI", // Insira a sua apiKey real do console
  authDomain: "rogerportfolio-38540.firebaseapp.com",
  projectId: "rogerportfolio-38540",
  storageBucket: "rogerportfolio-38540.firebasestorage.app",
  messagingSenderId: "1234567890", // Insira o seu messagingSenderId real
  appId: "SUA_APP_ID_REAL_AQUI" // Insira o seu appId real
};

// 3. Inicializa o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Seleciona os elementos do DOM
const form = document.getElementById("cadastroForm");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const btnSalvar = document.getElementById("btnSalvar");
const mensagemDiv = document.getElementById("mensagem");

// 5. Evento de envio do formulário
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
