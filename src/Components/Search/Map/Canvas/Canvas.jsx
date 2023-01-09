import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import './Canvas.css'

let canvas
let context
let labels
let links
let nodes
let currentTransform

const Canvas = ({ map }) => {
	const canvasRef = useRef()

	useEffect(() => {
		// [1.0] Canvas
		canvas = canvasRef.current

		// [1.1] Set Display Size
		canvas.style.height = `${window.innerHeight}px`
		canvas.style.width = `${window.innerWidth - 400}px`

		// [1.2] Adjust for High Device Pixel Ratio
		canvas.height = Math.floor(window.innerHeight * window.devicePixelRatio || 1)
		canvas.width = Math.floor((window.innerWidth - 400) * window.devicePixelRatio || 1)

		// [2.0] Context
		context = canvas.getContext('2d')
		context.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)

		// [2.1] Zoom + Pan
		d3.select(context.canvas).call(
			d3
				.zoom()
				.scaleExtent([0.5, 5])
				.on('zoom', ({ transform }) => zoomed(transform))
		)

		currentTransform = d3.zoomIdentity
	}, [])

	useEffect(() => {
		labels = map.fieldLabels
		links = map.links
		nodes = map.nodes
		zoomed(currentTransform)
	}, [map])

	function zoomed(transform) {
		currentTransform = transform

		context.save()
		context.clearRect(0, 0, canvas.width, canvas.height)

		// Labels
		context.font = '12px Inter'
		context.textAlign = 'center'
		labels.forEach(({ Count, Field, FieldColor, X, Y }) => {
			context.fillStyle = FieldColor

			const [x, y] = transform.apply([X, Y])
			context.fillText(`${Field.split('-')[0]} (${Count})`, x, y)
		})

		// Links
		context.globalAlpha = 0.3
		links.forEach(([, , color, X1, Y1, X2, Y2]) => {
			const [x1, y1] = transform.apply([X1, Y1])
			const [x2, y2] = transform.apply([X2, Y2])

			context.beginPath()
			context.moveTo(x1, y1)
			context.lineTo(x2, y2)
			context.strokeStyle = color
			context.stroke()
		})

		// Nodes
		context.globalAlpha = 1
		context.strokeStyle = 'white'
		nodes.forEach(({ F, R, X, Y }) => {
			context.beginPath()
			const [x, y] = transform.apply([X, Y])
			context.moveTo(x + R, y)
			context.arc(x, y, R, 0, 2 * Math.PI)
			context.fillStyle = F
			context.fill()
			context.stroke()
		})

		context.restore()
	}

	return <canvas ref={canvasRef} />
}

export default Canvas
