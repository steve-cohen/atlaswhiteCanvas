import React from 'react'
import './SVG.css'

const SVG = ({
	createFieldsSelected,
	map,
	parentFields,
	results,
	setFieldsSelected,
	setMouseLabel,
	setParentFields
}) => {
	function handleField(newField, isChecked) {
		const newFieldsSelected = {}
		createFieldsSelected(newField, isChecked, newFieldsSelected)
		setFieldsSelected(newFieldsSelected)
		setParentFields([...parentFields, newField])
	}

	function handleMouseLabel(e, nodeIndexes) {
		const newStyle = {}
		if (e.clientX < window.innerWidth - 400) newStyle.left = e.clientX - 400
		else {
			newStyle.right = window.innerWidth - e.clientX
			newStyle.float = 'right'
			newStyle.clear = 'right'
		}

		if (e.clientY > window.innerHeight - 110) newStyle.bottom = window.innerHeight - e.clientY
		else newStyle.top = e.clientY

		setMouseLabel({
			metadataMouse: nodeIndexes.map(nodeIndex => results.M[nodeIndex]),
			style: newStyle
		})
	}

	return (
		<svg>
			{map.fieldLabels.map(({ Count, Field, FieldColor, X, Y }) => (
				<text
					className='FieldLabel'
					key={`FieldLabel-${Field}`}
					onClick={() => handleField(Field, true)}
					onKeyPress={() => handleField(Field, true)}
					style={{ fill: FieldColor }}
					textAnchor='middle'
					x={X}
					y={Y}
				>
					{`${Field.split('-')[0].replace(' ', '\n')} (${Count})`}
				</text>
			))}
			{map.links.map(([startIndex, endIndex, stroke, x1, y1, x2, y2]) => (
				<line
					key={`Link-${startIndex}-${endIndex}`}
					onClick={() => {
						window.open(results.M[endIndex].U)
						window.open(results.M[startIndex].U)
					}}
					onMouseEnter={e => handleMouseLabel(e, [startIndex, endIndex])}
					onMouseLeave={() => setMouseLabel({ metadataMouse: [], style: {} })}
					style={{ stroke }}
					x1={x1}
					y1={y1}
					x2={x2}
					y2={y2}
				/>
			))}
			{map.nodes.map((node, nodeIndex) => (
				<circle
					cx={node.X}
					cy={node.Y}
					fill={node.F}
					r={node.R}
					key={`Node-${node.G}`}
					onClick={() => window.open(node.U, '_blank')}
					onMouseEnter={e => handleMouseLabel(e, [nodeIndex])}
					onMouseLeave={() => setMouseLabel({ metadataMouse: [], style: {} })}
				/>
			))}
		</svg>
	)
}

export default SVG
