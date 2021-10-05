// ui_global.js : 필수 스크립트 정의

// 헤더 스크롤시 디자인
$(window).on('load scroll', function () {
	var scrollValue = $(document).scrollTop();
	if (scrollValue) {
		$('body').addClass('scrolled');
	} else {
		$('body').removeClass('scrolled');
	}
});

$(function () {
	// 하단 버튼 영역 여백 확보
	if ($('.bottom_fixed_area').length) {
		$('.wrapper').css('padding-bottom', $('.bottom_fixed_area').outerHeight());
	}

	// 토글버튼
	$('[data-toggle-btn]').click(function () {
		var toggleContent = $(this).data('toggle-btn');
		$('[data-toggle-content=' + toggleContent + ']').toggle();
	});
});

// 테이블 스크롤 표시
$(document).ready(function () {
	if ($('.scroll_track').length > 0) {
		tableScroll();
	}
});

function tableScroll() {
	var table = $('.scroll_track');

	table.each(function () {
		var $this = $(this),
			ingClass = 'scroll_ing',
			endClass = 'scroll_end';
		$this.on('scroll', function (e) {
			var wrap = $(this).closest('.tbl'),
				currLeft = this.scrollLeft,
				scrWidth = this.scrollWidth,
				cliWidth = this.clientWidth;

			if (currLeft === 0) {
				wrap.removeClass(ingClass).removeClass(endClass);
			} else if (currLeft !== 0 && currLeft + cliWidth < scrWidth) {
				wrap.addClass(ingClass).removeClass(endClass);
			} else {
				wrap.addClass(endClass);
			}
		});
	});
}