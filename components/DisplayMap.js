import * as d3 from 'd3';

const DisplayMap = props => {
	const { coords, svgHeight, svgWidth, stateClick, stateCoords } = props;

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
							onClick={() => stateClick(d)}
							d={d3.geoPath().projection(projection())(d)}
							className="state"
							fill={'#D3D3D3'}
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
							fill={'#800080'}
							stroke={'#000000'}
						/>
					))}
				</g>
			</svg>
		</div>
	);
};

export default DisplayMap;
