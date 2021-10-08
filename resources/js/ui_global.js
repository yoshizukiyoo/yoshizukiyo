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
	// 하단 고정영역 여백 확보
	if ($('.bottom_fixed_area').length) {
		$('.wrapper').css('padding-bottom', $('.bottom_fixed_area').outerHeight());
	}

	// 하단 고정영역 내 토글 레이어
	$('.bottom_toggle').each(function () {
		var $btn = $('.btn_toggle', this);
		var $cont = $('.toggle_cont_area', this);

		var spacing = $('.toggle_btn_area', this).outerHeight();
		$cont.css('bottom', spacing);

		$btn.click(function () {
			$btn.toggleClass('active');
			$cont.toggle();
		});

		$('.dimed', this).click(function () {
			$(this).closest('.toggle_cont_area').toggle();
			$btn.toggleClass('active');
		});
	});

	// 토글버튼
	$('[data-toggle-btn]').click(function () {
		var toggleContent = $(this).data('toggle-btn');
		var $cont = $('[data-toggle-content=' + toggleContent + ']');
		$cont.toggle();
		if ($cont.hasClass('toggle_cont_area')) {
			$cont.prev().find('.btn_toggle').toggleClass('active');
		};
	});
});

// 테이블 스크롤 표시
$(document).ready(function () {
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