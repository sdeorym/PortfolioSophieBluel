document.addEventListener("DOMContentLoaded", function () { //The code will deroule within this function, once the DOM is completely loaded.
    
    async function fetchData () {
        const response = await fetch("http://localhost:5678/api/works");
        console.log(response);
        var data = await response.json();
        console.log(data.length);
        return data;
    }

    fetchData();

});



/*works (); 

let info = "";
let i = 0;

for (i = 0; i = data.length-1; i++){
    console.log(data[i].title);
}*/





