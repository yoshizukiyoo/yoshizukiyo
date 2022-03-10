/* 
	본 JS는 퍼블리싱 편의를 위해 
	중복되는 공통 레이아웃 영역을 로드할 목적으로 작성된 문서입니다.
	서버 언어로 레이아웃을 구성하게되면 오류를 유발하는 코드이오니
	Back-End 개발시 이 파일을 반드시 삭제해 주세요 :)
*/


// 레이아웃 공통 영역 로드
var _ui_dev_mode = true;
// var _ui_dev_mode = false;

$(function () {
	const headerInc = $('.header').data('inc');
	const pageTitle = $('.header').data('page-title');
	let headerUrl;
	if (headerInc == undefined) {
		if (pageTitle == undefined) {
			headerUrl = window.location.pathname;
		} else {
			headerUrl = '/html/_inc_header.html';
		}
	} else {
		headerUrl = '/html/' + headerInc;
	}
	const components = [{
		name: 'header',
		element: $('.header'),
		fileUrl: headerUrl,
		container: '.header',
		use: true,
		callback: function () {
			$('.tit_page').html(pageTitle);
		},
	}, {
		// 	name: 'footer',
		// 	element: $('.footer'),
		// 	fileUrl: '/html/_inc_footer.html',
		// 	container: '.footer',
		// 	use: true,
		// 	callback: function () {},
		// }, {
		name: 'commonLayers',
		element: $('.common_layers'),
		fileUrl: '/html/_inc_common_layers.html',
		container: '.common_layers',
		use: true,
		callback: function () {},
	}];

	components.forEach(function (value, index, array) {
		if (!components[index].element.is(':visible')) {
			components[index].use = false;
		}
	});

	let useLoadComponents = components.filter(function (useLoadComponent) {
		return useLoadComponent.use && window.location.pathname != useLoadComponent.fileUrl;
	});

	let defaultComponents = components.filter(function (defaultComponent) {
		var myContents = defaultComponent.use && window.location.pathname == defaultComponent.fileUrl;
		if (myContents) defaultComponent.callback.call();
		return myContents;
	});

	if (useLoadComponents.length < defaultComponents.length || useLoadComponents.length == 0) {
		setDefaultUI('case 1');
	}

	useLoadComponents.forEach(function (value, index, array) {
		var component = useLoadComponents[index],
			element = component.element,
			fileUrl = component.fileUrl,
			container = component.container,
			callback = component.callback;
		if (window.location.pathname == fileUrl) {
			setDefaultUI('case 2');
		} else {
			element.load(fileUrl + ' ' + container + ' > *', function (response, stu, xhr) {
				callback.call();
				if (index == useLoadComponents.length - 1) {
					setDefaultUI('case 3');
				}
			});
		}
	});

	// 페이지 로딩시 기본 세팅
	function setDefaultUI(type) {
		hashModalOpener();

		// 공통 UI
		tabmenu();
		tableScroll();
		// inputStatus();

		// 접근성
		// setCaption();
		if (_ui_dev_mode) console.log(type + ': UI setup is complete.');
	}
});

//
// 공통 컴포넌트 UI
//

// 해시 URL로 모달팝업 열기 (화면 미리보기 용도)
function hashModalOpener() {
	var hash = window.location.hash;
	var popupData = hash.substring(hash.lastIndexOf("#") + 1);
	if ($('.modal_popup[data-popup="' + popupData + '"]').length) {
		if ($('.modal_popup.show').length) closeModal($('.modal_popup.show').data('popup'));
		openModal(popupData);
	}
	$(window).bind('hashchange', function () {
		hashModalOpener();
	});
}

// 탭메뉴
function tabmenu() {
	$(document).on('click', '.tab_list a', function (e) {
		var tg = $(this).attr('href');
		$(this).attr('title', '선택됨').parent('li').addClass('on').siblings('li').removeClass('on').children('a').removeAttr('title');
		if (tg === '#' || tg === '' || tg === '#;') {
			e.preventDefault();
		} else if (tg.charAt(0) === '#') {
			if ($(tg).hasClass('tab_cont')) {
				$(tg).show().siblings('.tab_cont').hide();
				e.preventDefault();
			}
		}
	});
	$('.tab_list .on a').each(function () {
		$(this).attr('title', '선택됨');
		var tg = $(this).attr('href');
		if (tg !== '#' && tg !== '#;' && tg.charAt(0) === '#') {
			$(tg + '.tab_cont').css('display', 'block');
		}
	});
	$('.tab_menu1').each(function () {
		var outerWidth = Math.floor($(this).width());
		var innerWidth = 0;
		var current = $('li.on', this).index();
		$('li', this).each(function () {
			innerWidth += Math.floor($(this).width());
		});

		if (outerWidth < innerWidth) {
			$(this).addClass('scroll_enable');
		}
		if (current > 1) {
			var posL = $('li', this).eq(current - 1).position().left;
			$(this).children().scrollLeft(posL);
		}
	});
	$('.tab_menu2').each(function () {
		if ($('li', this).length > 3) {
			$(this).addClass('col_drop');
		}
	});
}

// 인풋박스 스타일
function inputStatus() {
	$('.tf_item').click(function () {
		$('.tf_item').removeClass('focus');
		$(this).addClass('focus');
	});
	$('.tf_item .btn_reset').click(function () {
		$(this).prev('.tf').val('').focus();
	});
	$('.tf_item .tf, .tf_item .opt').focus(function () {
		$(this).closest('.tf_item').addClass('focus');
	}).blur(function () {
		$(this).closest('.tf_item').removeClass('focus');
	});
	$('.tf_item').each(function () {
		var $container = $(this);
		var $tf = $('.input_area .tf', this);

		if ($('.input_area .tf, .input_area .opt', this).length > 1 || $('.input_area :input', this).length > 1) {
			$container.addClass('active');
		} else if (!$('.lab:input', $container)) {
			// console.log(111);
		} else if ($tf.length == 1) {
			var text = Boolean($tf.val()) || Boolean($tf.attr('placeholder'));
			$container.toggleClass('active', text);

			$tf.on('focusin', function () {
				$container.addClass('active');
			}).on('focusout', function () {
				text = Boolean($tf.val()) || Boolean($tf.attr('placeholder'));
				$container.toggleClass('active', text);
			});
		}
	});
}

// 데이트피커
$(function () {
	$('.tf_datepicker').each(function () {

		var titleText = "달력";
		if ($(this).attr('title')) {
			titleText = $(this).attr('title') + " " + titleText;
		} else if ($(this).attr('id')) {
			titleText = $('label[for="' + $(this).attr('id') + '"]').text() + " " + titleText;
		}

		$(this)
			.wrap('<span class="datepicker"></span>')
			.datepicker({
				dateFormat: 'yy.mm.dd',
				changeMonth: true,
				changeYear: true,
				showMonthAfterYear: true,
				showOn: "button",
				buttonText: titleText,
				buttonImage: "/resources/img/common/ico_datepicker@2x.png",
				buttonImageOnly: false,

				// 추가 옵션
				showButtonPanel: true,
				closeText: "닫기",

				// 한글화
				prevText: '이전 달',
				nextText: '다음 달',
				monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
				monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
				dayNames: ['일', '월', '화', '수', '목', '금', '토'],
				dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
				dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
				yearSuffix: '년',
				beforeShow: function () {
					setTimeout(datepickerAddCaption, 100);
				},
				onChangeMonthYear: function () {
					setTimeout(datepickerAddCaption, 100);
				},
				onClose: function () {
					$(this).next('.ui-datepicker-trigger').focus();
				},
			})
			.next('.ui-datepicker-trigger').children('img').removeAttr('title');
	});
});

function datepickerAddCaption() {
	$('.ui-datepicker-prev, .ui-datepicker-next').attr('href', '#;');
	$('.ui-datepicker-calendar').prepend('<caption>달력</caption>');
	$('.ui-state-active').attr('title', '선택됨');
	$('.ui-datepicker-today a').attr('title', '오늘');
	$('.ui-datepicker-today .ui-state-active').attr('title', '오늘(선택됨)');
	$('.ui-datepicker-year').attr('title', '년');
	$('.ui-datepicker-month').attr('title', '월');
	$('#ui-datepicker-div').find('a').first().focus();
}

// 모달 레이어
$(function () {
	$('.modal_popup.show').each(function () {
		//openModal($(this), null);
		openModal($(this).data('popup'));
	});
	// URL 해시 레이어 활성화
	var hash = location.hash;
	if (!(hash === '#' || hash === '' || hash === '#;')) {
		setTimeout(
			function () {
				if ($(hash).hasClass('modal_popup')) openModal(hash);
			}, 300);
	}
});

var modalOpener = null;
$(document).on('click', 'a.js-layer_open', function (e) {
	var tg = $(this).attr('href');
	openModal(tg, $(this));
	e.preventDefault();
}).on('click', '.modal_popup .btn_close_popup, .modal_popup .dimed', function () {
	var target = $(this).closest('.modal_popup').attr('data-popup');
	closeModal(target, modalOpener);
}).on('keydown', '.modal_popup .popup_inner', function (e) {
	if ($('.popup_inner').is(e.target) && e.keyCode == 9 && e.shiftKey) { // shift + tab
		e.preventDefault();
		$(this).find('.btn_close_popup').focus();
	}
}).on('keydown', '.modal_popup .btn_close_popup', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) { // tab
		e.preventDefault();
		$(this).closest('.popup_inner').attr('tabindex', '0').focus();
		$(this).unbind('keydown').keydown();
	}
});

$.fn.hasScrollBarY = function () {
	return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
};

function openModal(_target, _opener) {
	var tg = $('.modal_popup[data-popup=' + _target + ']');
	tg.removeClass('dim_hide');
	if (tg.length > 0) {
		modalOpener = _opener;
		$(_target).appendTo('body');
		bodyScroll(true, $('body').width());
		$('body').addClass('modal_open');
		setTimeout(function () {
			tg.addClass('show').removeClass('hide');
			$('.modal_popup').not($('.modal_popup[data-popup=' + _target + ']')).addClass('dim_hide');
		}, 100);
		setTimeout(function () {
			$('.popup_inner', tg).attr('tabindex', '0').focus();
			if ($('.popup_body', tg).hasScrollBarY()) {
				$('.popup_body', tg).attr('tabindex', '0');
			}
			tg.scrollTop(0);
		}, 300);
	}
}

function closeModal(_target) {
	var tg = $('.modal_popup[data-popup=' + _target + ']');
	if ($('.modal_popup').hasClass('show')) {
		$('.modal_popup').removeClass('dim_hide');
	}
	if (tg.hasClass('show')) {
		if ($('.modal_popup.show').length == 1) {
			bodyScroll(false);
		}
		tg.addClass('hide').removeClass('show');
		if ($(modalOpener).length) {
			$(modalOpener).focus();
		}
		// 레이어 해시 제거
		history.pushState('', document.title, window.location.pathname + window.location.search);
	} else {
		alert('닫을 레이어를 올바로 지정해 주세요. \n closeModal(\'#레이어아이디\')')
	}
}

var modalScrollTop;

function bodyScroll(_status, _orgWidth) {
	var $fixedModal = $('body');

	if (_status) {
		$fixedModal.addClass('modal_open');
		var scrollbarWidth = $('body').width() - _orgWidth;
		if (scrollbarWidth > 0) {
			$fixedModal.css({
				'margin-right': scrollbarWidth
			});
			$('.fixed-header #header').css({
				'right': scrollbarWidth
			});
		}
	} else {
		$fixedModal.removeClass('modal_open');
		$fixedModal.css({
			'margin-right': '',
		});
		$('.fixed-header #header').css({
			'right': '',
		});
	}
}

// 윈도우 팝업 오픈
var popOpenBtn = null;

function openWindow(_obj, popName, w, h, _opener) {
	var popW = 900;
	var popH = 600;
	var myUrl = _obj;

	if (typeof _obj !== 'string') {
		if ($(_obj).prop('tagName') === 'A') {
			popOpenBtn = $(_obj);
			myUrl = $(_obj).attr('href');
		} else if (_opener) {
			popOpenBtn = $(_opener);
		}
	}

	if (w) popW = w;
	if (h) popH = h;
	var left = window.screenX + (window.outerWidth - popW) / 2;
	var top = window.screenY + (window.outerHeight - popH) / 2;
	window.open(myUrl, popName, 'width=' + popW + ', height=' + popH + ', left=' + left + ', top=' + top + ', scrollbars=yes');
}

function closeWindow() {
	if (window.opener != null) {
		window.opener.openerFocus();
	}
	window.close();
}

function openerFocus() {
	if (popOpenBtn != null) {
		$(popOpenBtn).focus();
		popOpenBtn = null;
	}
}

// 커스텀 셀렉트
(function ($) {
	$.fn.customSelect = function () {

		$(document).on('mousedown', function (e) {
			if (!$(e.target).closest('.opt').length) {
				$('.opt.active dt a').each(function () {
					if ($(this).attr('title') != undefined) {
						$(this).attr('title', $(this).attr('title').replace('접기', '펼치기'))
					}
				});
				$('.opt.active').removeClass('active');
			}
		});

		return this.each(function () {
			const $el = $(this);
			const $btn = $('dt a', this);
			const $listItem = $('dd a', this);

			let addText = $el.hasClass('active') ? '접기' : '펼치기';
			let title = $btn.attr('title');
			if (title != undefined) {
				title = title + ' ' + addText;
			}

			if ($el.hasClass('disabled')) {
				$btn.removeAttr('href');
			} else {
				$btn.attr('title', title);

				$btn.click(function (e) {
					e.preventDefault();
					const $otherBtn = $('.opt').not($el).find('dt a');
					$('.opt').not($el).removeClass('active')
					if ($otherBtn.attr('title') != undefined) {
						$otherBtn.attr('title', $otherBtn.attr('title').replace('접기', '펼치기'));
					}

					$el.toggleClass('active');
					if ($otherBtn.attr('title') != undefined) {
						if ($el.hasClass('active')) {
							$btn.attr('title', $btn.attr('title').replace('펼치기', '접기'));
						} else {
							$btn.attr('title', $btn.attr('title').replace('접기', '펼치기'));
						}
					}
				});

				$listItem.click(function (e) {
					e.preventDefault();
					$btn.children('span').text($(this).text());
					$el.toggleClass('active').removeClass('error');
					$el.closest('td').find('> .error_info').hide();
					if ($btn.attr('title') != undefined) {
						$btn.attr('title', $btn.attr('title').replace('접기', '펼치기')).focus();
					}
				});
			}
		});
	};
})(jQuery);
$(function () {
	$('.opt').customSelect();
});

function tableScroll() {
	// 테이블 스크롤 표시
	$('.tbl_data').each(function () {
		var $table = $(this).children('table');
		var minW = $table.css('min-width');
		var maxH = $table.css('max-height');
		var $fixedCol = $('col.col_fixed', this);
		var colLength = $fixedCol.length ? $fixedCol.index() : 0;
		var fixedWidth = 0;

		// 세로 스크롤
		if ($table.css('max-height') != 'none') {
			$(this)
				.addClass('tbl_scroll_y')
				.wrapInner('<div class="inner"><div class="tbody"></div></div>')
				.children('.inner').css({
					'min-width': minW,
					'max-height': maxH,
				}).prepend('<div class="thead"></div>');
			$table.css({
				'min-width': '',
				'max-height': '',
			});

			var thead = $('.thead', this);
			$table.clone().appendTo(thead);
			$('thead', $table).remove();
			$('.thead tbody', this).remove();
		}

		// 가로 스크롤
		if ($(this).width() < $(this).children().width()) {
			// 좌측 고정 영역 너비 계산
			if ($fixedCol.length) {
				$('th', this).each(function (index) {
					fixedWidth += $(this).outerWidth();
					if (index == colLength) {
						fixedWidth = fixedWidth + 10;
						return false;
					}
				});
			}

			// 가로 스크롤 처리
			$(this).addClass('tbl_scroll_x');
			$(this).wrapInner('<div class="scroll_track"></div>');

			// 좌측 틀 고정
			if ($fixedCol.length) {
				$(this).addClass('tbl_left_fixed')
					.find('.scroll_track').clone().prependTo($(this))
					.end().addClass('left_column')
					.end().addClass('right_column');
				$('.left_column .inner', this).css('min-width', '').parent().width(fixedWidth);
				$('.left_column colgroup, .left_column tr', this).each(function () {
					$(this).children().eq(colLength).nextAll().remove();
				});
				$('.right_column .inner', this).css('min-width', parseInt(minW, 10) - fixedWidth);
				$('.right_column colgroup, .right_column tr', this).each(function () {
					$(this).children().eq(colLength + 1).prevAll().remove();
				});

				// 좌-우측 행 높이 동기화
				var $rightTable = $('.right_column', this);
				$('.left_column tr', this).each(function (i) {
					if ($(this).height() != $rightTable.find('tr').eq(i).height()) {
						var cellHeight = $(this).height() > $rightTable.find('tr').eq(i).height() ? $(this).height() : $rightTable.find('tr').eq(i).height();
						// console.log(i + '번째 줄 높이 왼쪽 ' + $(this).height() + ', 오른쪽 ' + $rightTable.find('tr').eq(i).height() + '로 서로 다름');
						$(this).height(cellHeight);
						$rightTable.find('tr').eq(i).height(cellHeight);
					}
				});
			}
		}
	});

	// 가로 틀고정시 세로스크롤 동기화
	$('.tbody').scroll(function (e) {
		$(this).closest('.scroll_track').siblings('.scroll_track').find('.tbody').scrollTop($(this).scrollTop());
	});
}

// 
// 레이아웃
//