import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  items: OrderItem[];

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}