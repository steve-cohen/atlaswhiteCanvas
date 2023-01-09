import React, { useEffect, useRef } from 'react'
import Entry from './Entry/Entry'
import './Metadata.css'

const Metadata = ({
	fieldsSelected,
	handleEntity,
	handleRelationship,
	metadataMaxHeight,
	metadataSelected,
	results,
	setHoverEntry
}) => {
	const metadataRef = useRef()

	useEffect(() => {
		metadataRef.current.scrollTo(0, 0)
	}, [fieldsSelected])

	function renderMetadata() {
		if (results.M.length && metadataSelected.length) {
			return metadataSelected.map(entryIndex => (
				<Entry
					entry={results.M[entryIndex]}
					entryIndex={entryIndex}
					handleEntity={handleEntity}
					handleRelationship={handleRelationship}
					key={`Entry-${entryIndex}`}
					setHoverEntry={setHoverEntry}
				/>
			))
		}

		return null
	}

	return (
		<div className='Metadata' ref={metadataRef} style={{ maxHeight: metadataMaxHeight }}>
			{renderMetadata()}
		</div>
	)
}

export default Metadata
