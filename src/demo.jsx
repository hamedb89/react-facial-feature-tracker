import React from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

class Demo extends React.Component {
	constructor(props) {
	  super(props);
	  const $body = $('body');

	  PubSub.subscribe('emotions.loop', (e,emotions) => {
	  	console.log('loop');
	  	const colors = {
	  		angry: '#f00',
	  		happy: '#f60',
	  		surprised: 'yellow',
	  		sad: '#333'
	  	}

	  	const color = `rgb(${Math.floor(255*emotions[0].value)}, ${Math.floor(255*emotions[1].value)}, ${Math.floor(255*emotions[3].value)})`;
	  	this.setState({ color: color });

	  	$body.attr('style', `background-color: ${color}`);
	  } );
	
	  this.state = {color: ''};
	}

	render() {

		return (
			<div>
				{ (React.createElement(this.props.facialFeatureTracker, {PubSub: PubSub}) ) }
				<h1>{this.state.color}</h1>
				<p>lorem</p>
			</div>
		)
	}
}

window.Demo = Demo;
