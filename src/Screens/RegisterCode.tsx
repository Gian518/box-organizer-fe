import React, { FormEvent, useEffect, useState } from "react"

// Third-party components
import { Alert, Button, Col, Container, Form, Row, Spinner, Toast, ToastContainer } from "react-bootstrap"

// Libraries
import { redirect, useNavigate, useSearchParams } from "react-router-dom"
import { t } from "i18next"
import { DateTime } from "luxon"
import API from '../API'

const RegisterCode: React.FC = () => {

	/**** STATE VARIABLES ****/
	const [pageStatus, setPageStatus] = useState<'loading' | 'valid' | 'registered' | 'error'>('loading')
	const [name, setName] = useState('')
	const [code, setCode] = useState('')
	const [registerDate, setRegisterDate] = useState(DateTime.local().toISODate()!)
	const [photo, setPhoto] = useState('')
	const [photoFile, setPhotoFile] = useState<File | null>(null)
	const [formValidated, setFormValidated] = useState(false)
	const [errorVisible, setErrorVisible] = useState(false)

	/**** HOOKS ****/
	const [params] = useSearchParams()
	const navigate = useNavigate()

	/**** BOOT ****/
	useEffect(() => {
		const urlCode = params.get('code')
		if (!urlCode || urlCode == '') {
			redirect('/')
		} else {
			setCode(urlCode)
			setPageStatus('valid')
		}
	}, [])

	const registerBox = async (event: React.FormEvent) => {
		event.preventDefault()
		const form = event.target as HTMLFormElement
		try {
			if (form.checkValidity() === true) {
				const res = await API.BoxesController.saveBox({
					code,
					name,
					registerDate: DateTime.fromISO(registerDate),
					photo: photoFile
				})
				if (res?.success) {
					navigate('/', {
						state: {
							success: true
						}
					})
				} else {
					setErrorVisible(true)
				}
			} else {
				event.stopPropagation()
			}
		} catch (error) {
			setPageStatus('error')
			console.error('Error in RegisterCode.registerBox:', error)
		}

		setFormValidated(true)
	}

	if (pageStatus == 'valid') {
		return (
			<Container className="mt-2">
				{/* Header */}
				<h1>{t('newBox')}</h1>
				<p>{t('newBoxDesc')}</p>

				{/* Form */}
				<Form noValidate validated={formValidated} onSubmit={registerBox}>
					{/* Code */}
					<Form.Group controlId="code">
						<Form.Label>{t('code')}</Form.Label>
						<Form.Control placeholder={code} disabled readOnly />
						<Form.Text className="text-muted">{t('codeHint')}</Form.Text>
					</Form.Group>

					{/* Name */}
					<Form.Group controlId="name" className="mt-3">
						<Form.Label>{t('name')}</Form.Label>
						<Form.Control placeholder={t('namePlaceholder')} value={name} onChange={e => setName(e.target.value)} required />
						<Form.Text className="text-muted">{t('nameHint')}</Form.Text>
						<Form.Control.Feedback type="invalid">{t('nameInvalid')}</Form.Control.Feedback>
					</Form.Group>

					{/* Current date */}
					<Form.Group controlId="registerDate" className="mt-3">
						<Form.Label>{t('registrationDate')}</Form.Label>
						<Form.Control type="date" placeholder={t('datePlaceholder')} value={registerDate} onChange={e => setRegisterDate(e.target.value)} required />
						<Form.Text className="text-muted">{t('dateHint')} <b>{DateTime.fromISO(registerDate).plus({ days: 183 }).toLocaleString()}</b>.</Form.Text>
						<Form.Control.Feedback type="invalid">{t('dateInvalid')}</Form.Control.Feedback>
					</Form.Group>

					{/* Photo */}
					<Form.Group controlId="photo" className="mt-3">
						<Form.Label>{t('photo')}</Form.Label>
						<Form.Control
							type="file"
							accept="image/*"
							value={photo}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setPhotoFile(e.target.files![0])
								setPhoto(e.target.value)
							}}
						/>
						<Form.Text className="text-muted">{t('photoHint')}</Form.Text>
						<Form.Control.Feedback type="invalid">{t('nameInvalid')}</Form.Control.Feedback>
					</Form.Group>

					{/* Submit */}
					<Button type="submit" className="mt-4 py-2 w-100">{t('registerBox')}</Button>
				</Form>

				{/* Error alert */}
				<Alert variant='danger' dismissible show={errorVisible} onClose={() => setErrorVisible(false)} className="error-alert">
					{t('uploadError')}
				</Alert>
			</Container>
		)
	} else if (pageStatus == 'registered') {
		return (
			<Container className="mt-5">
				<Alert variant='success'>{t('uploadCompleted')}</Alert>
				<Button onClick={() => navigate('/')} className="mt-4 py-2 w-100">{t('goHome')}</Button>
			</Container>
		)
	} else if (pageStatus == 'error') {
		return (
			<Container className="mt-5">
				<Alert variant='danger'>{t('uploadError')}</Alert>
				<Button onClick={() => navigate('/')} className="mt-4 py-2 w-100">{t('goHome')}</Button>
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

export default RegisterCode