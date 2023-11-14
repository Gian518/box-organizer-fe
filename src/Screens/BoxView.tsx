import React, { useEffect, useState } from 'react'

// Third-party components
import { Alert, Button, Container, Modal, Spinner } from 'react-bootstrap'
import { Box2, Check2Circle, Trash, XCircle } from 'react-bootstrap-icons'

// Libraries
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { DateTime } from 'luxon'
import { t } from 'i18next'

const BoxView: React.FC = () => {

	/**** STATE VARIABLES ****/
	const [code, setCode] = useState('')
	const [name, setName] = useState('')
	const [registerDate, setRegisterDate] = useState<DateTime | null>(null)
	const [photo, setPhoto] = useState('')
	const [expired, setExpired] = useState(false)
	const [pageStatus, setPageStatus] = useState<'loading' | 'valid' | 'error'>('loading')
	const [deleteModalVisible, setDeleteModalVisible] = useState(false)

	/**** HOOKS ****/
	const location = useLocation()
	const navigate = useNavigate()

	/**** BOOT ****/
	useEffect(() => {
		if (!location.state.code || !location.state.name || !location.state.registerDate) {
			navigate('/')
		}
		const regDate = DateTime.fromISO(location.state.registerDate)
		setCode(location.state.code)
		setName(location.state.name)
		setRegisterDate(regDate)
		if (location.state.photo) {
			setPhoto(location.state.photo)
		}

		setExpired(regDate!.diffNow('days').days <= -183)
		console.log("Expired?", regDate!.diffNow('days').days)
		console.log("Six months ago:", DateTime.local().minus({ days: 183 }))
		setPageStatus('valid')
	}, [])

	const deleteBox = async () => {
		setDeleteModalVisible(false)
		try {
			navigate('/')
		} catch (error) {
			console.error('Error in BoxView.deleteBox:', error)
		}
	}

	if (pageStatus == 'valid') {
		return (
			<Container className="mt-2">
				{/* Name */}
				<h1 className='fw-bold'>{name}</h1>

				{/* Code */}
				<p><span className="fw-bold">{t('code')}</span>: {code}</p>

				{/* Expiration challenge */}
				<div className="d-flex align-items-center mt-4">
					{/* Icon */}
					{expired ? <Check2Circle className='remove-icon-yes' /> : <XCircle className='remove-icon-no' />}
					<div className='ms-3'>
						{/* Can throw / Cannot throw */}
						<h3>{t(expired ? 'canThrowBox' : 'cannotThrowBox')}</h3>
						{/* Registration date */}
						<div><span className="fst-italic">{t('registrationDate')}</span>: {registerDate?.toLocaleString()}</div>
						{/* Expiration date */}
						<div><span className="fst-italic">{t('expirationDate')}</span>: {registerDate?.plus({ days: 183 }).toLocaleString()}</div>
						{/* Remaining days / Passed days */}
						<div>
							<span className="fw-bold">{t(expired ? 'passedDays' : 'remainingDays')}</span>{': '}
							{
								expired
									?
									DateTime.local().diff(registerDate!.plus({ days: 183 }), 'days').days.toFixed(0)
									:
									registerDate?.plus({ days: 183 }).diffNow('days').days.toFixed(0)
							}
						</div>
					</div>
				</div>

				{/* Photo */}
				{
					photo != ''
					&&
					<img src={photo} alt="Box" className='box-image img-fluid w-100 mt-3' />
				}

				{/* Delete button */}
				<div className="d-flex justify-content-center mt-5">
					<Button variant='danger' size='lg' className='d-flex align-items-center' onClick={() => setDeleteModalVisible(true)}>
						<Trash className='me-1' /> {t('deleteBox')}
					</Button>
				</div>


				{/* Delete modal */}
				<Modal show={deleteModalVisible} onHide={() => setDeleteModalVisible(false)} centered>
					<Modal.Header closeButton>
						<Modal.Title>{t('deleteBox')}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{t('deleteBoxDisclaimer')}</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={() => setDeleteModalVisible(false)}>
							{t('cancel')}
						</Button>
						<Button variant='danger' className='d-flex align-items-center' onClick={() => deleteBox()}>
							<Trash className='me-1' /> {t('confirm')}
						</Button>
					</Modal.Footer>
				</Modal>
			</Container>
		)
	} else if (pageStatus == 'error') {
		return (
			<Container className="mt-5">
				<Alert variant='danger'>{t('uploadError')}</Alert>
				<Button className="mt-4 py-2 w-100">{t('goHome')}</Button>
			</Container>
		)
	} else if (pageStatus == 'loading') {
		return (
			<Container className="d-flex justify-content-center align-items-center vh-100 mt-2">
				<Spinner animation='border' role='status'>
					<span className="visually-hidden">{t('caricamento')}</span>
				</Spinner>
			</Container>
		)
	} else {
		return null
	}
}

export default BoxView