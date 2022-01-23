import * as fs from 'fs';
import * as hbs from 'hbs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';

import { Company } from '../../entities/company.entity';
import { Order } from '../../entities/order.entity';
import { UnitOfMessure } from '../../enums/unit-of-messure.enum';
import { calculator } from '../helper/calculator.helper';
import { formatNumber } from '../helper/format-number.helper';

@Injectable()
export class PdfTemplateGeneratorService {
  public generateOrderInvoicePdfTemplate(
    company: Company,
    order: Order,
  ): string {
    const date = new Date(order.createdAt);
    const formattedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    const formattedOrder = {
      ...order,
      total: formatNumber(order.total),
      totalTaxed: formatNumber(order.totalTaxed),
      diffTax: formatNumber(calculator.subtract(order.totalTaxed, order.total)),
      productOrders: order.productOrders
        .sort((a, b) => a.total - b.total)
        .map((productOrder, i) => ({
          ...productOrder,
          order: i + 1,
          total: formatNumber(productOrder.total),
          totalTaxed: formatNumber(productOrder.totalTaxed),
          diffTax: formatNumber(
            calculator.subtract(productOrder.totalTaxed, productOrder.total),
          ),
          product: {
            ...productOrder.product,
            sellingPrice: formatNumber(productOrder.product.sellingPrice),
            unitOfMessure: this.translateUOM(
              productOrder.product.unitOfMessure,
            ),
          },
        })),
    };

    const template = this.compileHbs(
      'pdf',
      'pdf.hbs',
      'order-pdf.template.hbs',
    );

    const doc = template({
      company,
      formattedDate,
      order: formattedOrder,
    });

    fs.writeFileSync('./index2.html', doc);
    return doc;
  }

  private compileHbs(
    partialName: string,
    partial: string,
    template: string,
  ): HandlebarsTemplateDelegate {
    const partialFile = fs.readFileSync(
      path.join(__dirname, '..', '..', 'templates', 'partials', partial),
      'utf-8',
    );

    hbs.registerPartial(partialName, partialFile);

    const templateFile = fs.readFileSync(
      path.join(__dirname, '..', '..', 'templates', template),
      'utf-8',
    );

    return hbs.handlebars.compile(templateFile);
  }

  private translateUOM(uoe: UnitOfMessure) {
    switch (uoe) {
      case UnitOfMessure.CENTIMETRE:
        return 'cm';
      case UnitOfMessure.EACH:
        return 'kom';
      case UnitOfMessure.GRAM:
        return 'g';
      case UnitOfMessure.KILOGRAM:
        return 'kg';
      case UnitOfMessure.LITRE:
        return 'l';
      case UnitOfMessure.METRE:
      default:
        return 'kom';
    }
  }
}
