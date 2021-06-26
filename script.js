const hamburgerButton = document.querySelector('#hamburger-btn');
const menuBox = document.querySelector(".menu-box")
const representationMajorSheet = document.querySelector(".representation-major-sheet")
const representationOldPrice = document.querySelector(".representation-block__price_old")
const representationSalePrice = document.querySelector(".representation-block__price_new")
const representationImage = document.querySelector(".representation-block__image")
const firstSlider = document.querySelector(".first-slider")
const secondSlider = document.querySelector(".second-slider")
const thirdSlider = document.querySelector(".third-slider")
const firstContainer = document.querySelector(".flex-showcase-first")
const secondContainer = document.querySelector(".flex-showcase-second")
const tShirtContainer = document.querySelector(".products-grid")






const btnLeftRepresentation = document.querySelector(".btn-slider__left")
const btnRightRepresentation = document.querySelector(".btn-slider__right")


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
const dressArray = new Array;
const tShirtsArray = new Array;

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
representationArray.push(nikeRedShoe, nikeGreenShoe, nikePurpleShoe, nikeBlackShoe);

//////витрина с платьями///////////

let coctailDress = new Goods({name: "Коктейльное <br> платье", oldPrice: "₽ 40 000", directory: "images/Rectangle2.png"});
let pinkDress = new Goods({name: "Розовое <br> платье", oldPrice: "₽ 12 000", directory: "images/Rectangle3.png"});
let superDress = new Goods({name: "Богатое <br> платье", oldPrice: "₽ 65 000", directory: "images/Rectangle4.png"});
let ballDress = new Goods({name: "Бальное <br> платье", oldPrice: "₽ 90 000", directory: "images/Rectangle5.png"});
dressArray.push(coctailDress, pinkDress, superDress, ballDress);

///////витрина с футболками//////

let firstTShirt = new Goods({name: "Футболка", oldPrice: "₽ 1 500", directory: "images/t-shirt.png"})
tShirtsArray.push(firstTShirt)
tShirtsArray.push(firstTShirt)
tShirtsArray.push(firstTShirt)
tShirtsArray.push(firstTShirt)
tShirtsArray.push(firstTShirt)
tShirtsArray.push(firstTShirt)
tShirtsArray.push(firstTShirt)
tShirtsArray.push(firstTShirt)

///////Слайдер глвное меню//////

let mainRepresentation = {
    position: -1,
    sliderGetNammed: function(arr, ulName) {
        for(let i = 0; i < arr.length; i++){
            let li = document.createElement('li');
            let img = document.createElement("img");
            ulName.appendChild(li);
            li.className = `el${i}`;
            li.appendChild(img);
            img.src = `images/bar_passive.png`;
        }
    },
    next: function(arr, firstPrice, secondPrice, img) {
        if(this.position >= arr.length - 1) {
            this.position = -1;
        }
        this.position++;
        let prevPosition = this.position - 1;
        if(prevPosition < 0) {
            prevPosition = arr.length - 1;
        }
        firstPrice.innerHTML = arr[this.position].oldPrice
        secondPrice.innerHTML = arr[this.position].salePrice
        img.src = arr[this.position].directory
        firstSlider.children[this.position].children[0].src = "images/bar_active.png"
        firstSlider.children[prevPosition].children[0].src = "images/bar_passive.png"
    },
    back: function(arr, firstPrice, secondPrice, img) {
        if(this.position <= 0) {
            this.position = arr.length;
        }
        this.position--;
        let prevPosition = this.position + 1;
        if(prevPosition > arr.length - 1) {
            prevPosition = 0;
        }
        firstPrice.innerHTML = arr[this.position].oldPrice
        secondPrice.innerHTML = arr[this.position].salePrice
        img.src = arr[this.position].directory
        firstSlider.children[this.position].children[0].src = "images/bar_active.png"
        firstSlider.children[prevPosition].children[0].src = "images/bar_passive.png"
    },
    ////метод для заполнения контейнера с платьями
    fillContainer: function(arr, container, strClassName) {
        for(let i = 0; i < arr.length; i++) {
            let newDiv = document.createElement("div")
            let newImg = document.createElement("img")
            let newH2 = document.createElement("h2")
            let newParagraph = document.createElement("p")
            newDiv.className = strClassName + i
            newImg.src = arr[i].directory
            newH2.innerHTML = arr[i].name
            newParagraph.innerHTML = arr[i].oldPrice
            container.appendChild(newDiv)
            newDiv.appendChild(newImg)
            newDiv.appendChild(newH2)
            newDiv.appendChild(newParagraph)
        }
    },
    sliderChoose: function(arr, firstPrice, secondPrice, img) {
        return function(event) {
            let newPosition;
            if (event.target.tagName === "IMG") {
                newPosition = Number(event.target.parentNode.className.match(/\d/))
            } else if (event.target.tagName === "UL") {
                return
            } else {
                newPosition = Number(event.target.className.match(/\d/))
            }
            if (newPosition != this.position) {
                do {
                    this.next(arr, firstPrice, secondPrice, img)
                } while(newPosition != this.position)
            }
            clearTimer();
        }
    },
    touchStart: 0,
    touchEnd: 0,
    touchStartFn: function(event) {
        this.touchStart = event.changedTouches[0].clientX
    },
    touchEndFn: function(endEvent) {
        this.touchEnd = endEvent.changedTouches[0].clientX
        if((this.touchStart + 100) < this.touchEnd) {
            leftClick()
        } else if(this.touchStart > (this.touchEnd + 100)) {
            rightClick()
        }
    }
}

///////свайпаем влево вправо - маин//////// 
let mainTouchStart = mainRepresentation.touchStartFn.bind(mainRepresentation)
let mainTouchEnd = mainRepresentation.touchEndFn.bind(mainRepresentation)
representationMajorSheet.addEventListener("touchstart", mainTouchStart)
representationMajorSheet.addEventListener("touchend", mainTouchEnd)




///выводим контент на страницу/////

mainRepresentation.sliderGetNammed(representationArray, firstSlider);
mainRepresentation.next(representationArray, representationOldPrice, representationSalePrice, representationImage);

mainRepresentation.sliderGetNammed(dressArray ,secondSlider)

mainRepresentation.sliderGetNammed(dressArray ,thirdSlider)

mainRepresentation.fillContainer(dressArray, firstContainer, "new-models new-models__")
mainRepresentation.fillContainer(dressArray, secondContainer, "new-models new-models__")
mainRepresentation.fillContainer(tShirtsArray, tShirtContainer, "goods goods-t-shirt__")

let timerSlider = setInterval(function() {
    mainRepresentation.next(representationArray, representationOldPrice, representationSalePrice, representationImage);
}, 4000);
///// кликаем по стрелочкам на главном слайдере/////

btnRightRepresentation.addEventListener("click", rightClick)
btnLeftRepresentation.addEventListener("click", leftClick)
function clearTimer() {
    clearInterval(timerSlider);
    timerSlider = setInterval(function() {
        mainRepresentation.next(representationArray, representationOldPrice, representationSalePrice, representationImage);
    }, 4000);
}
function rightClick() {
    mainRepresentation.next(representationArray, representationOldPrice, representationSalePrice, representationImage);
    clearTimer();
}
function leftClick() {
    mainRepresentation.back(representationArray, representationOldPrice, representationSalePrice, representationImage);
    clearTimer();
}

/////кликаем по элементам слайдера///// 
function funcSliderChoose(arr, firstPrice, secondPrice, img) {
    return mainRepresentation.sliderChoose(arr, firstPrice, secondPrice, img).bind(mainRepresentation)
}
let funcMainSliderChoose = mainRepresentation.sliderChoose(representationArray, representationOldPrice, representationSalePrice, representationImage).bind(mainRepresentation)
firstSlider.addEventListener('click', funcSliderChoose(representationArray, representationOldPrice, representationSalePrice, representationImage))

secondSlider.addEventListener('click', )

thirdSlider




// firstSlider.addEventListener('click', function(event){
//     if (event.target.tagName === "IMG") {
//         console.log(Number(event.target.parentNode.className.match(/\d/)))
//     } else {
//     console.log(Number(event.target.className.match(/\d/)))
//     }
// })
//////оптимизирование загрузки изображений/////

// function showWhatThis(event) {
//     let clickTarget = event.target
//     // if(clickTarget.document. == "img") {
//     //     console.log("haha")
//     // }
//     console.log(clickTarget.element)
// }
// setInterval('alert("прошла секунда")', 5000)

////////////слайдер витрина с платьями//////////////

///////test 

// let position = 0;
// const slidesToShow = 1; ///сколько элементов нам показывать
// const slidesToScroll = 1; ////сколько элементов нам показывать
// const container = document.querySelector(".slider-container")
// const track = document.querySelector(".slider-track")
// const item = document.querySelector(".slider-item")
// const itemWidth = container.offsetWidth / slidesToShow;
// const btnPrev = document.querySelector(".prev")
// const btnNext = document.querySelector(".next")

// btnPrev.addEventListener("click", back)
// btnNext.addEventListener("click", next)
// function next() {
//     track.style.transform += `translate(-${itemWidth}px)`;
//     position += 1;
//     if(position >= representationArray.length) {
//         position = 0;
//         track.style.transform = ``;
//     }
// }
// function back() {
//     track.style.transform += `translate(${itemWidth}px)`;
//     position -= 1;
//     if(position < 0) {
//         position = representationArray.length - 1;
//         track.style.transform = `translate(-${itemWidth * (representationArray.length - 1)}px)`;
//     }
// }

// function representation() {
    
  
//     let timerId = setInterval(next, 5000);
//   }
  
//   // использование:
//   representation();



/////рабочая но корявая функция

// sliderChoose: function(event) {
//     let newPosition;
//     if (event.target.tagName === "IMG") {
//         newPosition = Number(event.target.parentNode.className.match(/\d/))
//     } else if (event.target.tagName === "UL") {
//         return
//     } else {
//         newPosition = Number(event.target.className.match(/\d/))
//     }
//     if (newPosition != this.position) {
//         do {
//             this.next(representationArray)
//         } while(newPosition != this.position)
//     }
//     clearTimer();
// }