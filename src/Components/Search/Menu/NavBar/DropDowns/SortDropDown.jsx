import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const displayLabel = {
	BestMatch: 'Best Match',
	MostCited: 'Most Cited',
	Newest: 'Newest',
	Oldest: 'Oldest'
}

const SortDropDown = () => {
	const history = useHistory()
	const location = useLocation()

	const [showSort, setShowSort] = useState(false)

	function handleSort(newSort) {
		setShowSort(false)
		const newPath = location.pathname.split('/')
		newPath[3] = newSort
		history.push(newPath.join('/'))
	}

	return (
		<div className='DropDown' onMouseEnter={() => setShowSort(true)} onMouseLeave={() => setShowSort(false)}>
			<div className='Button'>
				<div className='Label'>{displayLabel[location.pathname.split('/')[3]]}</div>
				<div className='Arrow'>&#8250;</div>
				<div className='Options' style={showSort ? {} : { display: 'none' }}>
					<div
						onClick={() => handleSort('BestMatch')}
						onKeyPress={() => handleSort('BestMatch')}
						role='button'
						tabIndex='0'
					>
						Best Match
					</div>
					<div
						onClick={() => handleSort('MostCited')}
						onKeyPress={() => handleSort('MostCited')}
						role='button'
						tabIndex='0'
					>
						Most Cited
					</div>
					<div onClick={() => handleSort('Newest')} onKeyPress={() => handleSort('Newest')} role='button' tabIndex='0'>
						Newest
					</div>
					<div onClick={() => handleSort('Oldest')} onKeyPress={() => handleSort('Oldest')} role='button' tabIndex='0'>
						Oldest
					</div>
				</div>
			</div>
		</div>
	)
}

export default SortDropDown
