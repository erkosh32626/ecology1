export interface SlideBlockMeta {
  id: string;
  number: number;
  shortLabel: string;
  slideBadge: string;
  title: string;
}

export interface StatIndicator {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  unit: string;
  description: string;
  contextMetric: string;
  sourceNote: string;
}

export interface CauseThesis {
  title: string;
  description: string;
  metricHighlight: string;
}

export interface CauseBlock {
  blockNumber: number;
  id: string;
  causeIndex: number;
  causeLabel: string;
  title: string;
  summary: string;
  accentColor: string;
  theses: CauseThesis[];
  keyIndicatorLabel: string;
  keyIndicatorValue: string;
}

export interface DangerRegion {
  id: 'africa' | 'middle-east-asia' | 'central-america-caribbean';
  title: string;
  countries: string;
  description: string;
  affectedMillions: number;
  severityLevel: string;
  primaryDrivers: string[];
  coordinates: { cx: number; cy: number; rx: number; ry: number };
  countryPins: Array<{
    name: string;
    x: number;
    y: number;
    acuteMillions: string;
    labelDx: number;
    labelDy: number;
  }>;
}

export interface SolutionDirection {
  id: string;
  title: string;
  description: string;
  potentialSavedMillions: number;
  wasteReductionPercent: number;
  implementationTimeline: string;
  examples: string[];
}

export const SLIDE_BLOCKS: SlideBlockMeta[] = [
  {
    id: 'block-1',
    number: 1,
    shortLabel: 'Басты бет',
    slideBadge: '1-блок · Титул',
    title: 'Әлемдегі аштық мәселесі және азық-түлік тапшылығының себептері',
  },
  {
    id: 'block-2',
    number: 2,
    shortLabel: 'Статистика',
    slideBadge: '2-блок · Жағдайдың ауқымы',
    title: 'Бүгінгі жаһандық көрініс',
  },
  {
    id: 'block-3',
    number: 3,
    shortLabel: 'Климат',
    slideBadge: '3-блок · 1-себеп — Климаттың өзгеруі',
    title: 'Табиғаттың тосын мінезі және құрғақшылық',
  },
  {
    id: 'block-4',
    number: 4,
    shortLabel: 'Қақтығыстар',
    slideBadge: '4-блок · 2-себеп — Соғыстар мен қақтығыстар',
    title: 'Геосаяси тұрақсыздық — аштықтың басты қозғаушысы',
  },
  {
    id: 'block-5',
    number: 5,
    shortLabel: 'Экономика',
    slideBadge: '5-блок · 3-себеп — Экономика және қымбатшылық',
    title: 'Инфляция және кедейлік тұзағы',
  },
  {
    id: 'block-6',
    number: 6,
    shortLabel: 'Ысырап',
    slideBadge: '6-блок · 4-себеп — Азық-түлік ысырабы (Food Waste)',
    title: 'Өндірілген тағамның босқа кетуі',
  },
  {
    id: 'block-7',
    number: 7,
    shortLabel: 'География',
    slideBadge: '7-блок · Ең қауіпті аймақтар',
    title: 'Қауіпті аймақтар картасы',
  },
  {
    id: 'block-8',
    number: 8,
    shortLabel: 'Шешімдер',
    slideBadge: '8-блок · Шешу жолдары мен инновациялар',
    title: 'Дағдарыстан қалай шығамыз?',
  },
  {
    id: 'block-9',
    number: 9,
    shortLabel: 'Қорытынды',
    slideBadge: '9-блок · Қорытынды (Үндеу)',
    title: 'Азық-түлік — адамның негізгі құқығы',
  },
];

export const HERO_CONTENT = {
  title: 'Әлемдегі аштық мәселесі және азық-түлік тапшылығының себептері',
  subtitle: 'XXI ғасырдың жаһандық дағдарысы: себептері, салдары және оны жеңу жолдары.',
  ctaText: 'Мәселені зерттеу ↓',
  videoUrl:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4',
};

export const GLOBAL_STATS: StatIndicator[] = [
  {
    id: 'stat-1',
    label: '1-көрсеткіш',
    value: '~735 миллион адам',
    numericValue: 735,
    unit: 'млн адам',
    description: 'әлем бойынша созылмалы аштыққа ұшыраған.',
    contextMetric: 'Әрбір 11-ші адам күн сайын тамақ тапшылығын сезінеді',
    sourceNote: 'БҰҰ ФАО / ДДҰ жаһандық есебі',
  },
  {
    id: 'stat-2',
    label: '2-көрсеткіш',
    value: '1/3 бөлігі',
    numericValue: 33.3,
    unit: '% өнім',
    description: 'жер жүзінде өндірілетін барлық азық-түліктің тұтынылмай қоқысқа кету көрсеткіші.',
    contextMetric: 'Жылына ~1.3 миллиард тонна жарамды азық-түлік рәсуа болады',
    sourceNote: 'UNEP Food Waste Index деректері',
  },
  {
    id: 'stat-3',
    label: '3-көрсеткіш',
    value: '3.1 миллиард адам',
    numericValue: 3100,
    unit: 'млрд адам',
    description: 'толыққанды, сапалы тамақтануға қаржысы жетпейтін халық.',
    contextMetric: 'Әлем халқының ~38%-ы құнарлы рационға қол жеткізе алмайды',
    sourceNote: 'SOFI жаһандық азық-түлік қауіпсіздігі мониторингі',
  },
];

export const CAUSE_BLOCKS: CauseBlock[] = [
  {
    blockNumber: 3,
    id: 'block-3',
    causeIndex: 1,
    causeLabel: '1-себеп — Климаттың өзгеруі',
    title: 'Табиғаттың тосын мінезі және құрғақшылық',
    summary:
      'Экстремалды ауа райы мен экожүйенің тозуы дәстүрлі егіншілік аймақтарын жарамсыз етіп, өнім көлемін қысқартуда.',
    accentColor: 'amber',
    keyIndicatorLabel: 'Құрғақшылықтан зардап шеккен егістік',
    keyIndicatorValue: '40%-ға дейін өнім жоғалту',
    theses: [
      {
        title: 'Жаһандық жылыну',
        description:
          'Ұзаққа созылған құрғақшылық пен топырақтың құнарсыздануы егін өнімділігін күрт азайтты.',
        metricHighlight: '+1.45°C орташа температура ауытқуы',
      },
      {
        title: 'Табиғи апаттар',
        description:
          'Су тасқындары мен дауылдар дайын егістіктер мен инфрақұрылымды жояды.',
        metricHighlight: 'Соңғы 20 жылда климаттық апаттар 2 есе артты',
      },
      {
        title: 'Су тапшылығы',
        description:
          'Ауыл шаруашылығына қажетті тұщы су көздерінің тартылуы.',
        metricHighlight: 'Тұщы судың 70%-ы агросекторға жұмсалады',
      },
    ],
  },
  {
    blockNumber: 4,
    id: 'block-4',
    causeIndex: 2,
    causeLabel: '2-себеп — Соғыстар мен қақтығыстар',
    title: 'Геосаяси тұрақсыздық — аштықтың басты қозғаушысы',
    summary:
      'Жедел аштыққа ұшыраған адамдардың 60%-дан астамы қарулы қақтығыс пен тұрақсыздық ошақтарында өмір сүреді.',
    accentColor: 'rose',
    keyIndicatorLabel: 'Қақтығыс аймақтарындағы аштық үлесі',
    keyIndicatorValue: '65% жедел дағдарыс ошақтары',
    theses: [
      {
        title: 'Ауыл шаруашылығының тоқтауы',
        description:
          'Қарулы қақтығыс жүріп жатқан аймақтарда диқандар жер өңдей алмайды, инфрақұрылым қирайды.',
        metricHighlight: 'Егістік алқаптарының миналануы мен тозуы',
      },
      {
        title: 'Босқындар дағдарысы',
        description:
          'Миллиондаған адам баспанасы мен күнкөріс көзінен айырылып, гуманитарлық көмекке тәуелді болады.',
        metricHighlight: '110+ млн мәжбүрлі қоныс аударушылар',
      },
      {
        title: 'Блокада',
        description:
          'Сауда жолдары жабылып, азық-түлік пен дәрі-дәрмек тасымалы тоқтайды.',
        metricHighlight: 'Теңіз порттары мен дәліздердің шектелуі',
      },
    ],
  },
  {
    blockNumber: 5,
    id: 'block-5',
    causeIndex: 3,
    causeLabel: '3-себеп — Экономика және қымбатшылық',
    title: 'Инфляция және кедейлік тұзағы',
    summary:
      'Азық-түлік дүкен сөрелерінде болса да, бағаның шарықтауы миллиондаған отбасыны ең қажетті тағамнан айырады.',
    accentColor: 'sky',
    keyIndicatorLabel: 'Табыстың тамаққа жұмсалатын бөлігі',
    keyIndicatorValue: 'Кедей елдерде 60–75%-ға дейін',
    theses: [
      {
        title: 'Бағаның өсуі',
        description:
          'Жанармай мен тыңайтқыш қымбаттаған сайын өнім бағасы шарықтап, халықтың сатып алу қабілеті төмендейді.',
        metricHighlight: 'Агроөндіріс шығындарының тікелей өсуі',
      },
      {
        title: 'Экономикалық теңсіздік',
        description:
          'Бай және дамушы елдер арасындағы азық-түлікке қолжетімділік алшақтығы.',
        metricHighlight: 'Тұтыну мүмкіндігіндегі 8 есеге дейінгі айырмашылық',
      },
      {
        title: 'Кедей елдердің қарызы',
        description:
          'Дағдарыстағы мемлекеттердің азық-түлік импортына валютасы жетпейді.',
        metricHighlight: 'Импортқа тәуелді 50+ төмен табысты мемлекет',
      },
    ],
  },
  {
    blockNumber: 6,
    id: 'block-6',
    causeIndex: 4,
    causeLabel: '4-себеп — Азық-түлік ысырабы (Food Waste)',
    title: 'Өндірілген тағамның босқа кетуі',
    summary:
      'Әлемде жеткілікті тағам өндіріледі, бірақ тұтыну мәдениеті мен инфрақұрылым кемшілігінен миллиардтаған тонна өнім жойылады.',
    accentColor: 'emerald',
    keyIndicatorLabel: 'Жылдық жаһандық ысырап құны',
    keyIndicatorValue: '~$1 триллион экономикалық шығын',
    theses: [
      {
        title: 'Дамыған елдерде',
        description:
          'Сауда желілері мен мейрамханаларда, үйлерде жарамды тамақтар тонналап қоқысқа тасталады.',
        metricHighlight: 'Тұтынушылық деңгейдегі 60% тағам қалдығы',
      },
      {
        title: 'Дамушы елдерде',
        description:
          'Дұрыс қоймалардың, тоңазытқыштар мен логистиканың жоқтығынан өнім тұтынушыға жетпей шіриді.',
        metricHighlight: 'Жиын-терім мен тасымалда 40%-ға дейін шығын',
      },
    ],
  },
];

export const DANGER_REGIONS: DangerRegion[] = [
  {
    id: 'africa',
    title: 'Сахараның оңтүстігіндегі Африка (Сомали, Судан, Чад)',
    countries: 'Сомали, Судан, Чад',
    description: 'Құрғақшылық пен қарулы соғыстар қатар келген ең ауыр өңір.',
    affectedMillions: 282,
    severityLevel: 'Төтенше (IPC 4–5 деңгейі)',
    primaryDrivers: ['Көпжылдық құрғақшылық', 'Қарулы қақтығыстар', 'Босқындар легі'],
    coordinates: { cx: 535, cy: 265, rx: 85, ry: 72 },
    countryPins: [
      { name: 'Судан', x: 548, y: 228, acuteMillions: '25.6 млн', labelDx: 10, labelDy: -22 },
      { name: 'Сомали', x: 590, y: 278, acuteMillions: '6.9 млн', labelDx: 10, labelDy: -11 },
      { name: 'Чад', x: 495, y: 248, acuteMillions: '5.7 млн', labelDx: -126, labelDy: -11 },
    ],
  },
  {
    id: 'middle-east-asia',
    title: 'Таяу Шығыс пен Азия (Йемен, Ауғанстан, Сирия)',
    countries: 'Йемен, Ауғанстан, Сирия',
    description: 'Жылдарға созылған гуманитарлық дағдарыс.',
    affectedMillions: 68,
    severityLevel: 'Дағдарыстық (IPC 3–4 деңгейі)',
    primaryDrivers: ['Гуманитарлық блокада', 'Инфрақұрылымның қирауы', 'Валюта құнсыздануы'],
    coordinates: { cx: 625, cy: 190, rx: 80, ry: 52 },
    countryPins: [
      { name: 'Йемен', x: 592, y: 226, acuteMillions: '17.6 млн', labelDx: 10, labelDy: -11 },
      { name: 'Сирия', x: 558, y: 170, acuteMillions: '12.9 млн', labelDx: -128, labelDy: -14 },
      { name: 'Ауғанстан', x: 658, y: 185, acuteMillions: '15.8 млн', labelDx: 10, labelDy: -14 },
    ],
  },
  {
    id: 'central-america-caribbean',
    title: 'Орталық Америка және Кариб бассейні (Гаити)',
    countries: 'Гаити және Құрғақ дәліз елдері',
    description: 'Экономикалық күйзеліс пен табиғи апаттар салдары.',
    affectedMillions: 19,
    severityLevel: 'Жоғары қауіпті (IPC 3–4 деңгейі)',
    primaryDrivers: ['Гиперинфляция', 'Тропикалық дауылдар', 'Ішкі тұрақсыздық'],
    coordinates: { cx: 275, cy: 225, rx: 68, ry: 48 },
    countryPins: [
      { name: 'Гаити', x: 292, y: 214, acuteMillions: '5.4 млн', labelDx: 10, labelDy: -18 },
      { name: 'Гватемала', x: 236, y: 226, acuteMillions: '4.3 млн', labelDx: -134, labelDy: -14 },
      { name: 'Гондурас', x: 256, y: 244, acuteMillions: '2.6 млн', labelDx: 10, labelDy: 4 },
    ],
  },
];

export const SOLUTION_DIRECTIONS: SolutionDirection[] = [
  {
    id: 'smart-agro',
    title: 'Smart-агротехнологиялар',
    description:
      'Тамшылатып суару, тік фермалар (vertical farming) және құрғақшылыққа төзімді тұқымдар.',
    potentialSavedMillions: 210,
    wasteReductionPercent: 18,
    implementationTimeline: 'Су шығынын 60%-ға дейін үнемдейді',
    examples: ['Тамшылатып суару жүйелері', 'Тік фермалар (Vertical Farming)', 'Құрғақшылыққа төзімді био-тұқымдар'],
  },
  {
    id: 'zero-waste',
    title: 'Ысырапты тоқтату мәдениеті',
    description:
      'Тамақ қалдықтарын азайту, қалған тағамды мұқтаж жандарға тарату жүйелері.',
    potentialSavedMillions: 195,
    wasteReductionPercent: 32,
    implementationTimeline: 'Қоқысқа кететін 1/3 өнімді қысқартады',
    examples: ['Фудшеринг және азық-түлік банктері', 'Дүкендер мен мейрамханалардағы қалдық аудиті', 'Саналы тұтыну стандарттары'],
  },
  {
    id: 'modern-logistics',
    title: 'Логистиканы жаңғырту',
    description: 'Өнімді сақтайтын заманауи қоймалар салу.',
    potentialSavedMillions: 165,
    wasteReductionPercent: 25,
    implementationTimeline: 'Өнімнің шіруін 45%-ға төмендетеді',
    examples: ['Күн энергиясымен жұмыс істейтін тоңазытқыш қоймалар', 'Агро-логистикалық тізбектерді цифрландыру', 'Фермерлерді тікелей нарықпен байланыстыру'],
  },
  {
    id: 'global-aid',
    title: 'Халықаралық көмек',
    description:
      'БҰҰ (WFP) бағдарламалары мен әлемдік гуманитарлық қорларды қаржыландыру.',
    potentialSavedMillions: 165,
    wasteReductionPercent: 15,
    implementationTimeline: 'Төтенше аймақтарда жедел құтқару',
    examples: ['БҰҰ Дүниежүзілік азық-түлік бағдарламасы (WFP)', 'Мектептегі тегін тамақтандыру қорлары', 'Дағдарыс аймақтарына гуманитарлық дәліздер'],
  },
];

export const CONCLUSION_CONTENT = {
  blockTitle: 'Азық-түлік — адамның негізгі құқығы',
  quote:
    '«Аштықты тек тамақ тарату арқылы емес, әділ экономика құру, бейбітшілік орнату және табиғатты сақтау арқылы ғана түбегейлі жеңуге болады.»',
  attribution: 'Жаһандық азық-түлік қауіпсіздігі манифесі · 9-блок: Қорытынды (Үндеу)',
  buttonPrimary: 'Басына оралу',
  buttonSecondary: 'Бөлісу',
  buttonCombinedLabel: 'Басына оралу / Бөлісу',
  rainbowAssetUrl:
    'https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png',
  cloudAssetUrl:
    'https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png',
};

export function clamp(min: number, max: number, value: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

export interface ParallaxTargets {
  progress: number;
  rainbowY: number;
  leftCloudX: number;
  rightCloudX: number;
  cloudY: number;
  cloudOpacity: number;
}

export function computeParallaxTargets(
  windowHeight: number,
  rectTop: number,
  rectHeight: number
): ParallaxTargets {
  const denominator = windowHeight + rectHeight;
  const progress =
    denominator <= 0 ? 0 : clamp(0, 1, (windowHeight - rectTop) / denominator);

  // Rainbow moves vertically from +120px to -160px based on scroll progress
  const rainbowY = 120 + progress * (-160 - 120);

  // Clouds in view when progress is between 0.12 and 0.92
  const inView = progress >= 0.12 && progress <= 0.92;
  const leftCloudX = inView ? 0 : -200;
  const rightCloudX = inView ? 0 : 200;
  const cloudY = progress * -50;
  const cloudOpacity = inView ? 1 : 0;

  return {
    progress,
    rainbowY,
    leftCloudX,
    rightCloudX,
    cloudY,
    cloudOpacity,
  };
}

export interface SolutionImpactResult {
  activeCount: number;
  totalSavedMillions: number;
  remainingHungryMillions: number;
  wasteReductionPercent: number;
  reliefPercentage: number;
}

export function calculateSolutionImpact(
  activeSolutionIds: string[],
  intensityPercent: number = 100
): SolutionImpactResult {
  const clampedIntensity = clamp(0, 100, intensityPercent) / 100;
  const selected = SOLUTION_DIRECTIONS.filter((item) =>
    activeSolutionIds.includes(item.id)
  );

  const rawSaved = selected.reduce(
    (sum, item) => sum + item.potentialSavedMillions,
    0
  );
  const rawWaste = selected.reduce(
    (sum, item) => sum + item.wasteReductionPercent,
    0
  );

  const totalSavedMillions = Math.round(rawSaved * clampedIntensity);
  const remainingHungryMillions = Math.max(0, 735 - totalSavedMillions);
  const wasteReductionPercent = Math.round(rawWaste * clampedIntensity);
  const reliefPercentage = Math.min(
    100,
    Math.round((totalSavedMillions / 735) * 100)
  );

  return {
    activeCount: selected.length,
    totalSavedMillions,
    remainingHungryMillions,
    wasteReductionPercent,
    reliefPercentage,
  };
}
