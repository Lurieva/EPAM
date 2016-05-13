'use strict';


function Slider () {
    this.gallery = [];
}

Slider.prototype.init = function (container, configObj) {
    this.container = container;
    this.config = configObj;
    this.renderGallery();
    this.addEvents();
};

Slider.prototype.animationSettings = function (img) {
    img.style.transition = '';
};

Slider.prototype.createImg = function (image) {
    var img;

    img = document.createElement('img');
    img.src = image;
    img.className = 'invisible';
    this.animationSettings(img);

    return img;
};

Slider.prototype.renderGallery = function () {
	var length = this.config.images.length;

    this.gallery = this.config.images.map(function (item) {
        return this.createImg(item);
    }.bind(this));

    this.gallery[0].className = 'current';
    this.gallery[1].className = 'next';
    this.gallery[this.gallery.length - 1].className = 'prev';

    this.renderSlider();
};

Slider.prototype.renderSlider = function () {
    this.innerContainer = document.createElement('div');
    this.innerContainer.className = 'innerContainer';

    this.gallery.forEach(function (item) {
     	this.innerContainer.appendChild(item);
    }.bind(this));

    this.container.appendChild(this.innerContainer);
};

Slider.prototype.addEvents = function () {
    if (this.config.mode === 'auto' || this.config.mode === 'automanual') {
        this.setAutoSlideEvents();
        this.play();
    }
    if (this.config.mode === 'manual' || this.config.mode === 'automanual') {
        this.setManualSlideEvents();
    }
};

Slider.prototype.setAutoSlideEvents = function () {
    this.innerContainer.addEventListener('mouseenter', this.stop.bind(this));
    this.innerContainer.addEventListener('mouseleave', this.play.bind(this));
};

Slider.prototype.play = function () {
	this.stop();
    this.interval = setInterval(this.changeSlide.bind(this), this.config.delay);
}

Slider.prototype.stop = function () {
    clearInterval(this.interval)
}

Slider.prototype.setManualSlideEvents = function () {
    var startX,
        moveX,
        dist,
        MIN_DIST = 100,
        start = 'ontouchstart' in document.documentElement  ? 'touchstart' : 'mousedown',
        move = 'ontouchmove' in document.documentElement ? 'touchmove' : 'mousemove',
        end = 'ontouchend' in document.documentElement  ? 'touchend' : 'mouseup';

    this.innerContainer.addEventListener(start, function (event) {
        event.preventDefault();
        startX = event.screenX || event.changedTouches[0].pageX;
    }, false); 

    this.innerContainer.addEventListener(move, function (event) {
        event.preventDefault();
        moveX = event.screenX || event.changedTouches[0].pageX;
    }, false);

    this.innerContainer.addEventListener(end, function (event) {
        event.preventDefault();
        dist = moveX - startX;

        if (Math.abs(dist) >= MIN_DIST) {
            this.stop();
            dist < 0 ? this.nextSlide() : this.prevSlide();
        }
    }.bind(this), false); 
};

Slider.prototype.changeSlide = function () {
    return this.config.direction ? this.nextSlide() : this.prevSlide();
}

Slider.prototype.nextSlide = function () {
    var slides = this.getSlides(),
        newSlide = slides[2].nextElementSibling || this.gallery[0];

        slides[0].className = 'invisible';
        slides[1].className = 'prev';
        slides[2].className = 'current';
        newSlide.className = 'next';
}

Slider.prototype.prevSlide = function () {
    var slides = this.getSlides(),
        newSlide = slides[0].previousElementSibling || this.gallery[this.gallery.length - 1];

        slides[0].className = 'current';
        slides[1].className = 'next';
        slides[2].className = 'invisible';
        newSlide.className = 'prev';
};

Slider.prototype.getSlides = function () {
    var slides = [];

    slides.push(this.innerContainer.querySelector('.prev'));
    slides.push(this.innerContainer.querySelector('.current'));
    slides.push(this.innerContainer.querySelector('.next'));

    return slides;
}



function SliderSlide () {
    Slider.call(this);
}
SliderSlide.prototype = Object.create(Slider.prototype);
SliderSlide.prototype.constructor = SliderSlide;

SliderSlide.prototype.animationSettings = function (img) {
    img.style.transition = 'left ' + this.config.speed/1000 + 's';
}

function SliderFade () {
    Slider.call(this);
}
SliderFade.prototype = Object.create(Slider.prototype);
SliderFade.prototype.constructor = SliderFade;

SliderFade.prototype.animationSettings = function (img) {
    img.style.transition = 'opacity ' + this.config.speed/1000 + 's';
}