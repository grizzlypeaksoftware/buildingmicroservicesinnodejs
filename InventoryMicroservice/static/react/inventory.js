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
		return(
			<div class="col-md-3">
			<div class="card">
				<img class="card-img-top img-thumbnail mt-2" src={this.props.item.image} alt={this.props.item.description} />
				<div class="card-body">
					<h5 class="card-title">{this.props.item.description}</h5>
					<p class="card-text"><strong>Price:</strong> ${this.props.item.price}</p>
					<p class="card-text"><strong>Quantity:</strong> {this.props.item.quantity}</p>
					
				</div>
			</div>			
			</div>
		);
	}
}

