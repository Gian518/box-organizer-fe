export interface IBox {
    /** The database ID of the box */
    id: number,
    /** The code associated to the box */
    code: string,
    /** The name of the box */
    name: string,
    /** The date in which the box has been registered. Used to dinamically calculate the expiration date */
    register_date: string,
    /** The URL of a photo for the box. *optional* */
    photo?: {
        extname: string,
        mimeType: string,
        name: string,
        size: number
    },
    /** Database creation DateTime */
    created_at: string,
    /** Database last edit DateTime */
    updated_at: string
}

export interface IBoolResponse {
    /** Determine if the call ended with success or not */
    success: boolean
}

export interface IBoxMap {
    data: IBox[],
    hasMorePages: boolean
}