import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'events' })
export class events extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    event_id: number

    @Column({ type: DataType.STRING, allowNull: false })
    title: string

    @Column({ type: DataType.STRING, allowNull: true })
    description: string

    @Column({ type: DataType.DATEONLY, allowNull: false })
    start_time: string

    @Column({ type: DataType.DATE, allowNull: false })
    end_time: string

    @Column({ type: DataType.STRING, allowNull: true })
    location: string
}
