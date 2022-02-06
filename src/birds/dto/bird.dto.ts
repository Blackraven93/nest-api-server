import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Bird } from '../services/birds.schema';

export class ReadOnlyBirdDto extends PickType(Bird, ['email', 'name'] as const) {
  @ApiProperty({
    example: '23951236',
    description: 'This is sample email',
    required: true,
  })
  id: string;
}
