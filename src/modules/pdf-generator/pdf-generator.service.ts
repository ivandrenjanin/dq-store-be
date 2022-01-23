import * as puppeteer from 'puppeteer';

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PdfGeneratorService {
  private logger = new Logger(PdfGeneratorService.name);

  public async generatePdfFromString(
    template: string,
  ): Promise<{ file: Buffer }> {
    try {
      this.logger.log('Spawning Puppeteer instance...');
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
        ],
      });
      this.logger.log('Opening Browser page...');
      const page = await browser.newPage();
      this.logger.log('Setting page content...');
      await page.setContent(template);
      this.logger.log('Generating a PDF...');
      const file = await page.pdf({ format: 'a4' });
      this.logger.log('Closing browser process...');
      await browser.close();
      this.logger.log('Browser process closed...');
      return { file };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
