export const COMPANY = {
  name: 'ابرلاین',
  legalName: 'شرکت تولید و فروش نرم‌افزار ابرلاین',
  enName: 'Abarline',
  slogan: 'ما سیستم می‌سازیم، نه فقط نرم‌افزار',
  lead: 'معماری و توسعه پلتفرم‌های عملیاتی، مالی و مانیتورینگ برای کسب‌وکارهایی که به رشد واقعی فکر می‌کنند.',
  about:
    'از سال ۱۳۹۰ تیم ابرلاین پیچیده‌ترین فرآیندهای کسب‌وکار را به سیستم‌های یکپارچه تبدیل کرده است؛ از ناوگان و تولید تا مالی، CRM و بازارهای تخصصی.',
  website: 'https://abarline.ir',
  email: 'info@abarline.ir',
  phone: '۰۹۳۸۵۰۴۰۸۱۲',
  hours: 'شنبه تا پنج‌شنبه، ۹ تا ۱۸',
  address: 'بابل، خیابان مطهری، اندیشه ۳، ساختمان آریان، طبقه ۴، واحد ۱۵',
  stats: [
    { value: '+۱۵', label: 'سال سابقه', desc: 'توسعه سیستم‌های سازمانی' },
    { value: '+۱۸', label: 'نمونه کار', desc: 'پیاده‌سازی برای کسب‌وکارها' },
    { value: '۱۳', label: 'محصول فعال', desc: 'ماژولار و یکپارچه' },
    { value: '۷', label: 'صنعت', desc: 'از تولید تا حمل‌ونقل و رستوران' },
  ],
};

export const IMG = {
  taxiPhones: '/data/01/01.png',
  taxiMap: '/data/01/02.png',
  taxiDash: '/data/01/03.png',
  courierA: '/data/02/01.png',
  courierB: '/data/02/02.png',
  courierScooter: '/data/02/03.png',
  waste: '/data/03/03.png',
  restaurant: '/data/04/03.png',
  shop: '/data/05/03.png',
  crmWheel: '/data/06/01.png',
  crmB: '/data/06/02.png',
  crmDash: '/data/06/03.png',
  legalCal: '/data/07/01.png',
  legalB: '/data/07/02.png',
  legalDash: '/data/07/03.png',
  estatePhones: '/data/08/01.png',
  estateB: '/data/08/02.png',
  estateC: '/data/08/03.png',
  goldBadge: '/data/09/01.png',
  goldB: '/data/09/02.png',
  goldHero: '/data/09/03.png',
  gymHero: '/data/10/01.png',
  gymB: '/data/10/02.png',
  gymDash: '/data/10/03.png',
} as const;

export type SlideTheme = 'dark' | 'light';
export type SlideLayout =
  | 'cover'
  | 'about'
  | 'pillars'
  | 'ecosystem'
  | 'hero'
  | 'pair'
  | 'gallery'
  | 'enterprise'
  | 'method'
  | 'close';

export interface ProductTile {
  id: string;
  title: string;
  tag: string;
  image: string;
  extras?: string[];
}

export interface PairItem {
  title: string;
  tag: string;
  bullets: string[];
  image: string;
}

export interface DeckSlide {
  id: string;
  layout: SlideLayout;
  theme: SlideTheme;
  kicker: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  images: string[];
  stats?: { value: string; label: string; desc: string }[];
  pillars?: { title: string; items: string[]; image: string }[];
  tiles?: ProductTile[];
  pair?: PairItem[];
  modules?: { title: string; text: string }[];
  steps?: { n: string; title: string; text: string }[];
  contacts?: { label: string; value: string }[];
}

export const PRODUCTS: ProductTile[] = [
  { id: 'taxi', title: 'تاکسی اینترنتی', tag: 'ناوگان', image: IMG.taxiDash, extras: [IMG.taxiPhones, IMG.taxiMap] },
  { id: 'courier', title: 'پیک موتوری', tag: 'لجستیک', image: IMG.courierScooter, extras: [IMG.courierA, IMG.courierB] },
  { id: 'waste', title: 'مدیریت پسماند', tag: 'شهر هوشمند', image: IMG.waste },
  { id: 'restaurant', title: 'رستوران و کافه', tag: 'خرده‌فروشی', image: IMG.restaurant },
  { id: 'shop', title: 'فروشگاه آنلاین', tag: 'تجارت', image: IMG.shop },
  { id: 'crm', title: 'باشگاه مشتریان', tag: 'CRM', image: IMG.crmDash, extras: [IMG.crmWheel, IMG.crmB] },
  { id: 'legal', title: 'CRM حقوقی', tag: 'تخصصی', image: IMG.legalDash, extras: [IMG.legalCal, IMG.legalB] },
  { id: 'estate', title: 'املاک و مستغلات', tag: 'تخصصی', image: IMG.estatePhones, extras: [IMG.estateB, IMG.estateC] },
  { id: 'gold', title: 'معاملات طلا', tag: 'بازار مالی', image: IMG.goldHero, extras: [IMG.goldBadge, IMG.goldB] },
  { id: 'gym', title: 'باشگاه ورزشی', tag: 'خدمات', image: IMG.gymHero, extras: [IMG.gymB, IMG.gymDash] },
];

export const PRODUCT_DETAILS: Record<
  string,
  { tagline: string; description: string; features: string[]; slideId: string }
> = {
  taxi: {
    tagline: 'سفر، راننده، پرداخت و دیسپچ در یک سیستم',
    description:
      'اکوسیستم تاکسی اینترنتی ابرلاین با اپ مسافر و راننده، نقشه زنده، VoIP و تخصیص هوشمند — بدون اپراتور و با گزارش لحظه‌ای.',
    features: [
      'مانیتورینگ زنده ناوگان روی نقشه',
      'اپ راننده و مسافر به‌همراه کیف پول',
      'تخصیص هوشمند و تماس امن VoIP',
      'سرویس مدارس، کمیسیون و چندشعبه وایت‌لیبل',
    ],
    slideId: 'taxi',
  },
  courier: {
    tagline: 'از ثبت سفارش تا تحویل نهایی',
    description: 'سامانه پیک موتوری برای شبکه‌های تحویل درون‌شهری، فروشگاه‌ها و رستوران‌ها با رهگیری زنده و تسویه خودکار.',
    features: ['اپ پیک و ثبت سفارش سازمانی', 'رهگیری مرسوله روی نقشه', 'گزارش مناطق و عملکرد ناوگان', 'تسویه و کمیسیون خودکار'],
    slideId: 'logistics',
  },
  waste: {
    tagline: 'شهروند، سفیر، جمع‌آوری زمان‌بندی‌شده',
    description: 'پلتفرم تفکیک پسماند خشک با اپ شهروند، اپ سفیر و پنل نظارتی برای شهرداری و پیمانکاران.',
    features: ['ثبت درخواست و انتخاب زمان', 'ارجاع هوشمند به سفیر', 'توزین و باشگاه مشتریان', 'گزارش تناژ و مناطق'],
    slideId: 'logistics',
  },
  restaurant: {
    tagline: 'سفارش دیجیتال، منو و عملیات سالن',
    description: 'بسته رستوران و کافه شامل منوی آنلاین، صندوق، کیوسک و باشگاه مشتریان برای یک شعبه یا زنجیره.',
    features: ['مدیریت میز، سفارش و منو', 'باشگاه وفاداری', 'اتصال به کیوسک و بیرون‌بر', 'گزارش عملیاتی صندوق'],
    slideId: 'commerce',
  },
  shop: {
    tagline: 'فروش آنلاین متصل به انبار و حسابداری',
    description: 'فروشگاه اینترنتی با سبد خرید، درگاه بانکی و همگام‌سازی موجودی برای خرده‌فروشی و پخش.',
    features: ['کاتالوگ و تنوع کالا', 'پرداخت امن شاپرک', 'اتصال به حسابداری و انبار', 'باشگاه و کمپین تخفیف'],
    slideId: 'commerce',
  },
  crm: {
    tagline: 'مشتری را به دارایی عملیاتی تبدیل کنید',
    description: 'CRM و باشگاه مشتریان برای پیگیری سرنخ، سگمنت‌بندی، امتیاز و کمپین پیامکی متصل به فروش.',
    features: ['پروفایل ۳۶۰ درجه مشتری', 'وفاداری و امتیاز', 'کمپین هدفمند', 'داشبورد فروش و پیگیری'],
    slideId: 'crm',
  },
  legal: {
    tagline: 'پرونده، موکل، موعد و حق‌الوکاله',
    description: 'CRM اختصاصی دفاتر وکالت برای پرونده الکترونیک، تقویم دادگاه و امور مالی موکل.',
    features: ['بایگانی پرونده و اسناد', 'هشدار مواعد دادرسی', 'مدیریت موکل و طرفین', 'حق‌الوکاله و گزارش وکلا'],
    slideId: 'crm',
  },
  estate: {
    tagline: 'بازار ملک به‌همراه CRM مشاور',
    description: 'پلتفرم املاک با فایل کارشناسی‌شده، جستجوی نقشه و تطبیق متقاضی با ملک برای آژانس‌ها.',
    features: ['ثبت فایل ساختاریافته', 'جستجو روی نقشه', 'CRM مشاور و سرنخ', 'محاسبه کمیسیون و قرارداد'],
    slideId: 'estate',
  },
  gold: {
    tagline: 'خرید و فروش لحظه‌ای شمش و سکه',
    description: 'پلتفرم معاملات طلا با قیمت زنده، کیف پول دوگانه و شبکه تحویل شعب برای بنکدار و خریدار خرد.',
    features: ['قفل لحظه‌ای قیمت', 'کیف پول ریال و طلا', 'احراز هویت و فاکتور رسمی', 'تسویه و شبکه نمایندگان'],
    slideId: 'gold',
  },
  gym: {
    tagline: 'عضو، سانس، مربی و تردد',
    description: 'اتوماسیون باشگاه و مجموعه ورزشی از شهریه و رزرو کلاس تا اتصال گیت ورود.',
    features: ['اشتراک و یادآوری تمدید', 'رزرو سانس و مربی', 'حسابداری داخلی و بوفه', 'گزارش ریزش و درآمد'],
    slideId: 'gym',
  },
};

export const DECK: DeckSlide[] = [
  {
    id: 'cover',
    layout: 'cover',
    theme: 'dark',
    kicker: 'رزومه و ارائه شرکتی · abarline.ir',
    title: 'ابرلاین',
    subtitle: COMPANY.slogan,
    images: [IMG.taxiDash, IMG.restaurant, IMG.goldHero, IMG.estatePhones, IMG.gymHero, IMG.legalDash],
    stats: COMPANY.stats,
  },
  {
    id: 'about',
    layout: 'about',
    theme: 'dark',
    kicker: 'هویت شرکت',
    title: 'شریک سیستم‌سازی کسب‌وکار',
    subtitle: COMPANY.lead,
    bullets: [
      COMPANY.about,
      '۱۳ محصول فعال، قابل توسعه و یکپارچه با پشتیبانی اختصاصی.',
      'تمرکز روی مانیتورینگ لحظه‌ای، معماری ماژولار و کار چندکاربره.',
    ],
    images: [IMG.taxiPhones, IMG.goldBadge],
    stats: COMPANY.stats,
  },
  {
    id: 'pillars',
    layout: 'pillars',
    theme: 'light',
    kicker: 'چگونه کار می‌کنیم',
    title: 'سه مسیر همکاری با ابرلاین',
    images: [IMG.legalCal, IMG.crmWheel, IMG.taxiMap],
    pillars: [
      {
        title: 'مهندسی نرم‌افزار اختصاصی',
        items: ['تحلیل فرآیند کسب‌وکار', 'معماری مقیاس‌پذیر', 'توسعه وب و اپ'],
        image: IMG.legalCal,
      },
      {
        title: 'محصولات سازمانی چابک',
        items: ['استقرار مرحله‌ای', 'پنل فارسی آماده', 'ماژول سفارشی'],
        image: IMG.crmWheel,
      },
      {
        title: 'استراتژی و تحول دیجیتال',
        items: ['نقشه راه ماژول‌ها', 'زیرساخت و استقرار', 'بهینه‌سازی عملیات'],
        image: IMG.taxiMap,
      },
    ],
  },
  {
    id: 'ecosystem',
    layout: 'ecosystem',
    theme: 'light',
    kicker: 'سبد محصول',
    title: 'اکوسیستم نرم‌افزارهای عملیاتی',
    subtitle: 'هر کاشی یک محصول واقعی است — با رابط و ماکاپ موجود در پروژه.',
    images: PRODUCTS.map((p) => p.image),
    tiles: PRODUCTS,
  },
  {
    id: 'taxi',
    layout: 'hero',
    theme: 'light',
    kicker: 'حمل‌ونقل هوشمند',
    title: 'نرم‌افزار تاکسی اینترنتی',
    subtitle: 'مدیریت سفرها، رانندگان و پرداخت‌ها در یک سیستم یکپارچه.',
    bullets: [
      'مانیتورینگ زنده ناوگان روی نقشه',
      'اپ راننده و مسافر + کیف پول و کمیسیون',
      'حذف اپراتور با تخصیص هوشمند و VoIP',
      'سرویس مدارس و معماری وایت‌لیبل چندشعبه',
    ],
    images: [IMG.taxiDash, IMG.taxiPhones, IMG.taxiMap],
  },
  {
    id: 'logistics',
    layout: 'pair',
    theme: 'light',
    kicker: 'لجستیک شهری',
    title: 'پیک موتوری و مدیریت پسماند',
    images: [IMG.courierScooter, IMG.waste, IMG.courierA, IMG.courierB],
    pair: [
      {
        title: 'سامانه پیک موتوری',
        tag: 'تحویل درون‌شهری',
        bullets: ['اپ پیک و ثبت سفارش', 'رهگیری مرسوله روی نقشه', 'گزارش منطقه و تسویه ناوگان'],
        image: IMG.courierScooter,
      },
      {
        title: 'سامانه پسماند شهری',
        tag: 'شهروند ← سفیر ← جمع‌آوری',
        bullets: ['درخواست زمان‌بندی‌شده شهروند', 'ارجاع مأموریت به سفیر', 'گزارش تناژ و باشگاه امتیاز'],
        image: IMG.waste,
      },
    ],
  },
  {
    id: 'commerce',
    layout: 'pair',
    theme: 'light',
    kicker: 'تجارت و خدمات',
    title: 'رستوران، کافه و فروشگاه آنلاین',
    images: [IMG.restaurant, IMG.shop],
    pair: [
      {
        title: 'مدیریت رستوران و کافه',
        tag: 'سفارش · منو · کیوسک',
        bullets: ['سفارش سالن و منوی دیجیتال', 'باشگاه مشتریان و وفاداری', 'اتصال کیوسک و گزارش صندوق'],
        image: IMG.restaurant,
      },
      {
        title: 'فروشگاه آنلاین',
        tag: 'فروش · انبار · حسابداری',
        bullets: ['کاتالوگ و پرداخت امن', 'همگام‌سازی موجودی', 'باشگاه و کمپین تخفیف'],
        image: IMG.shop,
      },
    ],
  },
  {
    id: 'crm',
    layout: 'gallery',
    theme: 'light',
    kicker: 'ارتباط با مشتری',
    title: 'CRM عمومی و CRM حقوقی',
    subtitle: 'از باشگاه مشتریان خرده‌فروشی تا پرونده و موعد دفتر وکالت.',
    bullets: [
      'پروفایل مشتری، امتیاز و کمپین هدفمند',
      'پرونده حقوقی، موکل و هشدار مواعد دادگاه',
      'داشبورد پیگیری، پیش‌فاکتور و گزارش فروش',
    ],
    images: [IMG.crmDash, IMG.crmWheel, IMG.legalDash, IMG.legalCal],
  },
  {
    id: 'estate',
    layout: 'hero',
    theme: 'light',
    kicker: 'بازار ملک',
    title: 'پلتفرم املاک و CRM مشاورین',
    subtitle: 'فایل کارشناسی‌شده، جستجوی نقشه و تطبیق متقاضی با ملک.',
    bullets: [
      'ثبت آگهی با مشخصات ساختاریافته ایرانی',
      'جستجو و فیلتر روی نقشه',
      'CRM سرنخ، بازدید و کمیسیون',
      'بایگانی دیجیتال و سطح دسترسی مشاوران',
    ],
    images: [IMG.estatePhones, IMG.estateB, IMG.estateC],
  },
  {
    id: 'gold',
    layout: 'hero',
    theme: 'dark',
    kicker: 'بازار مالی',
    title: 'معاملات آنلاین طلا و شمش',
    subtitle: 'قیمت زنده، فاکتور رسمی و سرمایه‌گذاری خرد تا بنکداری.',
    bullets: [
      'قفل لحظه‌ای مظنه و حذف خطای دفترنویسی',
      'کیف پول ریالی و طلایی با احراز هویت',
      'شبکه توزیع B2B و تحویل شعب',
      'فاکتور سیستمی و تسویه شفاف',
    ],
    images: [IMG.goldHero, IMG.goldBadge, IMG.goldB],
  },
  {
    id: 'gym',
    layout: 'hero',
    theme: 'light',
    kicker: 'ورزش و باشگاه',
    title: 'نرم‌افزار مدیریت مجموعه ورزشی',
    subtitle: 'شهریه، سانس، مربی و گزارش مالی — بدون پیگیری دستی.',
    bullets: [
      'ثبت عضو، تمدید و یادآوری خودکار',
      'رزرو کلاس و محاسبه کمیسیون مربی',
      'بوفه، پرداخت و سوابق مالی',
      'داشبورد درآمد و کاهش ریزش',
    ],
    images: [IMG.gymHero, IMG.gymDash, IMG.gymB],
  },
  {
    id: 'enterprise',
    layout: 'enterprise',
    theme: 'light',
    kicker: 'عملیات و مالی سازمان',
    title: 'تولید، بها، حسابداری و تدارکات',
    subtitle: 'ماژول‌های سازمانی سایت ابرلاین برای کارخانه، مالی و پخش.',
    images: [IMG.crmDash, IMG.shop, IMG.taxiDash],
    modules: [
      { title: 'برنامه‌ریزی تولید', text: 'زمان‌بندی خط، همگام‌سازی سفارش و پایش کف کارخانه.' },
      { title: 'بهای تمام‌شده', text: 'مواد، دستمزد، استهلاک و سربار — بدون اکسل.' },
      { title: 'حسابداری ابرلاین', text: 'فاکتور، چک، حقوق و سود و زیان لحظه‌ای.' },
      { title: 'پیش‌فاکتور و تدارکات', text: 'از صدور تا پکت‌لیست و ارسال در یک جریان.' },
      { title: 'مانیتورینگ بازاریاب', text: 'لوکیشن زنده، ورود و خروج و پوشش مناطق.' },
    ],
  },
  {
    id: 'method',
    layout: 'method',
    theme: 'dark',
    kicker: 'روش استقرار',
    title: 'از پایلوت تا مقیاس سازمانی',
    subtitle: 'پیاده‌سازی مرحله‌ای، متناسب با اندازه کسب‌وکار — بدون قفل شدن در قالب محدود.',
    images: [IMG.legalCal, IMG.taxiPhones],
    steps: [
      { n: '۰۱', title: 'کشف و معماری', text: 'فرآیند را می‌خوانیم، ماژول‌ها را اولویت می‌دهیم و MVP را مشخص می‌کنیم.' },
      { n: '۰۲', title: 'استقرار و آموزش', text: 'راه‌اندازی سریع، پنل فارسی، مهاجرت داده و آموزش تیم شما.' },
      { n: '۰۳', title: 'یکپارچگی و رشد', text: 'اتصال ماژول‌ها، پشتیبانی واقعی و توسعه سفارشی بعد از ورود به بازار.' },
    ],
  },
  {
    id: 'close',
    layout: 'close',
    theme: 'dark',
    kicker: 'گام بعد',
    title: 'برای دمو یا استقرار، همین‌جا هماهنگ کنیم',
    subtitle: 'پشتیبانی اختصاصی · شنبه تا پنج‌شنبه ۹ تا ۱۸',
    images: [IMG.taxiDash, IMG.restaurant, IMG.goldHero, IMG.gymHero],
    contacts: [
      { label: 'وب‌سایت', value: 'abarline.ir' },
      { label: 'ایمیل', value: COMPANY.email },
      { label: 'تلفن', value: COMPANY.phone },
      { label: 'دفتر', value: COMPANY.address },
    ],
  },
];

export const SLIDE_COUNT = DECK.length;
