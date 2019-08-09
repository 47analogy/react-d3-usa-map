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
			usStateInfo: [],
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

	// get info for individual state
	handleMapClick = usState => {
		this.setState({
			usStateInfo: [usState],
		});
	};

	render() {
		const { height, width, mapData, usStateInfo } = this.state;

		return (
			<div>
				<DisplayMap
					coords={mapData}
					svgHeight={height}
					svgWidth={width}
					stateClick={this.handleMapClick}
				/>
			</div>
		);
	}
}

export default App;
