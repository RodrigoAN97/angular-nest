import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class SetTodosDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly todos: string[];
}
