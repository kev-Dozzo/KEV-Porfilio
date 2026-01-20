const menu = document.getElementById("mobile-menu");
const manulink = document.querySelector(".nav-menu");
const carrouselTrack = document.querySelector('.project-content');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cards = document.querySelectorAll('.project-card')


//toggle nav
menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    manulink.classList.toggle("active")
})


//carrousel

let currentIdex = 0;

const cardWith = cards[0].offsetWidth + 20; //card with + margin

nextBtn.addEventListener('click', ()=>{
    if(currentIdex < cards.length - 1 ){
        currentIdex++
        carrouselTrack.style.transform=`translateX(-${currentIdex * cardWith}px)`;
    }
})

prevBtn.addEventListener('click', ()=>{
    if(currentIdex >0){
        currentIdex--;
        carrouselTrack.style.transform=`translateX(-${currentIdex* cardWith}px)`;
    }
})