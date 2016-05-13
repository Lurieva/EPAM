var url,
    parentNode = document.querySelector('.posts_list'),
    pagination = document.querySelector('.page-nav'),
    divContainer = document.createElement('div'),
    i = 2,
    stop = false;  

window.onscroll = function (event) {
    if (isVisible(pagination) && !stop) {
        stop = true;
        url = 'https://habrahabr.ru/page' + i + '/';
        getReq(url);
        i++;
    }
}

function isVisible (elem) {
    var coords, windowHeight, visibility;

    coords = elem.getBoundingClientRect();
    windowHeight = document.documentElement.clientHeight;
    visibility = coords.top > 0 && coords.top < windowHeight;
    return visibility;
}


function getReq (url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send(); 
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            divContainer.innerHTML = xhr.responseText;
            parentNode.insertBefore(divContainer.querySelector('.posts'), pagination);
            stop = false;
        }
        return false; 
    }
}

