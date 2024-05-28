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
    <a id="logoutBtn" href="./index.html">logout</a>
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
    const lienUpdateWorks = document.querySelector('#portfolio h2 a');
    lienUpdateWorks.addEventListener('click', openModal);
}

// ***************************** Modal ******************************* \\ 

// A METTRE A JOUR 
function openModal() {
    createModal()
    setGalleryModal()
    getWorks()
        .then(works => {
            updateGalleryModal(works);
        })
        .catch(error => console.error("Une erreur s'est produite", error))
}


//Création de la modal
function createModal() {
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
    addEventListenerCloseModal()
}

function updateGalleryModal(works) {
    const galleryModal = document.querySelector('.galleryModal');
    if (galleryModal) {
        galleryModal.innerHTML = "";
        works.forEach((work) => {
            const workElement = createWorkElementModal(work)
            galleryModal.appendChild(workElement);
            addDeleteEventListener(work)
        });
        addNewWorkEventListener()        
    } else {
        throw new Error('Erreur')
    }
}

            function createWorkElementModal(work) {
                const workFigure = document.createElement("div");
                workFigure.classList.add('containerBin')
                workFigure.innerHTML = `
                    <img src = "${work.imageUrl}" alt="${work.title}">
                    <div id='deleteBtn${work.id}' class="iconBin"><i class="fa-solid fa-trash-can fa-xs"></i>
                    </div>
                `;
                return workFigure;
            }

// function anonyme pour pas que la function soit excécutée directement
function addDeleteEventListener(work) {
    const bin = document.querySelector(`#deleteBtn${work.id}`);
    bin.addEventListener('click', () => deleteWork(work.id));
}

            function deleteWork(id) {
                return new Promise(function(resolve, reject) {
                    fetch(`http://localhost:5678/api/works/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userData.token}`
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log(`Work ${id} deleted`);
                            resolve(); // Résoudre la promesse si la suppression réussit
                        } else {
                            throw new Error('Erreur');
                        }
                    })
                    .catch(error => reject(error));
                })
                .then(() => {
                    return getWorks()})
                .then(works => {
                displayWorks();
                updateGalleryModal(works)
                })
                .catch(error => console.error('Error', error));
            }

            // A TESTER
            // async function deleteWork(id) {
            //     try {
            //         const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            //             method: 'DELETE',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 'Authorization': `Bearer ${userData.token}`
            //             }
            //         });
            
            //         if (!response.ok) {
            //             throw new Error('Erreur lors de la suppression du travail');
            //         }
            
            //         console.log(`Work ${id} deleted`);
            
            //         const works = await getWorks(); // Attendre la liste mise à jour des travaux
            //         displayWorks(); // Mettre à jour la galerie principale
            //         updateGalleryModal(works); // Mettre à jour la galerie modale
            //     } catch (error) {
            //         console.error('Error', error);
            //     }
            // }


function addNewWorkEventListener() {
    const btnAddImg = document.querySelector('.btnAddImg');
    btnAddImg.addEventListener('click', () => addNewWork());
}

            function addNewWork() {
                setNewWork()
            }

                    function setNewWork() {
                        let modalContent = document.querySelector('.modal-content')
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
                        addEventListenerCloseModal()
                        addEventListenerReturn()
                    }

                            function addEventListenerReturn() {
                                const returnBtn = document.querySelector('.returnBtn')
                                returnBtn.addEventListener('click', () => returnGalleryModal())
                            }

                                    function returnGalleryModal() {
                                        let modalContent = document.querySelector('.modal-content');
                                        modalContent = '';
                                        openModal()
                                    }

//Close la modal
function addEventListenerCloseModal() {
    const closeBtn = document.querySelector('.closeBtn i');
    closeBtn.addEventListener('click', closeBtnModal);
    window.addEventListener('click', outsideClick);
}


        function closeBtnModal(){
            const modal = document.querySelector('.modal')
            modal.style.display = "none";
        }


        function outsideClick(event){
            const modal = document.querySelector('.modal')
            if(event.target == modal){
                modal.style.display = "none";      
            }
        }
