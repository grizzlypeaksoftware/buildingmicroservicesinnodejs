var Page = function(){};

Page.prototype.InitPage = function(){
	var that = this;
	$(".BoxToggle").trigger("click");

	$(".actionTrigger").on("click", function(){
		var jElem = $(this);
		var action = jElem.attr("data-action");
		console.log(action + "$");
		switch(action){
			case "LoadAPICall": 
				var key = jElem.attr("data-key");
				that.LoadData(key);
				break;
		}
	});
};

Page.prototype.LoadData = function(key){
	var obj = API_Tester_Config[key];
	$("#APICallMethod").text(obj.method);
	$("#APICallURL").text(obj.url);

	if(obj.method == "POST"){
		$("#InputData").html(JSON.stringify(obj.data, null, 2));
	}

	$.ajax({
		url: obj.url,
		method: obj.method
	}).done(function(data) {
		$("#OutputData").html(JSON.stringify(data, null, 2));
		
	});
};

var page = new Page();

$(document).ready(function(){
	page.InitPage();
});