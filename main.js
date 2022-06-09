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
        let element = document.getElementById(id);
        let dir = Math.sign(element.getBoundingClientRect().top);
        pageScroll(element, dir, speed || 200, window.scrollY );
    })
})

function pageScroll(element, dir, speed = 200, scrollpos) {
    window.scrollBy(0, dir * speed);
    if(window.scrollY == scrollpos) return;
    if (element.getBoundingClientRect().top * dir <= 0) return;
    scrolldelay = setTimeout(function() {
        pageScroll(element, dir, speed, window.scrollY);
    },10);
}


//Gallery

var goback = document.querySelector('.gallery_before');
var goforward = document.querySelector('.gallery_after');
var galleryList = document.querySelector('.gallery-list')


var selected = document.querySelector('.gallery-list > img');

goToGalleryImg(true);

function getSelectedGalleryImg() {
    if (!galleryList) return null

    var selected = document.querySelector('.gallery-list > .selected');
    if (selected) return selected;

    selected = galleryList.firstElementChild();
    selected.classList.add('selected');
    return selected;
}

function goToGalleryImg(instant = false) {
    var rect = selected.getBoundingClientRect();
    var distance = rect.left + (rect.right - rect.left)/2  - window.innerWidth/2
    distance *= -1;
    if (instant) {
        galleryList.style.left = Number(galleryList.style.left.slice(0, -2)) + distance +'px';
        selected.classList.add('done');
        return;
    }
    var speed = 10;
    var dir = Math.sign(distance) * speed;
    if (dir > Math.abs(distance)) {
        galleryList.style.left = Number(galleryList.style.left.slice(0, -2)) + distance +'px';
        selected.classList.add('done');
        return;
    }
    galleryList.style.left = Number(galleryList.style.left.slice(0, -2)) + dir +'px'
    galleryScrollDelay = setTimeout(goToGalleryImg, 0.5)
}


goback.addEventListener( 'click', function (e) {
    if (!galleryList) return;
    selected = getSelectedGalleryImg();
    if (!selected) return;
    if (selected.previousElementSibling) {
        selected.classList.remove('selected', 'done');
        selected = selected.previousElementSibling || selected;
        selected.classList.add('selected');
    }
    goToGalleryImg();
})

goforward.addEventListener( 'click', function (e) {
    if (!galleryList) return;
    selected = getSelectedGalleryImg();
    if (!selected) return;
    if (selected.nextElementSibling){
        selected.classList.remove('selected', 'done');
        selected = selected.nextElementSibling || selected;
        selected.classList.add('selected');
    }
    goToGalleryImg();
})

window.addEventListener('load', function () {
    galleryList.style.overflowX =   'clip';
})
