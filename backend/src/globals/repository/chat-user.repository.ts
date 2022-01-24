import { EntityRepository, Repository } from "typeorm";
import { ChatUserEntity } from "../entities/chat-user.entity";

@EntityRepository(ChatUserEntity)
export class ChatUserRepository extends Repository<ChatUserEntity> {

    async createUser(createChatUserDto) {
        createChatUserDto.primaryKey = createChatUserDto.email;
        let user = new ChatUserEntity(createChatUserDto);
        return user.save().catch(err => {
            if (err.writeErrors) {
                return this.findOne(createChatUserDto);
            }
        });
    }

    async updateUser(updateChatUserDto) {
        let user = await this.findOne(updateChatUserDto.id);
        delete updateChatUserDto.id
        Object.assign(user, updateChatUserDto);
        return user.save();
    }
}