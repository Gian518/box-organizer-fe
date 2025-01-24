import env from "../Config/env"
import { IBoolResponse, IBox, IBoxMap } from "../Config/interfaces"
import { DateTime } from "luxon"

interface IGetBox {
	/** The code corresponding to the barcode */
	code: string
}
/**
 * Retrive a box previously saved
 * @param params API parameters
 * @returns API response with box info
 */
const getBox = async ({ code }: IGetBox): Promise<IBox | null | undefined> => {
	try {
		const url = env.api + '/getBox?code=' + code
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		})

		return res.json()
	} catch (error) {
		console.error('Error in BoxesController.getBox:', error)
	}
}

interface ISaveBox {
	/** The code corresponding to the barcode */
	code: string,
	/** A name to assign to the box */
	name: string,
	/** The date to assign to the box */
	registerDate: DateTime,
	/** An optional photo to pair to the box */
	photo?: File | null
}
/**
 * Save a new box
 * @param params API parameters
 * @returns API response after save
 */
const saveBox = async ({ code, name, registerDate, photo = null }: ISaveBox): Promise<IBoolResponse> => {
	try {
		const url = env.api + '/saveBox'
		// eslint-disable-next-line prefer-const
		let body = new FormData()
		body.append('code', code)
		body.append('name', name)
		body.append('registerDate', registerDate.toISODate()!)
		if (photo) {
			body.append('photo', photo)
		}
		const res = await fetch(url, {
			method: 'POST',
			body
		})

		return res.json()
	} catch (error) {
		console.error('Error in BoxesController.saveBox:', error)
		return { success: false }
	}
}

interface IDeleteBox {
	/** The code corresponding to the barcode */
	code: string
}

/**
 * Delete an existing box
 * @param params API Parameters
 * @returns API response after delete
 */
const deleteBox = async ({ code }: IDeleteBox): Promise<IBoolResponse> => {
	try {
		const url = env.api + '/deleteBox?code=' + code
		const res = await fetch(url, {
			method: 'DELETE',
			headers: {
				accept: 'application/json'
			}
		})

		return res.json()
	} catch (error) {
		console.error('Error in BoxesController.deleteBox:', error)
		return { success: false }
	}
}

interface IGetBoxes {
	/** The number of page for pagination */
	page: number,
	/** The number of items to retrive in a single page */
	perPage: number
}

/**
 * Retrive a list of boxes. Uses pagination.
 * @param params API parameters
 * @returns API response with a map of boxes
 */
const getBoxes = async ({ page, perPage }: IGetBoxes): Promise<IBoxMap | null> => {
	try {
		const url = env.api + '/getBoxes?page=' + page + '&perPage=' + perPage
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		})

		return res.json()
	} catch (error) {
		console.error('Error in BoxesController.getBoxes', error)
		return null
	}
}

export default {
	getBox,
	saveBox,
	deleteBox,
	getBoxes
}