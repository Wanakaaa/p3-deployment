
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
            afficherErreurConnexion()
        }
    })
    .then( response => {
        let user = response;
        sessionStorage.setItem("user", JSON.stringify(user));
        let data = JSON.parse(sessionStorage.getItem("user"));
        window.location.href = "index.html";
    })
});

// sophie.bluel@test.tld
// S0phie


function afficherErreurConnexion () {
    const loginForm = document.getElementById('loginForm');
    const messageErreur = document.createElement('div');
    messageErreur.innerHTML = `
        <p class= "erreurLogin">Identifiants incorrects. Veuillez réessayer </p>
    `;
    loginForm.appendChild(messageErreur)
}

