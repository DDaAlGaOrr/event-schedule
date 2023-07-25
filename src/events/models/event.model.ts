import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { v4 as uuidv4 } from 'uuid'
@Table({ tableName: 'events' })
export class events extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    event_id: number

    @Column({
        type: DataType.UUID,
        allowNull: false,
        defaultValue: uuidv4,
        unique: true,
    })
    uuid: string

    @Column({ type: DataType.STRING, allowNull: false })
    title: string

    @Column({ type: DataType.STRING, allowNull: true })
    description: string

    @Column({ type: DataType.DATEONLY, allowNull: false })
    start_time: string

    @Column({ type: DataType.DATEONLY, allowNull: false })
    end_time: string

    @Column({ type: DataType.STRING, allowNull: true })
    location: string
}
