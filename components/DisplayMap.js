import * as d3 from 'd3';

const DisplayMap = props => {
	const {
		coords,
		svgHeight,
		svgWidth,
		stateClick,
		stateCoords,
		// updateVote,
	} = props;

	const projection = () => {
		return d3.geoAlbersUsa();
	};

	const updateMapColor = () => {
		const color = ['#D3D3D3', 'red', 'blue'];
		let shade = '';

		coords.map(y => {
			const pick = y.properties.winner;
			if (pick === 0) {
				shade = color[1]; // red
			} else if (pick === 1) {
				shade = color[2]; // blue
			} else {
				shade = color[0]; // grey
			}
		});
		return shade;
	};

	updateMapColor();

	return (
		<div>
			<svg width={svgWidth} height={svgHeight}>
				<g className="states">
					{coords.map((d, i) => (
						<path
							key={`path-${i}`}
							onClick={() => stateClick(d)}
							d={d3.geoPath().projection(projection())(d)}
							className="state"
							// fill={'#D3D3D3'}
							fill={updateMapColor()}
							stroke={'#000000'}
						/>
					))}
				</g>
				<g className="states">
					{stateCoords.map((d, i) => (
						<path
							key={`state-path-${i}`}
							d={d3.geoPath().projection(projection())(d)}
							className="state"
							fill={updateMapColor()}
							stroke={'#000000'}
						/>
					))}
				</g>
			</svg>
		</div>
	);
};

export default DisplayMap;
