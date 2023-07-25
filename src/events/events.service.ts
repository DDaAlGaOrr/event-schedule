import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { events } from './models/event.model'
import { ResponseInterface, EventInterface } from './event.interface'
import { stringify } from 'querystring'
import { CreateEventDto } from './event.dto'
@Injectable()
export class EventService {
    constructor(
        @InjectModel(events) // Inyectamos el modelo de Sequelize
        private eventModel: typeof events,
    ) {}

    async create(event: CreateEventDto): Promise<ResponseInterface> {
        const eventDataToCreate: Omit<CreateEventDto, 'event_id'> = {
            ...event,
        }
        const start_time = new Date(event.start_time)
        const end_time = new Date(event.end_time)

        if (start_time > end_time) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'the start date cannot be later than the end date',
            }
        }
        if (end_time < start_time) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message:
                    'the end date date cannot be earlier than the start date',
            }
        }

        const createEvent = await this.eventModel.create(eventDataToCreate)

        if (!createEvent) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'something went wrong, could not save the event',
            }
        }
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Event created',
        }
    }

    async findAll(): Promise<ResponseInterface> {
        const events = await this.eventModel.findAll()
        if (!events) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Events not found',
            }
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'success',
            events: events,
        }
    }

    async findOne(id: number): Promise<ResponseInterface> {
        const event = await this.eventModel.findByPk(id)
        if (!event) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Event not found',
            }
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'success',
            event: event,
        }
    }

    async update(id: number, body: EventInterface): Promise<ResponseInterface> {
        const event = await this.eventModel.findByPk(id)
        if (!event) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Event not found',
            }
        }
        await event.update(body)
        return {
            statusCode: HttpStatus.OK,
            message: `updated event`,
        }
    }

    async delete(id: number) {
        const user = await this.eventModel.findByPk(id)
        return await user.destroy()
    }
}
