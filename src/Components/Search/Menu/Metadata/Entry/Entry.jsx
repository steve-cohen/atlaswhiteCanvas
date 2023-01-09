import React from 'react'
import './Entry.css'

const Entry = ({ entry, entryIndex, handleEntity, handleRelationship, setHoverEntry }) => (
	<div className='Entry' onMouseEnter={() => setHoverEntry(entry)} onMouseLeave={() => setHoverEntry({ I: 0 })}>
		{entry.U.length ? (
			<a className='Title' href={entry.U} target='_blank' rel='noopener noreferrer'>
				{entry.T}
			</a>
		) : (
			<div className='Title'>{entry.T}</div>
		)}
		<div className='Attributions'>
			<div className='Year'>{entry.D}</div>
			<div
				className='Citations'
				onClick={() => handleRelationship(entry, 'Citations')}
				onKeyPress={() => handleRelationship(entry, 'Citations')}
				role='button'
				tabIndex='0'
			>
				{entry.C.toLocaleString()}
			</div>
			{entry.J.length ? (
				<div
					className='Journal'
					onClick={() => handleEntity(entry.JI, 2)}
					onKeyPress={() => handleEntity(entry.JI, 2)}
					role='button'
					tabIndex='0'
				>
					{entry.J}
				</div>
			) : null}
			{entry.A.map(([author, authorId], authorIndex) => (
				<div
					className='Author'
					onClick={() => handleEntity(authorId, 1)}
					onKeyDown={() => handleEntity(authorId, 1)}
					key={`Author-${authorId}-${entryIndex}-${authorIndex}`}
					role='button'
					style={authorId ? {} : { cursor: 'default', textDecoration: 'none' }}
					tabIndex='0'
				>
					{author}
					{authorIndex !== entry.A.length - 1 ? ',' : ''}
				</div>
			))}
		</div>
	</div>
)

export default Entry
