import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const displayPubType = {
	AllPublications: 'All Publications',
	Books: 'Books',
	Conferences: 'Conferences',
	JournalArticles: 'Journal Articles',
	Patents: 'Patents',
	PrePrints: 'PrePrints',
	Reviews: 'Reviews'
}

const PubTypeDropDown = () => {
	const history = useHistory()
	const location = useLocation()

	const [showPubType, setShowPubType] = useState(false)

	function handlePubType(newPubType) {
		setShowPubType(false)
		const newPath = location.pathname.split('/')
		newPath[2] = newPubType
		history.push(newPath.join('/'))
	}

	return (
		<div className='DropDown' onMouseEnter={() => setShowPubType(true)} onMouseLeave={() => setShowPubType(false)}>
			<div className='Button'>
				<div className='Label'>{displayPubType[location.pathname.split('/')[2]]}</div>
				<div className='Arrow'>&#8250;</div>
				<div className='Options' style={showPubType ? {} : { display: 'none' }}>
					<div
						onClick={() => handlePubType('AllPublications')}
						onKeyPress={() => handlePubType('AllPublications')}
						role='button'
						tabIndex='0'
					>
						All Publications
					</div>
					<div
						onClick={() => handlePubType('Books')}
						onKeyPress={() => handlePubType('Books')}
						role='button'
						tabIndex='0'
					>
						Books
					</div>
					<div
						onClick={() => handlePubType('Conferences')}
						onKeyPress={() => handlePubType('Conferences')}
						role='button'
						tabIndex='0'
					>
						Conferences
					</div>
					<div
						onClick={() => handlePubType('JournalArticles')}
						onKeyPress={() => handlePubType('JournalArticles')}
						role='button'
						tabIndex='0'
					>
						Journal Articles
					</div>
					<div
						onClick={() => handlePubType('Patents')}
						onKeyPress={() => handlePubType('Patents')}
						role='button'
						tabIndex='0'
					>
						Patents
					</div>
					<div
						onClick={() => handlePubType('PrePrints')}
						onKeyPress={() => handlePubType('PrePrints')}
						role='button'
						tabIndex='0'
					>
						PrePrints
					</div>
					<div
						onClick={() => handlePubType('Reviews')}
						onKeyPress={() => handlePubType('Reviews')}
						role='button'
						tabIndex='0'
					>
						Reviews
					</div>
				</div>
			</div>
		</div>
	)
}

export default PubTypeDropDown
