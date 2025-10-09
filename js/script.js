const menu = document.getElementById("mobile-menu");
const manulink = document.querySelector(".nav-menu");

menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    manulink.classList.toggle("active")
})