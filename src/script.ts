// import { Goods, representationArray, dressArray, tShirtsArray, someFunc } from "./goods";

class Goods {
    public name: string;
    public oldPrice: string;
    public salePrice?: string;
    public directory: string;
    constructor(options: {name: string, oldPrice: string, salePrice?: string, directory: string}) {
        
        this.name = options.name
        this.oldPrice = options.oldPrice
        this.salePrice = options.salePrice
        this.directory = options.directory
    }
}
const nikeRedShoe = new Goods({name: "Red Nike",oldPrice: "9 900 ₽",salePrice: "1 900 ₽",directory: "images/running_shoes.png"});
const nikeGreenShoe = new Goods({name: "Green Nike", oldPrice: "8 999 ₽", salePrice: "1 750 ₽", directory: "images/running_shoes1.png"});
const nikePurpleShoe = new Goods({name: "Purple Nike", oldPrice: "10 100 ₽", salePrice: "2 100 ₽", directory: "images/running_shoes2.png"});
const nikeBlackShoe = new Goods({name: "Black Nike", oldPrice: "17 200 ₽", salePrice: "3 400 ₽", directory: "images/running_shoes3.png"});
const representationArray: Array<Goods> = [nikeRedShoe, nikeGreenShoe, nikePurpleShoe, nikeBlackShoe];

//////витрина с платьями///////////

const cocktailDress = new Goods({name: "Коктейльное <br> платье", oldPrice: "₽ 40 000", directory: "images/Rectangle2.png"});
const pinkDress = new Goods({name: "Розовое <br> платье", oldPrice: "₽ 12 000", directory: "images/Rectangle3.png"});
const superDress = new Goods({name: "Богатое <br> платье", oldPrice: "₽ 65 000", directory: "images/Rectangle4.png"});
const ballDress = new Goods({name: "Бальное <br> платье", oldPrice: "₽ 90 000", directory: "images/Rectangle5.png"});
const dressArray: Array<Goods> = [cocktailDress, pinkDress, superDress, ballDress];

///////витрина с футболками//////

const tShirtsArray: Array<Goods> = new Array(8);
tShirtsArray.fill(new Goods({name: "Футболка", oldPrice: "₽ 1 500", directory: "images/t-shirt.png"}))


// export {Goods, representationArray, dressArray, tShirtsArray};



const hamburgerButton: HTMLElement = document.querySelector('#hamburger-btn')!;
const menuBox: HTMLElement  = document.querySelector(".menu-box")!
const representationMajorSheet: HTMLElement = document.querySelector(".representation-major-sheet")!
const representationOldPrice: HTMLElement = document.querySelector(".representation-block__price_old")!
const representationSalePrice: HTMLElement = document.querySelector(".representation-block__price_new")!
const representationImage: HTMLImageElement = document.querySelector(".representation-block__image")!
const firstSlider: HTMLElement = document.querySelector(".first-slider")!
const secondSlider: HTMLElement = document.querySelector(".second-slider")!
const thirdSlider: HTMLElement = document.querySelector(".third-slider")!
const firstContainer: HTMLElement = document.querySelector(".flex-showcase-first")!
const secondContainer: HTMLElement = document.querySelector(".flex-showcase-second")!
const tShirtContainer: HTMLElement = document.querySelector(".products-grid")!
const firstSwipeArea: HTMLElement = document.querySelector(".first-area")!
const secondSwipeArea: HTMLElement = document.querySelector(".second-area")!
/////переменная -можно ли листать слайдеры.
let resizeBoolean: boolean = true
const btnLeftRepresentation: HTMLElement = document.querySelector(".btn-slider__left")!
const btnRightRepresentation: HTMLElement = document.querySelector(".btn-slider__right")!
const imgLoader: HTMLElement = document.querySelector(".img-loader")!
const numberOfItemsInTheCart: HTMLElement = document.querySelector(".basket__number")!
////Меню бургер/////////////

function hamburgerHandler():void {
    if(hamburgerButton.className === "hamburger-btn__icon_activated") {
        hamburgerButton.className = "hamburger-btn__icon"
        menuBox.style.top = "-400px"
    } else {
        hamburgerButton.className = "hamburger-btn__icon_activated";
        menuBox.style.top = "0px"
    }
}
window.addEventListener("resize", (): void=> {
    if(window.innerWidth >= 861) {
        hamburgerButton.className = "hamburger-btn__icon"
        menuBox.style.top = "-400px"
    }
})
hamburgerButton.addEventListener("click", hamburgerHandler)

//////главная витрина с обувью/////


///////Слайдер глвное меню//////

const mainRepresentation = {
    position: -1,
    firstPosition: 1,
    secondPosition: 1,
    sliderGetNamed: function(arr: Array<Goods>, ulName: HTMLElement) {
        
        for(let i = 0; i < arr.length; i++){
            let li = document.createElement('li');
            let img = document.createElement("img");
            ulName.appendChild(li);
            li.className = `el${i}`;
            li.appendChild(img);
            img.src = `images/bar_passive.png`;
        }
    },
    next: function(arr: Array<Goods>, firstPrice: HTMLElement, secondPrice: HTMLElement, img: HTMLImageElement) {
        
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
        
        
        firstSlider.children[this.position].children[0].src  = "images/bar_active.png"
        firstSlider.children[prevPosition].children[0].src = "images/bar_passive.png"
        representationImage.className += " img__swipe-left"
        setTimeout(()=> {
            img.src = arr[this.position].directory
            representationImage.classList.remove("img__swipe-left")
            representationImage.className += " img__swipe-right"
            setTimeout(()=> representationImage.classList.remove("img__swipe-right"), 200)
        }, 400)
    },
    back: function(arr: Array<Goods>, firstPrice: HTMLElement, secondPrice: HTMLElement, img: HTMLImageElement) {
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
        firstSlider.children[this.position].children[0].src = "images/bar_active.png"
        firstSlider.children[prevPosition].children[0].src = "images/bar_passive.png"
        representationImage.className += " img__swipe-right"
        setTimeout(()=> {
            img.src = arr[this.position].directory
            representationImage.classList.remove("img__swipe-right")
            representationImage.className += " img__swipe-left"
            setTimeout(()=> representationImage.classList.remove("img__swipe-left"), 200)
        }, 400)
    },
    ////метод для заполнения контейнера с платьями
    fillContainer: function(arr: Array<Goods>, container: HTMLElement, strClassName: string) {
        
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
    sliderChoose: function(arr: Array<Goods>, firstPrice: HTMLElement, secondPrice: HTMLElement, img: HTMLImageElement): Function {
        return function(event) {
            
            let newPosition: number;
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
    ///////мой свайп
    touchStart: 0,
    touchEnd: 0,
    touchStartFn: function(event: TouchEvent) {
        this.touchStart = event.changedTouches[0].clientX
    },
    touchEndFn: function(fnLeft: Function, fnRight: Function): Function {
        return function(endEvent: TouchEvent) {
            this.touchEnd = endEvent.changedTouches[0].clientX
            if((this.touchStart + 100) < this.touchEnd) {
                fnLeft()
            } else if(this.touchStart > (this.touchEnd + 100)) {
                fnRight()
            }
        }
    },
    nextFirstSlider: function(arr: Array<Goods>) {
        if(resizeBoolean) {
            if(this.firstPosition >= arr.length) {
                this.firstPosition = 1;
                firstContainer.style.transform = `translate(0px)`
            } else {
            const windowWidth = firstContainer.firstChild.offsetWidth;
            firstContainer.style.transform += `translate(-${windowWidth}px)`
            this.firstPosition++
            }
            changeDressActiveBarFirst(this.firstPosition - 1)
        } else return
    },
    prevFirstSlider: function(arr: Array<Goods>) {
        if(resizeBoolean) {
            const windowWidth = firstContainer.firstChild.offsetWidth;
            if(this.firstPosition <= 1) {
                this.firstPosition = arr.length;
                let allSlidersWidth = (arr.length - 1) * windowWidth
                firstContainer.style.transform = `translate(-${allSlidersWidth}px)`
                this.firstPosition = arr.length
            } else {
                firstContainer.style.transform += `translate(${windowWidth}px)`
            this.firstPosition--
            }
            changeDressActiveBarFirst(this.firstPosition - 1)
        } else return
    },
    nextSecondSlider: function(arr: Array<Goods>) {
        if(resizeBoolean) {
            
            if(this.secondPosition >= arr.length) {
                this.secondPosition = 1;
                secondContainer.style.transform = `translate(0px)`
            } else {
            const windowWidth = secondContainer.firstChild.offsetWidth;
            secondContainer.style.transform += `translate(-${windowWidth}px)`
            this.secondPosition++
            }
            changeDressActiveBarSecond(this.secondPosition - 1)
        } else return
    },
    prevSecondSlider: function(arr: Array<Goods>) {
        if(resizeBoolean) {
            const windowWidth = secondContainer.firstChild.offsetWidth;
            if(this.secondPosition <= 1) {
                this.secondPosition = arr.length;
                let allSlidersWidth = (arr.length - 1) * windowWidth
                secondContainer.style.transform = `translate(-${allSlidersWidth}px)`
                this.secondPosition = arr.length
            } else {
                secondContainer.style.transform += `translate(${windowWidth}px)`
            this.secondPosition--
            }
            changeDressActiveBarSecond(this.secondPosition - 1)
        } else return
    }
}

////////смена разрешения- фикс для карусели(сьезжает изображение после ////////

window.addEventListener("resize", carouselResizeFix)
function carouselResizeFix() {
    if(window.innerWidth > 660) {
        resizeBoolean = false
        firstContainer.style.transform = `translate(0px)`
        secondContainer.style.transform = `translate(0px)`
    } else resizeBoolean = true
}

///////свайпаем влево вправо - маин//////// 
const mainTouchStart = mainRepresentation.touchStartFn.bind(mainRepresentation)
const mainTouchEnd = mainRepresentation.touchEndFn(leftClick, rightClick).bind(mainRepresentation)
const firstDressSliderEndTouch = mainRepresentation.touchEndFn(()=>mainRepresentation.prevFirstSlider(dressArray), ()=>mainRepresentation.nextFirstSlider(dressArray)).bind(mainRepresentation)
const secondDressSliderEndTouch = mainRepresentation.touchEndFn(()=>mainRepresentation.prevSecondSlider(dressArray), ()=>mainRepresentation.nextSecondSlider(dressArray)).bind(mainRepresentation)
representationMajorSheet.addEventListener("touchstart", mainTouchStart)
representationMajorSheet.addEventListener("touchend", mainTouchEnd)
firstSwipeArea.addEventListener("touchstart", mainTouchStart)
firstSwipeArea.addEventListener("touchend", firstDressSliderEndTouch)
secondSwipeArea.addEventListener("touchstart", mainTouchStart)
secondSwipeArea.addEventListener("touchend", secondDressSliderEndTouch)


///выводим контент на страницу/////

mainRepresentation.sliderGetNamed(representationArray, firstSlider);
mainRepresentation.next(representationArray, representationOldPrice, representationSalePrice, representationImage);
mainRepresentation.sliderGetNamed(dressArray ,secondSlider)
mainRepresentation.sliderGetNamed(dressArray ,thirdSlider)
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

///////функции перехода влево и вправо разных слайдов///////
function rightClick() {
    mainRepresentation.next(representationArray, representationOldPrice, representationSalePrice, representationImage);
    clearTimer();
}
function leftClick() {
    mainRepresentation.back(representationArray, representationOldPrice, representationSalePrice, representationImage);
    clearTimer();
}

/////кликаем по элементам слайдера///// 
function funcSliderChoose(arr: Array<Goods>, firstPrice: HTMLElement, secondPrice: HTMLElement, img: HTMLImageElement) {
    return mainRepresentation.sliderChoose(arr, firstPrice, secondPrice, img).bind(mainRepresentation)
}
firstSlider.addEventListener('click', funcSliderChoose(representationArray, representationOldPrice, representationSalePrice, representationImage))
secondSlider.addEventListener("click", findSecond)
thirdSlider.addEventListener("click", findThird)
function findSecond(event) {
    let newPosition;
        if (event.target.tagName === "IMG") {
            newPosition = Number(event.target.parentNode.className.match(/\d/))
        } else if (event.target.tagName === "UL") {
            return
        } else {
            newPosition = Number(event.target.className.match(/\d/))
        }
        if (newPosition + 1 != mainRepresentation.firstPosition) {
            do {
                mainRepresentation.nextFirstSlider(dressArray)
            } while(newPosition + 1 != mainRepresentation.firstPosition)
        }
        changeDressActiveBarFirst(newPosition)
}
function findThird(event) {
    let newPosition;
        if (event.target.tagName === "IMG") {
            newPosition = Number(event.target.parentNode.className.match(/\d/))
        } else if (event.target.tagName === "UL") {
            return
        } else {
            newPosition = Number(event.target.className.match(/\d/))
        }
        if (newPosition + 1 != mainRepresentation.secondPosition) {
            do {
                mainRepresentation.nextSecondSlider(dressArray)
            } while(newPosition + 1 != mainRepresentation.secondPosition)
        }
        changeDressActiveBarSecond(newPosition)
}
function activeBarDressFn(slider: HTMLElement) {
    slider.children[0].children[0].src = "images/bar_active.png"
}
activeBarDressFn(secondSlider)
activeBarDressFn(thirdSlider)
let secondSliderActiveBarPosition = 0;
let thirdSliderActiveBarPosition = 0;

function changeDressActiveBarFirst(newPosition) {
    secondSlider.children[secondSliderActiveBarPosition].children[0].src = "images/bar_passive.png"
    secondSlider.children[newPosition].children[0].src = "images/bar_active.png"
    secondSliderActiveBarPosition = newPosition
}
function changeDressActiveBarSecond(newPosition) {
    thirdSlider.children[thirdSliderActiveBarPosition].children[0].src = "images/bar_passive.png"
    thirdSlider.children[newPosition].children[0].src = "images/bar_active.png"
    thirdSliderActiveBarPosition = newPosition
}

///////прогружаю изображения из маин слайдера (т.к. они выводяться только со сменой src)
function imageLoaderFn(arr: Array<Goods>) {
    for(let i = 1; i < arr.length; i++) {
        let img = document.createElement("img")
        imgLoader.appendChild(img)
        img.src = arr[i].directory
    }
    setTimeout(()=> imgLoader.parentNode.removeChild(imgLoader), 0)
}
setTimeout(()=> imageLoaderFn(representationArray), 1000)

///////Добавление товаров в корзину

let shoppingСart = new Array(5);

function shoppingCartCheck(arr) {
    if(arr.length === 0) numberOfItemsInTheCart.innerHTML = ""
    else numberOfItemsInTheCart.innerHTML = arr.length
}
shoppingCartCheck(shoppingСart)
