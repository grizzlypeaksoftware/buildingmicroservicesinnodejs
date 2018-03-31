var ReactPage = function(){};

ReactPage.prototype.DrawTable = function(data){
	ReactDOM.render(
		<DataTable data={data}/>
		,
		document.getElementById("DataTableContainer")
	);
};

var reactPage = new  ReactPage();

class DataTable extends React.Component{
	render(){	
		var count = this.props.data.length;
		var rows = [];
		
		for(var i = 0; i < count; i++){
			rows.push(<DataRow item={this.props.data[i]}/>);
		};
		return (
			<div class="col-md-4">
			<h4>Microservice Status</h4>
			<table class="table">
				<thead>
					<tr>
						<th>Microservice</th>
						<th>Address</th>
						<th>Port</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
			</div>
		);
	}
};

class DataRow extends React.Component{
	render(){

		var rowClass = "table-danger";
		var status = "down";
		if(this.props.item.success){
			rowClass = "table-success";
			status = "up";
		}
		return(
			<tr  class={rowClass}>
				<td>{this.props.item.config.name}</td>
				<td>{this.props.item.address}</td>
				<td>{this.props.item.port}</td>
				<td>{status}</td>
			</tr>
		);
	}
}


