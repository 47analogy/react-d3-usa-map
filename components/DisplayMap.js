import * as d3 from 'd3';

const DisplayMap = props => {
	const { coords, svgHeight, svgWidth, toggleMapVotes } = props;

	const projection = () => {
		return d3.geoAlbersUsa();
	};

	return (
		<div className="map">
			<svg width={svgWidth} height={svgHeight}>
				<g className="states">
					{coords.map((d, i) => (
						<path
							key={`path-${i}`}
							onClick={() => toggleMapVotes(d)}
							d={d3.geoPath().projection(projection())(d)}
							className="state"
							fill={
								!d.properties.WINNER || d.properties.WINNER === 'undecided'
									? '#F4CB43' // gold
									: d.properties.WINNER === 'redState'
									? '#EB4C50' // red
									: '#1A9AF2' // blue
							}
							stroke={'#000000'}
						/>
					))}
				</g>
			</svg>
			<style jsx>{`
				g {
					cursor: pointer;
				}
			`}</style>
		</div>
	);
};

export default DisplayMap;
