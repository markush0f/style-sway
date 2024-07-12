import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/user.repository";
import { PrimitiveUser, User } from "../../domain/user.entity";
import { UUID } from "crypto";
import { UserNotFoundException } from "../../domain/exceptions/user-not-found.exception";

@Injectable()
export class FindOneUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: UUID): Promise<{ user: PrimitiveUser }> {
        const user: User = await this.userRepository.findOneById(id);
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return { user: user.toValue() };
        
    }
}