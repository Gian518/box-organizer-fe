import { BrowserMultiFormatReader, DecodeHintType, Result } from '@zxing/library'
import { useEffect, useMemo, useRef } from 'react'
import useScreenOrientation from './Orientation'

interface ZxingOptions {
	hints?: Map<DecodeHintType, any>
	constraints?: MediaStreamConstraints
	timeBetweenDecodingAttempts?: number
	onResult?: (result: Result) => void
	onError?: (error: Error) => void
}

const useScan = ({
	constraints = {
		audio: false,
		video: {
			facingMode: 'environment',
			aspectRatio: 9 / 16
		},
	},
	hints,
	timeBetweenDecodingAttempts = 300,
	onResult = () => { },
	onError = () => { },
}: ZxingOptions = {}) => {
	const ref = useRef<HTMLVideoElement>(null)
	const orientation = useScreenOrientation()

	const reader = useMemo<BrowserMultiFormatReader>(() => {
		const instance = new BrowserMultiFormatReader(hints)
		instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts
		return instance
	}, [hints, timeBetweenDecodingAttempts])

	useEffect(() => {
		if (!ref.current) {
			return
		}

		if (orientation == 'landscape-primary' && constraints.video) {
			(constraints.video as MediaTrackConstraints).aspectRatio = 16 / 9
		}

		reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
			if (result) {
				onResult(result)
				reader.stopContinuousDecode()
			}
			if (error) {
				onError(error)
			}
		}).catch(error => {
			console.log("Error:", error)
			onError(error)
		})

		return () => {
			reader.reset()
		}

	}, [ref, reader])

	return ref
}

export default useScan