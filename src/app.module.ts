import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'

import { EventModule } from './events/events.module'
import { events } from './events/models/event.model'

@Module({
    imports: [
        ConfigModule.forRoot(),
        EventModule,
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DATABASE_HOST,
            port: 3306,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            models: [events],
            autoLoadModels: true,
        }),
    ],
})
export class AppModule {}
