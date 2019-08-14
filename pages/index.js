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
			cand1Vote: 0,
			cand2Vote: 0,
		}; // mucho estado...que el redux?
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

	// toggle votes for individual US State
	toggleMapClick = usState => {
		const newElectionResults = this.state.mapData;

		newElectionResults.map(state => {
			if (state === usState) {
				if (usState.properties['WINNER'] === 1) {
					usState.properties['WINNER'] = 0;
					//UPDATE VOTES
				} else {
					usState.properties['WINNER'] = 1;
					//UPDATE VOTES
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

	// give each US State electoral votes
	// and a random number to indicate winner
	updateVote = () => {
		let newMapData = this.state.mapData;

		newMapData.map(state =>
			this.state.voteData.map(vote => {
				if (vote.state === state.properties.NAME) {
					state.properties['ELECTORALVOTES'] = vote.electoralvotes;
					state.properties['WINNER'] = this.randomNum();
				}
				return newMapData;
			})
		);

		this.setState({
			mapData: newMapData,
		});
	};

	render() {
		const { height, width, mapData, usStateInfo } = this.state;
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
