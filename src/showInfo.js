const infoArray = ["Os números gerados por computadores ou celulares não são números REALMENTE aleatórios, eles são chamados de pseudo-aleatórios, porque, mesmo não parecendo, eles seguem um padrão.",
  "Caso essa opção esteja ativa, o programa fará uma requisição a um serviço que gera números aleatórios e os utiliza como valores dos dados.", 
  "Isso poderá causar uma pequena demora para os números serem carregados."];

const infoString = "Os números gerados por computadores ou celulares não são números REALMENTE aleatórios, eles são chamados de pseudo-aleatórios, porque, mesmo não parecendo, eles seguem um padrão.\n" + 
  "Caso essa opção esteja ativa, o programa fará uma requisição a um serviço que gera números aleatórios e os utiliza como valores dos dados.\n" + 
  "Isso poderá causar uma pequena demora para os números serem carregados.";

function showInfo() {
  const buttonText = document.createTextNode("Ok");

  const infoButton = document.createElement('button');
  infoButton.setAttribute("class", "info-button");
  infoButton.setAttribute("onclick", "removeInfo()");
  infoButton.appendChild(buttonText);

  const info = document.createElement("div");
  info.setAttribute("class", "info");
  info.setAttribute("id", "info-div");

  for (let i of infoArray) {
    let p = document.createElement("p");
    let text = document.createTextNode(i);
    p.appendChild(text);
    info.appendChild(p);
  }

  info.appendChild(infoButton);

  const infoBack = document.createElement("div");
  infoBack.setAttribute("class", "info-back");

  infoBack.appendChild(info)

  document.body.appendChild(infoBack);
}

function removeInfo() {
  const info = document.getElementsByClassName("info")[0];
  const infoBack = document.getElementsByClassName('info-back')[0];

  info.classList.add('hide');
  infoBack.classList.add('hide');

  infoBack.addEventListener('animationend', () => {
    infoBack.remove();
  })
}