import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ROLES } from './constant';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  username!: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.USER,
  })
  role!: ROLES;

  @Column({
    type: 'bool',
    default: false,
  })
  isVerified!: boolean;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  avatarId?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'timestamp', nullable: true })
  birthday?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
