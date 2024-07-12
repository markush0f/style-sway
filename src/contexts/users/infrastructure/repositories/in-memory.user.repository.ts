import { randomUUID, UUID } from "crypto";
import { PrimitiveUser, User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import { UserNotFoundException, UserNotFoundExceptionByEmail } from "../../domain/exceptions/user-not-found.exception";
import { UserAlreadyExistsException } from "../../domain/exceptions/user-already-exists.exception";
import * as bcrypt from 'bcrypt';

export class InMemoryUserRepository extends UserRepository {
    // ADD THE EXCEPTIONS IN USE-CASES
    private users: PrimitiveUser[] = [
        {
            id: randomUUID(),
            name: "Markus",
            surname: "Abramian Medina",
            birth: new Date().toISOString(),
            email: "markus@gmail.com",
            password: bcrypt.hash("markus1234", 10)
        },
        {
            id: randomUUID(),
            name: "Pepe",
            surname: "Perez Gonzalez",
            birth: new Date().toISOString(),
            email: "pepe@gmailcom",
            password: bcrypt.hash("pepe1234", 10)
        }

    ];

    async create(user: User): Promise<User> {
        const userFounded = this.users.find(user => user.email === user.email);

        // Add this in use-case
        const hashedPassword = await bcrypt.hash(user.toValue().password, 10);
        user.toValue().password = hashedPassword;

        this.users.push(user.toValue());
        return user;
    }

    async findOneById(id: UUID): Promise<User | null> {
        const user = this.users.find(user => user.id === id);

        return new User(user); // Create a new User object using the PrimitiveUser object
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);
        return new User(user);
    }

    signUp(user: User): Promise<User> {
        const userFounded = this.users.find(user => user.email === user.email);
        return this.create(user);
    }

}