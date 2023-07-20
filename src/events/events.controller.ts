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
} from '@nestjs/common';
import { Request, Response } from 'express';

import { EventService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventService: EventService) {}
  @Post()
  create(@Body() body: any, @Res() res: Response) {
    return res.status(HttpStatus.CREATED).json(this.eventService.create(body));
  }
  @Get()
  findAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.eventService.findAll());
  }
  @Get(':id')
  findOne(@Param() params: any, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.eventService.findOne(params.id));
  }
  @Put(':id')
  update(@Param() params: any, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.eventService.update(params.id));
  }
  @Delete(':id')
  delete(@Param() params: any, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.eventService.delete(params.id));
  }
}
