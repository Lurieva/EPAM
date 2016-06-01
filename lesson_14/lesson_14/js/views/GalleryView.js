'use strict';

var GalleryView = (function () {
    function GalleryView () {
        this.parentEl = document.querySelector('.gallery');
        return this;
    }

    GalleryView.prototype = {
        init : function (img) {
            this.parentEl.innerHTML = imageTpl;
            this.render(img);
            this.addListeners();
        },
        render : function (img) {
            if (!img) {
                return;
            }
            this.parentEl.querySelector('.title').innerHTML = img.title;
            this.parentEl.querySelector('.gallery img').src = img.src;
        },
        renderTitle : function (img) {
            if (!img) return;
            this.parentEl.querySelector('.title').innerHTML = img.title;
        },
        addListeners : function () {
            mediator.subscribe('changeImg', function (obj) {
                this.render(obj);
            }.bind(this));

            mediator.subscribe('changeTitle', function (obj) {
                this.renderTitle(obj);
            }.bind(this));
        }
    }

    return GalleryView;
})();