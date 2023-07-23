import {
    Controller,
    Get,
    Res,
    Req,
    HttpStatus,
    Post,
    Param,
    Put,
    Delete,
    Body,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { EventService } from './events.service'
import { CreateEventDto } from './event.dto'
import { ApiResponse } from './event.interface'

@Controller('events')
export class EventsController {
    constructor(private eventService: EventService) {}

    @Post()
    async create(@Body() body: CreateEventDto, @Res() res: Response) {
        const response: ApiResponse = await this.eventService.create(body)
        return res.status(response.statusCode).json(response)
    }

    @Get()
    async findAll(@Res() res: Response) {
        const response: ApiResponse = await this.eventService.findAll()
        return res.status(response.statusCode).json(response)
    }

    @Get(':id')
    async findOne(@Param() params: any, @Res() res: Response) {
        const response: ApiResponse = await this.eventService.findOne(params.id)
        return res.status(response.statusCode).json(response)
    }

    @Put(':id')
    async update(@Param() params: any, @Body() body, @Res() res: Response) {
        return res
            .status(HttpStatus.OK)
            .json(await this.eventService.update(params.id, body))
    }

    @Delete(':id')
    async delete(@Param() params: any, @Res() res: Response) {
        return res
            .status(HttpStatus.NO_CONTENT)
            .json(await this.eventService.delete(params.id))
    }
}
