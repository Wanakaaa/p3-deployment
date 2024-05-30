//Ajout d'un eventListener sur loginForm, à l'envoi du form, ça va récupérer les valeurs 
// d'email et password, envoyer les données au serveur, 
// si réponse du serveur est 200 (ok) => on retourne response transformée en json
// sinon, on défini error = 'Identifiants incorrects'

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Récupère les valeurs des champs email et mot de passe
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password})
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            // Crée une nouvelle erreur
            throw new Error('Identifiants incorrects');
        }
    })
    .then(response => {
        // Si succès:
        let user = response;
        sessionStorage.setItem("user", JSON.stringify(user));
        window.location.href = "index.html";
    })
    // Si erreur
    .catch(error => {
        afficherErreurConnexion();
        console.error("Erreur de connexion :", error.message);
    })
});

// sophie.bluel@test.tld
// S0phie


function afficherErreurConnexion () {
    const loginForm = document.getElementById('loginForm');
    const messageErreur = document.createElement('div');
    messageErreur.innerHTML = `
        <p class= "errorLogin">Identifiants incorrects. Veuillez réessayer </p>
    `;
    loginForm.appendChild(messageErreur)
}

