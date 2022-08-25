const user = {
    name: undefined
}

const header = document.querySelector('.header');
const loginScreen = document.querySelector('.login-screen');
const loginBox = document.querySelector('.login-box');
const loadingGif = document.querySelector('.loading');
const chat = document.querySelector('.chat');
const userMessageBar = document.querySelector('.user-message-bar');

//FUNCTIONS =========================================================

function tryLogin(nome) {
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
    })

    response.then(loginSucessfully);
    
}

function loginSucessfully() { 

    // HTML
    loginScreen.classList.add('hidden');
    header.classList.remove('hidden');
    chat.classList.remove('hidden');
    userMessageBar.classList.remove('hidden');

    setInterval(activeUser, 5000)

    const response = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

    response.then(getMessages);
}

function activeUser() {
    const response = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user);
    // response.then( (ok) => {
    //     console.log(ok.status)
    // })

}

function getMessages(messages) {
    

}

function sendMessage() {
    message = document.querySelector('#user-message').value;
    console.log(message);

    axios.post()
}