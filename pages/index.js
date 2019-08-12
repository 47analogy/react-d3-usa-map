import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import DisplayMap from '../components/DisplayMap';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 800,
			width: 1000,
			mapData: [],
			usStateInfo: [],
			voteData: [],
		};
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		axios
			.all([d3.json('static/statesmap.json'), d3.csv('static/votes.csv')])
			.then(
				axios.spread((maps, votes) => {
					this.setState({
						mapData: maps.features,
						voteData: votes,
					});
				})
			)
			.catch(err => {
				console.log(err);
			});
	};

	// get info for individual state
	handleMapClick = usState => {
		this.setState({
			usStateInfo: [usState],
		});
	};

	render() {
		const { height, width, mapData, usStateInfo, voteData } = this.state;
		return (
			<div>
				<DisplayMap
					coords={mapData}
					svgHeight={height}
					svgWidth={width}
					stateClick={this.handleMapClick}
					stateCoords={usStateInfo}
				/>
			</div>
		);
	}
}

export default App;
