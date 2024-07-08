import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreatePostHttpDto {
 
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    content: string;

    @IsUUID()
    @IsNotEmpty()
    userId: UUID
}
