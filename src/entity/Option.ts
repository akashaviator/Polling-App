import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Poll } from "./Poll";

@Entity({ name: "option" })
export class Option {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 0 })
  votes!: number;

  @Column({ length: 200 })
  text!: string;

  @ManyToOne(() => Poll, (poll: Poll) => poll.options, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  poll!: Poll;
}
