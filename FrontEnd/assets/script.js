let loginLogout = document.querySelector('.login_logout');
let logoutLogin = document.querySelector('.logout_login');
let dataModal = null;
let tinyGallery = [];
console.log(tinyGallery, "page start");

document.addEventListener("DOMContentLoaded", function () { //The code will develop within this function, once the DOM is completely loaded.
    
    let promise = fetchData ();
    var project; /*document.createElement("figure");*/ /*Parent figure for photos and captions.*/
    var projectTitle; /*document.createElement("figcaption");*/ /*The caption to the figure.*/
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
        } else {
            //It it is not active, we go directly to generate the filters.
            filterForging (data);
        }
    
        let portfolioData = data;
        projectGallery (portfolioData);

        function filterForging (data) {
            let filteredData;
            
            let categoryNames = [];

            // We create the categories name lists to create the buttons.
            // We put categoryNames in an array.
            data.forEach((item) => {
                categoryNames.push(item.category.name);
            });
        
            projectNames = new Set(categoryNames);        
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
            /*// Clear existing gallery content
            let portfolio = document.querySelector(".gallery");
            const existingGallery = document.querySelector("#portfolio .gallery");
            if (existingGallery) {
                existingGallery.remove();
            }    
            // Create new gallery div
            const newGallery = document.createElement("div");
            newGallery.classList.add("gallery");
            portfolio.appendChild(newGallery);*/
    
            let portfolio = document.querySelector(".gallery");
            console.log(portfolio);                
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
                console.log(tinyGallery, "tinyGallery populated");                
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
        it won't work if we don't connect with the database and buttons won't appear either*/
        //let h2 = portfolio.querySelector("h2");
        //if (h2) {
        //    portfolio.removeChild(h2);
        //}

        //let gallery = portfolio.querySelector("div.gallery");
        //if (gallery) {
        //    portfolio.removeChild(gallery);
        //}

        /*Now we create the DOM content dinamically*/
        //I create element <h2>Mes Projets</h2>
        //project = document.createElement("h2");
        //project.innerText = "Mes Projets";
        //portfolio.appendChild(project);

        //I create a div to contain my buttons

        //Filter choice and call to function.
        /*console.log("Bonjour", token);
        if (token == null) {
            filterForging ();
            console.log("no hay log que valga", token);                   
        } else {
            console.log("ni botón ni botona", token);
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
console.log("tinyGallery", tinyGallery, new Date().toString());
let modal = null;
const xMark = document.querySelector(".closingIcon");
let seeModal1 = document.querySelector('.modal');

//let openModal, closeModal;

document.querySelectorAll(".js-modal").forEach (a => {
    console.log("cucú");
    a.addEventListener('click', openModal);    
})

function openModal (e) {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    modal = target;    
    let tinyPortfolio = tinyGallery;  // Usa tinyGallery aquí
    tinyGalleryDisplay(tinyPortfolio); // Supongamos que tienes esta función para llenar el modal
    xMark.addEventListener('click', closeModal);
    seeModal1.style.display = 'block';
}

function closeModal (e) {
    if (modal === null) {
        return;
    }
    e.preventDefault();
    xMark.removeEventListener('click', closeModal);
    modal = null;
    seeModal1.style.display = 'none';
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
