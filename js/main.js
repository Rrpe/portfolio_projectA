$(function () {

    var $page = $('.page');
    $page.hide();

    $.getJSON('./data/menu.json', function (data) {
        console.log("getJSON");
        $.each(data, function (index, item) {
            // console.log(index, item);

            // 페이지 변환
            $page.each(function () {
                var $main_li_ = $('.top .nav .list > li');

                $(this).hide();

                $main_li_.on("click", function () {
                    var li_index = $(this).index();

                    $main_li_.removeClass('on');
                    $main_li_.eq(li_index).addClass('on');

                    // $('body .page').removeClass('active');
                    // $('body .page').eq(li_index + 1).addClass('active');
                    $('.first').hide();
                    $page.hide().removeClass('active');
                    $page.eq(li_index).show().addClass('active');

                });


            }); // 페이지 변환 끝

            // top메뉴의 sub메뉴 li 태그 생성 및 입력
            var sub_li =
                '<li>' +
                '<p>' +
                item.text +
                '</p>' +
                '</li>';

            // 서브메뉴 호버 이벤트 처리 부분
            var $subBox = $('.subBox');
            var $sub = $subBox.find('.sub');
            var $main_li = $('.top .nav .list li');

            // main_li를 sub에 append 시 중복 발생 현상을 막기 위해 배열 사용
            var sub_li_arr = [];
            sub_li_arr.push($(sub_li));

            // top menu에 마우스호버시 서브메뉴 호출
            var topmenu_li_arr = ['BRAND', 'MENU', 'STORE', 'MEMBERSHIP', 'EVENT'];
            $.each($main_li, function (index) {

                $(this).on('mouseenter', function () {
                    $sub.hide();
                    $sub.eq(index).show();

                    if (item.type === topmenu_li_arr[index]) {
                        $sub.eq(index).append(sub_li_arr);
                    }
                });

            });
            $subBox.on("mouseleave", function () {
                $sub.hide();
            });

            //////// 배너 부분 JSON으로 이미지 삽입
            /* var src = item.src;
            var div = $('<div> </div>'); // div 태그 생성
            var img = $('<img src=""> </img>'); // img 태그 생성
            var img_src = img.attr('src'); // img 태그에서 src 탐색
            var img_src_val = img_src.replace("", src); */
            var banner_img =
                '<div>' +
                '<img src="' + item.src + '" alt=""/>' +
                '</div>';

            var banner_img_arr = []; // append 시 중복 발생 현상을 막기 위해 배열 사용
            banner_img_arr.push($(banner_img));

            // 배너 이미지 삽입
            var $banner_imgBox = $('.banner .imgBox');
            $banner_imgBox.each(function(){
                if (item.type2 === 'banner') {
                    /* div.append(img);
                    $imgBox.append(div);
                    img.attr("src", img_src_val); */
                    $banner_imgBox.append(banner_img);
                }
            });

            ///// food에 menu list 추가
            var $food = $('.food');
            var $food_menu = $food.find('.area .nav .menu');
            var $foodBox = $food.find('.foodBox');

            // food menu li 태그 생성
            var food_menu_li =
                '<li>' +
                '<p>' +
                item.text +
                '</p>' +
                '</li>';
            var food_menu_li_arr = [];
            food_menu_li_arr.push($(food_menu_li));

            // trigger box 태그 생성
            var trigger =
                '<div class="trigger"></div>';
            var trigger_arr = [];
            trigger_arr.push($(trigger));

            // food menu li && trigger box 태그 추가
            if (item.type === 'MENU') {
                $food_menu.append(food_menu_li_arr);
                $foodBox.append(trigger_arr);
            }

            var $food_menu_li = $food_menu.find('li');
            var $trigger = $foodBox.find('.trigger');

            var change =
                '<div class="change"></div>';
            var change_arr = [];
            change_arr.push($(change));

            var name_label =
                '<div class="named" style="text-align: center;">' +
                '<h2>' + item.text + '</h2>' +
                '<img src="' + item.src + '" alt="">' +
                '</div>';
            var name_label_arr = [];
            name_label_arr.push($(name_label));

            // food > trigger > change에 img 태그 생성
            var menu_ko_divImg =
                '<div class="card">' +
                '<div class="imgBx">' +
                '<img src="' + item.src + '" alt="">' +
                '</div>' +
                '<div class="textBx">' +
                '<p>' + item.title_ko + '</p>' +
                '<p>' + item.title_en + '</p>' +
                '<p>' + item.price + '</p>' +
                '</div>' +
                '</div>';

            // trigger box에 img 추가
            var menu_li_arr = ['new', 'bread', 'starter', 'pasta', 'pizza', 'rice', 'steak', 'dessert', 'beverage', 'wine'];
            $.each($trigger, function () {
                var index = $(this).index();

                if (item.type === 'MENU') {
                    $(this).append(name_label_arr, change_arr);
                }

                if (item.type === menu_li_arr[index]) {
                    $(this).find('.change').append(menu_ko_divImg).addClass(item.type);
                }

                $food_menu_li.eq(0).addClass('on');
                $(this).eq(index).addClass('active');

            });

            // food menu li 클릭 트리거
            $food_menu_li.on("click", function () {
                var index = $(this).index();

                $food_menu_li.removeClass('on');
                $food_menu_li.eq(index).addClass('on');

                $trigger.removeClass('active');
                $trigger.eq(index).addClass('active');
            });

            // membership
            var $membership = $('.membership');
            var $m_introBx = $membership.find('.introBx');

            var div_introCd =
            '<div class="introCd">' +
                '<img src="' + item.src + '" alt="" />' +
                '<div class="introTxt">' +
                    '<h2>' + item.h2 + '</h2>' + 
                    '<h4>' + item.h4 + '</h4>' +
                    '<p>' + item.p + "</p>" + 
                    '<button>자세히 보기</button>' +  
                '</div>' + 
            '</div>';
            $m_introBx.each(function(){
                if (item.division === "introBx") {
                    $(this).append(div_introCd);
                }
            });
            
            // event
            var $event = $('.event');
            var $e_eventBx = $event.find('.eventBx');
//----------------------------------------------
            var div_eventCd =
            '<div class="eventCd">' +
                '<div class="imgBx">' +
                '<img src="' + item.src + '" alt="" />' +
                '</div>' +
                '<div class="txtBx">' +
                    '<h4>' + item.h4 + '</h4>' +
                    '<p>' + item.p + "</p>" + 
                    '<button>자세히 보기</button>' +  
                '</div>' + 
            '</div>';
            $e_eventBx.each(function(){
                if (item.division2 === "eventBx") {
                    $(this).append(div_eventCd);
                }
            });

        }); // Json each

        // slick library slide js
        $('.imgBox').slick({
            dots: true,
            infinite: true,
            speed: 300,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true,
        }); // slide library js

    }); // getJSON

    /*
    // 새 탭에서 창 띄우기 
    $('.top .nav .list li:nth-child(3)').click(function(){
        var openNewWindow = window.open("about:blank");
        openNewWindow.location.href = "https://www.madforgarlic.com/store";
    }); 
    $('.top .nav .list li:nth-child(3)').click(function(){
        $(location).attr('href','https://www.madforgarlic.com/store');
    });
    */

    // 스크롤시 메뉴 탑에 고정
    $(window).scroll(function () {
        //실시간으로 스크롤의 높이를 측정
        var height = $(document).scrollTop(); 
        var updown = $('.scrollTop i').attr('class');
            
        if (height > 80) {
            $('.nav').addClass('sticty');
            $('.scrollTop i').attr('class', updown.replace('down', 'up'));
            // $('.food .nav.sticky')
        } else if (height < 80) {
            $('.nav').removeClass('sticty');
            $('.scrollTop i').attr('class', updown.replace('up', 'down'));
        }

        $('.sticty').css({
            'position': 'sticky',
            'top': 0,
            'z-index': 999,
            'border': 0
        });
    });
    
    // 스크롤 업 다운 이벤트
    $('.fa-chevron-up').on("click", function () {
        console.log("up click");
        $('html').stop().animate({
            "scrollTop": 0
        }, 500);
    });
    $('.fa-chevron-down').on("click", function(){
        console.log("down click");
        $('html').stop().animate({
            "scrollTop": $('html').height()
        }, 500);
    });


    // 컬러 반전
    $('.top .nav .list li:nth-child(1)').click(function () {
        $('html, .top .res, .page').not(" > div:nth-child(1)").css({
            "filter": "invert(100%)"
        });
    });
    $('.top .nav .list li').not(':nth-child(1)').click(function () {
        $('html, .top .res, .page').not(" > div").css({
            "filter": "none"
        });
    });

}); // jQuery

/* 
// 모바일 웹앱
var wid = $(window).width();
if (wid >= 768) {
    PC Mode Function 
} 
else (wid < 768) {
    Moblie Mode Function
} 
*/