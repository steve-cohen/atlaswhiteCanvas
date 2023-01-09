import React, { useEffect, useState } from 'react'
import MouseLabels from './MouseLabels/MouseLabels'
import ParentFields from './ParentFields/ParentFields'
import Canvas from './Canvas/Canvas'
import './Map.css'

function mean(fields, metadata, topLevelField, dimension) {
	const sum = fields[topLevelField].G.reduce((total, globalIndex) => total + metadata[globalIndex][dimension], 0)
	return sum / fields[topLevelField].G.length
}

function scaleCoordinate(cooridinate, dimension, { minX, minY, maxX, maxY }) {
	if (dimension === 'X') {
		return ((0.8 * (cooridinate - minX)) / (maxX - minX) + 0.1) * (window.innerWidth - 400)
	}
	return ((0.8 * (cooridinate - minY)) / (maxY - minY) + 0.1) * window.innerHeight
}

const Map = ({
	createFieldsSelected,
	fieldsSelected,
	fieldsSelectedColors,
	metadataSelected,
	hoverEntry,
	hoverField,
	parentFields,
	results,
	setFieldsSelected,
	setParentFields,
	topLevelFields
}) => {
	const [map, setMap] = useState({ fieldLabels: [], links: [], nodes: [], globalToLocal: {} })
	const [mouseLabel, setMouseLabel] = useState({ metadataMouse: [], style: {} })

	useEffect(() => {
		const newMap = { fieldLabels: [], links: [], nodes: [], globalToLocal: {} }

		if (metadataSelected.length && results.M.length && topLevelFields.length) {
			// [1.0] Scale Coordinates
			const minMax = { maxX: -Infinity, maxY: -Infinity, minX: Infinity, minY: Infinity }
			metadataSelected.forEach(globalIndex => {
				if (results.M[globalIndex].X > minMax.maxX) minMax.maxX = results.M[globalIndex].X
				if (results.M[globalIndex].Y > minMax.maxY) minMax.maxY = results.M[globalIndex].Y
				if (results.M[globalIndex].X < minMax.minX) minMax.minX = results.M[globalIndex].X
				if (results.M[globalIndex].Y < minMax.minY) minMax.minY = results.M[globalIndex].Y
			})

			// [2.0] Create Nodes
			// [2.1] Create Fill Colors
			const nodeFills = {}
			if (topLevelFields.length !== 1) {
				topLevelFields.forEach(([topLevelField, topLevelFieldColor]) => {
					results.F[topLevelField].G.forEach(globalIndex => {
						nodeFills[globalIndex] = topLevelFieldColor
					})
				})
			} else {
				results.F[topLevelFields[0][0]].C.forEach(topLevelChildField => {
					results.F[topLevelChildField].G.forEach(globalIndex => {
						nodeFills[globalIndex] = fieldsSelectedColors[topLevelChildField]
					})
				})
			}

			// [2.2] Set New Nodes
			metadataSelected.forEach((globalIndex, localIndex) => {
				const newNode = {
					G: globalIndex,
					F: globalIndex in nodeFills ? nodeFills[globalIndex] : 'black',
					R: localIndex < 14 ? 14 - localIndex / 2 : 3,
					U: results.M[globalIndex].U,
					X: scaleCoordinate(results.M[globalIndex].X, 'X', minMax),
					Y: scaleCoordinate(results.M[globalIndex].Y, 'Y', minMax)
				}

				newMap.nodes.push(newNode)

				newMap.globalToLocal[globalIndex] = {
					F: newNode.F,
					R: newNode.R,
					X: newNode.X,
					Y: newNode.Y
				}
			})

			// [3.0] Create Links
			const metadataSelectedObject = {}
			metadataSelected.forEach(globalIndex => {
				metadataSelectedObject[globalIndex] = true
			})

			const linksSelectedObject = {}
			topLevelFields.forEach(([topLevelField]) => {
				results.L[topLevelField].forEach(([startIndex, endIndex, fieldIndex]) => {
					if (startIndex in metadataSelectedObject && endIndex in metadataSelectedObject) {
						const link = [startIndex, endIndex].sort((a, b) => results.M[a].Y - results.M[b].Y)
						if (results.F[topLevelField].C.length) {
							linksSelectedObject[link] = fieldsSelectedColors[results.F[topLevelField].C[fieldIndex]]
						} else {
							linksSelectedObject[link] = 'black'
						}
					}
				})
			})

			Object.entries(linksSelectedObject).forEach(([link, color]) => {
				const [startIndex, endIndex] = [...link.split(',')]
				newMap.links.push([
					startIndex,
					endIndex,
					color,
					scaleCoordinate(results.M[startIndex].X, 'X', minMax),
					scaleCoordinate(results.M[startIndex].Y, 'Y', minMax),
					scaleCoordinate(results.M[endIndex].X, 'X', minMax),
					scaleCoordinate(results.M[endIndex].Y, 'Y', minMax)
				])
			})

			// [4.0] Create Field Labels
			if (topLevelFields.length !== 1) {
				topLevelFields.forEach(topLevelField => {
					newMap.fieldLabels.push({
						Count: results.F[topLevelField[0]].G.length,
						Field: topLevelField[0],
						FieldColor: topLevelField[1],
						X: scaleCoordinate(mean(results.F, results.M, topLevelField[0], 'X'), 'X', minMax),
						Y: scaleCoordinate(mean(results.F, results.M, topLevelField[0], 'Y'), 'Y', minMax)
					})
				})
			} else {
				results.F[topLevelFields[0][0]].C.forEach(childField => {
					if (childField in fieldsSelected) {
						newMap.fieldLabels.push({
							Count: results.F[childField].G.length,
							Field: childField,
							FieldColor: fieldsSelectedColors[childField],
							X: scaleCoordinate(mean(results.F, results.M, childField, 'X'), 'X', minMax),
							Y: scaleCoordinate(mean(results.F, results.M, childField, 'Y'), 'Y', minMax)
						})
					}
				})
			}
		}

		setMap(newMap)
	}, [results, metadataSelected, topLevelFields])

	return (
		<div className='Map'>
			<ParentFields
				createFieldsSelected={createFieldsSelected}
				parentFields={parentFields}
				setFieldsSelected={setFieldsSelected}
				setParentFields={setParentFields}
			/>
			<Canvas map={map} />
			<MouseLabels
				map={map}
				mouseLabel={mouseLabel}
				results={results}
				hoverEntry={hoverEntry}
				hoverField={hoverField}
			/>
		</div>
	)
}

export default Map
