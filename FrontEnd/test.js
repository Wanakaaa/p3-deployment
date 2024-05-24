const userData = JSON.parse(sessionStorage.getItem("user"));
const form = document.querySelector('form');


form.addEventListener('submit', (event)=> {
    event.preventDefault()
    const formData = new FormData(form);

    // for (item of formData) {
    //     console.log(item[0], item[1])
    // }

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
    .then(data => console.log('succes', data))
    .catch(error => console.error('error', error))
})

const uploadBtn = document.querySelector('.fileUploadBtn');
const fileInput = document.getElementById('fileUpload');

uploadBtn.addEventListener('click', (event) => {
    fileInput.click();
})



fileInput.addEventListener('change', previewPhoto);

function previewPhoto() {
    const file = fileInput.files;
    if (file) {
        const fileReader = new FileReader()
            const preview = document.getElementById('filePreview');
            fileReader.onload = event => {
                preview.setAttribute('src', event.target.result);
            }
            fileReader.readAsDataURL(file[0]);
        
            const previewDisplay = document.querySelector('.previewDisplay');
            previewDisplay.style.display = "block";
    }
}



