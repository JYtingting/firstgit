// URL配置
let baseUrl = '';
window.location.href.indexOf('dev') > -1 ? baseUrl = 'http://dev.wegoomall.cn' : baseUrl = 'http://dev.wegoomall.cn';
// window.location.href.indexOf('dev') > -1 ? baseUrl = 'http://dev.wegoomall.cn' : baseUrl = 'http://wchoosemall.com';
// $('.nav-home').attr("href",baseUrl+"/doc/wap/indexWap.html");
$(function () {
    $('.side-menu-download').mouseover(function () {
        $(".side-menu-download .side-menu-text").css("color","white");
        $(".side-menu-download").css("background","rgba(238,39,28,1)");
        $(".erweima").css("display","block");
    });
    $(".side-menu-download").mouseleave(function(){
        $(".side-menu-download .side-menu-text").css("color","black");
        $(".side-menu-download").css("background","rgba(255,255,255,1)");
        $(".erweima").css("display","none");
    });
    $('.side-menu-service').mouseover(function () {
        $(".side-menu-service .side-menu-text").css("color","white");
        $(".side-menu-service").css("background","rgba(238,39,28,1)");
        $(".weixin").css("display","block");
    });
    $(".side-menu-service").mouseleave(function(){
        $(".side-menu-service .side-menu-text").css("color","black");
        $(".side-menu-service").css("background","rgba(255,255,255,1)");
        $(".weixin").css("display","none");
    });


    $('.side-menu-phone').mouseover(function () {
        $(".side-menu-phone .side-menu-text").css("color","white");
        $(".side-menu-phone").css("background","rgba(238,39,28,1)");
        $(".tel-img").css("display","block");
    });
    $(".side-menu-phone").mouseleave(function(){
        $(".side-menu-phone .side-menu-text").css("color","black");
        $(".side-menu-phone").css("background","rgba(255,255,255,1)");
        $(".tel-img").css("display","none");
    });

    $(".side-menu-top").on('click',function(){
        $('html,body').animate({scrollTop:0},'slow');
    });
});




