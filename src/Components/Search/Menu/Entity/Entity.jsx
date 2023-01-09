import React from 'react'
import './Entity.css'

const Entity = ({ entity, handleRelationship }) => {
	if (entity.I) {
		return (
			<div className='Entity'>
				{entity.U !== undefined && entity.U.length ? (
					<a className='Title' href={entity.U} target='_blank' rel='noopener noreferrer'>
						{entity.T}
					</a>
				) : (
					<div className='Title'>{entity.T}</div>
				)}
				{entity.relationship === 'Entity' ? (
					<div className='Relationships'>
						<div style={{ cursor: 'crosshair', textDecoration: 'none' }}>
							{entity.C.toLocaleString()}
							{entity.C === 1 ? ' Citation' : ' Citations'}
						</div>
						<div style={{ cursor: 'crosshair', textDecoration: 'none' }}>
							{entity.P.toLocaleString()}
							{entity.P === 1 ? ' Publications' : ' Publications'}
						</div>
					</div>
				) : (
					<div className='Relationships'>
						<div
							onClick={() => handleRelationship(entity, 'Citations')}
							onKeyPress={() => handleRelationship(entity, 'Citations')}
							role='button'
							style={entity.relationship === 'Citations' ? { textDecoration: 'underline' } : {}}
							tabIndex='0'
						>
							{entity.C.toLocaleString()}
							{entity.C === 1 ? ' Citation' : ' Citations'}
						</div>
						<div
							onClick={() => handleRelationship(entity, 'References')}
							onKeyPress={() => handleRelationship(entity, 'References')}
							role='button'
							style={entity.relationship === 'References' ? { textDecoration: 'underline' } : {}}
							tabIndex='0'
						>
							{entity.R.toLocaleString()}
							{entity.R === 1 ? ' Reference' : ' References'}
						</div>
						<div
							onClick={() => handleRelationship(entity, 'Related')}
							onKeyPress={() => handleRelationship(entity, 'Related')}
							role='button'
							style={entity.relationship === 'Related' ? { textDecoration: 'underline' } : {}}
							tabIndex='0'
						>
							20 Related
						</div>
					</div>
				)}
			</div>
		)
	}

	return null
}

export default Entity
