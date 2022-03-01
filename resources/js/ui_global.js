// ui_global.js : 필수 스크립트 정의


// 더보기 박스
$(document).on('click', '.btn_search_more', function () {
	$(this).attr('title', $(this).attr('title') == '펼치기' ? "접기" : "펼치기")
		.parent('.search_form').toggleClass('opened');
});

$(window).on('load scroll', function () {
	var scrollValue = $(document).scrollTop();
	if (scrollValue) {
		$('body').addClass('scrolled');
	} else {
		$('body').removeClass('scrolled');
	}
});