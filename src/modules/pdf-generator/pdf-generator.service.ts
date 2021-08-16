import * as puppeteer from 'puppeteer';

import { Injectable } from '@nestjs/common';

import { ConfigOption } from '../../enums/config-option.enum';
import { ConfigService } from '../global/config/config.service';

@Injectable()
export class PdfGeneratorService {
  constructor(private readonly configService: ConfigService) {}

  public async generatePdfFromString(
    template: string,
  ): Promise<{ file: Buffer }> {
    try {
      console.log('Spawning Puppeteer instance...');
      const browser = await puppeteer.launch({
        executablePath: this.configService.getOrThrow(
          ConfigOption.CHROMIUM_EXE_PATH,
        ),
        headless: true,
        args: [
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
        ],
      });
      console.log('Opening Browser page...');
      const page = await browser.newPage();
      console.log('Setting page content...');
      await page.setContent(template);
      console.log('Generating a PDF...');
      const file = await page.pdf({ format: 'a4' });
      console.log('Closing browser process...');
      await browser.close();
      console.log('Browser process closed...');
      return { file };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
