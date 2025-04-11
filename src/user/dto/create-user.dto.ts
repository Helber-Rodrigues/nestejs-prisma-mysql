import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsDateString()
    birthAt?: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,    
        minNumbers: 0,
        minSymbols: 0
    })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: Role;
}