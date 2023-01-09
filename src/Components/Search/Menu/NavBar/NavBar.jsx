import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CountDropDown from './DropDowns/CountDropDown'
import PubTypeDropDown from './DropDowns/PubTypeDropDown'
import SortDropDown from './DropDowns/SortDropDown'
import YearDropDowns from './DropDowns/YearDropDowns'
import './DropDowns/DropDowns.css'
import './NavBar.css'

function formatQuery(query) {
	return query.trim().replaceAll('   ', ' ').replaceAll('  ', ' ').replaceAll(' ', '-')
}

const NavBar = ({ query, setQuery }) => {
	const history = useHistory()
	const location = useLocation()

	function handleKey(e) {
		if (e.key === 'Enter' && query.length) {
			e.preventDefault()
			const newPath = location.pathname.split('/')
			newPath[1] = formatQuery(query)
			history.push(newPath.join('/'))
		} else {
			setQuery(e.target.value)
		}
	}

	function handleSearchIcon(e) {
		e.preventDefault()
		e.stopPropagation()

		const newPath = location.pathname.split('/')
		newPath[1] = formatQuery(query)
		history.push(newPath.join('/'))
	}

	return (
		<div className='NavBar'>
			<form>
				<div
					className='SearchIconBox'
					onClick={handleSearchIcon}
					onKeyPress={handleSearchIcon}
					role='button'
					tabIndex='0'
				>
					<div
						className='SearchIcon'
						onClick={handleSearchIcon}
						onKeyPress={handleSearchIcon}
						role='button'
						tabIndex='0'
					>
						&#9906;
					</div>
				</div>
				<input className='SearchBox' onChange={handleKey} onKeyPress={handleKey} placeholder='Search' value={query} />
			</form>
			<div className='DropDowns'>
				<PubTypeDropDown />
				<SortDropDown />
				<YearDropDowns />
				<CountDropDown />
			</div>
		</div>
	)
}

export default NavBar
