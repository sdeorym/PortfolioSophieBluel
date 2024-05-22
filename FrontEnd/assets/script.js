document.addEventListener("DOMContentLoaded", function () { //The code will develop within this function, once the DOM is completely loaded.
    
    let promise = fetchData ();

    async function fetchData () {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        console.log(data);
        return data;
    }

    promise.then(function(data) {
        console.log(data);
        let i = 0;
        let portfolio = "";
        let project; /*document.createElement("figure");*/ /*Parent figure for photos and captions.*/
        let projectTitle; /*document.createElement("figcaption");*/ /*The caption to the figure.*/
        let parents = []; /*The parent element to input our DOM elements*/
        let projectImage;
        let createdNewDiv;
        let categoryNames = [];
        let container = "";
        let buttons = "";
        let buttonClick = "";
        let choice = "";
        let filteredData;
        let portfolioData;

        // We create the categories name lists to create the buttons.
        for (i = 0; i < data.length; i++) {
                data.forEach((item) => {
                // We put the category names within an array
                categoryNames.push(item.category.name);
            });
        }

        let projectNames = new Set(categoryNames);

        /* We put categoryNames in an array to make the buttons then add a category 
        'Tous' at the beginning of the array so we have all filter buttons*/
        let buttonNames = Array.from(projectNames);
        buttonNames.unshift("Tous");

        //We select id portfolio to create h2, buttons and gallery
        portfolio = document.querySelector("#portfolio");

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

        projectGallery(portfolioData);

        //Filter choice and call to function.
        buttonClick = document.querySelectorAll("#portfolio .filters button");
        buttonClick.forEach (button => {
            button.addEventListener("click", () => {
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
            const project = document.createElement("figure");
            newGallery.appendChild(project);

            const projectImage = document.createElement("img");
            projectImage.src = item.imageUrl;
            projectImage.alt = item.title;
            project.appendChild(projectImage);

            const projectTitle = document.createElement("figcaption");
            projectTitle.innerText = item.title;
            project.appendChild(projectTitle);
        });
    }

});
