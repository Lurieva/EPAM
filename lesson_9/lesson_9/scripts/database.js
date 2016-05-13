app.Storage = (function (window, _) {

    function toSTR(data) {
        return JSON.stringify(data);
    }

    function toJSON(data) {
        return JSON.parse(data);
    }

    function Storage(type) {
        this.storage = window.localStorage;
        this.tempStorage = [];
        return this;
    }

    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function deleteCookie(name) {
        setCookie(name, "", {
            expires: -1
        })
    }



    Storage.prototype = {

        set: function (value) {
            this.tempStorage.push(value);
        },

        getData: function () {
            return this.tempStorage;
        },

        getById: function (id) {
            var result;

            this.tempStorage.some(function (el) {
                var isValidId = el.id === id;
                if (isValidId) {
                    result = el;
                }

                return isValidId;
            });

            return result;
        },

        remove: function (index) {
            this.tempStorage.splice(-index, 1);
        },

        save: function () {
            localStorage.setItem('persons', toSTR(this.tempStorage));
            setCookie('persons', toSTR(this.tempStorage));
        },

        load: function () {
            var data = localStorage.getItem('persons');

            if (data) {
                this.tempStorage = toJSON(data);
            } else {
                this.tempStorage = [];
            }
        },

        clear: function () {
            localStorage.clear();
            deleteCookie('persons');
        }

    };

    return Storage;

} (window, _));
