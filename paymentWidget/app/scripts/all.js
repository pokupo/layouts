$('html').addClass('pkp_html');
$('body').addClass('pkp_body');
$(document).ready(function() {
    /*scrollbar*/
    $(".j-scroll").mCustomScrollbar();

    /*rollup*/
    $('.j-pkp-rollup__trigger').on('click', function(e){
        $(this).toggleClass('pkp-rollup__trigger_closed').parent().find('.j-pkp-rollup__content').slideToggle();
        e.preventDefault();
    });
    
    /*select*/
    $("select").selecter({
        label: "По умолчанию"
    });

    $('.j-pkp-payment').on('submit', function(){
        var form = $(this);
        var input = form.find('.j-pkp-req-input');
        var pattern = /\w+@\w+\.\w{2,6}/gi;
        var errorMsg = input.siblings('.pkp-error-msg'); 
        if(input.val().length === 0) {
            input.addClass('pkp-input_error');
            errorMsg.text('Обязательное поле').fadeIn();
            return false;
        }  
        if(!pattern.test(input.val())) {
            input.addClass('pkp-input_error');
            errorMsg.text('Введите e-mail корректно').fadeIn();
            return false;
        }
        if(pattern.test(input.val())) {
            input.removeClass('pkp-input_error');
            errorMsg.fadeOut();
        }
    });  

    /* tooltips */
    function toolTips() {
        if(window.innerWidth > 799){
            $('.pkp-payment-method .pkp-payment-method__item:nth-child(3n + 1)').each(function(){
                $(this).find('.pkp-tooltip__content').removeAttr('class').addClass('pkp-tooltip__content pkp-tooltip__content_left');
            });
            $('.pkp-payment-method .pkp-payment-method__item:nth-child(3n + 2)').each(function(){
                $(this).find('.pkp-tooltip__content').removeAttr('class').addClass('pkp-tooltip__content pkp-tooltip__content_center');
            });
            $('.pkp-payment-method .pkp-payment-method__item:nth-child(3n + 3)').each(function(){
                $(this).find('.pkp-tooltip__content').removeAttr('class').addClass('pkp-tooltip__content pkp-tooltip__content_right');
            });
        }

        if(window.innerWidth < 799 && window.innerWidth > 595){
            $('.pkp-payment-method .pkp-payment-method__item:nth-child(2n+1)').each(function(){
                $(this).find('.pkp-tooltip__content').removeAttr('class').addClass('pkp-tooltip__content pkp-tooltip__content_left');
            });
            $('.pkp-payment-method .pkp-payment-method__item:nth-child(2n)').each(function(){
                $(this).find('.pkp-tooltip__content').removeAttr('class').addClass('pkp-tooltip__content pkp-tooltip__content_right');
            });
        }

        if(window.innerWidth < 595){
            $('.pkp-payment-method .pkp-payment-method__item').each(function(){
                $(this).find('.pkp-tooltip__content').removeAttr('class').addClass('pkp-tooltip__content pkp-tooltip__content_center');
            });
        }
    }
    toolTips();

    $(window).on('resize', function(){
        toolTips();
    });
});
