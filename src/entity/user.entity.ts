import {
  Entity,
  Column,
  Index,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Memo from './memo.entity';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false, unique: true })
  userid!: string;

  @Index()
  @Column({ nullable: false })
  nickname!: string;

  @Column({ nullable: false })
  password!: string;

  @OneToMany((type) => Memo, (memo) => memo.id)
  memos: Memo[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
