'use strict';

var GalleryView = (function () {
    
    function GalleryView (parent) {
        this.parentEl = parent;
        return this;
    }

    GalleryView.prototype = {
        init : function (img) {
            this.render(img);
            this.addListeners();
        },

        render : function (img) {
            if (!img) {
                return;
            }
            this.parentEl.innerHTML = imageTpl;
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
    };

    return GalleryView;

})();