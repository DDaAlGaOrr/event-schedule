import {
    IsNotEmpty,
    IsString,
    IsDate,
    IsOptional,
    IsNumber,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsString()
    description: string

    @Type(() => Date)
    @IsNotEmpty({ message: 'start time should not be empty' })
    @IsDate({ message: 'wrong data type for start date' })
    start_time: string

    @Type(() => Date)
    @IsNotEmpty({ message: 'end time should not be empty' })
    @IsDate({ message: 'wrong data type for end date' })
    end_time: string

    @IsString()
    location: string
}
export class UpdateEventDto {
    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'wrong data type for start date' })
    start_time: string

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'wrong data type for end date' })
    end_time: string

    @IsOptional()
    @IsString()
    location: string
}
export class SortEventsDto {
    @IsOptional()
    @IsString()
    sort: string

    @IsOptional()
    @IsNumber()
    pageNumber: number

    @IsOptional()
    @IsNumber()
    itemsPerPage: number
}
