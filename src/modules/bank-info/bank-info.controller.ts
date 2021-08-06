import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BankInfo } from '../../entities/bank-info.entity';
import { BankInfoService } from './bank-info.service';

@Controller('bank-info')
@ApiTags('bank-info')
export class BankInfoController {
  constructor(private readonly service: BankInfoService) {}

  @Get()
  @ApiCreatedResponse({
    type: [BankInfo],
  })
  public getBankInfo(): Promise<BankInfo[]> {
    return this.service.getBankInfo();
  }
}
