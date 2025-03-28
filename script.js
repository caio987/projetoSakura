class MobileNavbar {
  constructor(mobile_menu, navbar_usuario, nav_link) {
    this.mobile_menu = document.querySelector(mobile_menu);
    this.navbar_usuario = document.querySelector(navbar_usuario);
    this.nav_links = document.querySelectorAll(nav_link);
    this.activeClass = "active";
    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.nav_links.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3
          }s`;
      }
    });
  }

  handleClick() {
    this.navbar_usuario.classList.toggle(this.activeClass);
    this.mobile_menu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobile_menu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobile_menu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile_menu",
  ".navbar_usuario",
  ".navbar_usuario a"
);

mobileNavbar.init();

// ----------------------------------------------------
// Cadastro
function enviaDados() {
  nome = document.getElementById("nome").value;
  sobrenome = document.getElementById("sobrenome").value;
  cep = document.getElementById("cep").value;
  email = document.getElementById("email").value;
  senha = document.getElementById("senha").value;
  senha2 = document.getElementById("senha2").value;
  contador = 0
  if (senha == senha2) {
    sessionStorage.setItem("nome", nome);
    sessionStorage.setItem("Sobrenome", sobrenome);
    sessionStorage.setItem("CEP", cep);
    sessionStorage.setItem("E-mail", email);
    sessionStorage.setItem("Senha", senha);
    sessionStorage.setItem("Senha2", senha2);
    sessionStorage.setItem("contador", contador)
    window.location.href = "login.html"
  } else {
   // alerta = document.getElementById("alerta").innerHTML = "As senhas estão diferentes!";
    alert("As senhas estão diferentes!");
  }
}

// ----------------------------------------------------
// Login
function confirmaDados() {
  nomeConfirmar = document.getElementById("nomeConfirmar").value;
  senhaConfirmar = document.getElementById("senhaConfirmar").value;
  senha1_2 = sessionStorage.getItem("Senha");
  nome2 = sessionStorage.getItem("nome");
  // alert(senha1_2)
  // alert(nome2)
  if (senhaConfirmar == senha1_2 && nomeConfirmar == nome2) {
    alert("Bem-vindo/a " + nome2);
    contador = 1
    sessionStorage.setItem("contador", contador)
    window.location.href = "index.html";
  } else {
   // alerta = document.getElementById("alerta").innerHTML = "Senha ou nome incorreta!";
    alert("Senha ou nome incorretos!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const usuarioDiv = document.getElementById("usuario");

  // Verifica se há um nome salvo no sessionStorage (ou outro dado de cadastro)
  const nomeUsuario = sessionStorage.getItem("nome");
  const contadorUsuario = sessionStorage.getItem("contador")

  if (nomeUsuario && contadorUsuario == 1) {
    // Se o usuário estiver logado, mostrar apenas "Ver Minha Conta"
    usuarioDiv.innerHTML = `
    <a style="opacity: 1; transition: .5s;" href="">Minha conta</a> <br> <br>`;
  } else {
    // Se não estiver logado, mostrar "Cadastre-se" e "Login"
    usuarioDiv.innerHTML = `
      <a style="opacity: 1; transition: .5s;" href="cadastro.html">Cadastre-se</a> <br> <br>`;
  }
});

// ----------------------------------------------------
// Barra de navegação
async function fetchData() {
  const response = await fetch("data.json");
  return response.json();
}

document
  .getElementById("searchBar")
  .addEventListener("input", async function () {
    let searchQuery = this.value.toLowerCase();
    let resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    let data = await fetchData();
    let filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );

    filteredData.forEach((item) => {
      let li = document.createElement("li");
      li.classList.add("item");
      li.href = "compra.html";

      // Criando a estrutura do item
      let div = document.createElement("div");
      div.id = item.id; // Definindo o ID da div como o ID do item do JSON
      div.name = item.name;
      div.description = item.description;
      div.img = item.img;
      div.preco = item.preco;

      div.onclick = function () {
        window.location.href = "compra.html";
        sessionStorage.setItem("Id", item.id);
        sessionStorage.setItem("Nome", item.name);
        sessionStorage.setItem("Descrisão", item.description);
        sessionStorage.setItem("Imagem", item.img);
        sessionStorage.setItem("Preço", item.preco);
      };

      div.innerHTML = `
            <h3>${item.name}</h3>
            <div class="item-content">
                <img src="${item.img}" alt="${item.name}">
                <p>${item.description}</p>
            </div> 
        `;

      li.appendChild(div);
      resultsContainer.appendChild(li);
    });
  });

// ----------------------------------------------------
async function displayItems() {
  let data = await fetchData(); // Supondo que fetchData() retorne uma lista de itens

  // Limpa o contêiner antes de adicionar novos itens
  const explore = document.getElementById("explore");
  explore.innerHTML = "";
  // Itera sobre todos os itens e os adiciona ao contêiner
  data.forEach((item) => {
      // Criando a estrutura do item
      let div = document.createElement("div");
      div.classList.add("caixa")
      div.id = item.id; // Definindo o ID da div como o ID do item do JSON
      div.name = item.name;
      div.description = item.description;
      div.img = item.img;
      div.preco = item.preco;
      div.href = "compra.html";

      div.onclick = function () {
        window.location.href = "compra.html";
        sessionStorage.setItem("Id", item.id);
        sessionStorage.setItem("Nome", item.name);
        sessionStorage.setItem("Descrisão", item.description);
        sessionStorage.setItem("Imagem", item.img);
        sessionStorage.setItem("Preço", item.preco);
      };

      div.innerHTML = `
        <h3>${item.name}</h3>
            <img src="${item.img}" alt="${item.name}">
            <p>${item.description}</p>
      `;

    explore.appendChild(div); // Adiciona o item ao contêiner explore
  });
}
displayItems();

// Adiciona evento para esconder a lista ao clicar fora do campo de busca
document.addEventListener("click", function (event) {
  let searchBar = document.getElementById("searchBar");
  let resultsContainer = document.getElementById("results");

  if (event.target !== searchBar && !resultsContainer.contains(event.target)) {
    resultsContainer.innerHTML = "";
  }
});

nomeComida = sessionStorage.getItem("Nome");
descrisaoComida = sessionStorage.getItem("Descrisão");
fotoComida = sessionStorage.getItem("Imagem");
precoComida = parseFloat(sessionStorage.getItem("Preço"));

nomeProduto = document.getElementById("nomeProduto").innerHTML = nomeComida;
descrisaoProduto = document.getElementById("descrisaoProduto").innerHTML =
  descrisaoComida;
fotoProduto = document.getElementById("fotoProduto").src = fotoComida;
precoProduto = document.getElementById(
  "precoProduto"
).innerHTML = `Preço original: US$ ${precoComida},00`;

// ----------------------------------------------------
// Frete e dolar

//autopreenchimento
const cepValido = (cep) => {
  if (cep.length == 8) {
    return true;
  } else {
    return false;
  }
};

let valorDolar;
fetch(`https://economia.awesomeapi.com.br/json/last/USD-BRL`)
  .then((resposta) => resposta.json())
  .then((economia) => {
    valorDolar = economia.USDBRL.bid;
    console.log(valorDolar);

    precoProdutoReal = document.getElementById(
      "precoProdutoReal"
    ).innerHTML = `Preço convertido para reais: R$ ${(
      precoComida * valorDolar
    ).toFixed(2)}`;

  });

function comprar() {
  let cep = sessionStorage.getItem("CEP"); // Obtendo o CEP salvo no cadastro
  if (!cep) {
    alert("Nenhum CEP cadastrado! Por favor, cadastre um CEP válido.");
    return;
  }

  // Função para buscar a API e calcular frete
  const pesquisarCEP = async () => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
      const dados = await fetch(url);
      const endereco = await dados.json();
      preencherformulario(endereco);
    }
  };

  let frete = 0;
  //preencher os inputs com arrow fuctions
  const preencherformulario = (endereco) => {
    regiao = endereco.regiao;
    console.log(regiao);
    if (regiao == "Nordeste") {
      frete = 15;
    } else if (regiao == "Norte") {
      frete = 12;
    } else if (regiao == "Centro-Oeste") {
      frete = 10;
    } else if (regiao == "Sul") {
      frete = 8;
    } else if (regiao == "Sudeste") {
      frete = 5;
    }
    document.getElementById("rua").innerHTML = `<p>O frete é igual a R$ ${frete} <\p>`
    valor = frete + valorDolar * precoComida

    document.getElementById("precoTotal").innerHTML = `<p>O total a pagar é de R$${valor.toFixed(2)}  <\p>`;

    document.getElementById("aparecer").style.display = "block"
  };
  pesquisarCEP(); // Chama a função de busca do CEP 
}
var contador = 0

function favorito() {
  contador += 1
  alert(contador)
}


function confirmar() {
  Swal.fire({
    title: "Compra Confirmada",
    text: `A compra de ${valor.toFixed(2)} foi concluida`,
    icon: "success"
  });

  document.getElementById("aparecer").style.display = "none"
}
function sair() {
  Swal.fire({
    title: "Compra cancelada",
    text: `Sua compra de ${valor.toFixed(2)} foi cancelada`,
    icon: "error"
  });

  document.getElementById("aparecer").style.display = "none"
}
