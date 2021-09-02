import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import { Option } from "./Option";
import { User } from "./User";

@Entity({ name: "poll" })
export class Poll {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @Column()
  closed_at!: Date;

  @Column({ length: 200 })
  question!: string;

  @OneToMany(() => Option, (option) => option.poll, {
    cascade: true,
  })
  options!: Option[];

  @Column({ type: "jsonb", nullable: true })
  voters!: object;

  @ManyToOne(() => User, (user: User) => user.polls, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user!: User;
}
