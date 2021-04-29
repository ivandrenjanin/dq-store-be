import { Controller, Get } from '@nestjs/common';

@Controller()
export class GlobalController {
  @Get()
  public async healthCheck(): Promise<{
    success: boolean;
  }> {
    return { success: true };
  }
}
