import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId, ObjectIdColumn, ObjectID} from 'typeorm';
import { BotEntity } from './bot.entity';
import { CommonProperty } from './common.property';
import { UserEntity } from './user.entity';

@Entity({name: 'faqs'})
export class FaqEntity extends CommonProperty{
    @ObjectIdColumn()
    faqId: ObjectID;

    @Column({ nullable: true, type: "text" })
    question : string;

    @Column({ nullable: true, type: "text" })
    answer: string;

    @ManyToOne(() => BotEntity, bot => bot.faqs)
    bot: BotEntity;

    @RelationId((faq: FaqEntity) => faq.bot) // you need to specify target relation
    botId: number;

    @ManyToOne(() => UserEntity, owner => owner.faqs)
    owner: UserEntity;
}
