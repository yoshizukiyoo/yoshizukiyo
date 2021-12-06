// ui_global.js : 필수 스크립트 정의

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

$(function () {
	// 더보기 박스
	$('.box_more').each(function () {
		$(this).wrapInner('<div class="inner"></div>').append('<button type="button" class="btn btn_more_white">더보기</button>');
	});

	// table scroll event 추가 (2021-12-01)
	$(".tbl_scroll_end").scroll(function () {
		// var addTd = '<tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>';
		if ($(this)[0].scrollHeight - Math.round($(this).scrollTop()) == $(this).outerHeight()) {
			// 스크롤 마지막 체크
			alert("event");
			// $(this).children("table").find("tbody").append(addTd);
		}
	})
});

$(document).on('click', '.box_more .btn_more_white', function () {
	if ($(this).closest(".box_more").hasClass("new_controlls")) {
		$(this).parent('.box_more').hasClass('opened') ? $(this).text('계약정보 상세보기') : $(this).text('상세보기 닫기');
		$(this).parent('.box_more').toggleClass('opened');
	} else {
		$(this).parent('.box_more').hasClass('opened') ? $(this).text('더보기') : $(this).text('접기');
		$(this).parent('.box_more').toggleClass('opened');
	}
});