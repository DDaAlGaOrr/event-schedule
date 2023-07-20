import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  create(event: any) {
    return 'this service create an event';
  }
  findAll() {
    return 'this service find all events';
  }
  findOne(id: any) {
    return `this service find a event with id ${id}`;
  }
  update(id: any) {
    return `this service update a event with id ${id}`;
  }
  delete(id: any) {
    return `this service delete a event with id ${id}`;
  }
}
