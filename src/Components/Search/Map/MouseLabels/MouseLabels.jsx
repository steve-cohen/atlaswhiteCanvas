import React from 'react'
import Entry from '../../Menu/Metadata/Entry/Entry'
import './MouseLabels.css'

const MouseLabels = ({ map, mouseLabel, results, hoverEntry, hoverField }) => {
	function renderHoverField() {
		if (hoverField.length && hoverField !== 'All' && map.nodes.length) {
			const fieldIndexes = {}
			results.F[hoverField].G.forEach(globalIndex => {
				if (globalIndex in map.globalToLocal) fieldIndexes[globalIndex] = 1
			})

			return (
				<svg className='MouseLabelBackground'>
					{map.links
						.filter(([startIndex, endIndex]) => startIndex in fieldIndexes && endIndex in fieldIndexes)
						.map(([startIndex, endIndex, stroke, x1, y1, x2, y2]) => (
							<line key={`Link-${startIndex}-${endIndex}`} style={{ stroke }} x1={x1} y1={y1} x2={x2} y2={y2} />
						))}
					{map.nodes
						.filter(node => node.G in fieldIndexes)
						.map(node => (
							<circle cx={node.X} cy={node.Y} fill={node.F} r={node.R} key={`Node-${node.G}`} />
						))}
				</svg>
			)
		}

		return null
	}

	return (
		<>
			<div className='MouseLabel' style={mouseLabel.style}>
				{mouseLabel.metadataMouse.map((label, labelIndex) => (
					<Entry
						entry={label}
						entryIndex={0}
						handleEntity={() => null}
						handleRelationship={() => null}
						key={`MouseLabel-${labelIndex}`}
						setHoverEntry={() => null}
					/>
				))}
			</div>
			{hoverEntry.I && results.M.length ? (
				<svg className='MouseLabelBackground'>
					<circle
						cx={map.globalToLocal[hoverEntry.G].X}
						cy={map.globalToLocal[hoverEntry.G].Y}
						fill={map.globalToLocal[hoverEntry.G].F}
						r={Math.max(map.globalToLocal[hoverEntry.G].R, 5)}
					/>
				</svg>
			) : null}
			{renderHoverField()}
		</>
	)
}

export default MouseLabels
