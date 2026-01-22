// notification.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8100'], // Địa chỉ nguồn của ứng dụng Ionic
    methods: ['GET', 'Post'],
    credentials: true,
  },
  path: '/socket.io',
})
export class PosNotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor() {}

  afterInit(server: Server) {}

  handleConnection(client: any) {}

  handleDisconnect(client: any) {}

  async notifyChange(notification) {
    this.server.emit('notificationChange', notification);
  }
}
