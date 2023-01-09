import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Map from './Map/Map'
import Menu from './Menu/Menu'

const queryExpressions = {}

function createColor(fieldIndex) {
	return `hsl(${240 + 60 * (fieldIndex % 6) + 27 * Math.floor(fieldIndex / 6)}, 100%, 30%)`
}

function findTopLevelFields(field, fields, fieldsSelected, topLevelFields) {
	if (field in fieldsSelected) {
		topLevelFields.push([field, fields[field].G])
	} else {
		fields[field].C.forEach(childField => {
			findTopLevelFields(childField, fields, fieldsSelected, topLevelFields)
		})
	}
}

const Search = () => {
	const location = useLocation()

	const [entity, setEntity] = useState({ I: 0, relationship: '' })
	const [fieldsSelected, setFieldsSelected] = useState({})
	const [fieldsSelectedColors, setFieldsSelectedColors] = useState({})
	const [hoverEntry, setHoverEntry] = useState({ I: 0 })
	const [hoverField, setHoverField] = useState('')
	const [metadataSelected, setMetadataSelected] = useState([])
	const [parentFields, setParentFields] = useState(['All'])
	const [query, setQuery] = useState('')
	const [results, setResults] = useState({ F: { All: { C: [], G: [], H: -1 } }, L: { All: [] }, M: [], Q: '' })
	const [topLevelFields, setTopLevelFields] = useState([])

	useEffect(() => {
		setQuery(location.pathname.split('/')[1].replaceAll('-', ' '))
		search()
	}, [location])

	useEffect(() => {
		if (results.F.All.G.length) {
			// [1.0] Find Top Level Fields and Color Fields
			const unsortedTopLevelFields = []
			findTopLevelFields('All', results.F, fieldsSelected, unsortedTopLevelFields)
			const newTopLevelFields = unsortedTopLevelFields
				.sort((a, b) => b[1].length - a[1].length)
				.map((topLevelField, topLevelFieldIndex) => [topLevelField[0], createColor(topLevelFieldIndex)])

			const newFieldsSelectedColors = {}
			if (newTopLevelFields.length !== 1) {
				newTopLevelFields.forEach((topLevelField, topLevelFieldIndex) => {
					createFieldColors(newFieldsSelectedColors, topLevelField[0], topLevelFieldIndex)
				})
			} else {
				results.F[newTopLevelFields[0][0]].C.forEach((topLevelChildField, topLevelChildFieldIndex) => {
					newFieldsSelectedColors[topLevelChildField] = createColor(topLevelChildFieldIndex)
				})
			}

			setFieldsSelectedColors(newFieldsSelectedColors)
			setTopLevelFields(newTopLevelFields)

			// [2.0] Create New Metadata Selected
			const newMetadataSelected = {}
			createMetadataSelected('All', fieldsSelected, newMetadataSelected)
			setMetadataSelected(Object.keys(newMetadataSelected).map(string => Number(string)))
		}
	}, [fieldsSelected, results])

	function createFieldColors(newFieldsSelectedColors, field, colorIndex) {
		newFieldsSelectedColors[field] = createColor(colorIndex)
		results.F[field].C.forEach(childField => {
			if (childField in fieldsSelected) {
				createFieldColors(newFieldsSelectedColors, childField, colorIndex)
			}
		})
	}

	function createFieldsSelected(field, isChecked, newFieldsCheckBoxed) {
		if (isChecked) newFieldsCheckBoxed[field] = true
		else delete newFieldsCheckBoxed[field]

		results.F[field].C.forEach(childField => {
			createFieldsSelected(childField, isChecked, newFieldsCheckBoxed)
		})
	}

	function createMetadataSelected(field, fieldsCheckBoxed, newMetadataSelected) {
		if (field in fieldsCheckBoxed) {
			results.F[field].G.forEach(globalIndex => {
				newMetadataSelected[globalIndex] = true
			})
		} else {
			results.F[field].G.forEach(globalIndex => {
				delete newMetadataSelected[globalIndex]
			})
		}

		results.F[field].C.forEach(childField => {
			createMetadataSelected(childField, fieldsCheckBoxed, newMetadataSelected)
		})
	}

	async function search() {
		const path = location.pathname.split('/')

		// Clear Old Search Results
		if (
			!path[1].includes('AA.AuId=') &&
			!path[1].includes('J.JId=') &&
			!path[1].includes('RId=') &&
			!path[1].includes('Ref=') &&
			!path[1].includes('Rel=')
		) {
			setEntity({ I: 0, relationship: '' })
		} else {
			setQuery('')
		}
		setFieldsSelected({})
		setMetadataSelected([])
		setHoverEntry({ I: 0 })
		setHoverField('')
		setParentFields(['All'])
		setResults({ F: { All: { C: [], G: [], H: -1 } }, L: { All: [] }, M: [], Q: '' })

		// Create Query String Parameters
		const newQuery = queryExpressions[path[1]] || path[1].includes('=') ? path[1] : path[1].toLowerCase()
		const queryStringParams = `q=${newQuery}&p=${path[2]}&s=${path[3]}&y=[${path[4].split('-')}]&c=${path[5]}`

		// Call API
		// console.log(`https://atlaswhite.com/api/search?${queryStringParams}`)
		document.body.style.cursor = 'wait'
		const newResults = await fetch(`https://atlaswhite.com/api/search?${queryStringParams}`)
			.then(resultsString => resultsString.json())
			.catch(() => ({ F: { All: { C: [], G: [], H: -1 } }, L: { All: [] }, M: [], Q: '' }))
		document.body.style.cursor = 'crosshair'
		// console.log(newResults)

		// Set New Search Results
		setFieldsSelected(newResults.F)
		setMetadataSelected(newResults.F.All.G)
		setResults(newResults)
		queryExpressions[path[1]] = newResults.Q
	}

	return (
		<>
			<Menu
				createFieldsSelected={createFieldsSelected}
				entity={entity}
				fieldsSelected={fieldsSelected}
				fieldsSelectedColors={fieldsSelectedColors}
				metadataSelected={metadataSelected}
				query={query}
				results={results}
				setEntity={setEntity}
				setFieldsSelected={setFieldsSelected}
				setHoverEntry={setHoverEntry}
				setHoverField={setHoverField}
				setParentFields={setParentFields}
				setQuery={setQuery}
			/>
			<Map
				createFieldsSelected={createFieldsSelected}
				fieldsSelected={fieldsSelected}
				fieldsSelectedColors={fieldsSelectedColors}
				metadataSelected={metadataSelected}
				hoverEntry={hoverEntry}
				hoverField={hoverField}
				parentFields={parentFields}
				results={results}
				setFieldsSelected={setFieldsSelected}
				setParentFields={setParentFields}
				topLevelFields={topLevelFields}
			/>
		</>
	)
}

export default Search
