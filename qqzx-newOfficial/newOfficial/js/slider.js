/**
 * slider插件可悬停控制
 */
 $(function () {

     // 设置初始值
     Slider($('#banner_tabs'), {
         time: 5000,
         delay: 400,
         event: 'hover',
         auto: true,
         mode: 'fade',
         controller: $('#bannerCtrl'),
         activeControllerCls: 'active'
     });

      function Slider(container, options) {
         /*
         options = {
             auto: true,
             time: 3000,
             event: 'hover' | 'click',
             mode: 'slide | fade',
             controller: $(),
             activeControllerCls: 'className',
             exchangeEnd: $.noop
         }
         */

         if (!container) return;

         var options = options || {},
             currentIndex = 0,
             cls = options.activeControllerCls,
             delay = options.delay,
             isAuto = options.auto,
             controller = options.controller,
             event = options.event,
             interval,
             slidesWrapper = container.children().first(),
             slides = slidesWrapper.children(),
             length = slides.length,
             childWidth = container.width(),
             totalWidth = childWidth * slides.length;

         // 点击事件或是自动轮播
         function init() {
             var controlItem = controller.children();
             mode();
             event == 'hover' ? controlItem.mouseover(function () {
                 stop();
                 var index = $(this).index();
                 play(index, options.mode);
             }).mouseout(function () {
                 isAuto && autoPlay();
             }) : controlItem.click(function () {
                 stop();
                 var index = $(this).index();
                 play(index, options.mode);
                 isAuto && autoPlay();
             });

             isAuto && autoPlay();
         }

         //animate mode
         //  隐藏未播放的其他轮播图
         function mode() {
             var wrapper = container.children().first();

             options.mode == 'slide' ? wrapper.width(totalWidth) : wrapper.children().css({
                 'position': 'block',
                 'left': 0,
                 'top': 0
             }).first().siblings().hide();
         }

         //auto play
         function autoPlay() {
             interval = setInterval(function () {
                 triggerPlay(currentIndex);
             }, options.time);
         }

         //trigger play  用来自动轮播的  控制自动轮播时index变化
         function triggerPlay(cIndex) {
             var index;
             // 刷新当前图片序号
             (cIndex == length - 1) ? index = 0 : index = cIndex + 1;
             play(index, options.mode);
         }

         //play
         function play(index, mode) {
             slidesWrapper.stop(true, true);
             slides.stop(true, true);

             mode == 'slide' ? (function () {
                 if (index > currentIndex) {
                     slidesWrapper.animate({
                         left: '-=' + Math.abs(index - currentIndex) * childWidth + 'px'
                     }, delay);
                 } else if (index < currentIndex) {
                     slidesWrapper.animate({
                         left: '+=' + Math.abs(index - currentIndex) * childWidth + 'px'
                     }, delay);
                 } else {
                     return;
                 }
             })() : (function () {
                 // 淡入淡出切换
                 // if (slidesWrapper.children(':visible').index() == index){return;} else {slidesWrapper.children().fadeOut(delay).eq(index).fadeIn(delay);}
                 if (slidesWrapper.children(':visible').index() == index){return;} else {slidesWrapper.children().hide().eq(index).show();}
             })();

             try {
                 // 更改选中原点样式
                 controller.children('.' + cls).removeClass(cls);
                 controller.children().eq(index).addClass(cls);
             } catch (e) {
             }
             // 每次播放都要改变当前index
             currentIndex = index;
             // options.exchangeEnd && typeof options.exchangeEnd == 'function' && options.exchangeEnd.call(this, currentIndex);
         }
         //stop
         function stop() {
             clearInterval(interval);
         }

         //init
         init();
  }

})
