let loginLogout = document.querySelector('.login_logout');
let logoutLogin = document.querySelector('.logout_login');
let dataModal = null;
let tinyGallery = [];
let token; 
let theCategories = {};

document.addEventListener("DOMContentLoaded", function () { 
    //The code will develop within this function, once the DOM is completely loaded.
    let promise = fetchData ();
    var project; 
    var projectTitle; 
    let projectImage;
    
    async function fetchData () {
        //This function connects with the API
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        dataModal = data;         
        return data;    
    }

    promise.then(function(data) {
        //So when the connection is done we get our flamboyant variables.
        let i = 0;

        //Variables for DOM creation.    
        let container = "";
        let buttons = "";

        //Filtering and buttons
        let buttonClick = [];
        let choice = "";        
        let projectNames;
        let buttonNames;
        token = localStorage.getItem('authToken');

        if (token) {
            /*If the token is active, we manipulate the DOM to include the black header and the
            modifier button.*/
            loggingIn ();
            projectGallery(data);
            filterForging(data);
        } else {
            /*If it is not active, we go directly to generate the filters.
            Otherwise, filters won't come out when logging out.*/            
            buttonry(data);
        }
        
        function filterForging (data) {                       
            let categoryNames = [];
            let categoryId = [];
            let catProof = {};
            
            // We create the categories name lists to create the buttons.
            // We put categoryNames in an array.
            data.forEach((item) => {
                categoryNames.push(item.category.name);
                categoryId.push(item.category.id);
                catProof [item.category.id] = item.category.name;
            });

            theCategories = catProof;
            projectNames = new Set(categoryNames);

        }

        function buttonry (data) {
            filterForging (data);
            let filteredData; 

            /* We add a category 'Tous' at the beginning of the array so we have
            all filter buttons*/
            buttonNames = Array.from(projectNames);
            buttonNames.unshift("Tous");
            container = document.createElement("div");
            container.classList.add("filters");
            container.id = "idFilters";

            /* We search the element <h2> in portfolio section and we insert the
            filter container just after <h2>*/ 
            let portfolioTitle = document.querySelector("#portfolio h2");
            portfolioTitle.insertAdjacentElement("afterend", container);

            let portfolioData = data;

            for (i = 0; i < buttonNames.length; i++){
                buttons = document.createElement("button");
                buttons.innerText = buttonNames[i];
                container.appendChild(buttons);
            }
            buttonClick = document.querySelectorAll("#portfolio .filters button");
            buttonClick[0].classList.add("active");

            emptyGallery();
            projectGallery(portfolioData);

            buttonClick.forEach (button => {
                button.addEventListener("click", () => {
                    buttonClick.forEach(button => button.classList.remove("active"));
                    button.classList.add("active");
                    choice = button.innerText;
                    emptyGallery();
                    
                    if (choice === "Tous") {
                        filteredData = data;
                    } else {
                        filteredData = data.filter(item => item.category.name === choice);
                    }
                
                portfolioData = filteredData;
                projectGallery(portfolioData);
                return;
                });
                
            })       
        }

        function projectGallery(portfolium) {
            /* Clear existing gallery content
            let portfolio = document.querySelector(".gallery");
            const existingGallery = document.querySelector("#portfolio .gallery");
            if (existingGallery) {
                existingGallery.remove();
            }    
             Create new gallery div
            const newGallery = document.createElement("div");
            newGallery.classList.add("gallery");
            portfolio.appendChild(newGallery);*/
            let portfolio = document.querySelector(".gallery");
            
            portfolium.forEach(item => {
                project = document.createElement("figure");
                portfolio.appendChild(project);
    
                projectImage = document.createElement("img");
                projectImage.src = item.imageUrl;
                projectImage.alt = item.title;
                project.appendChild(projectImage);
    
                projectTitle = document.createElement("figcaption");
                projectTitle.innerText = item.title;
                project.appendChild(projectTitle);
                
                //We populate tinyGallery so we can use it in the modal
                tinyGallery.push(item);                
            });
            return;
        }

        /*We create a function to empty the gallery any time a button is pressed,
        so it is virgin when we see the selected photos.*/
        function emptyGallery () {
            let existingGallery = document.querySelector(".gallery");
            existingGallery.innerHTML = '';
            return;
        }

        /* We eliminate the content of the DOM to insert it from the database;
        it won't work if we don't connect with the database and buttons won't appear either
        //let h2 = portfolio.querySelector("h2");
        //if (h2) {
        //    portfolio.removeChild(h2);
        //}

        //let gallery = portfolio.querySelector("div.gallery");
        //if (gallery) {
        //    portfolio.removeChild(gallery);
        //}

        Now we create the DOM content dinamically
        I create element <h2>Mes Projets</h2>
        project = document.createElement("h2");
        project.innerText = "Mes Projets";
        portfolio.appendChild(project);

        I create a div to contain my buttons

        Filter choice and call to function.
        /*if (token == null) {
            filterForging ();                   
        }*/
    });

    //This function displays the gallery once called on loading or pressing button.

    let callLogoutLogin = document.querySelector('.logout_login');
    callLogoutLogin.addEventListener('click', loggingOut);
});

//In and out the admin mode
function loggingIn () { //What happens when we enter edition mode.
    loginLogout.style.display = 'none';
    logoutLogin.style.display = 'block';
    document.querySelector('.edition_bar').style.display = 'block';
    document.querySelector('.edition_bar_text').style.display = 'block';
    document.querySelector('.modify_projects').style.display = 'block';
}

function loggingOut () { //What happens when we exit edition mode.
    loginLogout.style.display = 'block'; 
    logoutLogin.style.display = 'none';
    document.querySelector('.edition_bar').style.display = 'none';
    document.querySelector('.edition_bar_text').style.display = 'none';
    document.querySelector('.modify_projects').style.display = 'none';
    localStorage.removeItem('authToken');
    window.location.reload(true);
}

//The js to open/close the modal window properly
let modal = null;
const arrow = document.querySelector(".backArrow")
const modalOverlay = document.querySelector('.modal-overlay');
let seeModal1 = document.querySelector('.modal');
let openModal2 = document.getElementById('changeWindow');
const modal1 = document.querySelector('.firstScreen');
const modal2 = document.querySelector('.secondScreen');
const photoAdd = document.querySelector('.formBottom');
let catSelect = document.getElementById('category');
const myButton = document.querySelector('.buttonToAdd');
const form = document.querySelector("#addingForm");
let workId = [];

/*** Here the variables for the form on modal 2nd screen.***/
//A function to show the chosen photo
//We choose the <input> that takes the photo.
const inputPhoto = document.querySelector(".file-input");

//We choose the div where the photo will appear
const photoShow = document.querySelector(".addWindow");

//We choose the elements that lose their transparency.
const opaque1 = document.querySelector(".addPhoto");
const opaque2 = document.querySelector(".photo-upload");
const opaque3 = document.querySelector(".belowButton");

//When we change inputPhoto, we will call a function to display it.
inputPhoto.addEventListener("change", updateImageDisplay);

//When we change inputTitle, we will save it.
const inputTitle = document.getElementById("title");
inputTitle.addEventListener("change", updateTitle);

//When we select a category, we save it.
catSelect.addEventListener("change", updateSelect);

//Two functions to pass from one modal page to another.
openModal2.addEventListener('click', nextPage);
arrow.addEventListener('click', previousPage);

//We call the functions to open and close the modal.
document.querySelectorAll(".js-modal").forEach (a => {
    a.addEventListener('click', openModal);    
})

document.querySelectorAll(".xMark").forEach (b => {
    b.addEventListener('click', closeModal);    
})

/* Two functions to open/close the modal, then two functions to switch the page when open. */
function openModal (e) {
    e.preventDefault();
    //We turn to visible both modal and first page    
    modalOverlay.style.visibility = 'visible';
    seeModal1.style.display = 'block';
    const target = e.target.getAttribute('href');
    modal = target;
    modal1.style.visibility = 'visible';
    photoAdd.style.visibility = 'hidden';

    //We empty the gallery so it does not show the gallery twice, then we show the correct gallery.
    emptyTinyGallery();
    let tinyPortfolio = []; 
    tinyPortfolio = tinyGallery; 
    tinyGalleryDisplay(tinyPortfolio);
    delatable ();
}
function closeModal (e) {
    //We do nothing when modal is null
    if (modal === null) {
        return;
    }
    //We prevent the action default of the event (if any)
    e.preventDefault();
    //We empty the form on page 2, if needed
    //emptyForm;
    /*if (e.target === modalOverlay || e.target === xMark) {
        xMark.removeEventListener('click', closeModal);
        modalOverlay.style.display = 'none';
        seeModal1.style.display = 'none';
        modal = null;
        }*/
    modalOverlay.style.visibility = 'hidden';
    modal2.style.visibility = 'hidden';
    photoAdd.style.visibility = 'hidden';

    //xMark.removeEventListener('click', closeModal);
    seeModal1.style.display = 'none';
    modal = null; 
}
function nextPage () {
    /*It opens when the "Ajouter 1 photo" is pressed on modal page 1.
    It charges the categories in the select.*/
    modal1.style.visibility = 'hidden';
    modal2.style.visibility = 'visible';
    photoAdd.style.visibility = 'visible';
    dropDown ();
    myButton.classList.remove('buttonToAddActive');
    myButton.disabled = true;
}
function previousPage () {
    //We empty the form on page 2, if needed
    //emptyForm;
    modal1.style.visibility = 'visible';
    modal2.style.visibility = 'hidden';
    photoAdd.style.visibility = 'hidden';
}

//Functions to display the gallery.
let currentWorkId;
function tinyGalleryDisplay(portfolia) {
    let modalPortfolio = document.querySelector(".modalGallery");
    portfolia.forEach(item => {
        currentWorkId = item.id;
        workId.push(currentWorkId);
        let tinyGallery = document.createElement("figure");
        modalPortfolio.appendChild(tinyGallery);
        let tinyProjectImage = document.createElement("img");
        tinyProjectImage.src = item.imageUrl;
        tinyProjectImage.className = 'modalCanvas';        
        tinyGallery.appendChild(tinyProjectImage);
        insertIcon (tinyGallery);
    }); 
    return;
}

function insertIcon (container) {    
    const svgElement = `<svg class="dustbinIcon" id="work`+ currentWorkId + `"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/>
		</svg>`;
    container.innerHTML += svgElement;
    return;
} 
//A ver cómo haces para que esto salga en la moda, porque sale hasta abajo.*/

/*We create a function to empty the tiny gallery any time a button is pressed, 
so it is brand new when we see the selected photos.*/
function emptyTinyGallery () {
    let existingTinyGallery = document.querySelector(".modalGallery");
    existingTinyGallery.innerHTML = '';
    return;
}

//Functions to fill in the form to update the portfolio
//Uploading the photo and showing it.
let keptImage;
function updateImageDisplay() {
    //'Tis the photo we upload
    const photoFile = inputPhoto;

    //'Tis the photo type o' file
    let fileType = photoFile.files[0].type;

    //'Tis the photo size
    let fileSize = photoFile.files[0].size;
    
    //let shownPhoto = document.createElement("div");
    let typeBool = photoType(fileType);
    let sizeBool = photoSize(fileSize);
   
    if ((typeBool === true) && (sizeBool === true)) {
        goOpaque();    
        const image = document.createElement("img");
        image.src = URL.createObjectURL(photoFile.files[0]);
        image.classList.add('newPhoto');
        photoShow.appendChild(image);
        keptImage = image.src;

        fieldCheck();
    }
}
function photoType(fileType) {
    if ((fileType === "image/jpeg") || (fileType === "image/png")) {
        return true;
    } else {        
        alert("Type de fichier non valide.");
        return false;
    }
}
function photoSize(fileSize) {
    if (fileSize <= 4194304) {
        return true;
    } else {        
        alert("Fichier trop grand.");
        return false;
    }
}
function goOpaque() {
    opaque1.style.opacity = 0;
    opaque2.style.opacity = 0;
    opaque3.style.opacity = 0;
}
//Updating the title of the photo.
function updateTitle() {
    let realTitle = inputTitle.value;
    if (realTitle === "") {
        alert('Il faut introduire un titre pour la photo');
    } else {
        fieldCheck();
    }
}

//Updating the category (first we fill in the options, then update)
//A function to fill the options of form Select.
function dropDown () {
    const blankOption = document.createElement("option");
    blankOption.value = "";
    blankOption.textContent = "";
    blankOption.selected = true;
    blankOption.disabled = true;
    catSelect.appendChild(blankOption);

    //'use strict';
    for (const [key, name] of Object.entries(theCategories)) {
        let optSelect = document.createElement("option");
        optSelect.value = key;
        optSelect.textContent = name;
        catSelect.appendChild(optSelect);
        optSelect.classList.add("insideTheBox");
    }
}

function updateSelect() {  
    let selection = catSelect.options[catSelect.selectedIndex].value;
    let selectText = catSelect.options[catSelect.selectedIndex].text;
    if (selectText === "") {
        alert ("Il faut choisir une des trois options réelles.")
    } else {   
        fieldCheck();
    }
}

function fieldCheck() {
    let texting = inputTitle.value;
    let selecting = catSelect.value;
    if ((keptImage != '') && (texting != '') && (selecting != '')){
        buttonActive();
    }
}

function buttonActive() {
    let dataToSend = {};
    myButton.classList.add('buttonToAddActive');
    myButton.disabled = false;
    //Desde aquí tienes que llamar a la función asíncrona para el post.
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        dataToSend["title"] = inputTitle.value;
        dataToSend["imageUrl"] = keptImage;
        dataToSend["category"] = parseInt(catSelect.selectedIndex, 10);
        sendData(dataToSend);        
    })
}

//The method POST is deployed here.
async function sendData(data) {
    // We associate the formData object with the form element
    let tokenable = 'Bearer ' + token;
    let dataToSend = JSON.stringify(data);
    console.log("Los datos", data, "El stringified", dataToSend, JSON.stringify(data));
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',  
                'Authorization': tokenable   
            },
            // Set the FormData instance as the request body
            body: dataToSend        
        });
        const status = response; 
            return status;
        } catch (err) {
            // handle error
            console.error(err);
        }
        
};

function delatable () {
    let chosenOne = document.querySelectorAll('svg');
    chosenOne.forEach (c => {
        c.addEventListener('click', chooseWork);    
    })
}
let delId;
function chooseWork (event) {
    let hypothesis = event.target.nodeName;
    let childId = event.target.id;
    let parentId= event.target.parentElement.id;
    let delatableId;
    
    //By this conditional we choose the correct work to eliminate.
    if (hypothesis === 'svg') {
        delatableId = childId;
    } else if (hypothesis === 'path') {
        delatableId = parentId;
    } else {
        console.log ("Syntax error.");
    }
    
    delId = parseInt(delatableId.replace(/\D/g, ''));
    console.log ("El trabajo que se borra ", delId);
    workDelete(delId);
}

function workDelete (work) {
    // We associate the formData object with the form element
    let endPoint = "http://localhost:5678/api/works/" + work;
    let tokenable = 'BearerAuth:' + token;
    try {
        const response = fetch(endPoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',  
            'Authorization': tokenable   
        },
        // Set the FormData instance as the request body
        //body:{}                    
    });
    console.log("Ola ke ase, borra ", work, "o ke ase"); 
    console.log("lo que responde jason al enviar", response/*.json()*/);
    } catch (e) {
        console.error(e);
    }
}

//);gonnaDelete.addEventListener("click", chooseWork);
/*function chooseWork() {
    const gonnaDeleteById = gonnaDelete.id;
    console.log(gonnaDeleteById);        
}*/
    
/*const response = await fetch("http://localhost:5678/api/works{}", {
    let tokenable = 'Bearer ' + token;
    method: "DELETE",
    headers: {
        'Authorization': tokenable   
    },*/

/*He intentado postear un producto con los datos existentes el form de html.
Me ha mandado un mensaje 401 (no autoriçado). Hace falta el token.
El token está arriba, en la función asíncrona get. Habrá que declararlo fuera y que cobre valor
en la función asíncrona y así se podrá invocar al validar el formulario.
Una vez hecho eso, ver si permite meter el formulario tal cual o hay que hacerle más adaptaciones.*/

/*function emptyForm() {
    const preview = document.querySelector("newPhoto");
    preview.src = '';
    preview.style.display = 'none';
    const title = document.getElementById("title");
    title.value='';
    const select=document.getElementById("category");
    select.value='';
    document.getElementById('addingForm').reset();    
    opaque1.style.opacity = 1;
    opaque2.style.opacity = 1;
    opaque3.style.opacity = 1;
}*/

