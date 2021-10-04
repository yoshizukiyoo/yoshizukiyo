/* 
	본 JS는 퍼블리싱 편의를 위해 
	중복되는 공통 레이아웃 영역을 로드할 목적으로 작성된 문서입니다.
	서버 언어로 레이아웃을 구성하게되면 오류를 유발하는 코드이오니
	Back-End 개발시 이 파일을 반드시 삭제해 주세요 :)
*/

$(function () {
	var pageTitle = $('.header').data('page-title');
	$('.header').load('/html/_inc-header.html .header > *', function () {
		$('.tit_page').text(pageTitle);
	});
	$('.breadcrumb').load('/html/_inc-breadcrumb.html .breadcrumb > *', function () {
		// if ($.isFunction(window.scrollbar)) scrollbar();
	});
	$('.footer').load('/html/_inc-footer.html .footer > *', function () {
		// if ($.isFunction(window.toTop)) toTop();
	});
});

//
// 공통 컴포넌트 UI
//

// 인풋박스 포커스 스타일
$(function () {
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

		if ($('.input_area :input', this).length > 1) {
			$container.addClass('active');
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
setTimeout(function () {
	$('.tf_datepicker').each(function () {
		setDatepicker($(this));
	});
	$(document).on('click', '.tf_datepicker', function () {
		// $('body').append('<div class="modal_popup modal_bottom_sheet hide" data-popup="layerDatepicker"><div class="dimed remove"></div><div class="popup_inner"><div class="popup_header"><h2 class="popup_tit">날짜 선택</h2></div><div class="popup_body"></div><button type="button" class="btn btn_close_popup remove">닫기</button></div></div>');
		// $('body').append('<div class="modal_popup modal_bottom_sheet hide" data-popup="layerDatepicker"><div class="dimed remove"></div><div class="popup_inner"><div class="popup_body"></div></div></div>');
		openCalendar($(this));
		// $('#inseq-datepicker').appendTo('.modal_popup[data-popup=layerDatepicker] .popup_body');
		// openModal('layerDatepicker');
	});
}, 200);

function removeDatepicker() {
	if ($('#inseq-datepicker').length > 0) {
		$('#inseq-datepicker').remove();
	}
}

$(document).on('click', '.btn_datepicker', function (e) {
	e.preventDefault();
	$(this).closest('.tf_item').find('.tf_datepicker').click();
});

function setDatepicker(obj) {
	$(obj).closest('.tf_item').append('<div class="btn_area"><button type="button" class="btn btn_icon btn_datepicker"><i class="ico ico_datepicker"></i><span class="sr_only">달력</span></button></div>');
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
			// $('.popup_inner', tg).attr('tabindex', '0').focus();
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

// 더블 탭메뉴 활성화
$(document).on('click', '.tab_menu_type3 a , .tab_menu_double > .tab_menu_type1 a, .tab_btn a ', function () {
	var obj = $(this);
	var tg = obj.data('tab-tg');
	obj.addClass('current').parent().siblings().find('>a').removeClass();
	$('[data-sub-tab^="sub"]').hide();
	$('[data-sub-tab=' + tg + ']').show();
});

// 디자인 셀렉트박스
$(document).on('click', '.selectbox_wrap dt a', function () {
	var obj = $(this);
	$('.selectbox_wrap').not(obj.parents('.selectbox_wrap')).removeClass('active');
	obj.parents('.selectbox_wrap').toggleClass('active');
	return false;
});
$(document).on('click', '.selectbox_wrap dd a', function () {
	var obj = $(this);
	obj.closest('dd').prev().find('>a>span').text(obj.text());
	obj.parents('.selectbox_wrap').toggleClass('active').removeClass('error');
	obj.parents('.selectbox_wrap').closest('td').find('> .error_info').hide();
	return false;
});
var win = $(window);
var selectBox = $('.selectbox_wrap dt a');
win.on("click", function (e) {
	if (selectBox.has(e.target).length == 0 && !selectBox.is(e.target)) {
		$('.selectbox_wrap').removeClass('active');
	}
});

// 
// 레이아웃
//

// Breadcrumb
$(document).on('click', '.breadcrumb_list>li>a', function (e) {
	if ($(this).next('.sub_list_wrap').length) {
		e.preventDefault();
		$(this).parent('li').toggleClass('on').siblings('li').removeClass('on');
	}
}).on('keydown', '.breadcrumb_list ul>li:last-child>a', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) {
		$('.breadcrumb_list>li').removeClass('on');
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