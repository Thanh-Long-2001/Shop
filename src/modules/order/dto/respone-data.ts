import { IsNotEmpty } from 'class-validator';

export class ResponeData {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  data: Object;
}
