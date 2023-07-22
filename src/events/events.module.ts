import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { EventsController } from './events.controller'
import { EventService } from './events.service'
import { events } from './models/event.model'

@Module({
    imports: [SequelizeModule.forFeature([events])],
    controllers: [EventsController],
    providers: [EventService],
})
export class EventModule {}
