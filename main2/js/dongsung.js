;(function($){

    var dongsung = {
        init:function(){
            this.scrollFn();
            this.headerFn();
            this.section2Fn();
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
            var $logoImg = $('#Header #Logo a img');

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


                //이벤트 삭제하기
                $mainBtn.off('mouseenter');
                $navUlLi.off('mouseleave');
                $subBtn.off('mouseenter');
                
                
            }//mobile Event end


            function pcMobileFn(){
              if( $window.innerWidth() > 980 ){                    
                pc=1;
                mobile=0;
                pcEventFn();
                // that.btn = 0; //pc 데스크탑에서 초기화
              }
              else{
                pc=0;
                mobile=1;
                mobileEventFn();
              } 
            }
            setTimeout(pcMobileFn,100); //로딩시
            
            //PC MODE / MOBILE MODE
            $window.resize(function(){
              pcMobileFn();                  
            });


            mobileEventFn();

            //메인메뉴 버튼
            $mainBtn.on({
                mouseenter:function(e){
                    e.preventDefault();
                    $(this).next().stop().show();
                }
            });



        },
        section2Fn:function(){
            var $caBtn = $('#section1 .ca-btn');
            var $navUl = $('#item-wrap ul');
            var $navUlW = $('#item-wrap ul').innerWidth();
            var $navUlLi = $('#item-wrap ul li');
            var $navUlLiW = $('#item-wrap ul li').innerWidth();
            var $navUlLiH = $navUlLiW*imgHRate;
            var n = $('#item-wrap ul li').length;
            var imgHRate = 1.3025;

            var btnNum = 0;
            var show = [];
            var hide = [];
            var k = -1;
            var cols = 3;
            var rows = Math.ceil(n/cols);
            var n = $('#item-wrap ul li').length;

            function resizeFn(){

                $navUlLiW = $('#item-wrap ul li').innerWidth();
                $navUlLiH = $navUlLiW*imgHRate;

                if(btnNum==0){
                    hide = [];
                    show = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
                }
                else if(btnNum==1){
                    hide = [1,2,3,5,6,8,9,10,12,13];
                    show = [0,4,7,11,14]
                }
                else if(btnNum==2){
                    hide = [0,2,3,4,6,7,8,9,11,12,13,14,15,16];
                    show = [1,5,10]
                }
                else if(btnNum==2){
                    hide = [0,1,3,4,5,7,9,10,11,13,14,16];
                    show = [2,6,8,12,15]
                }
                else if(btnNum==2){
                    hide = [0,1,2,4,5,6,7,8,10,11,12,14,15];
                    show = [3,9,13,16]
                }
    
                n=show.length;
                rows = Math.ceil(n/cols);
                $navUl.css({width : $navUlW, height : $navUlLiH*rows });
                $navUlLi.css({width : $navUlLiW, height : $navUlLiH});
                
                console.log($navUlLiW);
    
                //hide 반복문
                $.each(hide, function(idx){
                    $navUlLi.eq(hide[idx]).stop().hide();
                });
    
                //show 제어문
                k=-1;
                for(var i=0; i<rows; i++){
                    for(var j=0; j<cols; j++){
                        k++;
                        if(k>=n){
                            break;
                        }
                        else{
                            $navUlLi.eq(show[k]).stop().show().animate({left:$navUlLiW*j, top:$navUlLiH*i}, 400);
                        }
                    }
                }
            }
            setTimeout(resizeFn,1000)

            $(window).resize(function(){
                resizeFn();
            });
                
            $caBtn.each(function(idx){
                $(this).on({
                    click:function(){
                        btnNum = idx;
                    }
                });
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