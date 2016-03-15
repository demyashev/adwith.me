function r(f){/in/.test(document.readyState)?setTimeout(r,9,f):f();}

window.onresize = function(event) {

    sliderResize();
};

r(function(){
    
    document.documentElement.className = document.documentElement.className.replace("no-js", "js");
    
    
    //console.log(x + ' - ' + y);
    //
    header            = document.getElementById('header');

    slider            = document.getElementById('slider');
    slider_arrows     = document.getElementsByClassName("arrow");
    slider_container  = document.getElementById('slider-container');
    slides            = document.getElementsByClassName("slide");
    slides_backgrounds= document.getElementsByClassName("background");
    mouse             = document.getElementById('mouse-scroll');

    tab_links         = document.getElementsByClassName('select-link');

    reg_link          = document.getElementById('account-isset');
    create_link       = document.getElementById('account-reg');

    form_inputs       = document.getElementsByClassName('form-col');


    if (slider != null) {
        sliderPlay();
        sliderResize();
        iconMouseStart(); 
    }
    

    // listeners
    toggleTabs();
    sliderArrowEvent();

    if (reg_link != null) {
        reg_link.addEventListener('click', showRegForm, false);
    }

    if (create_link != null) {
        create_link.addEventListener('click', showCreateForm, false);
    }



    
        
    window.addEventListener('scroll', fps_increase, false);
    document.getElementById('close-menu').addEventListener('click', hideMobileMenu, false);
    document.getElementById('show-menu-icon').addEventListener('click', showMobileMenu, false);

    for (var i = window.form_inputs.length - 1; i >= 0; i--) {
        window.form_inputs[i].addEventListener('click', inputAnimate, false);
    }
});

/*----------------------------------------------------------------------------*/
var body = document.getElementsByTagName('body');
var timer;
var fps_increase = function() {
    clearTimeout(timer);

    if(body[0].className == '') {
        body[0].className = 'disable-hover';
    }

    timer = setTimeout(function(){
        body[0].className = '';
    }, 250);
}
/*----------------------------------------------------------------------------*/

function inputAnimate() {
   
    console.log(event.target.parentNode);


   event.target.parentNode.classList.add('active');
}

function showMobileMenu() {
    window.header.classList.add('mobile-menu-showed');
}
function hideMobileMenu() {
    window.header.classList.remove('mobile-menu-showed');
}
function showRegForm() {
    // event.classList.add('hidden');
    document.getElementById('form-create-account').classList.add('hidden');
    document.getElementById('form-reg-account').classList.remove('hidden');
    event.preventDefault();
}

function showCreateForm() {
    document.getElementById('form-reg-account').classList.add('hidden');
    document.getElementById('form-create-account').classList.remove('hidden');
    event.preventDefault();
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

    event.preventDefault();

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
  
    }, 5000);
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