const userData = JSON.parse(sessionStorage.getItem("user"));
const form = document.querySelector('form');
const uploadBtn = document.querySelector('.fileUploadBtn');
const fileInput = document.getElementById('fileUpload');

uploadBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fileInput.click();
})

fileInput.addEventListener('change', previewPhoto);

function previewPhoto() {
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


form.addEventListener('submit', (event)=> {
    event.preventDefault()
    fetchNewWork()
})

function fetchNewWork() {
    const formData = new FormData(form);

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
}



