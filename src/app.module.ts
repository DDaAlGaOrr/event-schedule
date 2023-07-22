import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { EventModule } from './events/events.module'
import sequelizeConfig from 'sequelize.config'

@Module({
    imports: [EventModule, SequelizeModule.forRoot(sequelizeConfig)],
})
export class AppModule {}
