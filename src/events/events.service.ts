import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { events } from './models/event.model'
import { ApiResponse, CreateEvent } from './event.interface'
@Injectable()
export class EventService {
    constructor(
        @InjectModel(events) // Inyectamos el modelo de Sequelize
        private eventModel: typeof events,
    ) {}

    async create(event: CreateEvent): Promise<ApiResponse> {
        const eventDataToCreate: Omit<CreateEvent, 'event_id'> = {
            ...event,
        }
        const start_time = new Date(event.start_time).toLocaleDateString(
            'es-MX',
            { timeZone: 'America/Mazatlan' },
        )
        const end_time = new Date(event.end_time).toLocaleDateString('es-MX', {
            timeZone: 'America/Mazatlan',
        })
        const today = new Date().toLocaleDateString('es-MX', {
            timeZone: 'America/Mazatlan',
        })

        if (start_time < today) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'the start or end date cannot be a date before today',
            }
        }
        if (end_time < today) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'the start or end date cannot be a date before today',
            }
        }
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

        if (createEvent) {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'event created',
            }
        } else {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'something went wrong, could not save the event',
            }
        }
    }

    async findAll(): Promise<ApiResponse> {
        const events = await this.eventModel.findAll()
        if (events) {
            return {
                statusCode: HttpStatus.OK,
                message: 'success',
                events: events,
            }
        } else {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'No found events',
            }
        }
    }

    async findOne(id: number): Promise<ApiResponse> {
        const event = await this.eventModel.findByPk(id)
        if (!event) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'No found event',
            }
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'success',
            event: event,
        }
    }

    async update(id: any, body): Promise<ApiResponse> {
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
            message: `this service updated a event with id ${id}`,
        }
    }

    async delete(id: any) {
        const user = await this.eventModel.findByPk(id)
        return await user.destroy()
    }
}
