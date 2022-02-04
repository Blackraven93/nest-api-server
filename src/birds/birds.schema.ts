import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  // db 제작 시 timesave
  timestamps: true,
};

@Schema(options)
export class Bird extends Document {
  @ApiProperty({
    example: 'brownWoodpecker@gmail.com',
    description: 'This is sample email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'woodPecker',
    description: 'This is sample name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2312$@1asd2#lloe',
    description: 'This is sample password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const BirdSchema = SchemaFactory.createForClass(Bird);

BirdSchema.virtual('readOnlyData').get(function (this: Bird) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
