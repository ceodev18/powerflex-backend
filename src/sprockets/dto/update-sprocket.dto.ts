import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class UpdateSprocketDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  teeth?: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  pitch_diameter?: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  outside_diameter?: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  pitch?: number;
}
