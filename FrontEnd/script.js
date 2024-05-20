const userData = JSON.parse(sessionStorage.getItem("user"));

const portfolio = document.getElementById("portfolio");
const gallery = document.querySelector(".gallery");
const divBtn = document.createElement("div");



if (userData) {
    createEditionBanner()
    replaceLoginByLogOut()
    addModifierEdition()

    const lienModifierWorks = document.querySelector('#portfolio h2 a');
    

    lienModifierWorks.addEventListener('click', openModal);
    // Remplacer createModal par openModal ? 
    // Juste appeler create modal quand openModal est appelée


} else {
    portfolio.appendChild(divBtn);
    portfolio.insertBefore(divBtn, gallery);
    // Add class btns-portfolio 
    divBtn.classList.add('btns-portfolio');
}


// Modification pour mode édition
function createEditionBanner () {
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const banner = document.createElement('div');
    banner.classList.add('banner');
    banner.innerHTML =
    `
    <i class="fa-regular fa-pen-to-square"></i> Mode édition
    `;
    body.insertBefore(banner, header)
}

function replaceLoginByLogOut(){
    const liLogin = document.querySelector('nav ul li > a[href="./login.html"]');
    liLogin.innerText = 'Logout';
}

function addModifierEdition() {
    const portfolioH2 = document.querySelector('#portfolio h2');
    const lienModifierWorksHTML = `<a class="differente" href="#"><i class="fa-regular fa-pen-to-square"></i> Modifier</a>`;
    portfolioH2.innerHTML += lienModifierWorksHTML;
}


// Création modal
function openModal() {
    const container = document.createElement('div');
    console.log(container);
    const modalHTML = 
    `
        <div id="simpleModal" class="modal">
        <div class="modal-content">
            <span class="closeBtn">&times;</span> <br>
            <h3 class="titreGallery">Galerie photo</h3>
            <div class= "galleryModal">
            </div>
            <hr>
            <button class="btnAddImg" type="submit">Ajouter une photo</button>
        </div>
    </div>
    `;

    container.innerHTML = modalHTML;
    portfolio.appendChild(container)

    const modal = document.querySelector('.modal');
    modal.style.display = 'block'

    getWorksModal();

    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.addEventListener('click', closeBtnModal);
    window.addEventListener('click', outsideClick);


}

function closeBtnModal() {
    const modal = document.querySelector('.modal')
    modal.style.display = "none";
}

function outsideClick(event){
    const modal = document.querySelector('.modal')
    if(event.target == modal){
        modal.style.display = "none";
    }
}

// Récupérer toutes les travaux de l'API pour la modal
function getWorksModal(){
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then ((works) => {
        updateGalleryModal(works)
    })
}

function updateGalleryModal(works) {
    const galleryModal = document.querySelector('.galleryModal');
    if (galleryModal) {
        galleryModal.innerHTML = "";
        works.forEach((work) => {
        const workFigure = document.createElement("div");
        workFigure.classList.add('containerBin')
        workFigure.innerHTML = `
            <img src = "${work.imageUrl}" alt="${work.title}">
            <div id='deleteBtn${work.id}' class="iconBin"><i class="fa-solid fa-trash-can fa-xs"></i>
            </div>
            `;
            galleryModal.appendChild(workFigure);
            
            // créer un id iconBin qui s'ajoute à la création for each

            const bin = document.querySelector(`#deleteBtn${work.id}`);
            bin.addEventListener('click', () => deleteWork(`${work.id}`));
        });
        
    } else {
        console.log('erreur')
    }
}


function deleteWork(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
})
    .then((works) => {
        console.log(`Work ${id} deleted`)
        getWorksModal()
    })
    
    // Vider la galleryModal
    const galleryModal = document.querySelector('.galleryModal');

    // Récupérer la liste des Works 

    //faire un appel à l'API pour récupérer les works
    // Enlever le work à l'index id (peut être id - 1) de la suite des works à afficher
    // Afficher la galleryModal avec cette nouvelle liste de works
    // Utiliser à présent cette liste de works

    // Quand on clique sur une poubelle, il faut récupérer l'index ? numéro de lélément
    // selectionné, et le supprimer pour qu'il n'apparaisse plus
}

// Récupération des catégories
let categoriesGlobal = [];
fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
        updateBtn(categories);
        categoriesGlobal = categories;
        // console.log(categoriesGlobal);
    });

// Récupération de l'ensemble des travaux, ajout à la gallery
displayWorks()

function displayWorks(){
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((works) => {
            updateGallery(works);
        });
}
// Création des boutons de catégories
function updateBtn(categories) {
    // Pour le bouton Tous
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    btnTous.id = `btnTous`;
    divBtn.appendChild(btnTous);
    btnTous.addEventListener('click', () => {
        updateGallery(worksGlobal)
    })

    // Pour les autres boutons
    categories.forEach((categorie) => {
        const btn = document.createElement("button");
        btn.innerText = categorie.name;
        btn.id = `btn${categorie.name}`;
        divBtn.appendChild(btn);
        btn.addEventListener('click', () => {
            let filteredWorks = filterCategory(worksGlobal, categorie.id);
            updateGallery(filteredWorks)
        })
    });
}


// Afficher les données récupérée via l'API

// 1. Définir gallery (en haut)
// afficher tous les éléments au chargement de la page

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



function filterCategory(array, categorieId) {
    const categoryList = array.filter((work) => work.categoryId == categorieId);
    return categoryList;
}

