import * as bcrypt from "bcrypt";

export class BcryptHelper {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, passwordHashed: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHashed);
  }
}
