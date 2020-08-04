$(function () {
    console.log("JQ..");

    $.getJSON('../json/menu.json', function (data) {
        $.each(data, function (index, item) {
            // console.log(index, item);

            // 페이지 변환
            $('.page').each(function(){
                var $main_li_ = $('.top .nav .list > li');
        
                $main_li_.on("click", function() {
                    var li_index = $(this).index();
                    console.log("page -> li index : " + li_index);
        
                    $('body .page').removeClass('active');
                    $('body .page').eq(li_index+1).addClass('active');
                });
            });


            // top메뉴의 sub메뉴 li 태그 생성 및 입력
            var type_name = item.type; // json의 type 데이터들을 변수에 저장
            var sub_li_fin;
            var li = $('<li> </li>');
            var a = $('<a href=""> </a>')
            a.append(item.text); // a태그 생성 및 text 추가
            sub_li_fin = li.append(a); // li태그 생성 및 a 태그 추가

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
            $main_li.on("mouseenter", function () {
                var index = $(this).index();

                $sub.hide();
                $sub.eq(index).show();

                if (index == 0) {
                    if (item.type == 'BRAND') {
                        $sub.eq(index).append(sub_li_arr);
                    }
                } else if (index == 1) {
                    if (item.type == 'MENU') {
                        $sub.eq(index).append(sub_li_arr);
                    }
                } else if (index == 2) {
                    if (item.type == 'STORE') {
                        $sub.eq(index).append(sub_li_arr);
                    }
                } else if (index == 3) {
                    if (item.type == 'MEMBERSHIP') {
                        $sub.eq(index).append(sub_li_arr);
                    }
                } else if (index == 4) {
                    if (item.type == 'EVENT') {
                        $sub.eq(index).append(sub_li_arr);
                    }
                }
            });
            $subBox.on("mouseleave", function () {

                $sub.hide();
            });

            // 배너 부분 JSON으로 이미지 삽입
            /* var src = item.src;
            var div = $('<div> </div>'); // div 태그 생성
            var img = $('<img src=""> </img>'); // img 태그 생성
            var img_src = img.attr('src'); // img 태그에서 src 탐색
            var img_src_val = img_src.replace("", src); */
            var banner_img =
            '<div>' +
                '<img src="' + item.src + '" alt=""/>' +
            '</div>'

            var banner_img_arr = [];
            banner_img_arr.push($(banner_img));

            // 배너 이미지 삽입
            var $banner_imgBox = $('.banner .imgBox');
            if (item.type == 'banner') {
                /* div.append(img);
                $imgBox.append(div);
                img.attr("src", img_src_val); */
                $banner_imgBox.append(banner_img_arr);
            }
            


            // food메뉴 관련 함수
            $('.food').each(function () {
                var food_menu = $(this).find('.menu');

                // food메뉴 li 태그 생성 및 입력
                if (type_name == "MENU") {
                    food_menu.append(sub_li);
                }

                var $foodBox = $(this).find('.foodBox');
                var $foodBox_new = $foodBox.find('.new');
                
                // food메뉴에 img 생성
                var menu_divImg =
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

                var menu_div =
                '<div class="flexBx">' +
                    menu_divImg +
                '</div>'

                if (item.type == "new") {
                    /* div.append(img);
                    $foodBox_new.append(div);
                    img.attr("src", img_src_val); */
                    $foodBox.find(".new").append(menu_divImg);
                } else if (item.type == "bread"){
                    $foodBox.find(".bread").append(menu_divImg);
                }
            });

            // --------------------------------------------------

            // menu li 
            $('.food .nav .menu li').each(function(){
                var sub_index = $(this).index();
                console.log("normal index : " + $(this).eq(0));
                $(this).eq(sub_index).addClass('active');

                $(this).on("mouseenter", function(){

                    console.log("menu list index : " + sub_index);
                });              
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



});