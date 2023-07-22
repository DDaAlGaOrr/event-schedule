import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { events } from './models/event.model'
@Injectable()
export class EventService {
    constructor(
        @InjectModel(events) // Inyectamos el modelo de Sequelize
        private eventModel: typeof events,
    ) {}
    async create(event: any): Promise<events> {
        return await this.eventModel.create(event)
    }
    async findAll() {
        return await this.eventModel.findAll()
    }
    async findOne(id: any) {
        return await this.eventModel.findByPk(id)
    }
    update(id: any) {
        return `this service update a event with id ${id}`
    }
    async delete(id: any) {
        const user = await this.eventModel.findByPk(id)
        return await user.destroy()
    }
}
