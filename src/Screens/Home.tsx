import React, { useEffect, useState } from "react"

// Library
import { useTranslation } from "react-i18next"
import { Result } from '@zxing/library'
import useScan from '../Config/Scan'
import { Alert, Button, Col, Container, Row } from "react-bootstrap"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import API from "API"

const Home: React.FC = () => {

	/**** STATE VARIABLES ****/
	const [scanning, setScanning] = useState(false)
	const [alertVisible, setAlertVisible] = useState(false)

	/**** HOOKS ****/
	const { t } = useTranslation()
	const location = useLocation()
	const navigate = useNavigate()
	const [params] = useSearchParams()
	const ref = useScan({
		onResult: async (data: Result) => {
			const barCode = data.getText()
			// Check if code exists
			const box = await checkBox(barCode)
			if (box?.code) {
				navigate('box', {
					state: {
						code: barCode,
						name: box.name,
						registerDate: box.register_date,
						photo: box.photo
					}
				})
			} else {
				navigate('/register-code?code=' + barCode)
			}
		},

	})

	/**** BOOT ****/
	useEffect(() => {
		if (location.state && location.state.success === true) {
			setAlertVisible(true)

			setTimeout(() => {
				setAlertVisible(false)
			}, 6000)
		}
	}, [])

	const checkBox = async (code: string) => {
		try {
			const res = await API.BoxesController.getBox({ code })
			return res
		} catch (error) {
			console.error('Error in Home.checkBox:', error)
		}
	}

	return (
		<Container>
			<div className="d-flex align-items-center my-2">
				<img src={require('Assets/logo.png')} alt="Box Organizer logo" className="img-fluid logo" />
				<h1>{t('boxOrganizer')}</h1>
			</div>
			{
				!scanning
					?
					<video ref={ref} style={{ width: '100%' }}></video>
					:
					<Button variant="primary" onClick={() => setScanning(true)}>{t('scanBox')}</Button>
			}

			<h1 className="mt-3">{t('howWorks')}</h1>
			<p>{t('howWorksDesc1') + ' ' + t('howWorksDesc2')}</p>
			<div className="mx-3"><img src={require('Assets/home1.jpeg')} alt="Registration of the box" className="img-fluid border" /></div>
			<p className="mt-2">{t('howWorksDesc3')}</p>
			<div className="mx-3"><img src={require('Assets/home2.jpeg')} alt="View of an existing box" className="img-fluid border" /></div>
			<p className="my-2">{t('howWorksDesc4')}</p>

			{/* Success after redirect from registration */}
			<Alert variant='success' dismissible show={alertVisible} onClose={() => setAlertVisible(false)} className="error-alert">{t('uploadCompleted')}</Alert>
		</Container>
	)
}

export default Home