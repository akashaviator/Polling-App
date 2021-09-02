import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Poll } from "./Poll";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Poll, (poll) => poll.user, {
    cascade: true,
    nullable: true,
  })
  polls!: Poll[];
}
