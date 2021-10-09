/* 
	본 JS는 퍼블리싱 편의를 위해 
	중복되는 공통 레이아웃 영역을 로드할 목적으로 작성된 문서입니다.
	서버 언어로 레이아웃을 구성하게되면 오류를 유발하는 코드이오니
	Back-End 개발시 이 파일을 반드시 삭제해 주세요 :)
*/

// 레이아웃 공통 영역 로드
$(function () {
	var pageTitle = $('.header').data('page-title');
	$('.header').load('/html/_inc-header.html .header > *', function () {
		$('.tit_page').text(pageTitle);
	});
	$('.common_layers').load('/html/_inc_common_layers.html .common_layers > *', function () {
		inputStatus();
	});
});

//
// 공통 컴포넌트 UI
//

$(function () {
	// 인풋박스 스타일
	inputStatus();
});

// 탭메뉴
$(function () {
	$('.tab_list a').on('click', function (e) {
		var tg = $(this).attr('href');
		$(this).parent('li').addClass('on').siblings('li').removeClass('on');
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
		var tg = $(this).attr('href');
		if (tg !== '#' && tg !== '#;' && tg.charAt(0) === '#') {
			$(tg + '.tab_cont').css('display', 'block');
		}
	});
	$('.tab_menu1').each(function () {
		var outerWidth = $(this).width();
		var innerWidth = 0;
		var current = $('li.on', this).index();
		$('li', this).each(function () {
			innerWidth += $(this).width();
		});
		if (outerWidth < innerWidth || $('li', this).length > 4) {
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
});

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
			console.log(111);
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
function openDatepicker(obj) {
	alert('데이트피커 호출(작업중)');
}

// setTimeout(function () {
// 	$('.tf_datepicker').each(function () {
// 		setDatepicker($(this));
// 	});
// 	$(document).on('click', '.tf_datepicker', function () {
// 		// $('body').append('<div class="modal_popup modal_bottom_sheet hide" data-popup="layerDatepicker"><div class="dimed remove"></div><div class="popup_inner"><div class="popup_header"><h2 class="popup_tit">날짜 선택</h2></div><div class="popup_body"></div><button type="button" class="btn btn_close_popup remove">닫기</button></div></div>');
// 		// $('body').append('<div class="modal_popup modal_bottom_sheet hide" data-popup="layerDatepicker"><div class="dimed remove"></div><div class="popup_inner"><div class="popup_body"></div></div></div>');
// 		openCalendar($(this));
// 		// $('#inseq-datepicker').appendTo('.modal_popup[data-popup=layerDatepicker] .popup_body');
// 		// openModal('layerDatepicker');
// 	});
// }, 200);

// function removeDatepicker() {
// 	if ($('#inseq-datepicker').length > 0) {
// 		$('#inseq-datepicker').remove();
// 	}
// }

// function setDatepicker(obj) {
// 	$(obj).closest('.tf_item').append('<div class="btn_area"><button type="button" class="btn btn_icon btn_datepicker"><i class="ico ico_datepicker"></i><span class="sr_only">달력</span></button></div>');
// }

// 일반 레이어
// $(function () {
// 	$('.layer_popup.show').each(function () {
// 		openLayer($(this), null);
// 	});
// });

// function openLayer(_target, _opener) {
// 	if ($(_target).length > 0) {
// 		layerOpener = _opener;
// 		setTimeout(function () {
// 			$(_target).addClass('show').removeClass('hide').css({
// 				left: $(_opener).position().left,
// 				top: $(_opener).outerHeight() + $(_opener).position().top,
// 			});
// 		}, 100);
// 		setTimeout(function () {
// 			$('.popup_inner', _target).attr('tabindex', '0').focus();
// 			$(_target).scrollTop(0);
// 		}, 300);
// 	}
// }

// function closeLayer(_target, _opener) {
// 	var tg = $(_target);
// 	if (tg.hasClass('show')) {
// 		if ($('.layer_popup.show').length == 1) {}
// 		tg.addClass('hide').removeClass('show');
// 		var modalOpener = $(_opener);
// 		if (modalOpener.length) {
// 			modalOpener.focus();
// 		}
// 	} else {
// 		alert('닫을 레이어를 올바로 지정해 주세요. \n closeLayer(\'#레이어아이디\')')
// 	}
// }

// var layerOpener = null;
// $(document).on('click', '.layer_popup .btn_close_popup', function () {
// 	var target = $(this).closest('.layer_popup').attr('id');
// 	closeModal('#' + target, layerOpener);
// });

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
$(document).on('click', 'a.js_layer_open', function (e) {
	var tg = $(this).attr('href');
	openModal(tg, $(this));
	e.preventDefault();
}).on('click', '.modal_popup .btn_close_popup, .modal_popup .dimed', function () {
	if ($(this).hasClass('remove')) {
		$(this).closest('.modal_popup').remove();
	} else {
		var target = $(this).closest('.modal_popup').attr('data-popup');
		closeModal(target, modalOpener);
	}
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
			tg.scrollTop(0);
		}, 300);
	}

	// 하단 고정영역 내 토글 모달 호출 버튼 활성화
	if (tg.hasClass('modal_toggle')) {
		tg.closest('.bottom_toggle').find('.btn_toggle').addClass('active');
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

	// 하단 고정영역 내 토글 모달 호출 버튼 비활성화
	if (tg.hasClass('modal_toggle')) {
		tg.closest('.bottom_toggle').find('.btn_toggle').removeClass('active');
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

$(function () {
	// 하단 고정영역 내 토글 모달
	$('.bottom_toggle').each(function () {
		var $btn = $('.btn_toggle', this);
		var modalData = $('.modal_toggle', this).data('popup');
		var $cont = $('.toggle_cont', this);
		var spacing = $('.toggle_btn_area', this).outerHeight();

		$cont.css('bottom', spacing);

		$btn.click(function (e) {
			e.preventDefault();
			if ($btn.hasClass('active')) {
				$btn.removeClass('active');
				closeModal(modalData, $btn);
			} else {
				$btn.addClass('active');
				openModal(modalData, $btn);
			}
		});
	});
});

// 
// 레이아웃
//