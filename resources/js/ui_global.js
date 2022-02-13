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
	// 하단 고정 영역 모달 오픈 여백 확보
	if ($('.bottom_fixed_area:visible').length && $('.bottom_quickbar:visible').length) {
		var paddingBottom = $('.bottom_fixed_area').outerHeight() + 80;
		$('.wrapper').css('padding-bottom', paddingBottom);
		$('.bottom_fixed_area').css('bottom', 80);
	} else if ($('.bottom_fixed_area').length) {
		$('.wrapper').css('padding-bottom', $('.bottom_fixed_area').outerHeight());
	}

	// 토글 버튼
	$('[data-toggle-btn]').click(function () {
		var $btn = $(this);
		var toggleContent = $(this).data('toggle-btn');
		var $cont = $('[data-toggle-content=' + toggleContent + ']');
		$cont.toggle();

		// 툴팁
		if ($cont.hasClass('tooltip')) {
			var contTop = $btn.offset().top + $btn.outerHeight();
			$cont.css('top', contTop);
			$cont.appendTo('#content').attr('tabindex', '0').focus();
		};
	});

	// 툴팁 닫기
	$('.btn_close_tooltip').click(function () {
		var btnName = $(this).closest('[data-toggle-content]').data('toggle-content');
		var $btn = $('[data-toggle-btn=' + btnName + ']');
		$(this).closest('[data-toggle-content]').toggle();
		$btn.focus();
	});
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
		obj.wrapInner('<div class="scroll_track"></div>').append('<i class="ico ico_chevron_primary_bold_left"></i><i class="ico ico_chevron_primary_bold_right"></i>');
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

// 기간조회 버튼 클릭 활성화
$(document).on('click', '.btn_period', function () {
	$(this).addClass('active').attr('title', '선택됨')
		.siblings('.btn_period').removeClass('active').removeAttr('title');
});

// 입력폼 : 슬라이더
(function ($) {
	$.fn.formRange = function (opts) {
		return this.each(function () {
			let options = $.extend({}, $.fn.formRange.defaults, opts || {});
			const $el = $(this),
				$range = $('.form_range_form', $el),
				max = $range.attr('max'),
				min = $range.attr('min');

			// event
			if (!$('.form_range_value', $el).length) {
				$el.append('<div class="form_range_value"></div>');
			}
			rangeSetting($range, options.unitName, max, min);

			if (options.minShow == true) {
				$el.append('<div class="form_range_min"></div>');
				$('.form_range_min', $el).text(min.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + options.unitName);
			} else {
				$('.form_range_min', $el).remove();
			}

			if (options.maxShow == true) {
				$el.append('<div class="form_range_max"></div>');
				$('.form_range_max', $el).text(max.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + options.unitName);
			} else {
				$('.form_range_max', $el).remove();
			}

			if (!(options.minShow && options.minShow)) {
				$el.css('padding-bottom', 0);
			}

			$el.on('input', function () {
				rangeSetting($range, options.unitName, max, min);
			});
		});

		function rangeSetting(range, unit, max, min) {
			const $range = range,
				$value = $range.next('.form_range_value');
			let val = Number($range.val()),
				gague = ((val - min) / (max - min) * 100) + '%';
			$value.text($range.val().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + unit);
			$value.css('left', gague);
		}
	};

	$.fn.formRange.defaults = {
		unitName: '만원',
		minShow: true,
		maxShow: true,
	};
})(jQuery);
$(function () {
	$('.form_range').formRange();
});

// 스크롤 이벤트
(function ($) {
	$.fn.scrollEvent = function (opts) {
		return this.each(function () {
			let options = $.extend({}, $.fn.scrollEvent.defaults, opts || {});
			const $el = $(this);

			if (options.height) {
				$el.css('max-height', options.height);
			} else {
				options.height = $el.height();
			}

			$el.css('overflow-y', 'auto');

			// event
			$el.on('scroll', function () {
				if (options.bottomEvent) {
					if ($el[0].scrollHeight - $el.scrollTop() == options.height) {
						options.bottomEvent.call();
					}
				}
				if (options.topEvent) {
					if ($el.scrollTop() == 0) {
						options.topEvent.call();
					}
				}
			});
		});
	};

	$.fn.scrollEvent.defaults = {
		bottomEvent: function () {},
		topEvent: function () {}
	};
})(jQuery);