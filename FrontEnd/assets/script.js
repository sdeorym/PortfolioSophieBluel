let loginLogout = document.querySelector('.login_logout');
let logoutLogin = document.querySelector('.logout_login');
let dataModal = null;
let tinyGallery = [];
let dropDownCategories = []; 

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
        let token = localStorage.getItem('authToken');

        if (token) {
            /*If the token is active, we manipulate the DOM to include the black header and the
            modifier button.*/
            loggingIn ();
            projectGallery(data);
            filterForging(data);
        } else {
            /*It it is not active, we go directly to generate the filters.
            Otherwise, filters won't come out when logging out.*/            
            buttonry(data);
        }
        
        function filterForging (data) {
            let filteredData;            
            let categoryNames = [];
            
            // We create the categories name lists to create the buttons.
            // We put categoryNames in an array.
            data.forEach((item) => {
                categoryNames.push(item.category.name);
            });
            projectNames = new Set(categoryNames);
            
            //We introduce the categories in dropDownCategories so we'll use them later.
            projectNames.forEach((item) =>{
                dropDownCategories.push(item);
            });
            console.log(dropDownCategories, dropDownCategories.length);
        }

        function buttonry (data) {
            filterForging (data);

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
let catSelect="";
let optSelect="";

document.querySelectorAll(".js-modal").forEach (a => {
    a.addEventListener('click', openModal);    
})

document.querySelectorAll(".xMark").forEach (b => {
    b.addEventListener('click', closeModal);    
})

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
}

function closeModal (e) {
    //We do nothing when modal is null
    if (modal === null) {
        return;
    }
    //We prevent the action default of the event (if any)
    e.preventDefault();
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

function tinyGalleryDisplay(portfolia) {
    let modalPortfolio = document.querySelector(".modalGallery");
    portfolia.forEach(item => {
        let tinyProject = document.createElement("figure");
        modalPortfolio.appendChild(tinyProject);

        let tinyProjectImage = document.createElement("img");
        tinyProjectImage.src = item.imageUrl;
        tinyProject.appendChild(tinyProjectImage);
    });    
    return;
}

/*We create a function to empty the tiny gallery any time a button is pressed, 
so it is brand new when we see the selected photos.*/
function emptyTinyGallery () {
    let existingTinyGallery = document.querySelector(".modalGallery");
    existingTinyGallery.innerHTML = '';
    return;
}

function nextPage () {
    /*It opens when the "Ajouter 1 photo" is pressed on modal page 1.
    It charges the categories in the select.*/
    modal1.style.visibility = 'hidden';
    modal2.style.visibility = 'visible';
    photoAdd.style.visibility = 'visible';
    dropDown ();
}

function previousPage () {
    modal1.style.visibility = 'visible';
    modal2.style.visibility = 'hidden';
    photoAdd.style.visibility = 'hidden';
}

function dropDown () {
    catSelect = document.getElementById('category');

    const blankOption = document.createElement("option");
    blankOption.value = "";
    blankOption.textContent = "";
    blankOption.selected = true;
    blankOption.disabled = true;
    catSelect.appendChild(blankOption);

    dropDownCategories.forEach(item => {        
        optSelect = document.createElement("option");        
        optSelect.value = item;
        optSelect.textContent = item;
        catSelect.appendChild(optSelect);
        optSelect.classList.add("insideTheBox");
    })
}

openModal2.addEventListener('click', nextPage);
arrow.addEventListener('click', previousPage);
