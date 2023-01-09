import React, { useState } from 'react'
import './Field.css'

const Field = ({
	field,
	fieldPath,
	fieldsSelected,
	fieldsSelectedColors,
	handleField,
	handleFieldCheckBox,
	level,
	results,
	setHoverField,
	updateMetadataMaxHeight
}) => {
	const [showFieldChildren, setShowFieldChildren] = useState(field === 'All')

	function handleShowFieldChildren() {
		setShowFieldChildren(!showFieldChildren)
		updateMetadataMaxHeight()
	}

	function renderCheckBox() {
		return (
			<div
				className='container'
				onClick={() => handleFieldCheckBox(field, !(field in fieldsSelected))}
				onKeyPress={() => handleFieldCheckBox(field, !(field in fieldsSelected))}
				role='button'
				tabIndex='0'
			>
				<input checked={field in fieldsSelected} onChange={() => null} type='checkbox' />
				<span className='checkmark' />
			</div>
		)
	}

	function renderFieldChildren() {
		if (showFieldChildren) {
			return results.F[field].C.map(fieldChild => (
				<Field
					field={fieldChild}
					fieldPath={[...fieldPath, fieldChild]}
					fieldsSelected={fieldsSelected}
					fieldsSelectedColors={fieldsSelectedColors}
					handleField={handleField}
					handleFieldCheckBox={handleFieldCheckBox}
					key={`Field-${fieldChild}`}
					level={level + 1}
					results={results}
					setHoverField={setHoverField}
					updateMetadataMaxHeight={updateMetadataMaxHeight}
				/>
			))
		}

		return null
	}

	function renderFieldTitle() {
		return (
			<div
				className='FieldTitle'
				onClick={() => {
					setShowFieldChildren(true)
					handleField(fieldPath, field, true)
				}}
				onKeyPress={() => {
					setShowFieldChildren(true)
					handleField(fieldPath, field, true)
				}}
				role='button'
				tabIndex='0'
			>
				{`${field.split('-')[0]} (${results.F[field].G.length})`}
			</div>
		)
	}

	function renderShowFieldChildren() {
		if (results.F[field].C.length) {
			return (
				<div
					className='ShowFieldChildren'
					onClick={() => handleShowFieldChildren()}
					onKeyPress={() => handleShowFieldChildren()}
					role='button'
					tabIndex='0'
				>
					{showFieldChildren ? <>&#8722;</> : <>&#43;</>}
				</div>
			)
		}

		return <div className='ShowNoFieldChildren'>&#8722;</div>
	}

	return (
		<>
			<div
				className='Field'
				onMouseEnter={() => setHoverField(field)}
				onMouseLeave={() => setHoverField('')}
				style={{ marginLeft: `${level * 15}px` }}
			>
				{renderShowFieldChildren()}
				{renderCheckBox()}
				{renderFieldTitle()}
			</div>
			{renderFieldChildren()}
		</>
	)
}

export default Field
