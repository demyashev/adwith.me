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

    $(".new-price, .input-cost").keydown(function (e) {

        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('.popup-close').click(function(){
        $('.popup-bg').fadeOut();
        return false;
    });

    $('.price-inc a').click(function(){
        var input = $('.new-price');
        var el = $(this);

        if ( input.data('was') ) {
            var current_cost = input.data('was');
        } else {
            var current_cost = parseInt( input.val() );
        }


        if ( el.hasClass('price-up-1') ) { k = 0.1; }
        if ( el.hasClass('price-up-2') ) { k = 0.2; }
        if ( el.hasClass('price-up-3') ) { k = 0.5; }
        if ( el.hasClass('price-up-4') ) { k = 1; }

        var new_price = Math.round( current_cost + ( k * current_cost) );

        input.data('was', current_cost);
            
        input.val( new_price ); 

        return false;
    });

    $('.up-cost').click(function(){
        $('.popup-bg').fadeIn();
        return false;
    });

    $('.send').click(function(){

        var date = new Date().toLocaleString('ru', {
            month: 'long',
            day: 'numeric'
        });
        var uid = 1;

        // new line to new paragraph
        var breakTag = '</p><p>';
        var text = $('textarea').val().replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');

        var template = '<div class="comment left template"><div class="author">' + date + ' Вы отвечаете:</div><img src="./img/users/' + uid + '.png" alt="" class="author-ava"><div class="text"><p>' + text + '</p></div></div>';

        $('.content').append(template);

        $('.template').fadeIn();

        return false;
    });

    $('.button.agree').click(function(){
        if ($(this).hasClass('green')) {
            return false;
        }

        $('.button.deny').fadeOut(500);
        $(this).animate({
            'opacity' : 0
        }, 1000, function(){
            $('.buttons').addClass('text-center');
            $(this).html('Принято').addClass('green');
        }).animate({
            'opacity' : 1
        }, 1000);
        return false;
    });

    $('.button.deny').click(function(){
        if ($(this).hasClass('denied')) {
            return false;
        }
        
        $('.button.agree').fadeOut(500);
        $('.button.up-cost').animate({
            opacity:0
        }, 500);

        $(this).animate({
            'opacity' : 0
        }, 500, function(){
            $('.buttons').addClass('text-center');
            $(this).html('Предложение отклонено').addClass('denied').css('float', 'none');
        }).animate({
            'opacity' : 1
        }, 500);
        return false;
    });

    $('.toggle-icon').click(function(){
        var parent = $(this).parent().parent().parent();
        
        if (parent.hasClass('closed')) {
            parent.find('.author-ava').css('opacity', 0);
            parent.find('.comment').slideDown(700, function(){
                parent.addClass('opened').removeClass('closed');
                parent.find('.author-ava').animate({
                    opacity : 1
                }, 700);
            });
        } else {
            parent.find('.author-ava').animate({
                opacity : 0
            }, 700, function(){
                parent.find('.comment').slideUp(700, function(){
                    parent.addClass('closed').removeClass('opened');
                });
            });
            
        }
        return false;
    });

    if ($('.list').width() < 800) {
        $('.arrows img').css('height', $('.list').outerHeight() - $('.list .item:last-child').outerHeight());
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