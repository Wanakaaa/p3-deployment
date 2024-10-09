// sophie.bluel@test.tld
// S0phie

//EvenListener au submit, on assigne email et password à loginData
// Qu'on passe en argument du fetch. Si succès, on lance handleLoginSuccess, sinon handleLoginError
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const loginData = getFormData();
    try {
        const response = await sendLoginRequest(loginData)
        handleLoginSuccess(response)
    } catch(error) {
        handleLoginError(error)
    }
});


// Fonction pour récupérer les valeurs du formulaire.
// {} car on veut créer un objet js, ce qui équivaut à return {email: email, password: password}
function getFormData(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    return {email, password};
}

// Fonction pour envoyer la requête de connexion au serveur.
// le JSON.stringify pour convertir l'objet JS en string


async function sendLoginRequest(data) {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error('Identifiants incorrects.')
        } 
        return await response.json()
    } catch(error) {
        throw new Error(error.message)
    }
}

function handleLoginError(error) {
    displayLoginError(error);
    console.log("erreur de connexion :", error.message)
}

function displayLoginError(error) {
    const loginForm = document.getElementById('loginForm');
    // if 
    const messageError = document.createElement('div');
    messageError.innerHTML = `
        <p class= "errorLogin">${error.message} Veuillez réessayer </p>
    `;
    loginForm.appendChild(messageError)
}

function handleLoginSuccess(response) {
    sessionStorage.setItem("user", JSON.stringify(response));
    window.location.href = "index.html";
}