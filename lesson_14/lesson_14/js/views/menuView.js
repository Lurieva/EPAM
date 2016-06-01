'use strict';

var MainMenuView = (function () {

    function MainMenuView (el) {
        this.parentEl = el;
        this.className = 'show';
        return this;
    }

    MainMenuView.prototype = {
        init : function () {
            this.renderMenu();
            this.addListeners();
            this.addMediatorListeners();
        },

        addMediatorListeners : function () {},

        renderMenu : function () {
            var menu = new Menu();
            this.parentEl.innerHTML = this.createMenu(menu.get(), 1);
        },

        createMenu : function (data, level) {
            var i, str;

            str = level === 1 ? '<ul class="mainmenu">' : '<ul class="submenu">';

            for (i = 0; i < data.length; i++) {
                str = str + '<li class=item' + level +'_'+ i + '>' + 
                            '<a href="' + data[i].url + '" data-title="' + 
                            data[i].title + '">' + data[i].title + '</a>';
                if (data[i].data.length) {
                    str = str + this.createMenu(data[i].data, level + 1);
                }
                str = str + '</li>';
            }
            return str + '</ul>';
        },

        addListeners : function () {
            helper.each(this.parentEl.querySelectorAll('.mainmenu'), function (item) {
                this.addListenersMainMenu(item);
            }.bind(this));

            helper.each(this.parentEl.querySelectorAll('.submenu'), function (item) {
                this.addListenersSubMenu(item);
            }.bind(this));
        },

        showSubMenu : function (element) {
            var el;

            if (element) {
                el = this.parentEl.querySelector('.'+  element.parentNode.className).childNodes[1];
            }
            this.showMenu(el, this.parentEl.querySelectorAll('.submenu'));
        },

        addListenersMainMenu : function (el) {
            helper.on('click', el, function (e) {
                this.handlerShowMenu(e, el);        
            }.bind(this));
        },

        addListenersSubMenu : function (el) {
            var self = this;
            var options;

            helper.on('mouseover', el, function (e) {
                options = self.handlerChangeImage(e, el);
                mediator.publish('changeTitle', options);       
            });

            helper.on('click', el, function (e) {
                options = self.handlerChangeImage(e, el);
                mediator.publish('changeImg', options);
            });
        },

        handlerChangeImage : function (e, el) {
            var target,
                optionsImg = {};

            e.preventDefault();
            target = e.target;

            while (target !== el) {
                if (target.tagName === 'A') {
                    optionsImg.src = target.href;
                    optionsImg.title = target.dataset.title;
                    return optionsImg;
                }
                target = target.parentNode;
            }
        },

        handlerShowMenu : function () {},

        showMenu : function (element, parent) {
            this.changeClass(parent, this.className);
            if (element) {
                element.classList.add(this.className);
            }
        },

        changeClass : function (el, className) {
            helper.each(el, function (item) {
                if (item.classList.contains(className)) {
                    item.classList.remove(className);
                }
            });
        } 
    }

    return MainMenuView;
    
})();