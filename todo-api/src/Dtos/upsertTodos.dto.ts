import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class UpsertTodosDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly todos: string[];
}
