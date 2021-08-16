import { Module } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { PdfTemplateGeneratorService } from './pdf-template-generator.service';

@Module({
  providers: [PdfGeneratorService, PdfTemplateGeneratorService],
  exports: [PdfGeneratorService, PdfTemplateGeneratorService],
})
export class PdfGeneratorModule {}
