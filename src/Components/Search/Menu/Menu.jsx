import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Fields from './Fields/Fields'
import Entity from './Entity/Entity'
import Metadata from './Metadata/Metadata'
import NavBar from './NavBar/NavBar'
import './Menu.css'

const Menu = ({
	createFieldsSelected,
	entity,
	fieldsSelected,
	fieldsSelectedColors,
	metadataSelected,
	query,
	results,
	setEntity,
	setFieldsSelected,
	setHoverEntry,
	setHoverField,
	setParentFields,
	setQuery
}) => {
	const history = useHistory()
	const location = useLocation()

	const [metadataMaxHeight, setMetadataMaxHeight] = useState('10vh')

	async function getEntity(entityId, entityType) {
		// Separate Function for Parallel Async Requests
		const newEntity = await fetch(`https://atlaswhite.com/api/entity?q=Id=${entityId}&e=${entityType}`)
			.then(response => response.json())
			.catch(() => ({ C: '', T: '', P: '' }))

		setEntity({ I: entityId, relationship: 'Entity', ...newEntity })
	}

	function handleEntity(entityId, entityType) {
		setEntity({ I: 0, relationship: '' })

		getEntity(entityId, entityType)

		let newQueryExpression
		switch (entityType) {
			case 1: // Author
				newQueryExpression = `Composite(AA.AuId=${entityId})`
				break
			case 2: // Journal
				newQueryExpression = `Composite(J.JId=${entityId})`
				break
			default:
				break
		}

		const newPath = location.pathname.split('/')
		newPath[1] = newQueryExpression
		newPath[2] = 'AllPublications'
		newPath[4] = '1800-2021'
		history.push(newPath.join('/'))
	}

	function handleRelationship(newEntity, newRelationship) {
		if (newRelationship === 'Citations' && !newEntity.C) return
		if (newRelationship === 'References' && !newEntity.R) return
		setEntity({ ...newEntity, ...{ relationship: newRelationship } })

		let newQueryExpression
		switch (newRelationship) {
			case 'Citations':
				newQueryExpression = `RId=${newEntity.I}`
				break
			case 'References':
				newQueryExpression = `Ref=${newEntity.I}`
				break
			case 'Related':
				newQueryExpression = `Rel=${newEntity.I}`
				break
			default:
				break
		}

		const newPath = location.pathname.split('/')
		newPath[1] = newQueryExpression
		newPath[2] = 'AllPublications'
		newPath[4] = '1800-2021'
		history.push(newPath.join('/'))
	}

	return (
		<div className='Menu'>
			<NavBar query={query} setQuery={setQuery} />
			<Entity entity={entity} handleRelationship={handleRelationship} />
			<Fields
				createFieldsSelected={createFieldsSelected}
				fieldsSelected={fieldsSelected}
				fieldsSelectedColors={fieldsSelectedColors}
				results={results}
				setFieldsSelected={setFieldsSelected}
				setHoverField={setHoverField}
				setMetadataMaxHeight={setMetadataMaxHeight}
				setParentFields={setParentFields}
			/>
			<Metadata
				fieldsSelected={fieldsSelected}
				handleEntity={handleEntity}
				handleRelationship={handleRelationship}
				metadataMaxHeight={metadataMaxHeight}
				metadataSelected={metadataSelected}
				results={results}
				setHoverEntry={setHoverEntry}
			/>
		</div>
	)
}

export default Menu
