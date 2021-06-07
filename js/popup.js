(function($){

    var cookie = {
        init:function(){
            this.cookieFn();
        },
        cookieFn: function(){

            var today = null;
            var $closeBtn = $('.close-btn');
            var $popup = $('#popup');
            var $header = $('#header');
            var txt = '';
        
        
                //1 쿠키설정(setCookie)
                //  언제? 오늘 하루동안 열리지 않음을 체크(checked)하고 팝업창을 닫기 한 경우에 쿠키 설정 
                //1-1 클릭 이벤트와 체크박스 체크 유무
                $closeBtn.on({
                  click: function(e){
                    e.preventDefault();
                     if( cookieForm.chk.checked ){
                        setCookieFn('popup2021052601', 'no', 1);  //전달인자 아규먼트값들
                        //팝업창 / 헤더 애니메이션
                        $popup.addClass('addPop');
                        $header.addClass('addPop');
                     }
                  }
                });
        
                //1-2 함수 쿠키설정 함수 
                function setCookieFn(cookieName, cookieValue, expires){ //매개변수 파라미터 값들
                    today = new Date();
                    today.setDate( today.getDate() + expires  ); //만료일 1일 더하기 
                    // today.setMinutes( today.getMinutes() + expires  ); //만료일 1분 더하기
        
                    txt += cookieName + '=' + cookieValue + ';'
                    txt += 'expires=' + today.toUTCString() + ';';
        
                    document.cookie = txt ;
                }
        
        
                var regexp = /\s/g;
                //2 팝업창 오픈 : 쿠키가져와서 비교 판단
                //2-1 쿠기 가져오는 함수
                function getCookieFn(cookieName){
        
                  var cookie = document.cookie.replace(regexp,'').split(';path=/');
                  console.log(cookie);
        
                  for(var i in cookie){
                    var start = 0;
                    var end = document.cookie.indexOf('='); //15 길이
                    // var end = document.cookie.indexOf('=');//15 글자 위치를 인덱스 값으로 추출 첫글자 0 1 2 .. 15(16번째)
        
                        if( document.cookie.slice(start, end) == cookieName ){
                            start = document.cookie.indexOf('=')+1; // no
                            console.log( document.cookie.slice(start) )
                            return document.cookie.slice(start); //no                    
                        }
                  }
        
        
                        return '';
                }
        
        
                //레이어 팝업
                function layer_PopupFn(){
                  var isCoookie = getCookieFn('popup_20210526_02');
        
                      if(isCoookie =='yes'){
                        // 팝업창 클로즈(열지않음) addClass
                          $popup.addClass('addPop');
                          $header.addClass('addPop');
                      }
                      else{
                        // 팝업창 오픈 removeClass
                          $popup.removeClass('addPop');
                          $header.removeClass('addPop');
                      }
                }
                layer_PopupFn(); //로딩시 실행
                
                //2-2 팝업창이 열리게 해주는 함수
                function win_Popup_01Fn(){
                  var isCoookie = getCookieFn('popup_20210526_01');
        
                      if(isCoookie =='yes'){
                        // 팝업창 클로즈(열지않음) addClass
                        return false;
                      }
                      else{
                        // 팝업창 오픈 removeClass
                        window.open('http://tnqls0470.dothome.co.kr/komsco/popup_20210526_01.html','popup_20210526_01','width=500,height=700,top=0,left=0')
                      }
                }
                win_Popup_01Fn();
        
                              
        
        },

    };
    cookie.init();


})(jQuery);