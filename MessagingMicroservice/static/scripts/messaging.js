var Page = function(){};

Page.prototype.InitPage = function(){
	this.LoadData();	
};

Page.prototype.LoadData = function(){
	$.ajax({
		url: "/getMessages"
	}).done(function(data) {
		reactPage.DrawTable(data);
	});
};

var page = new Page();

$(document).ready(function(){
	page.InitPage();
});