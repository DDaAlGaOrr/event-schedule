import { SequelizeModuleOptions } from '@nestjs/sequelize'
import { events } from 'src/events/models/event.model'

const sequelizeConfig: SequelizeModuleOptions = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'eventScheduler',
    models: [events],
    autoLoadModels: true,
}

export default sequelizeConfig
