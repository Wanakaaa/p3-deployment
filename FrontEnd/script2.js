// Récupère les infos user dans le sessionStorage
const userData = JSON.parse(sessionStorage.getItem("user"));

// J'en ai besoin pour UpdateGallery et updateBtn  
const portfolio = document.getElementById("portfolio");
const gallery = document.querySelector(".gallery");

//Affichage de la gallery
if(userData) {
    replaceLoginByLogOut()
    createEditionBanner()
    addUpdateEdition()
    displayWorks()
    
} else {
    displayWorks()
    displayBtn()
}

//Récupérer les Works via l'API 
function getWorks(){
    return new Promise(function(resolve, reject) {
        fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => resolve(works))
        .catch(error => reject(error))
    })
}

//Mettre à jour la gallery avec les works
function updateGallery(works) {
    gallery.innerHTML = "";
    works.forEach((work) => {
        const workFigure = document.createElement("figure");
        workFigure.innerHTML = `
        <img src = "${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title} </figcaption>
        `;
        gallery.appendChild(workFigure);
    });
}

//Affiche les works sur index.html
function displayWorks(){
    getWorks()
    .then(works => {
        updateGallery(works);
    })
    .catch(error => console.error("Une erreur s'est produite", error))
}

//Récupérer les catégories via l'API
function getCategories(){
    return new Promise(function(resolve, reject){
        fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => resolve(categories))
        .catch(error => reject(error))
    })
}

function updateBtn(categories, works) {
    const divBtn = document.createElement('div')
    portfolio.appendChild(divBtn)
    portfolio.insertBefore(divBtn, gallery)
    divBtn.classList.add('btns-portfolio')

    // Pour le bouton Tous
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    btnTous.id = `btnTous`;
    divBtn.appendChild(btnTous);
    btnTous.addEventListener('click', () => {
        updateGallery(works)
    })

    //Pour les autres boutons : pour chaque catégorie, on crée un button, avec EventListener
    // sélectionnant la categoryList créée pour category.id spécifié
    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.innerText = category.name;
        btn.id = `btn${category.name}`;
        divBtn.appendChild(btn);
        btn.addEventListener('click', () => {
            let filteredWorks = filterCategory(works, category.id);
            updateGallery(filteredWorks)
        })
    });
}

//crée un nouveau tableau avec les éléments ayant la même catégory id 
function filterCategory(array, categoryId) {
    const categoryList = array.filter((element) => element.categoryId == categoryId);
    return categoryList;
}

function displayBtn() {
    getCategories()
    .then(categories => {
        getWorks()
        .then (works => updateBtn(categories, works))
        .catch(error => console.log("Une erreur s'est produite", error))
    })
    .catch(error => console.error("Une erreur s'est produite", error))
}

// ***************************** MAJ page édition ******************************* \\ 

// login doit devenir logout
function replaceLoginByLogOut(){
    const liLogin = document.querySelectorAll('nav ul li')[2];
    liLogin.setAttribute("id", "loginBtn")
    liLogin.innerHTML = `
    <a id="logoutBtn" href="./index.html"> logout</a>
    `

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', logOut)
}

function logOut(){
    sessionStorage.clear();
    const liLogout = document.getElementById('loginBtn');
    liLogout.innerText = 'Login'
}

// Ajout de la banner + modifier 

function createEditionBanner() {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    const banner = document.createElement('div');
    banner.classList.add('banner');
    banner.innerHTML =
    `
    <i class="fa-regular fa-pen-to-square"></i> Mode édition
    `;
    html.insertBefore(banner, body)
}

function addUpdateEdition() {
    const portfolioH2 = document.querySelector('#portfolio h2');
    const lienModifierWorksHTML = `<a class="differente" href="#"><i class="fa-regular fa-pen-to-square"></i> Modifier</a>`;
    portfolioH2.innerHTML += lienModifierWorksHTML;
}

// ***************************** Modal ******************************* \\ 
