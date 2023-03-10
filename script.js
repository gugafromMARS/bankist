'use strict';

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector(".nav");

//tabbed component 
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// BUTTON SCROLLING
btnScrollTo.addEventListener("click", function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(e.target.getBoundingClientRect());

  console.log(`Current scroll (X/Y)`, window.pageXOffset, window.pageYOffset);

    console.log(`height/width viewport`, document.documentElement.clientHeight, document.documentElement.clientWidth);

    // scrolling
    // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset) 

    // window.scroll({
    //   left: s1coords.left + window.pageXOffset, 
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: "smooth"
    // })

    section1.scrollIntoView({behavior: "smooth"})
})

////////////////////////////////////////////////////////////////////
// Page navigation 

// document.querySelectorAll(".nav__link").forEach(link => {
//   link.addEventListener("click", function(e) {
//     e.preventDefault()
    
//     const id = this.getAttribute("href"); 
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: "smooth"});
//   })
// })

// 1. Add event listener to common parent element 
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function(e) {
    e.preventDefault() 

    // Matching strategy 
    if (e.target.classList.contains("nav__link")) {   
    const id = e.target.getAttribute("href"); 
    document.querySelector(id).scrollIntoView({behavior: "smooth"});
    }
})



// const h1 = document.querySelector("h1");

// // going downwards: chill
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = "white"
// h1.lastElementChild.style.color = "orangered"


// // going upwrds: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

// // going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);


// console.log(h1.parentElement.children);
// console.log([...h1.parentElement.children]);
// [...h1.parentElement.children].forEach(el => {
//   if(el !== h1) el.style.transform = "scale(0.5)"
// })



// nao usamos este por causa de se alguma vez tivessemos 200 tabs a pagina ia ficar lenta
// tabs.forEach(t => t.addEventListener("click", () => console.log("tab")))
//usamos o event listener no tabs container que e o parent dos tabs
tabsContainer.addEventListener("click", function(e) {
  const clicked = e.target.closest(".operations__tab"); // se fosse target ele pode selecioanr o span e assim e so o butao

  //guard clause
  if(!clicked) return;

 // Remove avtive classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tab => tab.classList.remove('operations__content--active'));

   // Active tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")
})


// menu fade animation
const handleHover = function(e) {
  //se fizermos cl do "this", vai nos dar o valro da opacity
  if(e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
}
}

// nav.addEventListener("mouseover", function(e) {
//   handleHover(e, 0.5)
// })

// nav.addEventListener("mouseout", function(e) {
//   handleHover(e, 1)
// })

// or 
// passi
nav.addEventListener("mouseover", handleHover.bind(0.5))

nav.addEventListener("mouseout", handleHover.bind(1))


//sticky navigation 
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function() {
//       if(window.scrollY > initialCoords.top) {
//         nav.classList.add("sticky");
//       } else {
//         nav.classList.remove("sticky");
//       }
// })

//sticky navigation: intersection observer API

// const obsCallback = function(entries, observer) {
//       entries.forEach(entry => console.log(entry))
// }

// const obsOptions = {
//     root: null,
//     threshold: 0.1
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);


// const header = document.querySelector(".header");
// const navHeight = nav.getBoundingClientRect().height;


// const stickyNav = function (entries) {
//     const [entry] = entries;
//     // console.log(entry);
//     if(!entry.isIntersecting) {
//       nav.classList.add("sticky")
//     } else {
//       nav.classList.remove("sticky")
//     }
// }

// const headerObserver = new IntersectionObserver(stickyNav, {root: null, threshold: 0, rootMargin: `-${navHeight}px`});
// headerObserver.observe(header)

// Reveal sections
const allSections = document.querySelectorAll(".section")


const revealSection = function(entries, observer) {
      const  [entry] = entries;

    if (!entry.isIntersecting) return;

      entry.target.classList.remove("section--hidden");
      observer.unobserve(entry.target)
}

const sectionObserver = new  IntersectionObserver(revealSection, {root: null, threshold: 0.15})

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden")
});


// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]")


const loadImg = (entries, observer) => {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  //replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function(){
        entry.target.classList.remove("lazy-img");
    })
    
    observer.unobserve(entry.target); 
}

const imgObserver = new IntersectionObserver(loadImg, {root: null, threshold: 0, rootMargin: "200px"})

imgTargets.forEach(img => imgObserver.observe(img))


//slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");


let curSlide = 0;
const maxSlide = slides.length;

// const slider = document.querySelector(".slider")
// slider.style.transform = "scale(0.4) translateX(-800px)";
// slider.style.overflow = "visible";



// 0%, 100%, 200%, 300%
const goToSlide = function(slide) {
  slides.forEach((s, index) => 
    (s.style.transform = `translateX(${100 * (index - slide)}%)`) // curslide  =1 : -100%, 0, 100% , 200%
  );
};

goToSlide(0);

// Next slide 
const nextSlide = function() {
  if(curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
    goToSlide(curSlide);
}

const prevSlide = function() {
  if(curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
    
    goToSlide(curSlide);
}

btnRight.addEventListener("click", nextSlide)
btnLeft.addEventListener("click", prevSlide)

document.addEventListener("keydown", function(e) {
  if(e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
})

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/*

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header")
const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button")
console.log(allButtons);

 console.log(document.getElementsByClassName("btn")); 



///////////////////// CREATING AND INSERTING ELEMENTS 

const message = document.createElement("div")
message.classList.add("cookie-message");
// message.textContent = "We use cookied for improved functionality and analytics.";
message.innerHTML = `We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// inicio do element header
// header.prepend(message)

// no fim do element header
header.append(message)

// para manter ambos
// header.append(message.cloneNode(truee))

// antes
// header.before(message)
// depois
// header.after(message)

/////////////////// DELETE ELEMETNS

document.querySelector(".btn--close-cookie").addEventListener("click", function() {
  message.remove();
})


// Styles 
message.style.backgroundColor = "#37383d"
message.style.width = "120%"

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px"; 

document.documentElement.style.setProperty("--color-primary", "orangered");


// ATRIBUTOS 

const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// Non-standard
// console.log(logo.designer);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist")

console.log(logo.src);
console.log(logo.getAttribute("src")); 

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute('href'));


//data attributes 
console.log(logo.dataset.versionNumber); 

//classes 
logo.classList.add("c");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c");

//dont use , gonna overwrite
logo.className = "jonas"



const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(e.target.getBoundingClientRect());

  console.log(`Current scroll (X/Y)`, window.pageXOffset, window.pageYOffset);

    console.log(`height/width viewport`, document.documentElement.clientHeight, document.documentElement.clientWidth);

    // scrolling
    // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset) 

    // window.scroll({
    //   left: s1coords.left + window.pageXOffset, 
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: "smooth"
    // })

    section1.scrollIntoView({behavior: "smooth"})
})


const h1 = document.querySelector("h1");

const alertH1 = function(e) {
  alert("addEventListener: Great! you are reading the heading :D")
}

h1.addEventListener("mouseenter", alertH1)

setTimeout(() =>  h1.removeEventListener("mouseenter", alertH1), 3000)
// or oldschool
// h1.onmouseenter = function(e) {
//   alert("addEventListener: Great! you are reading the heading :D")
// }


// rgb(255, 255, 255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
console.log(randomColor(0, 255));


document.querySelector(".nav__link").addEventListener("click", function(e) {
      this.style.backgroundColor = randomColor();
      console.log(`LINK`, e.target, e.currentTarget);

      //stop propagation 
      // e.stopPropagation()
})

document.querySelector(".nav__links").addEventListener("click", function(e) {
      this.style.backgroundColor = randomColor();
      console.log(`CONTAINER`, e.target, e.currentTarget);
})

document.querySelector(".nav").addEventListener("click", 
function(e) {
  this.style.backgroundColor = randomColor();
  console.log(`NAV`, e.target, e.currentTarget);
  }, 
);

*/


document.addEventListener("DOMContentLoaded", function(e) {
  console.log(e);
})

window.addEventListener("load", function(e) {
  console.log(e);
})