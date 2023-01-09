function sendMessage(input) {
    // fetch("http://localhost:5000/send-message", {
    // Send the input to the server
    fetch("http://192.168.1.5:5000/send-message", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: input }),
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response.output);
            addChat(input, response.output);
        })
        .catch((error) => {
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            sendMessage(input);
        }
    });
});

function addChat(input, product) {
    const messagesContainer = document.getElementById("messages");

    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
    messagesContainer.appendChild(userDiv);

    let botDiv = document.createElement("div");
    let botImg = document.createElement("img");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botImg.src = "bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = "Typing...";
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
    // Keep messages at most recent
    messagesContainer.scrollTop =
        messagesContainer.scrollHeight - messagesContainer.clientHeight;

    // Fake delay to seem "real"
    setTimeout(() => {
        botText.innerText = `${product}`;
        // textToSpeech(product);
    }, 2000);
}