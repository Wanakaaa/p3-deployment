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

function replaceLoginByLogOut(){
    const liLogin = document.querySelector('nav ul li > a[href="./login.html"]');
    liLogin.innerText = 'Logout';
}

// function logOut()

function addModifierEdition() {
    const portfolioH2 = document.querySelector('#portfolio h2');
    const lienModifierWorksHTML = `<a class="differente" href="#"><i class="fa-regular fa-pen-to-square"></i> Modifier</a>`;
    portfolioH2.innerHTML += lienModifierWorksHTML;
}


// Création modal
function openModal() {
    const container = document.createElement('div');
    container.classList.add('container');
    const modalHTML =
    `
        <div id="simpleModal" class="modal">
        <div class="modal-content">
        
        </div>
    </div>
    `;

    container.innerHTML = modalHTML;

    
    portfolio.appendChild(container)

    const modal = document.querySelector('.modal');
    modal.style.display = 'block'

    setGalleryModal()

    const closeBtn = document.querySelector('.closeBtn i');
    closeBtn.addEventListener('click', closeBtnModal);
    window.addEventListener('click', outsideClick);

}

function setGalleryModal() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <span  class="closeBtn"><i class="fa-solid fa-xmark fa-sm"></i></span> <br>
        <h3 class="titreGallery">Galerie photo</h3>
        <div class= "galleryModal">
        </div>
        <hr>
        <button class="btnAddImg" type="submit">Ajouter une photo</button>
    `;
    getWorksModal();
    

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
        //Add eventListener sur button btnAddImg
        const btnAddImg = document.querySelector('.btnAddImg');
        btnAddImg.addEventListener('click', addNewImg);
        
    } else {
        console.log('erreur')
    }
}

function addNewImg() {
    let modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
    <div class="returnClose">
                <span class="returnBtn"><i class="fa-solid fa-arrow-left fa-sm"></i></span>
                <span class="closeBtn"><i class="fa-solid fa-xmark fa-sm"></i></span>
            </div>
            <br>
            <h3 class="titreModal">Ajout photo</h3>
            <div class="AddImgModal">
                <div>
                    <i class="fa-regular fa-image imgIcon"></i>
                </div>
                    <div><button class="addPhoto">+ Ajouter photo</button></div>
                    <div class="infoPhoto">jpg, png : 4mo max</div>
            </div>
            <div class="formAjoutPhoto">
                <form action="#" method="post">
                    <label for="titre">Titre</label>
                    <input type="text" name="titre" id="titre">

                    <label for="category">Catégorie</label>
                    <select type="category" name="category" id="category">
                        <option value="" disabled selected hidden></option>
                    </select>

                    <hr class="hrAddPhoto">
                    <input class="validerInput" type="submit" value="Valider">
                </form>
            </div>
    `;

    //Je dois récupérer mes catégories dynamiquement 
    const selectCategory = document.getElementById('category');
    for (let i= 0; i < categoriesGlobal.length; i++) {
        let categoryChoice = document.createElement('option')
        categoryChoice.classList.add('catChoice');
        categoryChoice.dataset.value = `categorie${categoriesGlobal[i].id}`;
        categoryChoice.innerText = `${categoriesGlobal[i].name}`
        selectCategory.appendChild(categoryChoice)
    }

    const closeBtn = document.querySelector('.closeBtn i');
    closeBtn.addEventListener('click', closeBtnModal);

    const returnBtn = document.querySelector('.returnBtn i');
    returnBtn.addEventListener('click', returnGalleryModal);

    const addPhoto = document.querySelector('.addPhoto');
    addPhoto.addEventListener('click', ()=> console.log('cliqué addPhoto'))

    const validerInput = document.querySelector('.validerInput');
    validerInput.addEventListener('click', (event)=> {
        event.preventDefault()
        console.log('cliqué validerInput')
    })
}


function returnGalleryModal() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = "";
    openModal()
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
        if (works.ok) {
        console.log(`Work ${id} deleted`)
        getWorksModal()
        displayWorks()
        }
    })
    .catch(error => console.error('Error', error));
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
let worksGlobal = [];
function displayWorks(){
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((works) => {
            updateGallery(works);
            // return works;
            worksGlobal = works;
        });
}

displayWorks()

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

