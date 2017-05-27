$(document.body).pullToRefresh();
$(document.body).on("pull-to-refresh", function() {
	setTimeout(function() {
		$(document.body).pullToRefreshDone();
	}, 2000)
});