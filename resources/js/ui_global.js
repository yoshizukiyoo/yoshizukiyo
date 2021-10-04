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