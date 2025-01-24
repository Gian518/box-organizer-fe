import React, { useEffect, useState } from "react"

// Third-party components
import { Box2, Check2Circle, XCircle } from 'react-bootstrap-icons'

// Libraries
import env from "Config/env"
import { IBox } from "Config/interfaces"
import { DateTime } from "luxon"
import { useTranslation } from "react-i18next"
import { Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

interface IBoxCard {
	code: string
	name: string
	registerDate: string,
	photo?: IBox['photo']
}

const BoxCard: React.FC<IBoxCard> = ({ code, name, registerDate, photo }) => {
	/**** STATES ****/
	const [date, setDate] = useState<DateTime | null>(null)
	const [expired, setExpired] = useState(false)

	/**** HOOKS ****/
	const { t } = useTranslation()
	const navigate = useNavigate()

	/**** BOOT ****/
	useEffect(() => {
		const regDate = DateTime.fromISO(registerDate)
		setDate(regDate)

		setExpired(regDate!.diffNow('days').days <= -183)
	}, [])


	return (
		<Link className="box-card" to={'/box'} state={{
			code,
			name,
			registerDate,
			photo,
			redirectTo: '/history'
		}}>
			{/* Photo */}
			{
				photo
					?
					<img src={env.api + '/uploads/' + photo.name} alt="Box" className='box-image img-fluid w-25' />
					:
					<div className="box-image d-flex justify-content-center align-items-center w-25 py-5">
						<Box2 className="box-image-placeholder" />
					</div>
			}

			<div className="d-flex justify-content-between w-75">
				{/* Info box */}
				<div className="d-flex flex-column mx-2">
					{/* Title */}
					<h2>{name}</h2>
					{/* Expiration date */}
					<div><span>{t('expirationDate')}</span>: {date?.plus({ days: 183 }).toLocaleString()}</div>
				</div>
				{/* Icon */}
				<div className="d-flex justify-content-center align-items-center flex-column me-2">
					{expired ?
						<>
							<Check2Circle className='remove-icon-yes small' />
							<span className="box-card-exp-yes">{t('canThrow')}</span>
						</>
						:
						<>
							<XCircle className='remove-icon-no small' />
							<span className="box-card-exp-no">{t('cannotThrow')}</span>
						</>}
				</div>
			</div>

		</Link>
	)
}

export default BoxCard