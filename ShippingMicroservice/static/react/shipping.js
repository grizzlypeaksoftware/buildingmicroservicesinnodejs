var ReactPage = function(){};

ReactPage.prototype.DrawTable = function(data){
	console.log(data);
	ReactDOM.render(
		<CardGroup data={data}/>
		,
		document.getElementById("DataTableContainer")
	);
};

var reactPage = new  ReactPage();
class CardGroup extends React.Component{
	render(){
		var count = this.props.data.length;
		var rows = [];
		
		for(var i = 0; i < count; i++){
			rows.push(<Card item={this.props.data[i]}/>);
		};
		return (
			<div class="row">
			{rows}			
			</div>	
			
		);
	}
};

class Card extends React.Component{
	render(){

		var count = this.props.item.items.length;
		var rows = [];
		
		for(var i = 0; i < count; i++){
			rows.push(<ItemListing item={this.props.item.items[i]}/>);
		};


		return(
			<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Shipping Order</h5>
					<p class="card-text"><strong>Recipient</strong></p>
					<p class="card-text">{this.props.item.info.name}<br />
					{this.props.item.info.address}<br />
					{this.props.item.info.region} {this.props.item.info.postal_code} </p>
					<hr />
					<p class="card-text"><strong>Items</strong></p>
					{rows}
				</div>
			</div>			
			</div>
		);
	}
}

class ItemListing extends React.Component{
	render(){
		return(
			<p class="card-text"><strong>Item: </strong>{this.props.item.item} <br/>
			<strong>Amount: </strong>{this.props.item.amount}
			</p>
		);
	}
}

