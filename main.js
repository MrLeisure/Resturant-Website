const scrollOffset = 100;

const scrollElements = document.querySelectorAll(".js-scroll")

// scrollElements.forEach((el) => {
//     el.style.opacity = 0
// })

const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, scrollOffset)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el)
        }
    })
}

window.addEventListener('scroll', () => {
    handleScrollAnimation();
})