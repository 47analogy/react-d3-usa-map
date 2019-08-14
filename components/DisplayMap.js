import * as d3 from 'd3';

const DisplayMap = props => {
	const { coords, svgHeight, svgWidth, toggleMapClick } = props;

	const projection = () => {
		return d3.geoAlbersUsa();
	};

	return (
		<div>
			<svg width={svgWidth} height={svgHeight}>
				<g className='states'>
					{coords.map((d, i) => (
						<path
							key={`path-${i}`}
							onClick={() => toggleMapClick(d)}
							d={d3.geoPath().projection(projection())(d)}
							className='state'
							fill={d.properties.WINNER === 1 ? '#FF5252' : '#2096F3'}
							stroke={'#000000'}
						/>
					))}
				</g>
			</svg>
		</div>
	);
};

export default DisplayMap;
