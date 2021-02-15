import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';

@Entity('memos')
export default class Memo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  content!: string;

  @Index()
  @Column()
  user_id!: number;

  @ManyToOne((type) => User, (user) => user.memos)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
