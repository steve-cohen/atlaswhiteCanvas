import React, { useEffect, useRef } from 'react'
import Field from './Field/Field'
import './Fields.css'

const Fields = ({
	createFieldsSelected,
	fieldsSelected,
	fieldsSelectedColors,
	results,
	setFieldsSelected,
	setHoverField,
	setParentFields,
	setMetadataMaxHeight
}) => {
	const fieldsRef = useRef()

	useEffect(() => {
		updateMetadataMaxHeight()
		window.addEventListener('resize', updateMetadataMaxHeight)
		return () => window.removeEventListener('resize', updateMetadataMaxHeight)
	}, [])

	useEffect(() => {
		updateMetadataMaxHeight()
	}, [fieldsSelected])

	function handleField(fieldPath, newField, isChecked) {
		const newFieldsSelected = {}
		createFieldsSelected(newField, isChecked, newFieldsSelected)
		setFieldsSelected(newFieldsSelected)
		setParentFields(fieldPath)
		updateMetadataMaxHeight()
	}

	function handleFieldCheckBox(newField, isChecked) {
		const newFieldsSelected = { ...fieldsSelected }
		createFieldsSelected(newField, isChecked, newFieldsSelected)
		setFieldsSelected(newFieldsSelected)
		setParentFields(['All'])
		updateMetadataMaxHeight()
	}

	function updateMetadataMaxHeight() {
		setTimeout(() => {
			setMetadataMaxHeight(`calc(100vh - 44px - 2px - ${fieldsRef.current.clientHeight}px)`)
		}, 1)
	}

	return (
		<div className='Fields' ref={fieldsRef}>
			{results.F.All.C.length ? (
				<Field
					field='All'
					fieldPath={['All']}
					fieldsSelected={fieldsSelected}
					fieldsSelectedColors={fieldsSelectedColors}
					handleField={handleField}
					handleFieldCheckBox={handleFieldCheckBox}
					level={0}
					results={results}
					setHoverField={setHoverField}
					updateMetadataMaxHeight={updateMetadataMaxHeight}
				/>
			) : null}
		</div>
	)
}

export default Fields
