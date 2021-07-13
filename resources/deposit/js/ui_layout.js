// 
// 예금 레이아웃
//

// 스크롤 내비게이션
$(document).ready(function () {
	desktopAllmenu();
	mobileAllmenu();
});

function desktopAllmenu() {
	$('#desktop-allmenu .lnb-list ul ul').each(function () {
		$(this).parent('li').addClass('collapse');
		// $(this).closest('.lnb-list').addClass('lnb-list-dropdown');
	});

	var nav, scrollArea, scrollItem, ranges;

	nav = $('#desktop-allmenu .allmenu-list a');
	scrollArea = $('#desktop-allmenu .allmenu-body');
	scrollItem = $('#desktop-allmenu .allmenu-body .lnb-wrap');

	getPosition();

	nav.on('click', function (e) {
		getPosition();
		setActive($(this));
		scrollArea.stop().animate({
			scrollTop: ranges[$(this).parent('li').index()][0]
		}, 300);
		e.preventDefault();
	});

	$.fn.scrollStopped = function (callback) {
		var that = this,
			$this = scrollArea;

		$this.scroll(function (e) {
			clearTimeout($this.data('scrollTimeout'));
			$this.data('scrollTimeout', setTimeout(callback.bind(that), 150, e));
		});
	};

	scrollArea.scrollStopped(function (e) {
		var pos = Math.ceil($(this).scrollTop());

		$.each(ranges, function (i, range) {
			if (pos >= range[0] && pos < range[1]) {
				setActive(nav.eq(i)[0]);
				return;
			}
		});
	});

	function setActive(elem) {
		$(elem).parent('li').addClass('on').siblings('li').removeClass('on');
	}

	function getPosition() {
		ranges = scrollItem.map(function (i) {
			var defaultT = scrollItem.eq(0).position().top;
			var lnbT = scrollItem.eq(i).position().top - defaultT;
			return [
				[lnbT, scrollItem.eq(i).outerHeight() + lnbT + 1]
			];
		});
	}
}

function mobileAllmenu() {
	$('.lnb-item ul ul').each(function () {
		$(this).parent('li').addClass('collapse');
	});

	var nav, scrollArea, scrollItem, ranges;

	nav = $('#mobile-allmenu .allmenu-list a');
	scrollArea = $('#mobile-allmenu .allmenu-lnb');
	scrollItem = $('#mobile-allmenu .lnb-item');

	getPosition();

	nav.on('click', function (e) {
		getPosition();

		setActive($(this));

		scrollArea.stop().animate({
			scrollTop: ranges[$(this).parent('li').index()][0]
		}, 300);
		e.preventDefault();
	});

	$.fn.scrollStopped = function (callback) {
		var that = this,
			$this = scrollArea;

		$this.scroll(function (e) {
			clearTimeout($this.data('scrollTimeout'));
			$this.data('scrollTimeout', setTimeout(callback.bind(that), 150, e));
		});
	};

	scrollArea.scrollStopped(function (e) {
		var pos = Math.ceil($(this).scrollTop());

		$.each(ranges, function (i, range) {
			if (pos >= range[0] && pos < range[1]) {
				setActive(nav.eq(i)[0]);
				return;
			}
		});
	});

	function setActive(elem) {
		$(elem).parent('li').addClass('on').siblings('li').removeClass('on');
	}

	function getPosition() {
		ranges = scrollItem.map(function (i) {
			var defaultT = scrollItem.eq(0).position().top;
			var lnbT = scrollItem.eq(i).position().top - defaultT;
			return [
				[lnbT, scrollItem.eq(i).outerHeight() + lnbT + 1]
			];
		});
	}
}

// Breadcrumb
$(document).on('click', '.breadcrumb-list>li>a', function (e) {
	if ($(this).next('.sub-list-wrap').length) {
		e.preventDefault();
		$(this).parent('li').toggleClass('on').siblings('li').removeClass('on');
	}
}).on('keydown', '.breadcrumb-list ul>li:last-child>a', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) {
		$('.breadcrumb-list>li').removeClass('on');
	}
});
$(document).on('mousedown', function (e) {
	var $obj = $('.breadcrumb-list');
	if ($obj.length > 0) {
		var objPos = $obj.offset();
		objPos.right = (objPos.left + $obj.width());
		objPos.bottom = (objPos.top + $obj.height());
		if ((e.pageX < objPos.left || e.pageX > objPos.right || e.pageY < objPos.top || e.pageY > objPos.bottom) && !$(e.target).closest('.breadcrumb-list').length) {
			$('.breadcrumb-list>li').removeClass('on');
		}
	}
});

// Sidebar
function snbSetting() {
	if ($('#sidebar').length) {
		$('#breadcrumb').addClass('d-down-md');
	}
	$('.snb-list ul').each(function () {
		$(this).parent('li').addClass('collapse');
	});
	if (!$('#sidebar').hasClass('sidebar-floating')) {
		$('.snb-list li.on>ul, .allmenu-list li.on>ul').each(function () {
			$(this).show();
		});
	}
}
$(document).on('click', '.snb-list .collapse > a, .allmenu-list .collapse > a', function (e) {
	e.preventDefault();
	$(this).next('ul').slideToggle('fast').parent('li').toggleClass('on');
});

$(document).ready(function () {
	// 전체메뉴 및 snb 세팅
	if ($('#sidebar').length > 0) {
		snbSetting();
	}
});

$(document).ready(function () {
	// 토글 전체 여닫기
	$('.btn-toggle-all').click(function () {
		$(this).toggleClass('on');
		if ($(this).hasClass('on')) {
			$('.toggle-list .toggle-title').addClass('on').next('.toggle-content').slideDown('fast');
		} else {
			$('.toggle-list .toggle-title').removeClass('on').next('.toggle-content').slideUp('fast');
		}
	});
});