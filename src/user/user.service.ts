import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/user.dto";

@Injectable()
export class UserService {

    getUsers() {
        return ['user1', 'user2'];
    }

    getUserById(id: string) {
        return `se retorna usuario de ID : ${id}`
    }

    createUser(user: CreateUserDto) {
        console.log(user)
        return 'creadno usuario'
    }

    deleteUser() {
        return 'borrando usuario'
    }
}