import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { events } from './models/event.model'
import { ResponseInterface, EventInterface } from './event.interface'
import { CreateEventDto, SortEventsDto } from './event.dto'
@Injectable()
export class EventService {
    constructor(
        @InjectModel(events)
        private eventModel: typeof events,
    ) {}

    async create(event: CreateEventDto): Promise<ResponseInterface> {
        const start_time = new Date(event.start_time)
        const end_time = new Date(event.end_time)

        if (start_time > end_time) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'the start date cannot be later than the end date',
                status: false,
            }
        }
        if (end_time < start_time) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message:
                    'the end date date cannot be earlier than the start date',
                status: false,
            }
        }
        const eventData = {
            title: event.title,
            description: event.description,
            start_time: start_time,
            end_time: end_time,
            location: event.location,
        }
        const createEvent = await this.eventModel.create(eventData)

        if (!createEvent) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'something went wrong, could not save the event',
                status: false,
            }
        }
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Event created',
            status: true,
        }
    }

    async findAll(body: SortEventsDto): Promise<ResponseInterface> {
        const order = body.sort ? body.sort.toUpperCase() : 'ASC'
        const pageNumber = body.pageNumber || 1
        const itemsPerPage = body.itemsPerPage || 5
        const offset = (pageNumber - 1) * itemsPerPage
        const events = await this.eventModel.findAll({
            order: [['start_time', order]],
            offset,
            limit: itemsPerPage,
        })

        if (!events) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Events not found',
                status: false,
            }
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Events found',
            events: events,
            status: true,
        }
    }

    async findOne(id: number): Promise<ResponseInterface> {
        const event = await this.eventModel.findByPk(id)
        if (!event) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Event not found',
                status: false,
            }
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Event found',
            event: event,
            status: true,
        }
    }

    async update(id: number, body: EventInterface): Promise<ResponseInterface> {
        const event = await this.eventModel.findByPk(id)
        if (!event) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Event not found',
                status: false,
            }
        }
        await event.update(body)
        return {
            statusCode: HttpStatus.OK,
            message: `updated event`,
            status: true,
        }
    }

    async delete(id: number): Promise<ResponseInterface> {
        const user = await this.eventModel.findByPk(id)
        if (!user) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Event not found',
                status: false,
            }
        }
        await user.destroy()
        return {
            statusCode: HttpStatus.OK,
            message: `deleted event`,
            status: true,
        }
    }
}
