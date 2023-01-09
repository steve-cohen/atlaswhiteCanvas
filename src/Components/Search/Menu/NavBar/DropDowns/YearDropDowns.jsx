import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const endYears = Array.from({ length: 221 }, (_, i) => 2021 - i)
const startYears = Array.from({ length: 221 }, (_, i) => 2021 - i)
startYears.unshift(1800)

const YearDropDowns = () => {
	const history = useHistory()
	const location = useLocation()

	const [showEndYear, setShowEndYear] = useState(false)
	const [showStartYear, setShowStartYear] = useState(false)

	function handleEndYear(newEndYear) {
		setShowEndYear(false)

		const newPath = location.pathname.split('/')
		const oldYears = newPath[4].split('-')
		const newStartYear = newEndYear < oldYears[0] ? newEndYear : oldYears[0]
		newPath[4] = `${newStartYear}-${newEndYear}`

		history.push(newPath.join('/'))
	}

	function handleStartYear(newStartYear) {
		setShowStartYear(false)

		const newPath = location.pathname.split('/')
		const oldYears = newPath[4].split('-')
		const newEndYear = newStartYear > oldYears[1] ? newStartYear : oldYears[1]
		newPath[4] = `${newStartYear}-${newEndYear}`

		history.push(newPath.join('/'))
	}

	return (
		<>
			<div
				className='DropDown'
				onMouseEnter={() => setShowStartYear(true)}
				onMouseLeave={() => setShowStartYear(false)}
			>
				<div className='Button'>
					<div className='Label'>
						{location.pathname.split('/')[4].split('-')[0] === '1800'
							? 'Start Year'
							: location.pathname.split('/')[4].split('-')[0]}
					</div>
					<div className='Arrow'>&#8250;</div>
					<div className='Options' style={showStartYear ? {} : { display: 'none' }}>
						{startYears.map(year => (
							<div
								onClick={() => handleStartYear(year)}
								onKeyPress={() => handleStartYear(year)}
								key={`StartYear-${year}`}
								role='button'
								tabIndex='0'
							>
								{year}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='DropDown' onMouseEnter={() => setShowEndYear(true)} onMouseLeave={() => setShowEndYear(false)}>
				<div className='Button'>
					<div className='Label'>
						{location.pathname.split('/')[4].split('-')[1] === '2021'
							? 'End Year'
							: location.pathname.split('/')[4].split('-')[1]}
					</div>
					<div className='Arrow'>&#8250;</div>
					<div className='Options' style={showEndYear ? {} : { display: 'none' }}>
						{endYears.map(year => (
							<div
								onClick={() => handleEndYear(year)}
								onKeyPress={() => handleEndYear(year)}
								key={`EndYear-${year}`}
								role='button'
								tabIndex='0'
							>
								{year}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default YearDropDowns
