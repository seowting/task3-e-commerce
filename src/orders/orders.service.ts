import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entitties/order.entity';
import { OrderItem } from './entitties/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  findOrdersByUser(userId: number) {
    return this.orderRepository.find({
      where: { user: userId },
      relations: ['items', 'items.product'],
    });
  }
}
