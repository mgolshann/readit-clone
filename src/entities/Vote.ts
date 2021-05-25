import Entity from './Entity'
import { Column, Entity as TOEntity, Index, JoinColumn, ManyToOne } from 'typeorm'
import User from './User'
import Post from './Post'
import Comment from './Comment'

@TOEntity('votes')
export default class Vote extends Entity {
    constructor(vote: Partial<Vote>) {
        super()
        Object.assign(this, vote)
    }

    @Column()
    value: number
    
    @Column()
    username: string

    @ManyToOne(() => User)
    @JoinColumn({name: 'username', referencedColumnName: 'username'})
    user: User

    @ManyToOne(() => Post)
    post: Post

    @ManyToOne(() => Comment)
    comment: Comment
}