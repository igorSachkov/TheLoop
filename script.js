const hamburgerButton = document.querySelector('#hamburger-btn');
const menuBox = document.querySelector(".menu-box")
const representationMajorSheet = document.querySelector(".representation-major-sheet")
const representationOldPrice = document.querySelector(".representation-block__price_old")
const representationSalePrice = document.querySelector(".representation-block__price_new")
const representationImage = document.querySelector(".representation-block__image")
const firstSlider = document.querySelector(".first-slider")
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

let coctailDress = new Goods({name: "Коктейльное платье", oldPrice: "₽ 40 000", directory: "images/Rectangle2.png"});
let pinkDress = new Goods({name: "Розовое платье", oldPrice: "₽ 12 000", directory: "images/Rectangle3.png"});
let superDress = new Goods({name: "Богатое платье", oldPrice: "₽ 65 000", directory: "images/Rectangle4.png"});
let ballDress = new Goods({name: "Бальное платье", oldPrice: "₽ 90 000", directory: "images/Rectangle5.png"});
dressArray.push(coctailDress, pinkDress, superDress, ballDress);

///////Слайдер глвное меню//////

let mainRepresentation = {
    position: -1,
    sliderGetNammed: function(arr) {
        for(let i = 0; i < arr.length; i++){
            let li = document.createElement('li');
            let img = document.createElement("img");
            firstSlider.appendChild(li);
            li.className = `el${i}`;
            li.appendChild(img);
            img.src = `images/bar_passive.png`;
        }
    },
    next: function(arr) {
        if(this.position >= arr.length - 1) {
            this.position = -1;
        }
        this.position++;
        let prevPosition = this.position - 1;
        if(prevPosition < 0) {
            prevPosition = arr.length - 1;
        }
        representationOldPrice.innerHTML = arr[this.position].oldPrice
        representationSalePrice.innerHTML = arr[this.position].salePrice
        representationImage.src = arr[this.position].directory
        firstSlider.children[this.position].children[0].src = "images/bar_active.png"
        firstSlider.children[prevPosition].children[0].src = "images/bar_passive.png"
    },
    back: function(arr) {
        if(this.position <= 0) {
            this.position = arr.length;
        }
        this.position--;
        let prevPosition = this.position + 1;
        if(prevPosition > arr.length - 1) {
            prevPosition = 0;
        }
        representationOldPrice.innerHTML = arr[this.position].oldPrice
        representationSalePrice.innerHTML = arr[this.position].salePrice
        representationImage.src = arr[this.position].directory
        firstSlider.children[this.position].children[0].src = "images/bar_active.png"
        firstSlider.children[prevPosition].children[0].src = "images/bar_passive.png"
    },
    sliderChoose: function(arr) {
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
                    this.next(arr)
                } while(newPosition != this.position)
            }
            clearTimer();
        }
    },
    touchStart: 0,
    touchEnd: 0,
    touchStartFn: function(event) {
        this.touchStart = event.changedTouches[0].clientX
        console.log(this.touchStart)
    },
    touchEndFn: function(endEvent) {
        this.touchEnd = endEvent.changedTouches[0].clientX
        console.log(this.touchEnd)
        if((this.touchStart + 100) < this.touchEnd) {
            leftClick()
        } else if(this.touchStart > (this.touchEnd + 100)) {
            rightClick()
        }
    }
}

///////свайпаем влево вправо - маин//////// 
let some1 = mainRepresentation.touchStartFn.bind(mainRepresentation)
let some2 = mainRepresentation.touchEndFn.bind(mainRepresentation)
representationMajorSheet.addEventListener("touchstart", some1)
representationMajorSheet.addEventListener("touchend", some2)





mainRepresentation.sliderGetNammed(representationArray);
mainRepresentation.next(representationArray);

let timerSlider = setInterval(function() {
    mainRepresentation.next(representationArray)
}, 4000);
///// кликаем по стрелочкам на главном слайдере/////

btnRightRepresentation.addEventListener("click", rightClick)
btnLeftRepresentation.addEventListener("click", leftClick)
function clearTimer() {
    clearInterval(timerSlider);
    timerSlider = setInterval(function() {
        mainRepresentation.next(representationArray)
    }, 4000);
}
function rightClick() {
    mainRepresentation.next(representationArray);
    clearTimer();
}
function leftClick() {
    mainRepresentation.back(representationArray);
    clearTimer();
}

/////кликаем по элементам слайдера///// 

let funcMainSliderChoose = mainRepresentation.sliderChoose(representationArray).bind(mainRepresentation)
firstSlider.addEventListener('click', funcMainSliderChoose)


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

let dressRepresentation = {
    position: -1,
    sliderGetNammed: function(arr) {
        for(let i = 0; i < arr.length; i++){
            let li = document.createElement('li');
            let img = document.createElement("img");
            firstSlider.appendChild(li);
            li.className = `el${i}`;
            li.appendChild(img);
            img.src = `images/bar_passive.png`;
        }
    },
    next: function(arr) {
        if(this.position >= 3) {
            this.position = -1;
        }
        this.position++;
        let prevPosition = this.position - 1;
        if(prevPosition < 0) {
            prevPosition = arr.length - 1;
        }
        representationOldPrice.innerHTML = arr[this.position].oldPrice
        representationSalePrice.innerHTML = arr[this.position].salePrice
        representationImage.src = arr[this.position].directory
        firstSlider.children[this.position].children[0].src = "images/bar_active.png"
        firstSlider.children[prevPosition].children[0].src = "images/bar_passive.png"
    }
}



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