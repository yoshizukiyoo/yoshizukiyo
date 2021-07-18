//
// 공통 컴포넌트 UI
//

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

// 스크롤바 커스텀 디자인
$(function () {
	$('.custom_scroll').mCustomScrollbar({
		theme: "dark",
		axis: "yx",
		scrollInertia: 200
	});
	// $('.scroll_container').mCustomScrollbar({
	// 	theme: "dark-thin",
	// 	axis: "x",
	// 	scrollInertia: 200
	// });
	// $('.modal_popup .popup_body').mCustomScrollbar({
	// 	theme: "dark",
	// 	axis: "y",
	// 	scrollInertia: 200
	// });
});

// 더보기 박스
$(function () {
	$('.box_more').each(function () {
		$(this).wrapInner('<div class="inner"></div>').append('<button type="button" class="btn btn_more_white">더보기</button>');
	});
});

$(document).on('click', '.box_more .btn_more_white', function () {
	$(this).parent('.box_more').hasClass('opened') ? $(this).text('더보기') : $(this).text('접기');
	$(this).parent('.box_more').toggleClass('opened');
});

// 즐겨찾기 버튼 토글
$(function () {
	$('.btn_favorite').on('click', function () {
		if ($('.ico', this).hasClass('ico_star_primary')) {
			$('.ico', this).removeClass('ico_star_primary').addClass('ico_star_gray')
				.next('.sr_only').text('즐겨찾기 추가');
		} else {
			$('.ico', this).removeClass('ico_star_gray').addClass('ico_star_primary')
				.next('.sr_only').text('즐겨찾기 해제');
		}
	});
});

// // 테이블 스크롤 표시
// $(document).ready(function () {
// 	if ($('.scroll_container').length > 0) {
// 		tableScroll();
// 	}
// });

// function tableScroll() {
// 	var table = $('.scroll_container');

// 	table.each(function () {
// 		var $this = $(this),
// 			ingClass = 'scroll-ing',
// 			endClass = 'scroll-end';
// 		$this.on('scroll', function (e) {
// 			var wrap = $(this).closest('.table-scroll'),
// 				currLeft = this.scrollLeft,
// 				scrWidth = this.scrollWidth,
// 				cliWidth = this.clientWidth;

// 			if (currLeft === 0) {
// 				wrap.removeClass(ingClass).removeClass(endClass);
// 			} else if (currLeft !== 0 && currLeft + cliWidth < scrWidth) {
// 				wrap.addClass(ingClass).removeClass(endClass);
// 			} else {
// 				wrap.addClass(endClass);
// 			}
// 		});
// 	});
// }

// // 탭메뉴
// $(document).ready(function () {
// 	$('.tab_list').each(function () {
// 		var itemLength = $('>li', this).length;
// 		if (itemLength > 6) {
// 			$(this).parent('.tab_menu').addClass('tab_matrix-lg');
// 		}
// 		if (itemLength > 2) {
// 			$(this).parent('.tab_menu').addClass('tab_matrix-md');
// 		}
// 		if (itemLength > 9) {
// 			$(this).parent('.tab_menu').addClass('tab_dropdown_sm');
// 		}
// 	});
// 	$('.tab_list .on a').each(function () {
// 		var tg = $(this).attr('href');
// 		if (tg !== '#' && tg !== '#;' && tg.charAt(0) === '#') {
// 			$(tg + '.tab_content').css('display', 'block');
// 		}
// 	});

// 	// 점프투 타입 추가
// 	$('.tab_content-jumpto').each(function () {
// 		$(this).prepend('<a href="#;" class="btn btn_xs btn_outline-default btn_jumpto-totop">메뉴로 <i class="ico ico-chevron-up-gray ml-1"></i></a>');
// 	});

// 	$(document).on('click', '.btn_jumpto-totop', function (e) {
// 		$('body, html').animate({
// 			scrollTop: $('.tab_menu_jumpto').offset().top,
// 		}, 300);
// 		var tg = $(this).closest('.tab_content-jumpto').attr('id');
// 		setTimeout(function () {
// 			$('.tab_menu_jumpto a[href="#' + tg + '"]').focus();
// 		}, 400);
// 	});

// 	$('.tab_list a').on('click', function (e) {
// 		var tg = $(this).attr('href');
// 		if (!$(this).closest('.tab_menu').hasClass('tab_not-active')) {
// 			$(this).parent('li').addClass('on').siblings('li').removeClass('on');
// 		}
// 		if (tg === '#' || tg === '' || tg === '#;') {
// 			e.preventDefault();
// 		} else if (tg.charAt(0) === '#') {
// 			if ($(tg).hasClass('tab_content')) {
// 				$(tg).show().siblings('.tab_content').hide();
// 				e.preventDefault();

// 				// URL 해시 업데이트
// 				if ($(this).closest('.tab_menu').hasClass('tab_menu1') || $(this).closest('.tab_menu').hasClass('tab_menu_department')) {
// 					history.pushState('', document.title, window.location.pathname + window.location.search + tg);
// 				}
// 			} else if ($(tg).length) {
// 				// 점프 투
// 				e.preventDefault();
// 				if ($(window).width() > 1024) {
// 					$('body, html').animate({
// 						scrollTop: $(tg).offset().top - 78 - 40,
// 					}, 300);
// 					$('.btn_jumpto-totop', tg).focus();
// 				} else {
// 					if (!$(this).parent('li').hasClass('on')) {
// 						$('body, html').animate({
// 							scrollTop: $(tg).offset().top - 30,
// 						}, 300);
// 						$('.btn_jumpto-totop', tg).focus();
// 					}
// 				}
// 			} else {
// 				console.log('콘텐츠가 없습니다.');
// 			}
// 		}

// 		// 모바일 드롭다운
// 		var $currentTab = $(this).closest('.tab_menu');
// 		if ($(window).width() < 768 && $currentTab.hasClass('tab_dropdown_sm')) {
// 			$('.tab_menu').not($currentTab).removeClass('opened');
// 			$currentTab.toggleClass('opened');
// 			if ($(this).parent('li').hasClass('on')) {
// 				e.preventDefault();
// 			}
// 		}
// 	});
// });

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
setTimeout(function () {
	$('.tf_datepicker').each(function () {
		setDatepicker($(this));
	}).on('click', function () {
		openCalendar($(this));
	});
}, 200);

function removeDatepicker() {
	if ($('#inseq-datepicker').length > 0) {
		$('#inseq-datepicker').remove();
	}
}

$(document).on('click', '.btn_datepicker', function (e) {
	e.preventDefault();
	openCalendar($(this).prev());
});

function setDatepicker(obj) {
	$(obj).wrap('<span class="datepicker"></span>');
	if ($(obj).hasClass('full')) {
		$(obj).parent('.datepicker').addClass('full');
	}
	$(obj).after('<button type="button" class="btn btn_datepicker"><i class="ico ico_datepicker"></i><span class="sr_only">달력</span></button>');
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
		if ($('.layer_popup.show').length == 1) { }
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
		openModal($(this), null);
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

function openModal(_target, _opener) {
	var tg = $('.modal_popup[data-popup=' + _target + ']');
	if (tg.length > 0) {
		modalOpener = _opener;
		$(_target).appendTo('body');
		bodyScroll(true, $('body').width());
		$('body').addClass('modal_open');
		setTimeout(function () {
			tg.addClass('show').removeClass('hide');
		}, 100);
		setTimeout(function () {
			$('.popup_inner', tg).attr('tabindex', '0').focus();
			tg.scrollTop(0);
		}, 300);
	}
}

function closeModal(_target) {
	var tg = $('.modal_popup[data-popup=' + _target + ']');
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