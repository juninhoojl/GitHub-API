

function myReady() {
	$("img").click(myClick);
}

function myClick() {
	$(this).hide();
}

$(document).ready(myReady);

