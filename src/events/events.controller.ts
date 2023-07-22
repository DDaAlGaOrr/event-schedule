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

@Controller('events')
export class EventsController {
    constructor(private eventService: EventService) {}
    @Post()
    async create(@Body() body, @Res() res: Response) {
        return res
            .status(HttpStatus.CREATED)
            .json(await this.eventService.create(body))
    }
    @Get()
    async findAll(@Res() res: Response) {
        return res.status(HttpStatus.OK).json(await this.eventService.findAll())
    }
    @Get(':id')
    async findOne(@Param() params: any, @Res() res: Response) {
        return res
            .status(HttpStatus.OK)
            .json(await this.eventService.findOne(params.id))
    }
    @Put(':id')
    update(@Param() params: any, @Res() res: Response) {
        return res
            .status(HttpStatus.OK)
            .json(this.eventService.update(params.id))
    }
    @Delete(':id')
    async delete(@Param() params: any, @Res() res: Response) {
        return res
            .status(HttpStatus.OK)
            .json(await this.eventService.delete(params.id))
    }
}
