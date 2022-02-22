/* 
	본 JS는 퍼블리싱 편의를 위해 
	중복되는 공통 레이아웃 영역을 로드할 목적으로 작성된 문서입니다.
	서버 언어로 레이아웃을 구성하게되면 오류를 유발하는 코드이오니
	Back-End 개발시 이 파일을 반드시 삭제해 주세요 :)
*/

$(function () {
	var headerInc = $('.header').data('inc');
	if (headerInc == undefined) {
		$('.header').load('/html/_inc-header.html .header > *', function () {
			if ($.isFunction(window.lookupSetting)) lookupSetting();
		});
	} else if (headerInc != undefined) {
		$('.header').load('/html/' + headerInc + ' .header > *', function () {
			// if ($.isFunction(window.gnbSetting)) gnbSetting();
		});
	}
	if ($('.quick_menu_wrap').data('inc') == undefined) {
		$('.quick_menu_wrap').load('/html/_inc-quickmenu.html .quick_menu_wrap > *', function () {
			// if ($.isFunction(window.scrollbar)) scrollbar();
		});
	} else if ($('.quick_menu_wrap').data('inc') == '_inc-dep-quickmenu.html') { // 인터넷뱅킹 예금 퀵메뉴
		$('.quick_menu_wrap').load('/html/_inc-dep-quickmenu.html .quick_menu_wrap > *', function () {
			// if ($.isFunction(window.gnbSetting)) gnbSetting();
		});
	} else if ($('.quick_menu_wrap').data('inc') == '_inc-dep-quickmenu_logout.html') { // 인터넷뱅킹 예금 퀵메뉴
		$('.quick_menu_wrap').load('/html/_inc-dep-quickmenu_logout.html .quick_menu_wrap > *', function () {
			// if ($.isFunction(window.gnbSetting)) gnbSetting();
		});
	} else if ($('.quick_menu_wrap').data('inc') == '_inc-card-quickmenu.html') { // 인터넷뱅킹 카드 퀵메뉴
		$('.quick_menu_wrap').load('/html/_inc-card-quickmenu.html .quick_menu_wrap > *', function () {
			// if ($.isFunction(window.gnbSetting)) gnbSetting();
		});
	} else if ($('.quick_menu_wrap').data('inc') == '_inc-fund-quickmenu.html') { // 인터넷뱅킹 펀드 퀵메뉴
		$('.quick_menu_wrap').load('/html/_inc-fund-quickmenu.html .quick_menu_wrap > *', function () {
			// if ($.isFunction(window.gnbSetting)) gnbSetting();
		});
	}
	$('.breadcrumb').load('/html/_inc-breadcrumb.html .breadcrumb > *', function () {
		if ($.isFunction(window.breadcrumbSetting)) breadcrumbSetting();
	});
	$('.footer').load('/html/_inc-footer.html .footer > *', function () {
		// if ($.isFunction(window.toTop)) toTop();
	});
});

//
// 공통 컴포넌트 UI
//

// 즐겨찾기 버튼 토글
$(function () {
	$('.btn_favorite').on('click', function () {
		if ($('.ico', this).hasClass('ico_star_primary')) {
			$('.ico', this).removeClass('ico_star_primary').addClass('ico_star_gray')
				.next('.sr_only').text('마이메뉴 등록');
		} else {
			$('.ico', this).removeClass('ico_star_gray').addClass('ico_star_primary')
				.next('.sr_only').text('마이메뉴 해제');
		}
	});
});

// 게시판 등록 : 파일첨부
$(function () {
	var fileTarget = $('.form_file');
	fileTarget.on('change', function () {
		if (window.FileReader) {
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).next('.file-name').val(filename);
	});

	$('.file-attatch-item .file-name').on('click', function () {
		$(this).prev('.form_file').click();
	});
});

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
				buttonImage: "/resources/img/common/ico_datepicker.png",
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

// 일반 레이어
$(function () {
	$('.layer_popup.show').each(function () {
		openLayer($(this), null);
	});
});

function openLayer(_target, _opener) {
	if ($(_target).length > 0) {
		layerOpener = _opener;
		setTimeout(function () {
			$(_target).addClass('show').removeClass('hide').css({
				left: $(_opener).position().left,
				top: $(_opener).outerHeight() + $(_opener).position().top,
			});
		}, 100);
		setTimeout(function () {
			$('.popup_inner', _target).attr('tabindex', '0').focus();
			$(_target).scrollTop(0);
		}, 300);
	}
}

function closeLayer(_target, _opener) {
	var tg = $(_target);
	if (tg.hasClass('show')) {
		if ($('.layer_popup.show').length == 1) {}
		tg.addClass('hide').removeClass('show');
		var modalOpener = $(_opener);
		if (modalOpener.length) {
			modalOpener.focus();
		}
	} else {
		alert('닫을 레이어를 올바로 지정해 주세요. \n closeLayer(\'#레이어아이디\')')
	}
}

var layerOpener = null;
$(document).on('click', '.layer_popup .btn_close_popup', function () {
	var target = $(this).closest('.layer_popup').attr('id');
	closeModal('#' + target, layerOpener);
});

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

$(document).ready(function () {
	// 입력필드 인터랙션
	$('.form_move .form_control').each(function () {
		var value = Boolean($(this).val());
		var $container = $(this).closest('.form_move');

		// 최초 세팅
		$container.toggleClass('active', value);

		// 포커스
		$(this).on('focusin', function () {
			$container.addClass('active focus');
		}).on('focusout', function () {
			value = Boolean($(this).val());
			$container.toggleClass('active', value);
			$container.removeClass('focus');
		});
	});

	// 토글박스
	$('.toggle-title.on').each(function () {
		$(this).next('.toggle-content').show();
	});
	$('.toggle-title .btn').click(function () {
		$(this).parent('.toggle-title').toggleClass('on').next('.toggle-content').slideToggle('fast');
	});

	// 토글버튼
	$('[data-toggle-btn]').click(function () {
		var toggleContent = $(this).data('toggle-btn');
		$('[data-toggle-content=' + toggleContent + ']').toggle();
	});
});

// 더블 탭메뉴 활성화
$(document).on('click', '.tab_menu_double > .tab_menu_type1 a', function () {
	var obj = $(this);
	var tg = obj.data('tab-tg');
	obj.addClass('current').attr('title', '선택됨').parent().siblings().find('>a').removeClass().removeAttr('title');
	$('[data-sub-tab^="sub"]').hide();
	$('[data-sub-tab=' + tg + ']').show();
});

// 커스텀 셀렉트
(function ($) {
	$.fn.customSelect = function () {

		$(document).on('mousedown', function (e) {
			if (!$(e.target).closest('.selectbox_wrap').length) {
				$('.selectbox_wrap.active dt a').each(function () {
					if ($(this).attr('title') != undefined) {
						$(this).attr('title', $(this).attr('title').replace('접기', '펼치기'))
					}
				});
				$('.selectbox_wrap.active').removeClass('active');
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
					const $otherBtn = $('.selectbox_wrap').not($el).find('dt a');
					$('.selectbox_wrap').not($el).removeClass('active')
					$otherBtn.attr('title', $otherBtn.attr('title').replace('접기', '펼치기'));

					$el.toggleClass('active');
					if ($el.hasClass('active')) {
						$btn.attr('title', $btn.attr('title').replace('펼치기', '접기'));
					} else {
						$btn.attr('title', $btn.attr('title').replace('접기', '펼치기'));
					}
				});

				$listItem.click(function (e) {
					e.preventDefault();
					$btn.children('span').text($(this).text());
					$el.toggleClass('active').removeClass('error');
					$el.closest('td').find('> .error_info').hide();
					$btn.attr('title', $btn.attr('title').replace('접기', '펼치기')).focus();
				});
			}
		});
	};
})(jQuery);
$(function () {
	$('.selectbox_wrap').customSelect();
});

// 
// 레이아웃
//

// IE감지
// var agent = navigator.userAgent.toLowerCase();
// if (agent.indexOf("msie") > -1 || agent.indexOf("trident") > -1) {
// 	$('html').addClass('ie_html');
// }

// GNB
$(document).on('mouseenter click', '.header .gnb>ul>li>a', function (e) {
	gnbOpen($(this));
});
$(document).on('mouseleave', '#gnb', function () {
	gnbClose();
});
$(document).on('keydown', '#gnb>ul>li:last-child>.layer_memu_box>.menu_wrap>.menu_list:last-child>ul>li:last-child>a', function (e) {
	if (e.which == 9 != e.shiftKey && e.which == 9) {
		gnbClose();
	}
});

function gnbOpen(lnb) {
	var obj = lnb;
	obj.addClass('current').parent().siblings().find('>a').removeClass();
	obj.next().addClass('open').parent().siblings().find('.layer_memu_box').removeClass('open');
}

function gnbClose() {
	$('.gnb>ul>li>a').removeClass();
	$('.layer_memu_box').removeClass('open');
	$('.quick_menu_wrap').removeClass('quick_hidden');
}

// 전체메뉴 실행
$(document).on('click', '.btn_allmenu > button', function () {
	var obj = $(this);
	obj.parent().addClass('open');
	obj.find('>span').text('전체메뉴 닫기');
});

function menuBox(box) {
	$('.result_box > div').hide();
	$('.btn_mymenu_box > a').removeClass('current').removeAttr('title');

	if (box == 'lately') { // 최근이용 메뉴 열기
		$('.lately_result_box').show();
		$('.btn_mymenu_box .btn_lately').attr('title', '선택됨');
	} else if (box == 'my') { // MY메뉴 열기
		$('.mymenu_result_box').show();
		$('.btn_mymenu_box .btn_my').attr('title', '선택됨');
	} else { // 메뉴 검색결과 열기
		$('.menu_search_box').show();
	}

	if ($('.result_box').css('display') == 'block') {
		allMenuHeight();
	} else {
		//$('.allmenu_wrap').animate({ height: $('.allmenu_wrap').height() - $('.result_box').outerHeight() });
		$('.allmenu_wrap').height($('.allmenu_wrap').height() - $('.result_box').outerHeight());
		$('.result_box').show();
	}
}

function menuClose() {
	$('.result_box').slideUp(function () {
		allMenuHeight();
	});
}

// 전체메뉴 버튼 off 변경 및 대체텍스트 변경
$(document).on('click', '.allmenu_inner .btn_close_popup', function () {
	$('.btn_allmenu > button').focus().parent().removeClass('open');
	$('.btn_allmenu > button').find('>span').text('전체메뉴 열기');
});

// 전체메뉴
function allMenuScroll() {
	openModal('allMenuLayer', '.btn_allmenu > button');
	allMenuHeight();

	$(window).resize(function () {
		allMenuHeight();
	});
}

// 전체메뉴 높이 구하기
function allMenuHeight() {
	var h = $('.allmenu_inner').height();
	$('.allmenu_wrap').height(h - 188);
	if ($('.result_box').css('display') == 'block') {
		$('.allmenu_wrap').height($('.allmenu_wrap').height() - $('.result_box').outerHeight());
	}
}

// 전체메뉴 레이어 '최근이용 메뉴', 'MY메뉴' 활성화
$(document).on('click', '.btn_mymenu_box > a', function () {
	$(this).addClass('current').siblings().removeClass('current');
});

// 전체 메뉴 탭메뉴
$(document).on('click', '.tab_all_menu a', function () {
	var menuId = $(this).data('layer-tab');
	$(this).addClass('current').attr('title', '선택됨').parent().siblings().find('>a').removeClass('current').removeAttr('title');
	$('.tab_sub_menu[data-menu-box="' + menuId + '"]').show().siblings().hide();
	return false;
});

// 최근 이용 메뉴 체크
function latelyCheck() {
	$('.lately_check').addClass('on');
	closeModal('myMenuAlert');
}

// 퀵메뉴 열기
$(document).on('click', '.btn_quick_open', function () {
	$('.quick_menu_inner').addClass('open');
});

// 퀵메뉴 닫기
$(document).on('click', '.btn_quick_close', function () {
	$('.quick_menu_inner').removeClass('open');
});

// Breadcrumb
function breadcrumbSetting() {
	$('.breadcrumb_list>li>a').each(function () {
		$(this).attr('title', '펼치기');
		if ($(this).parent('li').hasClass('on')) {
			$(this).attr('title', '접기');
		}
	});
}

$(document).on('click', '.breadcrumb_list>li>a', function (e) {
	if ($(this).next('.sub_list_wrap').length) {
		e.preventDefault();
		$(this).attr('title', $(this).attr('title') == '펼치기' ? "접기" : "펼치기")
			.parent('li').toggleClass('on').siblings('li').removeClass('on').children('a').attr('title', '펼치기');
	}
}).on('keydown', '.breadcrumb_list ul>li:last-child>a', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) {
		$('.breadcrumb_list>li').removeClass('on').children('a').attr('title', '펼치기');
	}
});
$(document).on('mousedown', function (e) {
	var $obj = $('.breadcrumb_list');
	if ($obj.length > 0) {
		var objPos = $obj.offset();
		objPos.right = (objPos.left + $obj.width());
		objPos.bottom = (objPos.top + $obj.height());
		if ((e.pageX < objPos.left || e.pageX > objPos.right || e.pageY < objPos.top || e.pageY > objPos.bottom) && !$(e.target).closest('.breadcrumb_list').length) {
			$('.breadcrumb_list>li').removeClass('on');
		}
	}
});

// 화면 크기 변경시에 축소
// function resizeApply() {
// 	var minWidth = 1200;
// 	var body = document.getElementsByTagName('body')[0];
// 	if (window.innerWidth < minWidth) {
// 			body.style.zoom = (window.innerWidth / minWidth);}
// 			else body.style.zoom = 1;
// }
// window.onload = function() {
// 	window.addEventListener('resize', function() {
// 		resizeApply(); 
// 	});
// }
// resizeApply();

// 헤더 간편조회 서비스
$(function () {
	lookupSetting();
});

function lookupSetting() {
	if ($('.lookup_container:visible').length) {
		$('#content').css('padding-top', $('.lookup_container').height());
	}
}

function toggleLookup() {
	var $btn = $('.lookup_container .btn_unfold');

	$('.lookup_list').toggleClass('on');
	$btn.toggleClass('on').children('span').text($('span', $btn).text() == '펼침' ? "접기" : "펼침");
	$('#content').css('padding-top', $('.lookup_container').height());
}