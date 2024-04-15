let worksGlobal = [];

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    updateGallery(works);
    worksGlobal = works;

    console.log(worksGlobal);
    let btnTous = document.getElementById("btnTous");
    let btnObjets = document.getElementById("btnObjets");
    const btnApparts = document.getElementById("btnApparts");
    const btnHotels = document.getElementById("btnHotels");

    btnTous.addEventListener("click", function () {
    
    updateGallery(worksGlobal);
    });

    btnObjets.addEventListener("click", function () {
    updateGallery(filterCategory(worksGlobal, 1));
    });

    btnApparts.addEventListener("click", function () {
        updateGallery(filterCategory(worksGlobal, 2));
    });

    btnHotels.addEventListener("click", function () {
        updateGallery(filterCategory(worksGlobal, 3));
    });
  });

// Ajouter les boutons dans la partie portfolio, sous le h2 ?
// Ajouter 4 boutons : Tous / Objets / Appartements / Hotels & Restaurants

const portfolio = document.getElementById("portfolio");
const gallery = document.querySelector(".gallery");
// je crée la div pour les boutons
const divBtn = document.createElement("div");
portfolio.appendChild(divBtn);

// Tentative de boucle

let categoriesGlobal = [];
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    updateBtn(categories);

    categoriesGlobal = categories;
    console.log(categoriesGlobal);
  });

function updateBtn(categories) {
  const btnTous = document.createElement("button");
  btnTous.innerText = "Tous";
  btnTous.id = `btnTous`;
  divBtn.appendChild(btnTous);
  categories.forEach((categorie) => {
    const btn = document.createElement("button");
    btn.innerText = categorie.name;
    btn.id = `btn${categorie.name}`;
    divBtn.appendChild(btn);
    console.log(btn);
  });
}

portfolio.insertBefore(divBtn, gallery);

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

// Je défini les différents boutons

// let btnTous2 = document.getElementById("btnTous");
// let btnObjets = document.getElementById("btnObjets");
// const btnApparts = document.getElementById("btnApparts");
// const btnHotels = document.getElementById("btnHotels");

// btnTous2.addEventListener("click", function () {
//     updateGallery(worksGlobal);
//   });

// btnObjets.addEventListener("click", function () {
//   updateGallery(filterCategory(worksGlobal, 1));
// });

// btnApparts.addEventListener("click", function () {
//   updateGallery(filterCategory(worksGlobal, 2));
// });

// btnHotels.addEventListener("click", function () {
//   updateGallery(filterCategory(worksGlobal, 3));
// });

function filterCategory(array, categorieId) {
  const categoryList = array.filter((work) => work.categoryId == categorieId);
  return categoryList;
}
