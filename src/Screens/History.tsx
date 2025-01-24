import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

// Libraries
import { useTranslation } from 'react-i18next'
import API from 'API'
import { IBox } from 'Config/interfaces'
import BoxCard from 'Components/BoxCard'
import InfiniteScroll from 'react-infinite-scroll-component'

const History: React.FC = () => {
	/**** STATES ****/
	const [page, setPage] = useState(1)
	const [boxes, setBoxes] = useState<IBox[]>([])
	const [hasMorePages, setHasMorePages] = useState(false)

	/**** HOOKS ****/
	const { t } = useTranslation()

	useEffect(() => {
		fetchBoxes()
	}, [page])

	const fetchBoxes = async () => {
		try {
			const res = await API.BoxesController.getBoxes({
				page,
				perPage: 10
			})
			if (res) {
				setBoxes([...boxes, ...res.data])
				if (res.hasMorePages) {
					setHasMorePages(res.hasMorePages)
				}
			}
		} catch (error) {
			console.error("Error in History.fetchBoxes:", error)
		}
	}


	return (
		<Container className='mt-2'>
			{/* Header */}
			<h1>{t('history')}</h1>
			<p>{t('historyDesc')}</p>

			<InfiniteScroll
				dataLength={boxes.length}
				next={() => setPage(page + 1)}
				hasMore={hasMorePages}
				loader={null}
				className='box-card-container'
			>
				{
					boxes.map(map => {
						return (
							<BoxCard
								key={map.id}
								code={map.code}
								name={map.name}
								registerDate={map.register_date}
								photo={map.photo}
							/>
						)
					})
				}
			</InfiniteScroll>
		</Container>
	)
}

export default History