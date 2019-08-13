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

	// toggle votes for individual state
	toggleMapClick = usState => {
		const newElectionResults = this.state.mapData;

		newElectionResults.map(state => {
			if (state === usState) {
				if (usState.properties['winner'] === 1) {
					usState.properties['winner'] = 0;
				} else {
					usState.properties['winner'] = 1;
				}
				return newElectionResults;
			}
		});
		this.setState({
			mapData: newElectionResults,
		});
	};

	randomNum = () => {
		const vote = Math.floor(Math.random() * 2);
		return vote;
	};

	// give each state a random number for winner and update JSON file
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
		});
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
						toggleMapClick={this.toggleMapClick}
						stateCoords={usStateInfo}
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
