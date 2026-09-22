import pptxgen from 'pptxgenjs';
import { RESUME_SLIDES, COMPANY_INFO } from '../data/portfolioData';

export async function generatePptxResume(): Promise<void> {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Abarline Technology';
  pptx.company = 'شرکت فناوری ابرلاین (abarline.ir)';
  pptx.title = 'رزومه و کاتالوگ محصولات شرکت فناوری ابرلاین';
  pptx.subject = 'کاتالوگ جامع پلتفرم‌های نرم‌افزاری، سامانه‌های سازمانی، حمل‌ونقل و تجارت دیجیتال';

  // 1. Title Slide
  const slide1 = pptx.addSlide();
  slide1.background = { color: '0A0F1D' };

  // Decorative header bar
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: 0.15,
    fill: { color: '10B981' },
  });

  // Company Brand
  slide1.addText('شرکت فناوری ابرلاین | Abarline Technology', {
    x: 1.0,
    y: 1.2,
    w: 11.3,
    h: 0.6,
    fontSize: 22,
    fontFace: 'Arial',
    color: '10B981',
    bold: true,
    align: 'right',
  });

  // Main Title
  slide1.addText('کاتالوگ جامع نرم‌افزارها و رزومه پلتفرم‌های عملیاتی', {
    x: 1.0,
    y: 2.0,
    w: 11.3,
    h: 1.4,
    fontSize: 34,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
    align: 'right',
  });

  // Subtitle
  slide1.addText(
    'سامانه‌های حمل‌ونقل هوشمند • پیک و لجستیک • مدیریت پسماند • ERP و سازمانی • CRM و وفاداری • بازار طلا و املاک',
    {
      x: 1.0,
      y: 3.5,
      w: 11.3,
      h: 0.8,
      fontSize: 16,
      fontFace: 'Arial',
      color: '94A3B8',
      align: 'right',
    }
  );

  // Stats Card on cover
  slide1.addShape(pptx.ShapeType.rect, {
    x: 1.0,
    y: 4.8,
    w: 11.3,
    h: 1.6,
    fill: { color: '131E36' },
    line: { color: '1E293B', width: 1 },
  });

  slide1.addText('سابقه فعالیت: ۱۵+ سال (تاسیس ۱۳۸۸)    |    سایت رسمی: abarline.ir    |    مقر اصلی: بابل، مازندران', {
    x: 1.2,
    y: 5.3,
    w: 10.9,
    h: 0.6,
    fontSize: 14,
    fontFace: 'Arial',
    color: 'E2E8F0',
    align: 'center',
  });

  // 2. Add each slide from RESUME_SLIDES
  for (const item of RESUME_SLIDES) {
    const slide = pptx.addSlide();
    slide.background = { color: '0F172A' };

    // Top accent line
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.08,
      fill: { color: '10B981' },
    });

    // Category pill
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 10.0,
      y: 0.35,
      w: 2.3,
      h: 0.4,
      fill: { color: '064E3B' },
      line: { color: '059669', width: 1 },
    });

    slide.addText(item.category, {
      x: 10.0,
      y: 0.35,
      w: 2.3,
      h: 0.4,
      fontSize: 11,
      fontFace: 'Arial',
      color: '6EE7B7',
      bold: true,
      align: 'center',
    });

    // Title
    slide.addText(item.title, {
      x: 0.8,
      y: 0.4,
      w: 9.0,
      h: 0.6,
      fontSize: 22,
      fontFace: 'Arial',
      color: 'FFFFFF',
      bold: true,
      align: 'right',
    });

    // Subtitle
    slide.addText(item.subtitle, {
      x: 0.8,
      y: 1.05,
      w: 11.5,
      h: 0.5,
      fontSize: 13,
      fontFace: 'Arial',
      color: '94A3B8',
      align: 'right',
    });

    // Left container: Text Bullets
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.8,
      y: 1.7,
      w: 5.7,
      h: 4.8,
      fill: { color: '1E293B' },
      line: { color: '334155', width: 1 },
    });

    slide.addText('ویژگی‌ها و قابلیت‌های کلیدی:', {
      x: 7.0,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 14,
      fontFace: 'Arial',
      color: '10B981',
      bold: true,
      align: 'right',
    });

    const bulletRows = item.bullets.map((b) => ({
      text: `• ${b}\n\n`,
      options: {
        fontSize: 12,
        fontFace: 'Arial',
        color: 'E2E8F0',
        align: 'right' as const,
      },
    }));

    slide.addText(bulletRows, {
      x: 7.0,
      y: 2.4,
      w: 5.3,
      h: 3.8,
    });

    // Right container: Image placeholder shape
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 1.7,
      w: 5.7,
      h: 4.8,
      fill: { color: '131C2E' },
      line: { color: '1E293B', width: 1 },
    });

    slide.addText(`${item.title}\n(abarline.ir)`, {
      x: 1.0,
      y: 3.5,
      w: 5.3,
      h: 1.2,
      fontSize: 16,
      fontFace: 'Arial',
      color: '64748B',
      align: 'center',
    });

    // Add note or watermark
    slide.addText(`اسلاید اختصاصی شرکت فناوری ابرلاین | abarline.ir`, {
      x: 0.8,
      y: 6.7,
      w: 11.7,
      h: 0.4,
      fontSize: 10,
      fontFace: 'Arial',
      color: '64748B',
      align: 'center',
    });
  }

  // Final Slide: Contact & Next Steps
  const slideFinal = pptx.addSlide();
  slideFinal.background = { color: '0A0F1D' };

  slideFinal.addText('همکاری و توسعه پروژه‌ها با ابرلاین', {
    x: 1.0,
    y: 1.5,
    w: 11.3,
    h: 1.0,
    fontSize: 30,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
    align: 'center',
  });

  slideFinal.addText('آماده همکاری در استقرار پلتفرم‌های سازمانی، حمل‌ونقل و دیجیتال مارکتینگ', {
    x: 1.0,
    y: 2.6,
    w: 11.3,
    h: 0.6,
    fontSize: 16,
    fontFace: 'Arial',
    color: '10B981',
    align: 'center',
  });

  slideFinal.addText(
    `وب‌سایت رسمی: ${COMPANY_INFO.website}\nایمیل ارتباطی: ${COMPANY_INFO.email}\nتلفن تماس: ${COMPANY_INFO.phone}\nنشانی: ${COMPANY_INFO.headquarters}`,
    {
      x: 1.5,
      y: 3.6,
      w: 10.3,
      h: 2.5,
      fontSize: 15,
      fontFace: 'Arial',
      color: 'CBD5E1',
      align: 'center',
    }
  );

  await pptx.writeFile({ fileName: 'Abarline-Company-Presentation.pptx' });
}
