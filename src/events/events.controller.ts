import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Post,
    Param,
    Put,
    Delete,
    Body,
} from '@nestjs/common'
import { Response } from 'express'

import { EventService } from './events.service'
import { CreateEventDto, SortEventsDto, UpdateEventDto } from './event.dto'
import { ResponseInterface, IdParamInterface } from './event.interface'

@Controller('events')
export class EventsController {
    constructor(private eventService: EventService) {}

    @Post()
    async create(@Body() body: CreateEventDto, @Res() res: Response) {
        const response: ResponseInterface = await this.eventService.create(body)
        return res.status(response.statusCode).json(response)
    }

    @Get()
    async findAll(@Res() res: Response, @Body() body: SortEventsDto) {
        const response: ResponseInterface = await this.eventService.findAll(
            body,
        )
        return res.status(response.statusCode).json(response)
    }

    @Get(':id')
    async findOne(@Param() params: IdParamInterface, @Res() res: Response) {
        const response: ResponseInterface = await this.eventService.findOne(
            params.id,
        )
        return res.status(response.statusCode).json(response)
    }

    @Put(':id')
    async update(
        @Param() params: IdParamInterface,
        @Body() body: UpdateEventDto,
        @Res() res: Response,
    ) {
        const response: ResponseInterface = await this.eventService.update(
            params.id,
            body,
        )
        return res.status(response.statusCode).json(response)
    }

    @Delete(':id')
    async delete(@Param() params: IdParamInterface, @Res() res: Response) {
        const response: ResponseInterface = await this.eventService.delete(
            params.id,
        )
        return res.status(response.statusCode).json(response)
    }
}
