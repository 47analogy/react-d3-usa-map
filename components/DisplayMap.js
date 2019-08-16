import * as d3 from 'd3';

const DisplayMap = props => {
	const { coords, svgHeight, svgWidth, toggleMapVotes } = props;

	const projection = () => {
		return d3.geoAlbersUsa();
	};

	return (
		<div>
			<svg width={svgWidth} height={svgHeight}>
				<g className="states">
					{coords.map((d, i) => (
						<path
							key={`path-${i}`}
							onClick={() => toggleMapVotes(d)}
							d={d3.geoPath().projection(projection())(d)}
							className="state"
							fill={
								!d.properties.WINNER
									? '#F4CB43'
									: d.properties.WINNER === 1
									? '#EB4C50'
									: '#1A9AF2'
							}
							stroke={'#000000'}
						/>
					))}
				</g>
			</svg>
		</div>
	);
};

export default DisplayMap;
