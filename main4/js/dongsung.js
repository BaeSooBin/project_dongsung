;(function($){

    var dongsung = {
        init:function(){
            this.scrollFn();
            this.headerFn();
            this.footerFn();
            this.fullMenuFn();
        },
        scrollFn:function(){
            var scrollOld = 0;
            var scrollNew = 0;
            var $window = $(window);
            var $header = $('#Header');
            var result = null;
            var that = this;
            var $menuWrap = $('.menu-wrap');

            function scrollFn(){
                scrollNew = $window.scrollTop();

                var scr = function(){
                    result = scrollOld - scrollNew > 0 ? 'UP' : 'DOWN';
                }

                scr();

                if($window.scrollTop()==0){
                    $header.removeClass('addWhite');
                    $header.removeClass('addTrans');
                    $menuWrap.removeClass('addBlack');
                }
                else{
                    if(result == 'UP'){
                        if(that.btn == 1){
                            $header.removeClass('addWhite');
                            $menuWrap.removeClass('addBlack');
                            $header.addClass('addTranp');
                        }
                        else{
                            $header.addClass('addWhite');
                            $menuWrap.addClass('addBlack');
                            $header.removeClass('addTranp');   
                        }
                    }
                    if(result == 'DOWN'){
                        if(that.btn == 1){
                            $header.removeClass('addWhite');
                            $menuWrap.removeClass('addBlack');
                            $header.addClass('addTranp');   
                        }
                        else{
                            $header.addClass('addWhite');
                            $menuWrap.addClass('addBlack');
                            $header.removeClass('addTranp');   
                        }
                    }
                }
                scrollOld = scrollNew;
            }

            $window.scroll(function(){
                scrollFn();
            });


        },
        headerFn:function(){
            var $mainBtn = $('#Header #aside .main-btn');
            var $subBtn    = $('#Header .sub-btn');
            var $aside = $('#Header #aside ul');
            var $sub = $('#Header #aside .sub');
            var $nav = $('#Header #nav');
            var $navUlLi = $('#Header #nav ul li');
            var $window = $(window);
            var $logoImg = $('#Header #logo a img');

            function pcEventFn(){
                $nav.stop().show();
                $sub.stop().hide();
                $nav.css({display:'inline-block'});


                $mainBtn.on({
                    mouseenter:function(e){
                        e.preventDefault();
                        $(this).next().stop().show();
                    }
                });
                $aside.on({
                    mouseleave:function(e){
                        e.preventDefault();
                        $sub.stop().hide();
                    }
                });
            }

            function mobileEventFn(){
                $sub.stop().hide();
                // $bar.removeClass('addMobile');
                $nav.stop().slideUp(0);
              
                $logoImg.attr('src','../../dongsung/img/logo.png');


                //????????? ????????????
                $mainBtn.off('mouseenter');
                $navUlLi.off('mouseleave');
                $subBtn.off('mouseenter');
                
                
            }//mobile Event end


            function pcMobileFn(){
              if( $window.innerWidth() > 980 ){                    
                pc=1;
                mobile=0;
                pcEventFn();
                // that.btn = 0; //pc ?????????????????? ?????????
              }
              else{
                pc=0;
                mobile=1;
                mobileEventFn();
              } 
            }
            setTimeout(pcMobileFn,100); //?????????
            
            //PC MODE / MOBILE MODE
            $window.resize(function(){
              pcMobileFn();                  
            });


            mobileEventFn();

            //???????????? ??????
            $mainBtn.on({
                mouseenter:function(e){
                    e.preventDefault();
                    $(this).next().stop().show();
                }
            });



        },
        footerFn:function(){
            var $selectBtn = $('.select-btn');
            var $selectBox = $('.select-box');
            var cnt = 0;

            $selectBtn.on({
                click:function(e){
                    e.preventDefault();
                    cnt++;
                    // console.log(cnt);
                    if(cnt%2 == 0 && cnt !== 0){
                        $selectBox.stop().animate({height:229+'px'},0).animate({height:0+'px'},500);
                    }
                    else if(cnt%2 == 1){
                        $selectBox.css({display:'block'}).stop().animate({height:0+'px'},0).animate({height:229+'px'},500);
                    }
                    else{
                        $selectBox.stop().animate({height:229+'px'},0).animate({height:0+'px'},500);
                    }
                    
                }
            });
        },
        fullMenuFn:function(){
            var $menuBtn  = $('.menu-wrap .menu-btn');
            var $fullMenuWrap = $('#full-menu-wrap');
            var $fullMenuWrapW = $('#full-menu-wrap .wrap');
            var $bar = $('.bar');

            $menuBtn.on({
                click:function(e){
                    e.preventDefault();
                    $fullMenuWrap.toggleClass('addToggle');
                    $fullMenuWrapW.toggleClass('addToggle');
                    $('html').toggleClass('addToggle')
                    $bar.toggleClass('addBar');
                }
            });

        }

    }
    dongsung.init();

})(jQuery);