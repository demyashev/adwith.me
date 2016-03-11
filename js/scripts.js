function r(f){/in/.test(document.readyState)?setTimeout(r,9,f):f();}

window.onresize = function(event) {

    sliderResize();
};

r(function(){
    
    document.documentElement.className = document.documentElement.className.replace("no-js", "js");
    
    
    //console.log(x + ' - ' + y);

    slider            = document.getElementById('slider');
    slider_arrows     = document.getElementsByClassName("arrow");
    slider_container  = document.getElementById('slider-container');
    slides            = document.getElementsByClassName("slide");
    slides_backgrounds= document.getElementsByClassName("background");
    mouse             = document.getElementById('mouse-scroll');

    tab_links         = document.getElementsByClassName('select-link');

    reg_link          = document.getElementById('account-isset');
    create_link       = document.getElementById('account-reg');

    
    sliderPlay();
    sliderResize();
    iconMouseStart();

    // listeners
    toggleTabs();
    sliderArrowEvent();

    reg_link.addEventListener('click', showRegForm, false);
    create_link.addEventListener('click', showCreateForm, false);
});

function showRegForm() {
    // event.classList.add('hidden');
    document.getElementById('form-create-account').classList.add('hidden');
    document.getElementById('form-reg-account').classList.remove('hidden');
}

function showCreateForm() {
    document.getElementById('form-reg-account').classList.add('hidden');
    document.getElementById('form-create-account').classList.remove('hidden');
}

function toggleTabs() {
    for (var i = window.tab_links.length - 1; i >= 0; i--) {
        window.tab_links[i].addEventListener('click', toggleTabsSwitch, false);
    }
}

function toggleTabsSwitch() {
    for (var i = window.tab_links.length - 1; i >= 0; i--) {
        window.tab_links[i].classList.remove('active');
    }
    event.target.classList.add('active');

    if (event.target.classList.contains('reklamodatel')) {
        document.getElementById('im-reklamodatel').classList.remove('hidden');
        document.getElementById('im-instagrammer').classList.add('hidden');
    } else {
        document.getElementById('im-reklamodatel').classList.add('hidden');
        document.getElementById('im-instagrammer').classList.remove('hidden');
    }
}

function iconMouseStart() {
    var i = 20;
    setInterval(function() {
        
        window.mouse.style.top = i + 'px';
        window.mouse.style.height = i/2 + 'px';
        window.mouse.style.opacity = (i/20 - 1)*(-1);

        if (i==20) {i=10;} else {i = 20;}
        
    }, 1500);
}

function sliderPlay() {

    setTimeout(function() {
        sliderRotate();
    }, 3000);
}

function sliderStop() {
    // setTimeout(function(){}, 2000);
    // clearInterval(player);
}

function sliderRotate() {
    var i = 0;
    player = setInterval(function(){
             
        if (i != window.slides.length - 1) {
            i++;
            window.slider_container.style.left = - x * i + 'px';
            
        } else {
            window.slider_container.style.left = 0 + 'px';
            i = 0;
        }
  
    }, 3000);
}

function sliderArrowEvent() {
    for (var i = window.slider_arrows.length - 1; i >= 0; i--) {
        window.slider_arrows[i].addEventListener('click', sliderShowSlideByClick, false);
    }
}

function sliderShowSlideByClick() {
    
    clearTimeout(player);

    var curpos = parseInt( window.slider_container.style.left.replace("px", "") );

    if ( event.target.classList.contains("left") ) {
        var newpos = curpos + x;
    } else {
        var newpos = curpos - x;
    }

    if (newpos <= - window.slider_container.offsetWidth) {
        newpos = 0;
    }
    if (newpos > 0) {
        newpos = - (window.slides.length - 1) * x;
    }

    window.slider_container.style.left = newpos + 'px';


    sliderPlay();
}

function sliderResize() {

    w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = g.clientWidth || w.innerWidth || e.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    window.slider.style.height = y + 'px';
    window.slider_container.style.width = x * window.slides.length + 'px';
    window.slider_container.style.height = y + 'px';

    for (var i = window.slides.length - 1; i >= 0; i--) {
        window.slides[i].style.width = x + 'px';
        window.slides[i].style.height = y + 'px';
    }

}