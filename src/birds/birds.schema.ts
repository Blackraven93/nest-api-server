import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  // db 제작 시 timesave
  timestamps: true,
};

@Schema(options)
export class Bird extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string, email: string, name: string };
}

export const BirdSchema = SchemaFactory.createForClass(Bird);

BirdSchema.virtual('readOnlyData').get(function (this: Bird) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});