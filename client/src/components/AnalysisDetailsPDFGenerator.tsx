import { Test } from '@/app/analyses/[id]/[testDate]/page';
import jsPDF from 'jspdf';
import '@/app/fonts/Roboto-Regular-normal';
import { Button } from './ui/button';
import { getStatusInfo } from './TestCard';

type PDFGeneratorProps = {
  tests: Test[] | null;
  testDate: string;
};

export const AnalysisDetailsPDFGenerator: React.FC<PDFGeneratorProps> = ({
  tests,
  testDate,
}) => {
  const decodedDate = decodeURIComponent(testDate);
  const generatePDF = () => {
    if (!tests || tests.length === 0) return;

    const pdf = new jsPDF();
    pdf.setFont('Roboto-Regular');
    let yOffset = 20;

    pdf.setFontSize(18);
    pdf.text(tests[0].indicatorRange.indicator.testType.name, 20, yOffset);
    yOffset += 10;

    pdf.setFontSize(14);
    pdf.text(
      `Дата аналізу: ${new Date(decodedDate).toLocaleDateString()}`,
      20,
      yOffset
    );
    yOffset += 10;

    tests.forEach((test) => {
      const testResult = getStatusInfo(test);
      if (yOffset > 270) {
        pdf.addPage();
        yOffset = 20;
      }

      pdf.setFontSize(14);
      pdf.text(test.indicatorRange.indicator.name, 20, yOffset);
      yOffset += 7;

      pdf.setFontSize(10);
      pdf.text(
        `Опис: ${test.indicatorRange.indicator.description}`,
        20,
        yOffset
      );
      yOffset += 5;

      pdf.text(
        `Одиниці виміру: ${test.indicatorRange.indicator.unit}`,
        20,
        yOffset
      );
      yOffset += 5;

      pdf.text(
        `Результат: ${
          test.resultValue !== null ? test.resultValue : test.resultText
        } (${testResult.statusText})`,
        20,
        yOffset
      );
      yOffset += 5;

      if (
        test.indicatorRange.minValue !== null &&
        test.indicatorRange.maxValue !== null
      ) {
        pdf.text(
          `Норма: ${test.indicatorRange.minValue} - ${test.indicatorRange.maxValue}`,
          20,
          yOffset
        );
      } else if (test.indicatorRange.result) {
        pdf.text(
          `Очікуваний результат: ${test.indicatorRange.result}`,
          20,
          yOffset
        );
      }
      yOffset += 5;

      pdf.text(
        `Статус: ${test.status === 'DONE' ? 'Завершено' : 'Обробляється'}`,
        20,
        yOffset
      );
      yOffset += 10;
    });

    pdf.save(
      `${tests[0].indicatorRange.indicator.testType.name}_${decodedDate}.pdf`
    );
  };

  return (
    <Button onClick={generatePDF} variant='secondary'>
      Зберегти як PDF
    </Button>
  );
};
