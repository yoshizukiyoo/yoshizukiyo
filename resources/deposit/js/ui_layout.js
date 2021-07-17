// 
// 예금 레이아웃
//


// 스크롤 내비게이션
$(document).ready(function () { });


// 소스 정리중.....
function menuOpen() {
	$('.allmenu_wrap').animate({ height: $('.allmenu_wrap').height() - $('.result_box').outerHeight() });
	$('.result_box').slideDown();
}

function menuClose() {
	$('.result_box').slideUp(function () {
		height();
	});
}

function allMenuScroll() {
	openModal('#layerSampleXxl', this);
	height();

	$(".allmenu_wrap").mCustomScrollbar({
		theme: "dark",
		axis: "y"
	});

	$(window).resize(function () {
		height();
	});
}

function height() {
	var h = $('.allmenu_inner').height();
	$('.allmenu_wrap').height(h - 200);
	if ($('.result_box').css('display') == 'block') {
		$('.allmenu_wrap').height($('.allmenu_wrap').height() - $('.result_box').outerHeight());
	}
}
// 소스 정리중.....


// GNB
$(document).on('mouseenter focusin', '.header .gnb>ul>li>a', function () {
	var obj = $(this);
	obj.addClass('current').parent().siblings().find('>a').removeClass();
	obj.next().addClass('open').parent().siblings().find('.layer_mn').removeClass('open');
});
$(document).on('mouseleave', '#gnb', function () {
	gnbClose();
});
$(document).on('keydown', '#gnb>ul>li:last-child>.layer_mn>.menu_wrap>.menu_list:last-child>ul>li:last-child>a', function (e) {
	if (e.which == 9 != e.shiftKey && e.which == 9) {
		gnbClose();
	}
});
function gnbClose() {
	$('.gnb>ul>li>a').removeClass();
	$('.layer_mn').removeClass('open');
}


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