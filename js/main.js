// Burger Items
const iconMenu = document.querySelector(".menu-icon");
const menuBody = document.querySelector(".menu-body");

// Header Scrolling Position
let scrollOff = window.pageYOffset;
let fixedHeader = document.querySelector(".header-menu");

// Scroll To Buttons
const homeBtn = document.querySelectorAll(".home-button");
const aboutUsBtn = document.querySelectorAll(".about-us-button");
const teamBtn = document.querySelectorAll(".team-button");
const vacBtn = document.querySelectorAll(".vac-button");
const benefitsBtn = document.querySelectorAll(".benefits-button");

// Scroll To Blocks
const homeBlock = document.querySelector(".header");
const aboutUsBlock = document.querySelector(".about-us-block");
const teamBlock = document.querySelector(".team-block");
const vacBlock = document.querySelector(".requirements-block");
const benefitsBlock = document.querySelector(".benefits-block");

// Popup
const closeCross = document.querySelector(".popup-close-cross");
const popup = document.querySelector(".popup-wrapper");
const popupBody = document.querySelector(".popup-body");
const form = document.querySelector(".form");
const submitBtn = document.querySelector(".form-submit-button");

// Drop file area

const fileArea = document.querySelector(".file-area");
const fileInput = document.querySelector(".file-input");

fileInput.addEventListener("change", () => {
  if (fileInput.value) {
    fileArea.innerHTML = fileInput.value.split(/(\\|\/)/g).pop();
  }
});

// Slider button
const sliderButtons = document.querySelectorAll(".team-slide-button");

// Register button
const registerButtons = document.querySelectorAll(".register-button");

// Phone pixel number
const pixelContacts = document.querySelectorAll(".pixel-contact");

// Phone pixel handler

if (pixelContacts) {
  pixelContacts.forEach((e) => {
    e.addEventListener("click", () => {
      fbq("track", "Contact");
    });
  });
}

// Form Submit pixel handler

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    fbq("track", "Lead");
  });
}

// Popup handler
if (closeCross) {
  closeCross.addEventListener("click", () => {
    popup.classList.toggle("show-popup");
  });
}

if (registerButtons) {
  registerButtons.forEach((e) => {
    e.addEventListener("click", () => {
      popup.classList.toggle("show-popup");
    });
  });
}

if (popup) {
  document.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.toggle("show-popup");
    }
  });
}

// Scroll To Handler
function scrollingToBlock(btn, block, position) {
  btn.forEach((e) => {
    e.addEventListener("click", () => {
      block.scrollIntoView({ block: position, behavior: "smooth" });
      document.body.classList.remove("lock");
      iconMenu.classList.remove("activem");
      menuBody.classList.remove("activem");
    });
  });
}

// ScrollTo listeners
scrollingToBlock(homeBtn, homeBlock, "start");
scrollingToBlock(aboutUsBtn, aboutUsBlock, "center");
scrollingToBlock(
  teamBtn,
  teamBlock,
  window.innerWidth <= 550 ? "start" : "center"
);
scrollingToBlock(vacBtn, vacBlock, "center");
scrollingToBlock(benefitsBtn, benefitsBlock, "center");

// Slider tiles logic
if (sliderButtons) {
  sliderButtons.forEach((e) => {
    e.addEventListener("click", () => {
      e.nextElementSibling.classList.toggle("hide-slide-bottom");
      e.classList.toggle("team-slide-button-rotate");
    });
  });
}

// Burger logic toggler
if (iconMenu) {
  iconMenu.addEventListener("click", (e) => {
    document.body.classList.toggle("lock");
    iconMenu.classList.toggle("activem");
    menuBody.classList.toggle("activem");
  });
}

// Header Scrolling Handler
scrollOff = 0;
window.addEventListener("scroll", () => {
  if (window.scrollY > 150) {
    fixedHeader.classList.add("header-menu-fixed");
  } else {
    fixedHeader.classList.remove("header-menu-fixed");
  }
});

// Success email send hash handler

const successNotification = document.querySelector(".success-notification");

window.addEventListener("load", () => {
  if (window.location.hash === "#success") {
    successNotification.classList.add("visible-notification");
    setTimeout(() => {
      successNotification.classList.remove("visible-notification");
      history.replaceState(null, "", window.location.href.split("#")[0]);
    }, 4000);
  }
});

// custom select

const cityInput = document.getElementById("ucity");

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      cityInput.value = e.target.innerText;
      /* When an item is clicked, update the original select box,
        and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
