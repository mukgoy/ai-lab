import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> { 

    async createUser(signupDto){
        let user = new UserEntity();
        user.name = signupDto.name;
        user.email = signupDto.email;
        user.primaryKey = signupDto.email;
        user.password = signupDto.password;
        return user.save();
    }
}