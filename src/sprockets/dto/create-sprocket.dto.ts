import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateSprocketDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  teeth: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  pitchDiameter: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  outsideDiameter: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  pitch: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  factoryId: number;
}