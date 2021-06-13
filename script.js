const hamburgerButton = document.querySelector('#hamburger-btn');
const menuBox = document.querySelector(".menu-box")
const representationMajorSheet = document.querySelector(".representation-major-sheet")
const representationOldPrice = document.querySelector(".representation-block__price_old")
const representationSalePrice = document.querySelector(".representation-block__price_new")
const representationImage = document.querySelector(".representation-block__image")
const firstSlider = document.querySelector(".first-slider")

////Меню бургер/////////////

function hamburgerHandler() {
    if(hamburgerButton.className === "hamburger-btn__icon_activated") {
        hamburgerButton.className = "hamburger-btn__icon"
        menuBox.style.top = "-400px"
    } else {
        hamburgerButton.className = "hamburger-btn__icon_activated";
        menuBox.style.top = "0px"
    }
}
window.addEventListener("resize", ()=> {
    if(window.innerWidth >= 861) {
        hamburgerButton.className = "hamburger-btn__icon"
        menuBox.style.top = "-400px"
    }
})
hamburgerButton.addEventListener("click", hamburgerHandler)

//////главная витрина с обувью/////
const representationArray = new Array;

class Goods {
    constructor(options) {
        this.name = options.name
        this.oldPrice = options.oldPrice
        this.salePrice = options.salePrice
        this.directory = options.directory
    }
}
let nikeRedShoe = new Goods({name: "Red Nike",oldPrice: "9 900 ₽",salePrice: "1 900 ₽",directory: "images/running_shoes.png"});
let nikeGreenShoe = new Goods({name: "Green Nike", oldPrice: "8 999 ₽", salePrice: "1 750 ₽", directory: "images/running_shoes1.png"});
let nikePurpleShoe = new Goods({name: "Purple Nike", oldPrice: "10 100 ₽", salePrice: "2 100 ₽", directory: "images/running_shoes2.png"});
let nikeBlackShoe = new Goods({name: "Black Nike", oldPrice: "17 200 ₽", salePrice: "3 400 ₽", directory: "images/running_shoes3.png"});
representationArray.push(nikeRedShoe, nikeGreenShoe, nikePurpleShoe, nikeBlackShoe)
function sliderGetNammed(arr) {
    for(let i = 0; i < arr.length; i++){
        let li = document.createElement('li');
        let img = document.createElement("img");
        firstSlider.appendChild(li);
        li.className = `el${i}`;
        li.appendChild(img);
        img.src = `images/bar_passive.png`;
    }
    representationOldPrice.innerHTML = arr[0].oldPrice
    representationSalePrice.innerHTML = arr[0].salePrice
    representationImage.src = arr[0].directory
    firstSlider.children[0].children[0].src = "images/bar_active.png"
}

sliderGetNammed(representationArray)
