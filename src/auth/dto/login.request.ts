import { PickType } from '@nestjs/swagger';
import { Bird } from 'src/birds/birds.schema';

export class LoginRequestDto extends PickType(Bird, ['email', 'password'] as const) {}
