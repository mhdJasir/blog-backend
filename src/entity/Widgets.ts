import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Blog } from "./Blog";

@Entity()
export class Widget {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string; // e.g., 'text', 'image', 'video'

    // common widget properties

    @ManyToOne(() => Blog, blog => blog.widgets)
    blog: Blog;

    // widget-specific properties
    @Column({ nullable: true })
    textSize: number;

    @Column({ nullable: true })
    textColor: string;

    @Column({ nullable: true })
    height: number;

    @Column({ nullable: true })
    text: string;

    @Column({ nullable: true })
    width: number;

    @Column({ nullable: true })
    duration: number;
}
