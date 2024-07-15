import { randomUUID, UUID } from "crypto";
import { PrimitiveUser, User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from "../../domain/exceptions/user-already-exists.exception";
import { UserNotFoundException, UserNotFoundExceptionByEmail } from "../../domain/exceptions/user-not-found.exception";
import { SignupDto } from "../../app/signup-use-case/signup-dto";

export class InMemoryUserRepository extends UserRepository {

    constructor() {
        super(); 
        this.initializeUsers();
    }
    // ADD THE EXCEPTIONS IN USE-CASES
    users: PrimitiveUser[] = [];
    async initializeUsers(): Promise<void> {
        this.users = [
            {
                id: randomUUID(),
                name: "Markus",
                surname: "Abramian Medina",
                birth: new Date().toISOString(),
                email: "markus@gmail.com",
                password: await bcrypt.hash("markus1234", 10)
            },
            {
                id: randomUUID(),
                name: "Pepe",
                surname: "Perez Gonzalez",
                birth: new Date().toISOString(),
                email: "pepe@gmailcom",
                password: await bcrypt.hash("pepe1234", 10)
            }
        ];
    }

    async create(user: User): Promise<User> {
        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = this.users.find(u => u.email === user.toValue().email);
        if (existingUser) {
            throw new UserAlreadyExistsException(existingUser.id);
        }
        this.users.push(user.toValue());
        return user;
    }

    async findOneById(id: UUID): Promise<User | null> {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return new User(user); // Create a new User object using the PrimitiveUser object
    }

    async findOneByEmail(email: string): Promise<User | null> {
        console.log(this.users)
        const user = this.users.find(user => user.email === email);
        if (!user) {
            throw new UserNotFoundExceptionByEmail(email);
        }
        return new User(user);
    }

    signUp(user: SignupDto): Promise<User> {
        const userFounded = this.users.find(user => user.email === user.email);
        if (userFounded) {
            throw new UserAlreadyExistsException(userFounded.id);
        }
        const userCreated = new User({ ...user, id: randomUUID() });
        return this.create(userCreated);
    }

}