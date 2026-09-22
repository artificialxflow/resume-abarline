import pptxgen from 'pptxgenjs';
import { COMPANY, DECK, type DeckSlide } from '../data/portfolioData';

const cache = new Map<string, string>();

async function toDataUrl(src: string): Promise<string> {
  if (cache.has(src)) return cache.get(src)!;
  const res = await fetch(src);
  if (!res.ok) throw new Error(`image ${src}`);
  const blob = await res.blob();
  const data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  cache.set(src, data);
  return data;
}

async function addPicture(
  slide: ReturnType<pptxgen['addSlide']>,
  src: string,
  x: number,
  y: number,
  w: number,
  h: number
) {
  try {
    const data = await toDataUrl(src);
    slide.addImage({ data, x, y, w, h, sizing: { type: 'contain', w, h } });
  } catch (error) {
    console.warn('skip image', src, error);
  }
}

function paintBg(slide: pptxgen.Slide, dark: boolean) {
  slide.background = { color: dark ? '0A1018' : 'F7F3EC' };
}

export async function generatePptxResume(): Promise<void> {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: 'WIDE_16x9', width: 13.333, height: 7.5 });
  pptx.layout = 'WIDE_16x9';
  pptx.author = COMPANY.enName;
  pptx.company = COMPANY.legalName;
  pptx.title = `${COMPANY.name} — ${COMPANY.slogan}`;
  pptx.subject = COMPANY.lead;

  for (const item of DECK) {
    await renderSlide(pptx, item);
  }

  await pptx.writeFile({ fileName: 'Abarline-Presentation.pptx' });
}

async function renderSlide(pptx: pptxgen, item: DeckSlide) {
  const s = pptx.addSlide();
  const dark = item.theme === 'dark';
  paintBg(s, dark);
  const ink = dark ? 'E8EEF4' : '14202B';
  const mute = dark ? '9FB1C3' : '4B5D6E';
  const accent = dark ? '5EEAD4' : '0F766E';

  const title = (t: string, y = 0.35, size = 26) =>
    s.addText(t, { x: 0.45, y, w: 12.4, h: 0.55, fontSize: size, fontFace: 'Arial', bold: true, color: ink, align: 'right', rtlMode: true });
  const sub = (t: string, y = 0.9) =>
    s.addText(t, { x: 0.45, y, w: 12.4, h: 0.4, fontSize: 14, fontFace: 'Arial', color: mute, align: 'right', rtlMode: true });
  const kick = () =>
    s.addText(item.kicker, { x: 0.45, y: 0.18, w: 12.4, h: 0.28, fontSize: 11, fontFace: 'Arial', bold: true, color: accent, align: 'right', rtlMode: true });

  if (item.layout === 'cover') {
    kick();
    s.addText(item.title, {
      x: 0.5, y: 1.5, w: 6.2, h: 1.3, fontSize: 54, fontFace: 'Arial', bold: true, color: ink, align: 'right', rtlMode: true,
    });
    s.addText(item.subtitle || '', {
      x: 0.5, y: 2.85, w: 6.2, h: 0.8, fontSize: 18, fontFace: 'Arial', bold: true, color: accent, align: 'right', rtlMode: true,
    });
    s.addText(COMPANY.lead, {
      x: 0.5, y: 3.7, w: 6.2, h: 1.1, fontSize: 13, fontFace: 'Arial', color: mute, align: 'right', rtlMode: true,
    });
    const mosaic = item.images.slice(0, 6);
    for (let i = 0; i < mosaic.length; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      await addPicture(s, mosaic[i], 7.1 + col * 1.95, 1.35 + row * 2.15, 1.85, 2.0);
    }
    (item.stats || []).forEach((st, i) => {
      s.addText(`${st.value}  ${st.label}`, {
        x: 0.45 + i * 3.2, y: 6.55, w: 3.0, h: 0.55, fontSize: 13, fontFace: 'Arial', color: accent, align: 'center',
      });
    });
    return;
  }

  kick();
  title(item.title, 0.42, 24);
  if (item.subtitle) sub(item.subtitle, 0.95);

  if (item.layout === 'about') {
    const body = (item.bullets || []).join('\n');
    s.addText(body, { x: 6.9, y: 1.5, w: 5.9, h: 3.4, fontSize: 14, fontFace: 'Arial', color: ink, align: 'right', rtlMode: true });
    await addPicture(s, item.images[0], 0.45, 1.5, 6.1, 4.6);
    return;
  }

  if (item.layout === 'pillars' && item.pillars) {
    for (let i = 0; i < item.pillars.length; i++) {
      const p = item.pillars[i];
      const x = 0.4 + i * 4.3;
      await addPicture(s, p.image, x, 1.5, 4.1, 2.4);
      s.addText(p.title, { x, y: 4.05, w: 4.1, h: 0.4, fontSize: 14, fontFace: 'Arial', bold: true, color: ink, align: 'right', rtlMode: true });
      s.addText(p.items.map((it) => `• ${it}`).join('\n'), {
        x, y: 4.5, w: 4.1, h: 2.2, fontSize: 13, fontFace: 'Arial', color: mute, align: 'right', rtlMode: true,
      });
    }
    return;
  }

  if (item.layout === 'ecosystem' && item.tiles) {
    for (let i = 0; i < item.tiles.length; i++) {
      const t = item.tiles[i];
      const col = i % 5;
      const row = Math.floor(i / 5);
      const x = 0.35 + col * 2.6;
      const y = 1.45 + row * 2.85;
      await addPicture(s, t.image, x, y, 2.45, 2.05);
      s.addText(t.title, { x, y: y + 2.08, w: 2.45, h: 0.35, fontSize: 11, fontFace: 'Arial', bold: true, color: ink, align: 'center', rtlMode: true });
    }
    return;
  }

  if (item.layout === 'pair' && item.pair) {
    for (let i = 0; i < item.pair.length; i++) {
      const p = item.pair[i];
      const x = 0.4 + i * 6.45;
      await addPicture(s, p.image, x, 1.5, 6.2, 3.15);
      s.addText(p.title, { x, y: 4.75, w: 6.2, h: 0.4, fontSize: 16, fontFace: 'Arial', bold: true, color: ink, align: 'right', rtlMode: true });
      s.addText(p.bullets.map((b) => `• ${b}`).join('\n'), {
        x, y: 5.2, w: 6.2, h: 1.7, fontSize: 13, fontFace: 'Arial', color: mute, align: 'right', rtlMode: true,
      });
    }
    return;
  }

  if (item.layout === 'gallery') {
    s.addText((item.bullets || []).map((b) => `• ${b}`).join('\n'), {
      x: 7.15, y: 1.5, w: 5.7, h: 2.4, fontSize: 14, fontFace: 'Arial', color: ink, align: 'right', rtlMode: true,
    });
    await addPicture(s, item.images[0], 0.4, 1.5, 6.5, 5.4);
    if (item.images[1]) await addPicture(s, item.images[1], 7.15, 4.1, 2.75, 2.8);
    if (item.images[2]) await addPicture(s, item.images[2], 10.05, 4.1, 2.8, 2.8);
    return;
  }

  if (item.layout === 'enterprise' && item.modules) {
    s.addText(item.modules.map((m) => `• ${m.title}: ${m.text}`).join('\n'), {
      x: 6.95, y: 1.5, w: 5.9, h: 5.3, fontSize: 13, fontFace: 'Arial', color: ink, align: 'right', rtlMode: true,
    });
    await addPicture(s, item.images[0], 0.4, 1.5, 6.3, 5.4);
    return;
  }

  if (item.layout === 'method' && item.steps) {
    s.addText(item.steps.map((st) => `${st.n}  ${st.title}\n${st.text}`).join('\n\n'), {
      x: 6.9, y: 1.5, w: 5.95, h: 5.3, fontSize: 14, fontFace: 'Arial', color: ink, align: 'right', rtlMode: true,
    });
    await addPicture(s, item.images[0], 0.4, 1.5, 6.2, 5.4);
    return;
  }

  if (item.layout === 'close') {
    s.addText((item.contacts || []).map((c) => `${c.label}: ${c.value}`).join('\n'), {
      x: 0.5, y: 1.6, w: 12.3, h: 2.2, fontSize: 16, fontFace: 'Arial', color: ink, align: 'right', rtlMode: true,
    });
    for (let i = 0; i < Math.min(4, item.images.length); i++) {
      await addPicture(s, item.images[i], 0.4 + i * 3.25, 4.15, 3.1, 2.7);
    }
    return;
  }

  // hero default
  s.addText((item.bullets || []).map((b) => `• ${b}`).join('\n'), {
    x: 7.15, y: 1.5, w: 5.7, h: 3.4, fontSize: 14, fontFace: 'Arial', color: ink, align: 'right', rtlMode: true,
  });
  await addPicture(s, item.images[0], 0.4, 1.5, 6.5, 5.4);
  if (item.images[1]) await addPicture(s, item.images[1], 7.15, 5.05, 2.75, 1.85);
  if (item.images[2]) await addPicture(s, item.images[2], 10.05, 5.05, 2.8, 1.85);
}
