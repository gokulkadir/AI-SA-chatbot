function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");

    // Add user message
    let userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.innerHTML = `<p>${userInput}</p>`;
    chatBox.appendChild(userMessage);

    // Clear input field
    document.getElementById("user-input").value = "";

    // Send request to Flask backend
    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Add bot response
        let botMessage = document.createElement("div");
        botMessage.className = "chat-message bot";
        botMessage.innerHTML = `<p>🤖 ${data.reply}</p>`;
        chatBox.appendChild(botMessage);

        // Auto-scroll to latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => console.error("Error:", error));
}
