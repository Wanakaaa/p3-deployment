// Ajouter les boutons dans la partie portfolio, sous le h2 ?
// Ajouter 4 boutons : Tous / Objets / Appartements / Hotels & Restaurants

const portfolio = document.getElementById("portfolio");
const gallery = document.querySelector(".gallery");
// je crée la div pour les boutons
const divBtn = document.createElement("div");
portfolio.appendChild(divBtn);
portfolio.insertBefore(divBtn, gallery);

// Add class btns-portfolio 
divBtn.classList.add('btns-portfolio');


let categoriesGlobal = [];
fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
        updateBtn(categories);

        categoriesGlobal = categories;
        console.log(categoriesGlobal);
    });

let worksGlobal = [];
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
        updateGallery(works);
        worksGlobal = works;
    });


function updateBtn(categories) {
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    btnTous.id = `btnTous`;
    divBtn.appendChild(btnTous);
    btnTous.addEventListener('click', () => {
        updateGallery(worksGlobal)
    })

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