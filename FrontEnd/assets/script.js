document.addEventListener("DOMContentLoaded", function () { //The code will develop within this function, once the DOM is completely loaded.
    
    let promise = fetchData ();

    token = localStorage.getItem('authToken');
    console.log(token);

    if (token) {
        console.log("Token recuperado:", token);
        //If the token is active, we manipulate the DOM to include the black header and the modifier button.
        adminMode ();
    } else {
        console.log("No se encontró el token.");
    }


    async function fetchData () {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        return data;

        //This function connects with the API
    }

    promise.then(function(data) {
        //So when the connection is done we get our flamboyant variables.
        let i = 0;
        
        //Variables for DOM creation.
        let portfolio = ""; 
        
        let container = "";
        let buttons = "";
        let projectImage;

        //Filtering and buttons
        let categoryNames = [];  
        let buttonClick = [];
        let choice = "";
        let filteredData;
        let portfolioData;
        let projectNames;
        let buttonNames;        

        // We create the categories name lists to create the buttons.
        data.forEach((item) => {
            // We put the category names within an array
            categoryNames.push(item.category.name);
        });
        
        projectNames = new Set(categoryNames);

        /* We put categoryNames in an array to make the buttons then add a category 
        'Tous' at the beginning of the array so we have all filter buttons*/
        buttonNames = Array.from(projectNames);
        buttonNames.unshift("Tous");

        //We select id portfolio to create h2, buttons and gallery
        portfolio = document.querySelector("#portfolio");
        
        /*We eliminate the content of the DOM to insert it from the database;
        it won't work if we don't connect with the database and buttons won't appear either*/
        let h2 = portfolio.querySelector("h2");
        if (h2) {
            portfolio.removeChild(h2);
        }

        let gallery = portfolio.querySelector("div.gallery");
        if (gallery) {
            portfolio.removeChild(gallery);
        }

        /*Now we create the DOM content dinamically*/
        //I create element <h2>Mes Projets</h2>
        project = document.createElement("h2");
        project.innerText = "Mes Projets";
        portfolio.appendChild(project);

        //I create a div to contain my buttons
        container = document.createElement("div");
        container.classList.add("filters");
        portfolio.appendChild(container);
        portfolioData = data;

        for (i = 0; i < buttonNames.length; i++){
            buttons = document.createElement("button");
            buttons.innerText = buttonNames[i];
            container.appendChild(buttons);
        }

        //Filter choice and call to function.
        buttonClick = document.querySelectorAll("#portfolio .filters button");

        buttonClick[0].classList.add("active"); 

        projectGallery(portfolioData);       

        let callLogoutLogin = document.querySelector('.logout_login');
        callLogoutLogin.addEventListener('click', loggingOut);

        buttonClick.forEach (button => {
            button.addEventListener("click", () => {
                buttonClick.forEach(button => button.classList.remove("active"));
                button.classList.add("active");
                choice = button.innerText;

                if (choice === "Tous") {
                    filteredData = data;
                } else {
                    filteredData = data.filter(item => item.category.name === choice);
                }
            
            portfolioData = filteredData;
            projectGallery(portfolioData);
            });
        })

        
    });


    //This function displays the gallery once called on loading or pressing button.
    function projectGallery(portfolioData) {

        let project; /*document.createElement("figure");*/ /*Parent figure for photos and captions.*/
        let projectTitle; /*document.createElement("figcaption");*/ /*The caption to the figure.*/
        // Clear existing gallery content
        const existingGallery = document.querySelector("#portfolio .gallery");
        if (existingGallery) {
            existingGallery.remove();
        }

        // Create new gallery div
        const newGallery = document.createElement("div");
        newGallery.classList.add("gallery");
        portfolio.appendChild(newGallery);

        portfolioData.forEach(item => {
            project = document.createElement("figure");
            newGallery.appendChild(project);

            projectImage = document.createElement("img");
            projectImage.src = item.imageUrl;
            projectImage.alt = item.title;
            project.appendChild(projectImage);

            projectTitle = document.createElement("figcaption");
            projectTitle.innerText = item.title;
            project.appendChild(projectTitle);
        });
    }

    function adminMode () {
        loggingIn ();
        
        /*console.log("They're eating the dogs");
        
        edModeheader = document.querySelector('header');
        
        console.log('Ola ke ase');

        let edModeHeader;
        let edModeBar;
        let ;*/
        
        /*loginLogout = document.querySelector('.login_logout');
        loginLogout.textContent = "logout";

        console.log(loginLogout);
        /*
        document.querySelector('.edition_bar').style.display = 'block';
        document.querySelector('.edition_bar_text').style.display = 'block';        
        //document.querySelector('.filters').remove();*/
    }

    function loggingIn () { //What happens when we enter edition mode.
        let loginLogout = document.querySelector('.login_logout');
        loginLogout.style.display = 'none'; 
        let logoutLogin = document.querySelector('.logout_login');
        logoutLogin.style.display = 'block';
        return;
    }

    function loggingOut () { //What happens when we exit edition mode.
        let loginLogout = document.querySelector('.login_logout');
        loginLogout.style.display = 'block'; 
        let logoutLogin = document.querySelector('.logout_login');
        logoutLogin.style.display = 'none';
        localStorage.removeItem('authToken');
        return;
    }
});
