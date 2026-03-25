const nome = document.getElementById("nome");
console.log("JS ligado");
const form = document.querySelector("form");
form.addEventListener("submit", function(e) {
e.preventDefault();
if (nome.value === "") {
    alert("Preencha o nome");
}
});