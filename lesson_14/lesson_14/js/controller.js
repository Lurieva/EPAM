'use strict';

var Controller = (function () {

    function Controller () {
        this.init();
    }

    Controller.prototype = {
        init : function () {
            var verticalMenu,
                horizontalMenu,
                gallery,
                footer,
                containerHM = document.querySelector('.menu-horizontal'),
                containerVM = document.querySelector('.menu-vertical');

            verticalMenu = new VerticalMenuView(containerVM);
            verticalMenu.init();

            horizontalMenu = new HorizontalMenuView(containerHM);
            horizontalMenu.init();

            gallery = new GalleryView();
            gallery.init({
                'title': 'img1', 
                'src': 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSpN819n6gDoSSdpXAbO88xFhiYAfe5eaGTe6xAzyJBe1oDDgxEfA'
            });
 
            footer = new FooterView();
            footer.init();
        }
    }

    return Controller;
    
})();