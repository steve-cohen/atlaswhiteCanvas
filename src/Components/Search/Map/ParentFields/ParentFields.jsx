import React from 'react'
import './ParentFields.css'

const ParentFields = ({ createFieldsSelected, parentFields, setFieldsSelected, setParentFields }) => {
	function handleField(fieldPath, newField, isChecked) {
		const newFieldsSelected = {}
		createFieldsSelected(newField, isChecked, newFieldsSelected)
		setFieldsSelected(newFieldsSelected)
		setParentFields(fieldPath)
	}

	function renderParentFields() {
		if (parentFields.length > 1) {
			return (
				<div className='ParentFields'>
					{parentFields.map((parentField, parentFieldIndex) => (
						<React.Fragment key={`ParentField-${parentField}`}>
							<div
								className='ParentField'
								onClick={() => handleField([...parentFields].slice(0, parentFieldIndex + 1), parentField, true)}
								onKeyPress={() => handleField([...parentFields].slice(0, parentFieldIndex + 1), parentField, true)}
								role='button'
								tabIndex='0'
							>
								{parentField.split('-')[0]}
							</div>
							<div className='Arrow'>&#8250;</div>
						</React.Fragment>
					))}
				</div>
			)
		}

		return null
	}

	return renderParentFields()
}

export default ParentFields
