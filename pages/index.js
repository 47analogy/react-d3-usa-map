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
			candidateOneVotes: 0,
			candidateTwoVotes: 0,
			battleGround: 0,
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

		// TODO: FUNCTIONALITY FOR UNDECIDED VOTES
		newElectionResults.map(state => {
			if (state === usState) {
				if (usState.properties['WINNER'] === 'redState') {
					usState.properties['WINNER'] = 'blueState';
				} else {
					usState.properties['WINNER'] = 'redState';
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
	generateRandomVotes = () => {
		// match US State colors to a generated number
		const stateColors = {
			0: 'undecided',
			1: 'redState',
			2: 'blueState',
		};

		const vote = Math.floor(Math.random() * 3);
		return stateColors[vote];
	};

	// give each US State electoral votes
	// and a random number to indicate winner
	generateRandomMap = () => {
		const newMapData = [...this.state.mapData];

		newMapData.map(state =>
			this.state.voteData.map(vote => {
				if (vote.state === state.properties.NAME) {
					state.properties['ELECTORALVOTES'] = vote.electoralvotes;
					state.properties['WINNER'] = this.generateRandomVotes();
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
		const totalVotesWinner = 270;

		const candiateOneSum = this.state.mapData
			.filter(allVotes => allVotes.properties['WINNER'] === 'blueState')
			.reduce((sum, allVotes) => {
				return sum + parseInt(allVotes.properties.ELECTORALVOTES);
			}, 0);

		const candiateTwoSum = this.state.mapData
			.filter(allVotes => allVotes.properties['WINNER'] === 'redState')
			.reduce((sum, allVotes) => {
				return sum + parseInt(allVotes.properties.ELECTORALVOTES);
			}, 0);

		this.setState(
			{
				candidateOneVotes: candiateOneSum,
				candidateTwoVotes: candiateTwoSum,
			},
			this.tallyUndecidedVotes
		);
	};

	tallyUndecidedVotes = () => {
		const totalVotesAvailable = 538;

		const undecidedVotes =
			totalVotesAvailable -
			(this.state.candidateOneVotes + this.state.candidateTwoVotes);

		this.setState({
			battleGround: undecidedVotes,
		});
	};

	render() {
		const {
			height,
			width,
			mapData,
			usStateInfo,
			candidateOneVotes,
			candidateTwoVotes,
			battleGround,
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
				<VoteResults
					blue={candidateOneVotes}
					red={candidateTwoVotes}
					undecided={battleGround}
				/>
			</div>
		);
	}
}

export default App;
