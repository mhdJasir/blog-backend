import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    sub_title: string

    @Column('datetime')
    date: Date

    @ManyToOne(() => User, user => user.blogs)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
