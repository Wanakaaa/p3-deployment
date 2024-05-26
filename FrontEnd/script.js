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
        <div id="modal" class="modal">
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
        <div class="modalHeader">
            <span class="closeBtn">
                <i class="fa-solid fa-xmark fa-xl"></i>
            </span>
        </div>

        <h3 class="modalTitle">Ajout photo</h3>
        <div class= "galleryModal"></div>
        <hr class="hrGalleryModal" >
        <button class="btnAddImg" type="submit">Ajouter une photo</button>
    `;
    getWorksModal();
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
        btnAddImg.addEventListener('click', addNewWork);
        
    } else {
        console.log('erreur')
    }
}

// J'en suis la ---- Attention ligne 134, addNewImg est en commentaire


function addNewWork() {
    let modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
    <div class="modalHeader">
          <span class="returnBtn"
            ><i class="fa-solid fa-arrow-left fa-xl"></i
          ></span>
          <span class="closeBtn"><i class="fa-solid fa-xmark fa-xl"></i></span>
    </div>

    <h3 class="modalTitle">Ajout photo</h3>

    
    <div class="imgUploadForm">
    <form id="formModal" method="post">
      <fieldset id="photoFieldset" class="uploadPhotoForm">
        <label for="fileUpload" class="fileUploadLabel">
          <i class="fa-regular fa-image fa-4x uploadImgIcon"></i>
        </label>
        <input type="button" id="fileUploadButton" class="fileUploadBtn" value="+ Ajouter photo" required/>
        <input
            type="file"
            accept=".jpg, .jpeg, .png"
            id="fileUpload"
            name="image"
        />
        <div class="infoPhoto">jpg, png : 4mo max</div>
        <div id="errorMissingFile">Merci d'ajouter une image</div> 
      </fieldset>
      <span id="displayPreviewContainer"></span>

      <fieldset class="inputFields">
        <label for="titre">Titre</label>
        <input type="text" name="title" id="titleWork" required/>

        <label for="category">Catégorie</label>
        <div>
          <select type="category" name="category" id="category" required>
            <option value="" disabled selected hidden></option>
          </select>
        </div>
      </fieldset>

      <hr class="hrAddPhoto" />

      <input id="envoyerBtn" class="validerInput" type="submit" value="Valider"
      />
    </form>
  </div>
    `;

    const modalHeader = document.querySelector('.modalHeader');
    modalHeader.style.justifyContent = "space-between";

    getCategories()
    
    const closeBtn = document.querySelector('.closeBtn i');
    closeBtn.addEventListener('click', closeBtnModal);

    const returnBtn = document.querySelector('.returnBtn i');
    returnBtn.addEventListener('click', returnGalleryModal);

    setupFileUpload()

    const formModal = document.getElementById('formModal');
    formModal.addEventListener('submit', (event) => {
        event.preventDefault()
        fetchNewWork()
    })

}

function setupFileUpload() {
    const uploadBtn = document.querySelector('.fileUploadBtn');
    const fileInput = document.getElementById('fileUpload');

    uploadBtn.addEventListener('click', (event) => {
        event.preventDefault();
        fileInput.click();
})

fileInput.addEventListener('change', previewPhoto);
}

function previewPhoto() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    if (file) {
        displayPreviewHTML()
        const fileReader = new FileReader()
            const preview = document.getElementById('filePreview');
            fileReader.onload = event => {
                preview.setAttribute('src', event.target.result);
            }
            fileReader.readAsDataURL(file);
    }
}

function displayPreviewHTML() {
    const uploadPhotoForm = document.getElementById('photoFieldset');
    uploadPhotoForm.style.display = "none";
    const spanDisplayPreviwContainer = document.getElementById('displayPreviewContainer')
    spanDisplayPreviwContainer.classList.add('imgPreviewContainer');
    spanDisplayPreviwContainer.innerHTML = `
        <img
        class="imgPreview"
        src=""
        alt=""
        id="filePreview"
        >
    `;
    spanDisplayPreviwContainer.appendChild(document.getElementById('fileUpload'))
}

function fetchNewWork() {
    const formModal = document.getElementById('formModal');
    const formData = new FormData(formModal);
    const categoryId = document.querySelector('#category').value;
    formData.set('category', categoryId)

    const fileInput = document.getElementById('fileUpload');
    const errorMessage = document.getElementById('errorMissingFile');

    if (!fileInput.files.length) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${userData.token}`
        },
        body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('succes', data)
            displayWorks()
        })
        .catch(error => console.error('error', error))
}


function getCategories() {
    const selectCategory = document.getElementById('category');
    for (let i= 0; i < categoriesGlobal.length; i++) {
        let categoryChoice = document.createElement('option')
        categoryChoice.classList.add('catChoice');
        categoryChoice.value = `${categoriesGlobal[i].id}`;
        categoryChoice.innerText = `${categoriesGlobal[i].name}`
        selectCategory.appendChild(categoryChoice)
    }
}



function returnGalleryModal() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = "";
    openModal()
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

