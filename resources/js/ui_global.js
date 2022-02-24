// ui_global.js : 필수 스크립트 정의

// IE 감지
var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("msie") > -1 || agent.indexOf("trident") > -1) {
	$('body').addClass('ie');
}

// Skip Nav
$(document).on('click', '.skip_nav', function (e) {
	e.preventDefault();
	var tg = $(this).attr('href');
	$(tg).attr('tabindex', '0').focus();
});

// 더보기 박스
$(function () {
	$('.box_more').each(function () {
		$(this).wrapInner('<div class="inner"></div>').append('<button type="button" class="btn btn_more_white">더보기</button>');
	});
});

$(document).on('click', '.box_more .btn_more_white', function () {
	if ($(this).closest(".box_more").hasClass("new_controlls")) {
		$(this).parent('.box_more').hasClass('opened') ? $(this).text('계약정보 상세보기') : $(this).text('상세보기 닫기');
		$(this).parent('.box_more').toggleClass('opened');
	} else {
		$(this).parent('.box_more').hasClass('opened') ? $(this).text('더보기') : $(this).text('접기');
		$(this).parent('.box_more').toggleClass('opened');
	}
});

// 화면 크기 변경 실행
$(function () {
	resizeApply();
});

// 화면 크기 변경시에 축소
function resizeApply() {
	var minWidth = 1250;
	var body = document.getElementsByTagName('body')[0];
	if (window.innerWidth < minWidth) {
		body.style.zoom = (window.innerWidth / minWidth);
	} else {
		body.style.zoom = 1;
	}
}
window.onload = function () {
	window.addEventListener('resize', function () {
		resizeApply();
	});
}

// 웹 접근성 보완
$(function () {
	setTimeout(function () {
		// 대체텍스트 추가
		$('.necessary').each(function () {
			$(this).attr('aria-label', '필수');
		});
	}, 200);
});

// 메인 헤더 UI (스크롤시 디자인)
$(function () {
	if ($('.header_global_main').length) {
		$('body').addClass('global_main');
	}
});

$(window).on('load scroll', function () {
	var scrollValue = $(document).scrollTop();
	if (scrollValue) {
		$('body').addClass('scrolled');
	} else {
		$('body').removeClass('scrolled');
	}
});

// 인터넷뱅킹 퀵메뉴 마이메뉴 (더보기 영역 확장)
$(document).on('click', '.btn_menu_more', function () {
	var button = $(this);
	$('.quick_my_menu > ul').toggleClass('hidden_menu');

	if (button.attr('title') == 'MY메뉴 전체 영역 열기') {
		button.attr('title', 'MY메뉴 전체 영역 닫기');
	} else {
		button.attr('title', 'MY메뉴 전체 영역 열기');
	}
});

// 인터넷뱅킹 퀵메뉴 상품 목록 슬라이드
setTimeout(function () {
	$('.latest_product_slide').slick({
		arrows: false,
		draggable: false,
		slidesToScroll: 1,
		slidesToShow: 1,
		infinite: true,
		false: true,
		dots: false,
		speed: 500,
		autoplay: false,
		autoplaySpeed: 3000
	});
}, 500);

// 인터넷뱅킹 퀵메뉴 상품목록 이전 버튼
function latestProductPrev() {
	$('.latest_product_slide').slick('slickPrev');
}

// 인터넷뱅킹 퀵메뉴 상품목록 다음 버튼
function latestProductNext() {
	$('.latest_product_slide').slick('slickNext');
}