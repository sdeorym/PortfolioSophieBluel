//The code will develop within this function, once the DOM is completely loaded:
document.addEventListener('DOMContentLoaded', function () {     

    //We contact the API (asynchrone function).
    async function login(email, password) {
        let token;

        try {
            //We compare the introduced mail & passwords with those in the API.
            const response = await fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            //We process the response as JSON only if the request was successful
            const data = await response.json();

            //Different response options
            switch (response.status) {
                case 500:
                    alert("Votre utilisateur ou mot de passe n'est pas correct");
                    break;
                case 404:
                    alert("Votre utilisateur ou mot de passe n'est pas correct");
                    break;
                case 401:
                    alert("Votre utilisateur ou mot de passe n'est pas correct");
                    break;
                case 200:
                    // Store the token in the local storage (so we can reuse them in the 'admin' calls)
                    localStorage.setItem('authToken', data.token);
                    token = data.token;
                    window.location.href = './index.html';
                    return token;
                default:
                    alert('Erreur unconnue');
                    window.location.href = './login.html';
                    break;
            }           
            return null;
        }

        catch (error) {
            console.log('Erreur du serveur', error);
            return null; 
        }
    }

    //We obtain data from the form on the login page.
    const form = document.getElementById('loginform');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // We won't be sending the form by default

        //We get the specific data from the form
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        
        token = login(email, password);
    });
});
