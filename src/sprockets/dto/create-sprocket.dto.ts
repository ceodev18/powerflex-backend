import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateSprocketDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 5,
  })
  teeth: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 5,
  })
  pitchDiameter: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 6,
  })
  outsideDiameter: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 1,
  })
  pitch: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 1,
  })
  factoryId: number;
}
