var Scroll = (function () {

    var Scroll = function () {
        this.i = 2;
        this.stop = false;
        this.addEvents();
        return this;
    }

    Scroll.prototype = {

        addEvents: function () {
            window.onscroll = function () {
                if (this.isVisible(config.pagination) && !this.stop) {
                    this.stop = true;
                    this.getReq(config.url + this.i + '/');
                    this.i += 1;
                }
            }.bind(this);
        },

        isVisible: function (elem) {
            var coords, windowHeight, visibility;

            coords = elem.getBoundingClientRect();
            windowHeight = document.documentElement.clientHeight;
            visibility = coords.top > 0 && coords.top < windowHeight;
            return visibility;
        },

        getReq: function (url) {
            var xhr,
                divContainer = document.createElement('div');

            xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send(); 
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    divContainer.innerHTML = xhr.responseText;
                    config.parentNode.insertBefore(divContainer.querySelector(config.childSelector), config.pagination);
                    this.stop = false;
                }
                return false; 
            }.bind(this);
        }
    }

    return Scroll;

}());

var config = {
    parentNode : document.querySelector('.posts_list'),
    pagination : document.querySelector('.page-nav'),
    childSelector : '.posts',
    url : 'https://habrahabr.ru/page'
}


var scrolling = new Scroll();