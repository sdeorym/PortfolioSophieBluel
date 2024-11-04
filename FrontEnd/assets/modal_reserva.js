let modalOverlay = document.getElementById('modal-overlay');
let seeFirst = document.getElementById('#1stScreen'); //We choose 1st modal (aka the gallery)
let seeSecond = document.getElementById('#2ndScreen'); //We choose 2nd modal (aka "add a project")

seeModal1.style.opacity = '1';
seeFirst.style.display = 'block';

if (e.target === modalOverlay || e.target === xMark) {
    xMark.removeEventListener('click', closeModal);
    modalOverlay.style.display = 'none';
    modal = null;
}
