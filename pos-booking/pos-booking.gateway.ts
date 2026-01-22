// notification.gateway.ts
import { defaultWebSocketGatewayConfig } from '@/config/websocket-gateway.config';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Server } from 'socket.io';

@WebSocketGateway(defaultWebSocketGatewayConfig)
export class PosBookingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor() {}

  afterInit(server: Server) {}

  handleConnection(client: any) {}

  handleDisconnect(client: any) {}

  async bookingChangeOfBusSchedule(booking: any, busScheduleId: Types.ObjectId) {
    this.server.emit(`bookingChangeOfBusSchedule/${busScheduleId}`, booking);
  }
}
