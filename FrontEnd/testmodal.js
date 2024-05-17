const userData = JSON.parse(sessionStorage.getItem("user"));

const portfolio = document.getElementById("portfolio");
const gallery = document.querySelector(".gallery");
const divBtn = document.createElement("div");

if (userData) {
    //Ajout bandeau noir

    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const banner = document.createElement('div');
    banner.classList.add('banner');
    banner.innerHTML =
    `
    <i class="fa-regular fa-pen-to-square"></i> Mode édition
    `;
    body.insertBefore(banner, header)

    //Remplacement login par logout
    const liLogin = document.querySelector('nav ul li > a[href="./login.html"]');
    liLogin.innerText = 'Logout';

    //Ajout du "modifier" à côté de "Mes projets"
    const portfolioH2 = document.querySelector('#portfolio h2');
    const lienModifierWorksHTML = `<a class="differente" href="#"><i class="fa-regular fa-pen-to-square"></i> Modifier</a>`;
    portfolioH2.innerHTML += lienModifierWorksHTML;

    const lienModifierWorks = document.querySelector('#portfolio h2 a');
    lienModifierWorks.addEventListener('click', createModal);
} else {
    portfolio.appendChild(divBtn);
    portfolio.insertBefore(divBtn, gallery);
    // Add class btns-portfolio 
    divBtn.classList.add('btns-portfolio');
}

function createModal() {
    //Créer div.modal + div.modal-content + span.closebtn + p
    const container = document.createElement('div');
    const modal = 
    `
        <div id="simpleModal" class="modal">
        <div class="modal-content">
            <span class="closeBtn">&times;</span> <br>
            <h3 class="titreGallery">Galerie photo</h3>
            <div class= "galleryModal"> 
            </div>
        </div>
    </div>
    `;
    container.innerHTML = modal;
    portfolio.appendChild(container)

    getWorksModal()
}


// Récupérer toutes les travaux de l'API

function getWorksModal(){
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then ((works) => {
        console.log(works)
        updateGalleryModal(works)
    })
}

function updateGalleryModal(works) {
    const galleryModal = document.querySelector('.galleryModal');
    if (galleryModal) {
        galleryModal.innerHTML = "";
        works.forEach((work) => {
        const workFigure = document.createElement("figure");
        workFigure.innerHTML = `
            <img src = "${work.imageUrl}" alt="${work.title}">
            `;
            galleryModal.appendChild(workFigure);
        });
    } else {
        console.log('erreur')
    }
}


// Afficher les travaux de l'API 



// let categoriesGlobal = [];
// fetch("http://localhost:5678/api/categories")
//     .then((response) => response.json())
//     .then((categories) => {
//         updateBtn(categories);

//         categoriesGlobal = categories;
//         console.log(categoriesGlobal);
//     });

// let worksGlobal = [];
// fetch("http://localhost:5678/api/works")
//     .then((response) => response.json())
//     .then((works) => {
//         updateGallery(works);
//         worksGlobal = works;
//     });


// function updateBtn(categories) {
//     const btnTous = document.createElement("button");
//     btnTous.innerText = "Tous";
//     btnTous.id = `btnTous`;
//     divBtn.appendChild(btnTous);
//     btnTous.addEventListener('click', () => {
//         updateGallery(worksGlobal)
//     })

//     categories.forEach((categorie) => {
//         const btn = document.createElement("button");
//         btn.innerText = categorie.name;
//         btn.id = `btn${categorie.name}`;
//         divBtn.appendChild(btn);
//         btn.addEventListener('click', () => {
//             let filteredWorks = filterCategory(worksGlobal, categorie.id);
//             updateGallery(filteredWorks)
//         })
//     });
// }


// // Afficher les données récupérée via l'API

// // 1. Définir gallery (en haut)
// // afficher tous les éléments au chargement de la page

// function updateGallery(works) {
//     gallery.innerHTML = "";
//     works.forEach((work) => {
//         const workFigure = document.createElement("figure");
//         workFigure.innerHTML = `
//         <img src = "${work.imageUrl}" alt="${work.title}">
//         <figcaption>${work.title} </figcaption>
//         `;
//         gallery.appendChild(workFigure);
//     });
// }



// function filterCategory(array, categorieId) {
//     const categoryList = array.filter((work) => work.categoryId == categorieId);
//     return categoryList;
// }

