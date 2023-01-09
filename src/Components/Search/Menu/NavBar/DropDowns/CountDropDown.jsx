import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const CountDropDown = () => {
	const history = useHistory()
	const location = useLocation()

	const [showCount, setShowCount] = useState(false)

	function handleCount(newCount) {
		setShowCount(false)
		const newPath = location.pathname.split('/')
		newPath[5] = newCount
		history.push(newPath.join('/'))
	}

	return (
		<div className='DropDown' onMouseEnter={() => setShowCount(true)} onMouseLeave={() => setShowCount(false)}>
			<div className='Button'>
				<div className='Label'>{location.pathname.split('/')[5]}</div>
				<div className='Arrow'>&#8250;</div>
				<div className='Options' style={showCount ? {} : { display: 'none' }}>
					<div onClick={() => handleCount(10)} onKeyPress={() => handleCount(10)} role='button' tabIndex='0'>
						10
					</div>
					<div onClick={() => handleCount(100)} onKeyPress={() => handleCount(100)} role='button' tabIndex='0'>
						100
					</div>
					<div onClick={() => handleCount(250)} onKeyPress={() => handleCount(250)} role='button' tabIndex='0'>
						250
					</div>
					<div onClick={() => handleCount(500)} onKeyPress={() => handleCount(500)} role='button' tabIndex='0'>
						500
					</div>
					<div onClick={() => handleCount(1000)} onKeyPress={() => handleCount(1000)} role='button' tabIndex='0'>
						1000
					</div>
				</div>
			</div>
		</div>
	)
}

export default CountDropDown
