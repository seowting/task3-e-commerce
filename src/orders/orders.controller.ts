import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  findOrdersByUser(@Param('userId') userId: string) {
    return this.ordersService.findOrdersByUser(+userId);
  }
}
