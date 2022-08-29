const user = {
    name: undefined
}

const header = document.querySelector('.header');
const loginScreen = document.querySelector('.login-screen');
const loginBox = document.querySelector('.login-box');
const loadingGif = document.querySelector('.loading');
const chat = document.querySelector('.chat');
const userMessageBar = document.querySelector('.user-message-bar');


// Envio com Enter
document.addEventListener("keypress", (e)=> {
    if(e.key === "Enter") {
        const btn = document.querySelector("#submit-message");

        btn.click();
    }
})

//FUNCTIONS =========================================================

function tryLogin() {
    const username = document.querySelector('#username').value;
    
    if(username.length < 3) {
        alert("Nome deve conter pelo menos 3 caracteres");
        return;
    }

    user.name = username;

    const response = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", user);
    loginBox.classList.add('hidden');
    loadingGif.classList.remove('hidden');

    response.catch(() => {
        alert("Nome já existente, insira outro"); 
        loginBox.classList.remove('hidden');
        loadingGif.classList.add('hidden');
    })

    response.then(loginSucessfully);
    
}

function loginSucessfully() { 

    // Chat HTML
    loginScreen.classList.add('hidden');
    header.classList.remove('hidden');
    chat.classList.remove('hidden');
    userMessageBar.classList.remove('hidden');

    // Mantém usuário logado
    setInterval(activeUser, 5000)
    
    // Atualiza as mensagens
    setInterval(getMessages, 3000)  

}

function activeUser() {

    
    const response = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user);

    response.catch(()=>{
        location.reload();
    })

    response.then( (ok) => {
        console.log(ok.status)  
    })

}

function getMessages() {
    const response = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

    response.catch(()=>{
        location.reload();
    })

    response.then((messages)=>{
        chat.innerHTML = ""; // Reseta o conteúdo
        let text;
        let htmlMesssage;

        for (const message of messages.data){

            switch (message.type) {
                case "status": text = `${message.text}`;break;
                case "message": text = `para <span class="bold">${message.to}</span>: ${message.text}`;break
                case "private":text = `reservadamente para <span class="bold">${message.to}</span>: ${message.text}`;break
            }

            htmlMesssage =
            `
            <div class="message-container ${message.type}">
                <div class="message">
                    <span class="time">(${message.time})</span> 
                    <span class="bold name">${message.from} </span>${text}
                </div>
            </div>
            `

            chat.innerHTML += htmlMesssage;
            window.scrollTo(0, document.body.scrollHeight)
        }
    });

}

function sendMessage() {
    const message = document.querySelector('#user-message');


    const messageInfo = {
        from: user.name,
        to: "Todos",
        text: message.value,
        type: "message"
    }
    
    const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", messageInfo)

    request.catch(() => {
        window.location.reload();
    })

    // request.then(() =>{
    //     console.log('mensagem enviada');
    // })
    getMessages();
    
    message.value = "";
}