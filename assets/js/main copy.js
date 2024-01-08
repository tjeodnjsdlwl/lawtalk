/* index */
const headerH = $('.header').outerHeight(true);
$('.container').css('margin-top', headerH);

// 검색창 input close btn
// keyup() : 입력하는 순간마다 변화 감지, change() : 입력 후 인풋 벗어나야 감지
$('.header-top .input-search').keyup(function () {
    if ($(this).val() != 0) {
        $('.header-top .btn-cancel').addClass('show');
    } else {
        $('.header-top .btn-cancel').removeClass('show');
    }
});
$('.header-top .btn-cancel').click(function () {
    $('.header-top .input-search').val('');
    $('.header-top .btn-cancel').removeClass('show');
});


// sc-information JSON
$.get('../../assets/json/information.json')
    .done(function (data) {
        // console.log(data);
        data.forEach((a, i) => {
            let slideTag = `<div class="swiper-slide infor-con-item">
                                <a href="${a.linkUrl}">
                                    <div class="con-head">
                                        <div class="subtitle ${a.type}">
                                            <span>${a.type}</span>
                                            ${a.subtit}
                                        </div>
                                        <strong class="title">${a.title}</strong>
                                    </div>
                                    <div class="con-foot">
                                        <div class="prof-img">
                                            <img src="${a.profImg}" alt>
                                            <span class="name">${a.profName}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>`;
            // console.log(slideTag);
            $('.sc-information .swiper-wrapper').append(slideTag);
        });
    })
    .fail(function () {
        console.log('데이터 전달 오류');
    });

// sc-review JSON
$.get('../../assets/json/review.json')
    .done(function (data) {
        // console.log(data);
        data.forEach((a, i) => {
            let slideTag = `<div class="swiper-slide review-item">
                                <a href="${a.linkUrl}">
                                    <span class="charge">${a.name}</span>
                                    <div class="title">
                                        <img src="./assets/images/quotation_marks.svg" alt class="svg" />
                                        <strong>${a.title}</strong>
                                    </div>
                                    <p class="desc">${a.desc}</p>
                                    <div class="nick">${a.nick}님의 후기</div>
                                </a>
                            </div>`;
            // console.log(slideTag);
            $('.sc-review .swiper-wrapper').append(slideTag);
        });
    })
    .fail(function () {
        console.log('데이터 전달 오류');
    });

// sc-latest JSON

let clickCount = 0;

$.get('../../assets/json/latest.json')
    .done(function (data) {
        function latestData(arrayNum) {
            let itemTag = ``;
            data[arrayNum].forEach((a, i) => {
             
                let imgList=``;
                a.img.forEach((element,i) => {
                    imgList+=`<img src="${element}" alt />`;
                });

                itemTag += `<li class="con-item">
                                    <a href="${a.linkUrl}" class="link-cover"></a>
                                    <div class="con-head">
                                        <span class="subtitle">${a.subtitle}</span>
                                        <strong class="title">${a.title}</strong>
                                    </div>
                                    <p class="con-desc">${a.desc}</p>
                                    <div class="con-foot">
                                        <div class="prof-img">
                                            ${imgList}
                                        </div>
                                        <div class="ans-num">변호사 답변 <em>${a.img.length}</em>개</div>
                                    </div>
                                </li>`;
                // console.log(itemTag);
            });
            $('.sc-latest .con-list').html(itemTag);
        }
        latestData(0);
    
        $('.sc-latest .btn-more').click(function () {

            clickCount++;
            a = clickCount % 4;
            console.log(a);
            $('.sc-latest .con-list').html('');
            $('.sc-latest .btn-more .latest-page').text(a + 1);
            latestData(a);
           
        });
    })
    .fail(function () {
        console.log('데이터 전달 오류');
    });

// sc-solution JSON
$.get('../../assets/json/solution.json')
    .done(function (data) {
        function solutionData(arrayNum) {
            data[arrayNum].forEach((a, i) => {
                let itemTag = `<li class="con-item">
                                    <a href="${a.linkUrl}" class="link-cover"></a>
                                    <div class="con-head">
                                        <div class="subtitle">
                                            <img src="${a.img}" alt />
                                            <span class="name">${a.name}</span>
                                        </div>
                                        <strong class="title">${a.title}</strong>
                                    </div>
                                    <p class="con-desc">${a.desc}</p>
                                    <div class="con-foot">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M19.5717 17.9152C19.9505 17.9152 20.2968 18.1292 20.4662 18.468L20.7764 19.0885C21.1088 19.7534 20.6253 20.5357 19.882 20.5357H11.326C10.5826 20.5357 10.0991 19.7534 10.4315 19.0885L10.7418 18.468C10.9112 18.1292 11.2574 17.9152 11.6362 17.9152H19.5717ZM10.1514 3.70711C10.5419 3.31658 11.1751 3.31658 11.5656 3.70711L11.8018 3.94335C12.1489 4.29041 12.149 4.85307 11.802 5.20024L16.8309 10.2298C17.1781 9.88259 17.7411 9.88259 18.0883 10.2298L18.3242 10.4657C18.7147 10.8562 18.7147 11.4894 18.3242 11.8799L15.3376 14.8665C14.9471 15.257 14.314 15.257 13.9234 14.8665L13.6875 14.6305C13.3403 14.2833 13.3403 13.7204 13.6875 13.3732L11.802 11.4873L4.88603 18.4027C4.53882 18.7499 3.97591 18.7498 3.62871 18.4026C3.28149 18.0554 3.2815 17.4925 3.62874 17.1453L10.5447 10.23L8.6585 8.34376C8.31104 8.691 7.7479 8.69092 7.40055 8.34356L7.16484 8.10785C6.77431 7.71733 6.77431 7.08416 7.16484 6.69364L10.1514 3.70711Z"
                                                fill="black"
                                            ></path>
                                        </svg>
                                        <strong class="label">${a.label}</strong>
                                    </div>
                                </li>`;
                // console.log(itemTag);
                $('.sc-solution .con-list').append(itemTag);
            });
        }
        solutionData(0);

        let clickCount2 = 0;
        $('.sc-solution .btn-more').click(function () {
            clickCount2++;

            if (clickCount2 == 1) {
                $('.sc-solution .con-list').html('');
                $('.sc-solution .btn-more .solution-page').text(clickCount2 + 1);
                solutionData(1);
            } else if (clickCount2 == 2) {
                $('.sc-solution .con-list').html('');
                $('.sc-solution .btn-more .solution-page').text(clickCount2 + 1);
                solutionData(2);
            } else if (clickCount2 == 3) {
                $('.sc-solution .con-list').html('');
                $('.sc-solution .btn-more .solution-page').text(clickCount2 + 1);
                solutionData(3);
            } else if (clickCount2 == 4) {
                $('.sc-solution .con-list').html('');
                $('.sc-solution .btn-more .solution-page').text(1);
                solutionData(0);
                clickCount2 = 0;
            }
        });
    })
    .fail(function () {
        console.log('데이터 전달 오류');
    });

// prev & next 버튼 클릭시, 메뉴 list scroll 이동
function scrollXmenu(area) {
    $(`${area} .btn-area .btn-next`).click(function () {
        $(`${area} .tab-list`).scrollLeft(10000);
        $(this).removeClass('show');
        $(`${area} .btn-area .btn-prev`).addClass('show');
    });
    $(`${area} .btn-area .btn-prev`).click(function () {
        $(`${area} .tab-list`).scrollLeft(-10000);
        $(this).removeClass('show');
        $(`${area} .btn-area .btn-next`).addClass('show');
    });
}
scrollXmenu('.sc-quick');
scrollXmenu('.sc-new');

// 메뉴 item 클릭시, on
function menuClick(area) {
    $(`${area} .tab-item`).click(function () {
        let index = $(this).index();
        // console.log(index);
        $(this).addClass('on').siblings().removeClass('on');
        $(`${area} .tab-con-list`).eq(index).addClass('on').siblings().removeClass('on');
    });
}
menuClick('.sc-quick');
menuClick('.sc-new');

/* swiper */
// sc-counsel - 비주얼슬라이드
var swiper1 = new Swiper('.sc-counsel .swiper', {
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    allowTouchMove: false,
    loop: true,
    // loopAdditionalSlides: 1,
    pagination: {
        el: '.slide-control .pagenation',
        type: 'fraction',
        clickable: true,
    },
    navigation: {
        nextEl: '.slide-control .slide-next',
        prevEl: '.slide-control .slide-prev',
    },
});
let cnt = 0;
$('.sc-counsel .slide-control .slide-move').click(function () {
    cnt++;
    if (cnt % 2 != 0) {
        $(this).find('.slide-stop').removeClass('on');
        $(this).find('.slide-play').addClass('on');
        swiper1.autoplay.stop();
    } else {
        $(this).find('.slide-play').removeClass('on');
        $(this).find('.slide-stop').addClass('on');
        swiper1.autoplay.start();
    }
});

// sc-information : 정보 슬라이드
// JSON충돌 오류방지 : 0.1초 늦게 실행
setTimeout(function () {
    var swiper2 = new Swiper('.sc-information .swiper', {
        slidesPerView: 4, // 동시에 보여줄 슬라이드 갯수
        //spaceBetween: 24, // 슬라이드간 간격
        centeredSlides: true, // 슬라이드 중심
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        allowTouchMove: false, //드래그 막기
    });
}, 100);

// sc-review : 리뷰 슬라이드
// JSON충돌 오류방지 : 0.1초 늦게 실행
setTimeout(function () {
    var swiper2 = new Swiper('.sc-review .swiper', {
        slidesPerView: 3,
        spaceBetween: 24,
        slidesPerGroup: 3, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음
        loopFillGroupWithBlank: true,
        // 그룹수가 맞지 않을 경우 빈칸으로 메움 (1개만 있다면 2개는 빈칸으로)
        allowTouchMove: false,
        navigation: {
            nextEl: '.sc-review .btn-area .btn-next',
            prevEl: '.sc-review .btn-area .btn-prev',
        },
    });
}, 100);
