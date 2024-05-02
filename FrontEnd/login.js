let formLogin = document.getElementById('formLogin');
console.log(formLogin);

formLogin.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();
    console.log("Il n’y a pas eu de rechargement de page");

    // On récupère les deux champs et on affiche leur valeur
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    console.log(password);
    console.log(email);
});

fetch("http://localhost:5678/users/login",  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: '{"email": "sophie.bluel@test.tld", "password": "S0phie"}'
}) 
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })

// sophie.bluel@test.tld
// S0phie