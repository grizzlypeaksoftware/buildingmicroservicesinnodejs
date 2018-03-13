var Model = function(){};

Model.prototype.GetReport = function(req,res){
	return {
		data : 
		[
			{
				_id: "id#", 
				name: "data point #1",
				value: 100.21
			}
		]
	}
};

module.exports = new Model();