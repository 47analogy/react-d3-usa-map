import React, { Component } from 'react';
import axios from 'axios';
import DisplayMap from '../components/DisplayMap';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 800,
			width: 1000,
			mapData: [],
		};
	}

	componentDidMount() {
		axios
			.get('static/statesmap.json')
			.then(res => {
				this.setState({ mapData: res.data.features });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		const { height, width, mapData } = this.state;

		return (
			<div>
				<DisplayMap coords={mapData} svgHeight={height} svgWidth={width} />
			</div>
		);
	}
}

export default App;
