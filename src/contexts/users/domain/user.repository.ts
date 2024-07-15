import { UUID } from "crypto";
import { User } from "./user.entity";
import { SignupDto } from "../app/signup-use-case/signup-dto";

export abstract class UserRepository {
    abstract create(user: User): Promise<User>;
    abstract findOneById(id: UUID): Promise<User | null>;
    abstract findOneByEmail(email: string): Promise<User | null>;
    abstract signUp(user: SignupDto): Promise<User>;
}