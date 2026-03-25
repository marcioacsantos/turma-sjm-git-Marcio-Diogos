const nome = document.getElementById("nome");
const email = document.getElementById("email");
console.log("JS ligado");
const form = document.querySelector("form");
form.addEventListener("submit", function(e) {
e.preventDefault();
if (nome.value === "") {
    alert("Preencha o nome");
}
if (email.value === "") {
    alert("Preencha o email");
}
alert("Mensagem enviada com sucesso!");
form.reset();
});