// ui_global.js : 필수 스크립트 정의


// 더보기 박스
$(document).on('click', '.btn_search_more', function () {
	$(this).attr('title', $(this).attr('title') == '펼치기' ? "접기" : "펼치기")
		.parent('.search_form').toggleClass('opened');
});

// 테이블 스크롤 표시
$(function () {
	$('.tbl').each(function () {
		tableScroll($(this));
	});
});

function tableScroll(obj) {
	if (obj.width() < obj.children('table').width()) {
		obj.addClass('tbl_scroll');
		obj.wrapInner('<div class="scroll_track"></div>');
	}

	var ingClass = 'scroll_ing',
		endClass = 'scroll_end';

	obj.children('.scroll_track').on('scroll', function (e) {
		var currLeft = this.scrollLeft,
			scrWidth = this.scrollWidth,
			cliWidth = this.clientWidth;

		if (currLeft === 0) {
			obj.removeClass(ingClass).removeClass(endClass);
		} else if (currLeft !== 0 && currLeft + cliWidth < scrWidth) {
			obj.addClass(ingClass).removeClass(endClass);
		} else {
			obj.addClass(endClass);
		}
	});
}

// $(window).on('load scroll', function () {
// 	var scrollValue = $(document).scrollTop();
// 	if (scrollValue) {
// 		$('body').addClass('scrolled');
// 	} else {
// 		$('body').removeClass('scrolled');
// 	}
// });