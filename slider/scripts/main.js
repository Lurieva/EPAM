'use strict';

window.addEventListener('DOMContentLoaded', main, false);

function main () {
    var sliderSlide, 
        sliderFade,
        containerSlide = document.querySelector('.sliderContainerSlide'),
        containerFade = document.querySelector('.sliderContainerFade'),
        configSliderSlide = {
            images : [
                './images/1.jpg',
                './images/2.jpg',
                './images/3.jpg',
                './images/4.jpg'
            ],
            mode: 'automanual',
            direction: true,
            speed : 2000,
            delay : 2000
        },

        configSliderFade = {
            images : [
                './images/1.jpg',
                './images/2.jpg',
                './images/3.jpg',
                './images/4.jpg'
            ],
            mode: 'manual',
            direction: true,
            speed : 2000,
            delay : 2000
        }

    sliderSlide = new SliderSlide();
    sliderSlide.init(containerSlide, configSliderSlide);

    sliderFade = new SliderFade();
    sliderFade.init(containerFade, configSliderFade);
}