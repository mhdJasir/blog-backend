import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "./User"
import { Widget } from "./Widgets"

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    title: string

    @Column()
    sub_title: string

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
    

    @ManyToOne(() => User, user => user.blogs)
    @JoinColumn({ name: 'user' })
    user: User;
    
    @OneToMany(()=>Widget, widget=>widget.blog, { cascade: true })
    widgets: Widget[]
}
