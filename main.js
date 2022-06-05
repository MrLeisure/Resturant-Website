const scrollOffset = 100;

const theTop = document.getElementById('top');

const theSecondSection = document.getElementById('second-section');

const goto = document.querySelectorAll('.go-to');

const scrollElements = document.querySelectorAll(".js-scroll");

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
            hideScrollElement(el);
        }
    })
}

window.addEventListener('scroll', () => {
    handleScrollAnimation();
})

goto.forEach(e => {
    e.addEventListener('click', (e) => {
        e.preventDefault();
        let [id, speed] = e.target.closest('a').hash.slice(8).split('?');
        console.log({e,target: e.target, closest: e.target.closest('a'), id});
        let element = document.getElementById(id);
        let dir = Math.sign(element.getBoundingClientRect().top);
        pageScroll(element, dir, speed || 200);
    })
})

function pageScroll(element, dir, speed = 200) {
    window.scrollBy(0, dir * speed);
    if (element.getBoundingClientRect().top * dir <= 0) return;
    scrolldelay = setTimeout(function() {
        pageScroll(element, dir, speed);
    },10);
}
