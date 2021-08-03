import { ApiProperty } from '@nestjs/swagger';

export class FileResponse {
  @ApiProperty()
  public file: string;

  @ApiProperty()
  public fileName: string;
}
