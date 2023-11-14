import React, { useState } from "react"

// Library
import { useTranslation } from "react-i18next"
import { Result } from '@zxing/library'
import useScan from '../Config/Scan'
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { DateTime } from "luxon"

const Home: React.FC = () => {

	/**** STATE VARIABLES ****/
	const [code, setCode] = useState('Initializing...')
	const [scanning, setScanning] = useState(false)

	/**** HOOKS ****/
	const { t } = useTranslation()
	const navigate = useNavigate()
	const ref = useScan({
		onResult: (data: Result) => {
			console.log("Data:", data)
			setCode(data.getText())
			// Check if code exists
			const boxExists = true
			if (boxExists) {
				navigate('box', {
					state: {
						code: data.getText(),
						name: 'Vacuum Box',
						registerDate: DateTime.fromISO('2023-05-01T00:00:00.000').toISODate(),
						photo: 'https://placekitten.com/300/200'
					}
				})
			} else {
				navigate('/register-code?code=' + data.getText())
			}
		},

	})

	return (
		<Container>
			<Row className="heading">
				<Col className="d-flex justify-content-center">
					<h1>{t('welcome')}</h1>
				</Col>
			</Row>
			{
				!scanning
					?
					<video ref={ref} style={{ width: '100%' }}></video>
					:
					<Button variant="primary" onClick={() => setScanning(true)}>{t('scanBox')}</Button>
			}
			<h1>{code}</h1>
		</Container>
	)
}

export default Home