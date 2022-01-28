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

//화면 크기 변경시에 축소
function resizeApply() {
	var minWidth = 1300;
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