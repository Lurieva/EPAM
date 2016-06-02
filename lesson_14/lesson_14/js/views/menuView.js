'use strict';

var MainMenuView = (function () {

    function MainMenuView (parent) {
        this.parentEl = parent;
        this.className = 'show';
        return this;
    }

    MainMenuView.prototype = {
        init : function () {
            this.render();
            this.addListeners();
        },

        render : function () {
            var menu = new Menu();
            this.parentEl.innerHTML = this.createMenu(menu.get(), 1);
        },

        addListeners : function () {
            mediator.subscribe('showMenu', this.showSubMenu.bind(this));

            helper.each(this.parentEl.querySelectorAll('.mainmenu'), function (item) {
                this.addListenersMainMenu(item);
            }.bind(this));

            helper.each(this.parentEl.querySelectorAll('.submenu'), function (item) {
                this.addListenersSubMenu(item);
            }.bind(this));
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

        showSubMenu : function (element) {
            var el;

            if (element) {
                el = this.parentEl.querySelector('.'+  element.parentNode.className).childNodes[1];
            }
            this.showMenu(el, this.parentEl.querySelectorAll('.submenu'));
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

        handlerShowMenu : function (e, el) {
            var element, target;

            e.preventDefault();
            target = e.target;

            while (target !== el) {
                if (target.tagName === 'LI') {
                    element = target.querySelector('.submenu');
                    mediator.publish('showMenu', element);
                    this.showMenu(element, el.querySelectorAll('.submenu'));
                    return;
                }
                target = target.parentNode;
            }
        },

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
    };

    return MainMenuView;
    
})();