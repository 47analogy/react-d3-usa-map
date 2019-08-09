import * as d3 from 'd3';

const DisplayMap = props => {
	const { coords, svgHeight, svgWidth } = props;

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
							d={d3.geoPath().projection(projection())(d)}
							className="state"
							fill={'#D3D3D3'}
							stroke={'#000000'}
						/>
					))}
				</g>
			</svg>
		</div>
	);
};

export default DisplayMap;
