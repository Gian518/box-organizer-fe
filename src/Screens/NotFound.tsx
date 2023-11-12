import { t } from 'i18next'
import React from 'react'
import { Button, Container } from 'react-bootstrap'

const NotFound: React.FC = () => {
	return (
		<Container className='d-flex flex-column align-items-center mt-3'>
			<h1>{t('nothingHere')}</h1>
			<p>{t('pageNotFound')}</p>
			<Button className="mt-1 py-2 w-100">{t('goHome')}</Button>
		</Container>
	)
}

export default NotFound