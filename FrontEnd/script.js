fetch ("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => console.log(data));

let gallery = document.querySelector(".gallery");

// fetch("http://localhost:5678/api/works")
//     .then((response) => response.json())
//     .then((works) => {
//     console.log(works);
//     console.log(gallery);

//     works.map(work => gallery.innerHTML += `<figure>
//     <img src="${work.imageUrl}" alt="${work.title}"> <figcaption> ${work.title}</figcaption> </figure>`)
//     });

// Bouton à ajouter Tous / Objets (categoryId 1) / Appartements (catId 2) / Hotels & restaurants (cat3)


// Je crée la div btn
const portofolioSection = document.getElementById('portfolio');
const newDivBtn = document.createElement('div');
const titrePortfolio = portofolioSection.querySelector('h2');
portofolioSection.insertBefore(newDivBtn, titrePortfolio.nextSibling)

newDivBtn.classList.add('borderBtn');
newDivBtn.style.background = "green";

const btnTous = document.createElement('button');
const btnObjet = document.createElement('button');
const btnAppart = document.createElement('button');
const btnHotel = document.createElement('button');
newDivBtn.append(btnTous);
btnTous.innerText = 'Tous';
btnObjet.innerText = 'Objets';
btnAppart.innerText = 'Appartements';
btnHotel.innerText = 'Hotels & restaurants';

btnTous.addEventListener('click', function(){
    fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
    console.log(works);

    
    console.log(gallery);

    works.map(work => gallery.innerHTML += `<figure>
    <img src="${work.imageUrl}" alt="${work.title}"> <figcaption> ${work.title}</figcaption> </figure>`)
    });
})

btnObjet.addEventListener('click', function(){
    fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
    console.log(works);
    console.log(gallery);

    works.filter(work => work.categoryId === 1).map(work => gallery.innerHTML += `<figure>
    <img src="${work.imageUrl}" alt="${work.title}"> <figcaption> ${work.title}</figcaption> </figure>`)
    });
})




// let btn = document.getElementById("btn1");
// // console.log(btn);

// btn.addEventListener("click", filterAppartment);

// function filterAppartment() {
//   updateWorks(2);
// }

// function updateWorks(categoryId = false) {
//   fetch("http://localhost:5678/api/works")
//     .then((response) => response.json())
//     .then((works) => {
//       console.log(works);
//       // categoryId == 2
//       // works == (11) [{...}, {...}, ...]

//       // supprimer le contenu de gallery
//       gallery.innerHTML = "";
//       // filter les elements de works en fonction de l'argument category
//       let filtered_works = [];
//       if (categoryId === false) {
//         filtered_works = works;
//       } else {
//         filtered_works = works.filter((work) => work.categoryId === categoryId);
//       }
//       // filtered_works == (6) [{...}, {...}, ...]

//       // pour chacun des works filtrer, ajouter le code html representant ce works dans la div gallery
//       // pour chacun des filtered_works, logguer la categoryId du work
//       for (let i = 0; i < filtered_works.length; i++) {
//         let work = filtered_works[i];

//         gallery.innerHTML += `<figure><img src="${work.imageUrl}" alt="${work.title}"> <figcaption> ${work.title}</figcaption> </figure>`;
//       }
//     });
// }

// updateWorks();

// `<figure><img src="${work.imageUrl}" alt="${work.title}"> <figcaption> ${work.title}</figcaption> </figure>`
