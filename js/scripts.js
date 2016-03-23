$(window).resize(function(){
    sliderResize();
});

$(window).scroll(function(){
    fps_increase();
});

$(document).ready(function(){

    w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = g.clientWidth || w.innerWidth || e.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    console.log('dom loaded');

    // slider
    sliderResize();
    sliderPlay();
    sliderArrowEvent();
    iconMouseStart();
    toggleTabs();
    
    $('#account-isset').click(function(){
        showRegForm();
        return false;
    });

    $('#account-reg').click(function(){
        showCreateForm();
        return false;
    });

    $('.input-animate').each(function(){
        $(this).click(function(){
            inputAnimate(this);
            return false;
        });
    });

    $('#show-menu-icon').click(function(){
        showMobileMenu();
        return false;
    });

    $('#close-menu').click(function(){
        hideMobileMenu();
        return false;
    });

    $('#check-profile').click(function(){

        checkProfile();
        return false;
    }); 


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
function checkProfile() {
    $('#account-activate').fadeOut(500, function(){
        $(this).addClass('activated');
        $('#activate-title').html('Ваш аккаунт подтвержден!');
        $('#status-text').html('Спасибо, что установили ссылку на наш ресурс. Теперь вы можете использовать весь функционал нашего проекта!');

        $(this).fadeIn();
    });

    return false;
}
function inputAnimate(el) {
    $(el).addClass('active');
}

function showMobileMenu() {
    $('#header').addClass('mobile-menu-showed');
    return false;
}
function hideMobileMenu() {
    $('#header').removeClass('mobile-menu-showed');
}
function showRegForm() {
    $('#form-reg-account').removeClass('hidden');
    $('#form-create-account').addClass('hidden');
    
    return false;
}

function showCreateForm() {
    $('#form-reg-account').addClass('hidden');
    $('#form-create-account').removeClass('hidden');

    return false;
}

function toggleTabs() {

     $('.select-link').each(function(){

        $(this).click(function(){
            toggleTabsSwitch(this);
            return false;
        });

    });

}

function toggleTabsSwitch(el) {

    $('.select-link').each(function(){

        $(this).removeClass('active');

    });

    $(el).addClass('active');

    if ( $(el).hasClass('reklamodatel')) {
        $('#im-reklamodatel').removeClass('hidden');
        $('#im-instagrammer').addClass('hidden');
    } else {
        $('#im-reklamodatel').addClass('hidden');
        $('#im-instagrammer').removeClass('hidden');
    }
    
    return false;
}

function iconMouseStart() {
    var i = 20;
    setInterval(function() {

        $('#mouse-scroll').css({
            'top' : i + 'px',
            'height' : i/2 + 'px',
            'opacity' : (i/20 - 1)*(-1)
        });
        
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
             
        if (i != $('.slide').length - 1) {
            i++;
            $('#slider-container').css('left', - $('#slider').width() * i + 'px');
            
        } else {
            $('#slider-container').css('left', 0 + 'px');
            i = 0;
        }
  
    }, 5000);
}

function sliderArrowEvent() {
    $('.arrow').each(function(){

        $(this).click(function(){
            sliderShowSlideByClick(this);
            return false;
        });

    });

}

function sliderShowSlideByClick(el) {

    var slider = $('#slider-container');

    slider.clearQueue();
    
    var curpos = parseInt( slider.css('left').replace("px", "") );

    if ( $(el).hasClass("left") ) {
        var newpos = curpos + $('#slider').width();
    } else {
        var newpos = curpos - $('#slider').width();
    }

    if (newpos <= - slider.width() ) {
        newpos = 0;
    }
    if (newpos > 0) {
        newpos = - ( $('.slide').length - 1 ) * $('#slider').width();
    }

    slider.css('left', newpos + 'px');


    sliderPlay();
}

function sliderResize() {

    console.log('resized');
    // for mobile version
    if (screen.width < 800) {
        y = 972;
    }

    $('#slider').css({
        'height' : y + 'px'
    });

    $('.slide').each(function(){

        $(this).animate({
            'width' : $('#slider').width() + 'px',
            'height' : y + 'px'
        }, 100);
    });

    $('#slider-container').animate({
        'width'  : $('#slider').width() * $('.slide').length + 'px',
        'height' : y + 'px'
    }, 100);

}