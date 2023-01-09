import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Home.css'

function formatQuery(query) {
	return query.trim().replaceAll('   ', ' ').replaceAll('  ', ' ').replaceAll(' ', '-')
}

const Home = () => {
	const history = useHistory()
	const [query, setQuery] = useState('')

	function handleSearchIcon(e) {
		e.preventDefault()
		e.stopPropagation()
		if (query.length) {
			history.push(`/${formatQuery(query)}/AllPublications/BestMatch/1800-2021/500`)
		}
	}

	function handleKey(e) {
		if (e.key === 'Enter' && query.length) {
			e.preventDefault()
			history.push(`/${formatQuery(query)}/AllPublications/BestMatch/1800-2021/500`)
		} else {
			setQuery(e.target.value)
		}
	}

	return (
		<div className='Home'>
			<form>
				<div
					className='SearchIconBox'
					onClick={handleSearchIcon}
					onKeyDown={handleSearchIcon}
					role='button'
					tabIndex='0'
				>
					<div
						className='SearchIcon'
						onClick={handleSearchIcon}
						onKeyDown={handleSearchIcon}
						role='button'
						tabIndex='0'
					>
						&#9906;
					</div>
				</div>
				<input
					autoFocus
					className='SearchBox'
					onKeyPress={handleKey}
					onChange={handleKey}
					placeholder='Search 245,130,615 Research Papers'
					value={query}
				/>
			</form>
		</div>
	)
}

export default Home
