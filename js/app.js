//creat menu
const fragment = document.createDocumentFragment();
const sections = document.querySelectorAll("section"); //to be used again for adding "your-active-class"
const navBarList = document.getElementById("navbar__list");
let count = 0; // setting starting value of count to be used for adding dynamic class name to ul li
// to be used later for adding active #id to navigation bar buttons
sections.forEach((section) => {
    count++;
    let li = document.createElement("li");
    li.classList.add("section" + count); //making li.className === section.id
    li.classList.add("menu"); // class menu to be used with addEventListener to scroll sections into view
    let id = section.id;
    li.textContent = `${id.slice(0, id.length - 1)} ${id[id.length - 1]}`; //add space between section and section number
    fragment.appendChild(li);
});
navBarList.appendChild(fragment);

//make navBar items scroll into the specified section when clicked
const menu = document.querySelectorAll(".menu");
menu.forEach((menuElement) => {//forEach loop to change mouse to pointer(hand shape) when hover over menuElement
    menuElement.addEventListener("mouseenter", ()=>{
        menuElement.style.cursor = "pointer";
    });
    menuElement.addEventListener("click", () => {//scroll into view specified section
        const menuElementClassName = menuElement.className.split(" ")[0];
        const specifiedSection = document.getElementById(menuElementClassName);
        specifiedSection.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    });
});


//(add/remove) "your-active-class" to section based on it's position of the viewport
window.addEventListener("scroll", () => {
    const windowCenter = window.innerHeight / 2; //divide window innerHeight by 2 to get the exact center
    const upButton = document.getElementById("up-button"); //selcting the go to the top button
    upButton.addEventListener("click", () => {
        window.scrollTo(0, 0);
    });
    sections.forEach((section) => {
        let top = section.getBoundingClientRect().top; //get the position of the secton's top
        let bottom = section.getBoundingClientRect().bottom; //similarly get the position of the secton's bottom
        let menuItem = document.querySelector(`.${section.id}`);
        if (top <= windowCenter && bottom >= windowCenter) {
            //make sure windowCenter is within section height range
            section.classList.add("your-active-class");
            menuItem.classList.add("navItem");
            if (section.id !== "section1") {
                upButton.classList.remove("hidden-up"); //show the button when first page is not in view using section1 as reference
            } else {
                upButton.classList.add("hidden-up"); //hide the button as no need for it
            }
        } else {
            section.classList.remove("your-active-class");
            menuItem.classList.remove("navItem");
        }
    });
});
