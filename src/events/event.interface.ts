import { events } from './models/event.model'

export interface ApiResponse {
    statusCode: number
    message: string
    events?: events[]
    event?: events
}

export interface CreateEvent {
    event_id?: number
    title: string
    description: string
    start_time: string
    end_time: string
    location: string
}
