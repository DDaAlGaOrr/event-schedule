import { events } from './models/event.model'

export interface ResponseInterface {
    statusCode: number
    message: string
    status: boolean
    events?: events[]
    event?: events
}

export interface EventInterface {
    event_id?: number
    uuid?: number
    title: string
    description: string
    start_time: string
    end_time: string
    location: string
}

export interface IdParamInterface {
    id: number
}
