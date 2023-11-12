import React, { useState } from "react"

// Library
import { useTranslation } from "react-i18next"
import { Result } from '@zxing/library'
import useScan from '../Config/Scan'
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

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
			navigate('/register-code?code=' + data.getText())
		},
		// onError: error => setCode(code + "\n\nNo code found")

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