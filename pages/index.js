import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import DisplayMap from '../components/DisplayMap';
//import RandomVote from '../components/RandomVote'; // REMOVE

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

	// componentDidUpdate() {
	// 	this.updateVote();
	// }

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

	randomNum = () => {
		const vote = Math.floor(Math.random() * 3);
		return vote;
	};

	// give each state a random number and update JSON
	updateVote = () => {
		let newMapData = this.state.mapData;

		let stateVote = this.state.voteData.map(x => {
			const dataVotes = x.state;
			return dataVotes;
		});

		let stateTally = this.state.mapData.map(y => {
			const dataState = y.properties.NAME;
			return dataState;
		});

		stateVote.map(vote =>
			stateTally.map(state => {
				if (vote === state) {
					newMapData.map(victor => {
						victor.properties['winner'] = this.randomNum();
					});
					return newMapData;
				}
			})
		);

		this.setState({
			mapData: newMapData,
			// usStateInfo: this.state.mapData,
		});
		// console.log('new map data', this.state.mapData);
	};

	render() {
		const { height, width, mapData, usStateInfo, voteData } = this.state;
		return (
			<div>
				<div>
					<DisplayMap
						coords={mapData}
						svgHeight={height}
						svgWidth={width}
						stateClick={this.handleMapClick}
						stateCoords={usStateInfo}
						// updateVote={this.updateVote}
					/>
				</div>
				<div>
					<button onClick={this.updateVote}>Simulator</button>
				</div>
			</div>
		);
	}
}

export default App;
