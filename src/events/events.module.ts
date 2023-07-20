import { Module } from '@nestjs/common';

import { EventsController } from './events.controller';
import { EventService } from './events.service';

@Module({
  controllers: [EventsController],
  providers: [EventService],
})
export class EventModule {}
