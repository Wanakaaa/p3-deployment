
// fetch("http://localhost:5678/api/categories")
//     .then((response) => response.json())
//     .then((categories) => {
//         // updateBtn(categories);    
//         console.log('mes catégories', categories);
//     });
// fetch("http://localhost:5678/api/categories")
//     .then(data => data.json())
//     .then(json => console.log(json))

async function fetchCategories(){
const data = await fetch("http://localhost:5678/api/categories")
console.log(data.then(data.json()))
}

fetchCategories()