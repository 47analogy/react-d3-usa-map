import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import DisplayMap from '../components/DisplayMap';
import VoteResults from '../components/VoteResults';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 550,
			width: 1000,
			mapData: [],
			voteData: [],
			candiateOneVote: 0,
			candiateTwoVote: 0,
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
	toggleMapVotes = usState => {
		const newElectionResults = [...this.state.mapData];

		newElectionResults.map(state => {
			if (state === usState) {
				if (usState.properties['WINNER'] === 1) {
					usState.properties['WINNER'] = 0;
				} else {
					usState.properties['WINNER'] = 1;
				}
				return newElectionResults;
			}
		});

		this.setState(
			{
				mapData: newElectionResults,
			},
			this.tallyCandidateVotes
		);
	};

	// simple way to generate winner of a US State
	randomNum = () => {
		const vote = Math.floor(Math.random() * 2);
		return vote;
	};

	// give each US State electoral votes
	// and a random number to indicate winner
	generateRandomMap = () => {
		let newMapData = [...this.state.mapData];

		newMapData.map(state =>
			this.state.voteData.map(vote => {
				if (vote.state === state.properties.NAME) {
					state.properties['ELECTORALVOTES'] = vote.electoralvotes;
					state.properties['WINNER'] = this.randomNum();
				}
				return newMapData;
			})
		);

		this.setState(
			{
				mapData: newMapData,
			},
			this.tallyCandidateVotes
		);
	};

	tallyCandidateVotes = () => {
		// totalVotesAvailable = 538, totalVotesWinner = 270

		let candiateOneSum = this.state.mapData
			.filter(allVotes => allVotes.properties['WINNER'] === 0)
			.reduce((sum, allVotes) => {
				return sum + parseInt(allVotes.properties.ELECTORALVOTES);
			}, 0);

		let candiateTwoSum = this.state.mapData
			.filter(allVotes => allVotes.properties['WINNER'] === 1)
			.reduce((sum, allVotes) => {
				return sum + parseInt(allVotes.properties.ELECTORALVOTES);
			}, 0);

		this.setState({
			candiateOneVote: candiateOneSum,
			candiateTwoVote: candiateTwoSum,
		});
	};

	render() {
		const {
			height,
			width,
			mapData,
			usStateInfo,
			candiateOneVote,
			candiateTwoVote,
		} = this.state;

		return (
			<div>
				<div>
					<DisplayMap
						coords={mapData}
						svgHeight={height}
						svgWidth={width}
						toggleMapVotes={this.toggleMapVotes}
						stateCoords={usStateInfo}
					/>
				</div>
				<div>
					<button onClick={this.generateRandomMap}>Simulator</button>
				</div>
				<VoteResults blue={candiateOneVote} red={candiateTwoVote} />
			</div>
		);
	}
}

export default App;
