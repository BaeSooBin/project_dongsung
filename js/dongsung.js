;(function($){

    var dongsung = {
        init:function(){
            this.scrollFn();
            this.headerFn();
            this.section1Fn();
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
            var $logoImg = $('#Header #logo a img');
            var $gnbImg01 = $('#Header #aside .lang a .glo');
            var $gnbImg02 = $('#Header #aside .lang a .arrow');
            var $gnbImg03 = $('#Header #aside .search img');
            var $gnbImg04 = $('#Header #aside .bar img');
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

            //모바일에서만 동작 
            //3선메뉴 (햄버거메뉴)
          /*   $mobileBtn.on({
              click:  function(event){
                event.preventDefault();
                // $bar.toggleClass('addMobile');   
                $nav.stop().slideToggle(300);

                that.btn == 0 ? that.btn = 1 : that.btn = 0 ; //전역 변수(전역 멤버변수)
                
              }
            }); */


        },
        section1Fn:function(){

            var $pageBtn = $('#section1 .page-btn');
            var $slideWrap = $('#section1 .slide-wrap');
            var $slide = $('#section1 .slide');
            var $section1 = $('#section1');
            var $winW = $(window).width();
            var $winH = $(window).height();
            var $imgW = $('#section1 img').innerWidth();
            var $imgH = $('#section1 img').innerHeight();
            var $txt = $('#section1 .txt');
            var n = $('#section1 .slide').length-2;
            var cnt = 0;
            var cnt2 = 0;
            var z = null;
            var txtn = $('#section1 .txt').length-1;
            var $productBtn = $('#section1 .product-btn');
            var $conBtn = $('#section1 .con-btn');

            function resizeFn(){
                $winW = $(window).width();
                $winH = $(window).height();
                $imgW = $('#section1 img').innerWidth();
                $imgH = $('#section1 img').innerHeight();
                $slide.css({width:$winW, height:$imgH});
                // console.log($imgH);
                    if($winW>980){
                        $imgH = $('#section1 img').innerHeight();
                    }
                    else if(680>$winW){
                        $imgH = 600;
                    }
                    
                $section1.css({width:$winW, height:$imgH});
            }
            setTimeout(resizeFn,100);

            $(window).resize(function(){
                setTimeout(resizeFn,100);
            });

            //메인슬라이드
            function mainNextSlideFn(){
                $slideWrap.stop().animate({left:-$winW*cnt}, 700, function(){
                    if(cnt>2){cnt=0}
                    if(cnt<0){cnt=2}
                    $slideWrap.stop().animate({left:-$winW*cnt},0);
                });

                if(z==null){
                    z = cnt2==0?2:cnt2-1;
                }

                $txt.css({zIndex:2, opacity:0});
                $txt.eq(z).css({zIndex:3, opacity:0});
                $txt.eq(cnt2).css({zIndex:4}).stop().animate({opacity:0,},800).animate({opacity:1},0);

                pageBtnFn();
            }
            function mainPrevSlideFn(){
                $slideWrap.stop().animate({left:$winW*cnt}, 700, function(){
                    if(cnt>2){cnt=0}
                    if(cnt<0){cnt=2}
                    $slideWrap.stop().animate({left:$winW*cnt},0);
                });

                if(z==null){
                    z = cnt2==2?0:cnt2+1
                }

                $txt.css({zIndex:2, opacity:0});
                $txt.eq(cnt2).css({zIndex:3, opacity:0});
                $txt.eq().css({zIndex:4}).stop().animate({opacity:0,},800).animate({opacity:1},0);
                z= null;
                pageBtnFn();
            }
            
            //다음 슬라이드 카운트
            function nextSlideCountFn(){
                cnt++;
                cnt2++;
                if(cnt2>txtn){
                    cnt2=0;
                }
                mainNextSlideFn();
            }
            function prevSlideCountFn(){
                cnt--;
                cnt2--;
                if(cnt2<txtn){
                    cnt2=2;
                }
                mainPrevSlideFn();
            }

            //페이지버튼
            function pageBtnFn(){
                $pageBtn.removeClass('addPage');
                $pageBtn.eq(cnt>n-1?0:cnt).addClass('addPage');
            }
            pageBtnFn();

            $pageBtn.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        if(cnt>idx){
                            cnt=idx;
                            mainPrevSlideFn();
                        }
                        if(cnt<idx){
                            cnt=idx;
                            mainNextSlideFn();
                        }
                    }
                });
            });

            //자동 슬라이드
            function autoTimerFn(){
                setId = setInterval(nextSlideCountFn, 6000);
            }
            autoTimerFn();

            //박스 서브
            $conBtn.on({
                click:function(e){
                    e.preventDefault();
                    $productBtn.stop().slideToggle(300);
                },
                
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