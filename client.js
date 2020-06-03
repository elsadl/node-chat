const msgForm = document.body.querySelector("#send-msg");
const msgInput = document.body.querySelector("#send-msg input");
const conversation = document.body.querySelector("#conversation");
const wrapper = document.body.querySelector(".wrapper");

const pseudoForm = document.body.querySelector("#pseudo-choice");
const pseudoInput = document.body.querySelector("#pseudo-choice input");
const pseudoLabel = document.body.querySelector("#pseudo-label");

const socket = io();

// si page d'accueil
if (window.location.pathname == "/") {

    pseudoInput.focus();

    // fonction choix pseudo
    pseudoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("hello ", pseudoInput.value);

        if (pseudoInput.value == "") {
            pseudoLabel.innerHTML += "!";
            return;
        }
        localStorage.setItem("pseudo", pseudoInput.value);
        localStorage.setItem("color", getRandomColor());
        document.location.href = "/chat";
    })
}


// si page du chat
if (document.location.pathname == "/chat") {
    socket.emit("new", {pseudo: localStorage.pseudo, color: localStorage.color});
    console.log("c tipar", localStorage.pseudo)
    // positionne directement le curseur dans l'input 
    // au chargement de la page
    msgInput.focus();

    // fonction envoi message
    msgForm.addEventListener("submit", (e) => {

        e.preventDefault();
        console.log(msgInput.value);
        msgInput.focus();

        socket.emit("chat message", {pseudo: localStorage.pseudo, color: localStorage.color, msg: msgInput.value});
        msgInput.value = "";

        console.log("xx", wrapper.scrollTop);

        return false;
    })

    socket.on("new", function (data) {
        console.log("???")
        conversation.innerHTML += `<li><span class="dot" style="color: ${data.color}">⬤ </span><span class="pseudo">${data.pseudo}</span><span class="info"> a rejoint le chat !</span></li>`
    })

    socket.on("disconnect", function (data) {
        conversation.innerHTML += `<li><span class="info" >Quelqu'un est parti en catimini...</li>`
    })



    // fonction imprime messages envoyés
    socket.on("chat message", function (data) {
        conversation.innerHTML += `<li><span class="dot" style="color: ${data.color}">⬤ </span><span class="pseudo" >${data.pseudo}:</span> ${data.msg}</li>`
        wrapper.scrollTop = wrapper.scrollHeight;

    })

}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  