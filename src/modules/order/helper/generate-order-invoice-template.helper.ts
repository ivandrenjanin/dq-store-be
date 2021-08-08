import { Company } from '../../../entities/company.entity';
import { Order } from '../../../entities/order.entity';
import { UnitOfMessure } from '../../../enums/unit-of-messure.enum';
import { calculator } from '../../helper/calculator.helper';
import { formatNumber } from '../../helper/format-number.helper';

const translateUOM = (uoe: UnitOfMessure) => {
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
};

export const generateOrderInvoiceTemplate = (
  company: Company,
  order: Order,
) => {
  const date = new Date(order.createdAt);
  const formattedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      tr,
      p {
        margin: 0;
      }
      body {
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      }
      @page {
        margin: 0;
      }
      body {
        margin: 0;
      }
      .sheet {
        margin: 0;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        page-break-after: always;
        display: flex;
        flex-direction: column;
      }

      /** Paper sizes **/
      body.A3 .sheet {
        width: 297mm;
        height: 419mm;
      }
      body.A3.landscape .sheet {
        width: 420mm;
        height: 296mm;
      }
      body.A4 .sheet {
        width: 210mm;
        height: 296mm;
      }
      body.A4.landscape .sheet {
        width: 297mm;
        height: 209mm;
      }
      body.A5 .sheet {
        width: 148mm;
        height: 209mm;
      }
      body.A5.landscape .sheet {
        width: 210mm;
        height: 147mm;
      }
      body.letter .sheet {
        width: 216mm;
        height: 279mm;
      }
      body.letter.landscape .sheet {
        width: 280mm;
        height: 215mm;
      }
      body.legal .sheet {
        width: 216mm;
        height: 356mm;
      }
      body.legal.landscape .sheet {
        width: 357mm;
        height: 215mm;
      }

      /** Padding area **/
      .sheet.padding-10mm {
        padding: 10mm;
      }
      .sheet.padding-15mm {
        padding: 15mm;
      }
      .sheet.padding-20mm {
        padding: 20mm;
      }
      .sheet.padding-25mm {
        padding: 25mm;
      }

      /** For screen preview **/
      @media screen {
        body {
          background: #e0e0e0;
        }
        .sheet {
          background: white;
          box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
          margin: 5mm auto;
        }
      }

      /** Fix for Chrome issue #273306 **/
      @media print {
        body.A3.landscape {
          width: 420mm;
        }
        body.A3,
        body.A4.landscape {
          width: 297mm;
        }
        body.A4,
        body.A5.landscape {
          width: 210mm;
        }
        body.A5 {
          width: 148mm;
        }
        body.letter,
        body.legal {
          width: 216mm;
        }
        body.letter.landscape {
          width: 280mm;
        }
        body.legal.landscape {
          width: 357mm;
        }
        .title {
          text-align: center;
        }
        .header {
          margin: 5mm 0;
          display: flex;
          justify-content: center;
          flex-direction: row;
        }

        .header-box {
          padding: 3mm;
          border: 0.1mm dotted black;
          flex-grow: 1;
        }
        .header-box:first-child {
          border-right: none;
        }
        .date-info {
          margin-bottom: 5mm;
        }
        .date-info h6 {
          /* flex-direction: column; */
          /* display: flex; */
          margin-bottom: 0.5mm;
        }

        .date-info h6:first-child {
          /* flex-direction: column; */
          /* display: flex; */
          margin-bottom: 0;
          text-align: center;
        }

        th {
          border: 1mm solid black;
          text-align: left;
        }
        table,
        th {
          border-collapse: collapse;
        }

        th {
          padding: 1mm 0.2mm;
          text-align: center;
          border: 0.1mm solid black;
        }

        td {
          padding: 1mm;
          text-align: center;
        }
        .info-table {
          margin-top: 25mm;
          width: 130mm;
          align-self: flex-end;
        }
        .info-table table {
          width: 100%;
        }
        .extra-info {
          display: flex;
          flex-direction: column;
          margin-top: 15mm;
        }
        .extra-info-box {
          height: 16mm;
        }
      }
    </style>
  </head>
  <body class="A4">
    <section class="sheet padding-10mm">
      <h2 class="title">${order.orderNumber}</h2>

      <div class="header">
        <div class="header-box">
          <h6>IZDAVALAC RAČUNA</h6>
          <br />
          <h6>${company.name.toUpperCase()}</h6>
          <h6>${company.street.toUpperCase()}, ${
    company.postalCode
  } ${company.city.toUpperCase()}</h6>
          <br />

          <h6>PIB: ${company.taxIdNumber}</h6>
          <h6>Matični broj: ${company.companyNumber}</h6>
          <br />

          <h6>Telefon: ${company.phoneMobileNumber}</h6>
          <h6>E-mail: ${company.email}</h6>
          <br />

          <h6>Ime banke: ${company.bankName}</h6>
          <h6>Tekući račun: ${company.bankAccountNumber}</h6>
        </div>

        <div class="header-box">
          <h6>PRIMALAC RAČUNA</h6>
          <br />
          <h6>${order.companyClient.name.toUpperCase()}</h6>
          <h6>${order.companyClient.street.toUpperCase()}, ${
    company.postalCode
  } ${company.city.toUpperCase()}</h6>
          <br />

          <h6>PIB: ${order.companyClient.taxIdNumber}</h6>
          <h6>Matični broj: ${order.companyClient.companyNumber}</h6>
          <br />

          <h6>Telefon: ${order.companyClient.phoneMobileNumber}</h6>
          <h6>E-mail: ${order.companyClient.email}</h6>
          <br />

          <h6>Ime banke: ${order.companyClient.bankName}</h6>
          <h6>Tekući račun: ${order.companyClient.bankAccountNumber}</h6>
        </div>
      </div>
      <div class="date-info">
        <h6>Račun broj: ${order.orderNumber}</h6>
        <br />
        <h6>Datum prometa usluga: ${formattedDate}</h6>
        <h6>Datum izdavanja računa: ${formattedDate}</h6>
        <h6>Mesto izdavanja računa: ${company.city}</h6>
        <h6>Mesto izdavanja računa: ${company.city}</h6>
      </div>
      <table>
        <tr>
          <th><h6>r.br</h6></th>
          <th>
            <h6>
              VRSTA - NAZIV <br />
              DOBARA - USLUGA
            </h6>
          </th>
          <th><h6>jed mere</h6></th>
          <th><h6>količina</h6></th>
          <th><h6>cena bez PDV</h6></th>
          <th><h6>vrednost bez PDV</h6></th>
          <th><h6>osnovica za PDV</h6></th>
          <th><h6>stopa PDV</h6></th>
          <th><h6>iznos PDV</h6></th>
          <th><h6>vrednost sa PDV</h6></th>
        </tr>
        <tr>
          <th><h6>-</h6></th>
          <th>
            <h6>-</h6>
          </th>
          <th><h6>-</h6></th>
          <th><h6>-</h6></th>
          <th><h6>rsd</h6></th>
          <th><h6>rsd</h6></th>
          <th><h6>rsd</h6></th>
          <th><h6>%</h6></th>
          <th><h6>rsd</h6></th>
          <th><h6>rsd</h6></th>
        </tr>
        ${order.productOrders
          .sort((a, b) => a.total - b.total)
          .map(
            (productOrder, i) => `
        <tr>
        <td><h6>${i + 1}.</h6></td>
        <td>
        <h6 style="text-align:left;">${productOrder.product.name}</h6>
        </td>
        <td><h6>${translateUOM(productOrder.product.unitOfMessure)}</h6></td>
        <td><h6>${productOrder.quantity}</h6></td>
        <td><h6 style="text-align:right;">${formatNumber(
          productOrder.total,
        )}</h6></td>
        <td><h6 style="text-align:right;">${formatNumber(
          productOrder.total,
        )}</h6></td>
        <td><h6 style="text-align:right;">${formatNumber(
          productOrder.total,
        )}</h6></td>
        <td><h6 style="text-align:right;">${
          productOrder.product.taxRate
        }</h6></td>
        <td><h6 style="text-align:right;">${formatNumber(
          calculator.subtract(productOrder.totalTaxed, productOrder.total),
        )}</h6></td>
        <td><h6 style="text-align:right;">${formatNumber(
          productOrder.totalTaxed,
        )}</h6></td>
        </tr>
        `,
          )
          .join('')}
      </table>
      <div class="info-table">
        <table>
          <tr>
            <th><h6>vrednost bez pdv</h6></th>
            <th><h6>osnovica za pdv</h6></th>
            <th><h6>stopa pdv</h6></th>
            <th><h6>iznos pdv</h6></th>
            <th><h6>ukupna vrednost sa pdv</h6></th>
          </tr>
          <tr>
            <th><h6>${formatNumber(order.total)}</h6></th>
            <th><h6>${formatNumber(order.total)}</h6></th>
            <th><h6>20%</h6></th>
            <th><h6>${formatNumber(
              calculator.subtract(order.totalTaxed, order.total),
            )}</h6></th>
            <th><h6>${formatNumber(order.totalTaxed)}</h6></th>
          </tr>
        </table>
      </div>
      <div class="extra-info">
        <div class="extra-info-box">
          <h6>Podaci o odgovornom licu:</h6>
          <br />
          <h6>_________________________ M.P.</h6>
          <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>potpis</em></h6>
        </div>
        <br />
        <div class="extra-info-box">
          <h6>Podaci o izdavaocu dobara:</h6>
          <br />
          <h6>_________________________ M.P.</h6>
          <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>potpis</em></h6>
        </div>
        <br />
        <div class="extra-info-box">
          <h6>Podaci o primaocu dobara:</h6>
          <br />
          <h6>_________________________ M.P.</h6>
          <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>potpis</em></h6>
        </div>
        <br />
        <div class="extra-info-box">
          <h6>Dodatne informacije:</h6>
        </div>
      </div>
    </section>
  </body>
</html>
`;
};
