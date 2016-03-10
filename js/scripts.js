function r(f){/in/.test(document.readyState)?setTimeout(r,9,f):f();}

r(function(){
    
    document.documentElement.className = document.documentElement.className.replace("no-js", "js");
    
     
    w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    //console.log(x + ' - ' + y);

    slider            = document.getElementById('slider');
    slider_arrows     = document.getElementsByClassName("arrow");
    slider_container  = document.getElementById('slider-container');
    slides            = document.getElementsByClassName("slide");

    sliderResize();
    sliderArrowEvent();
});

function sliderArrowEvent() {
    for (var i = window.slider_arrows.length - 1; i >= 0; i--) {
        window.slider_arrows[i].addEventListener('click', slide_pull, false);
    }
}

function sliderResize() {

    window.slider.style.height = y + 'px';
    window.slider_container.style.width = x * window.slides.length + 'px';
    window.slider_container.style.height = y + 'px';

    for (var i = window.slides.length - 1; i >= 0; i--) {
        window.slides[i].style.width = x + 'px';
        window.slides[i].style.height = y + 'px';
    }
}

function slide_pull() {
    var pos_h = window.slider_container.style.left;


    if ( event.target.classList.contains('left') ) {
        window.slider_container.style.left = - screen.width + 'px';

    } else {
        window.slider_container.style.left = - screen.width + 'px';
    }
}
