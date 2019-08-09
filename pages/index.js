import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			svgHeight: 800,
			svgWidth: 1000,
			mapData: [],
		};
	}

	componentDidMount() {
		axios
			.get('static/statesmap.json')
			.then(res => {
				this.setState({ mapData: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		const { svgHeight, svgWidth, mapData } = this.state;
		return <div>Interactive Map</div>;
	}
}

export default App;
