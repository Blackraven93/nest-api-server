import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Bird } from '../birds.schema';

export class BirdRequestDto extends Bird {

}
