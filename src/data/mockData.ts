export interface MinimalProject {
  id: string;
  categoryKey: 'commercial' | 'estates' | 'industrial';
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  location: string;
  locationAr: string;
  year: string;
  area: string;
  value: string;
  image: string;
  description: string;
  descriptionAr: string;
  specs: { label: string; value: string }[];
}

export const COMPANY = {
  name: 'TAMEER Group',
  nameAr: 'مجموعة تعمير',
  fullNameAr: 'مؤسسة تعمير المساحة للمقاولات',
  fullNameEn: 'Tameer AlMesaha Establishment',
  tagline: 'Precision Construction, Excellence in Execution',
  taglineAr: 'مؤسسة تعمير للمقاولات العامة',
  statement: '100% Saudi-owned general contracting establishment registered in Dammam. Delivering integrated construction, steel buildings, high-end finishing, and engineering services across Saudi Arabia and the Gulf.',
  statementAr: 'مؤسسة وطنية سعودية 100٪ مسجلة بالدمام، رائدة في المقاولات العامة المتكاملة، المباني والهياكل الحديدية، التشطيبات والديكورات الفاخرة، والحلول الإنشائية الكبرى في المملكة ودول الخليج.',
  whatsappUrl: 'https://wa.me/966506077322',
  instagramUrl: 'https://www.instagram.com/tameer_almesaha_contracting?igsh=MWw5Z21qbDlsejJyYg==',
  email: 'info@tameeronline.com',
  phone: '+966 50 607 7322',
  phoneAlt: '+966 54 319 3920',
  phoneFaizal: '+966 56 507 3380',
  tel: '013 844 1247',
  pCode: '32254',
  poBox: '8468',
  address: 'Ali bin Abi Talib St., Al-Jameean District (South of Girls College), P.O. Box 8468, P.Code 32254, Dammam, Kingdom of Saudi Arabia',
  addressAr: 'شارع علي بن أبي طالب، حي الجامعيين (جنوب كلية البنات)، ص.ب 8468، الرمز البريدي 32254، الدمام، المملكة العربية السعودية',
};

export const CURATED_PROJECTS: MinimalProject[] = [
  {
    id: 'ministry-of-finance-salwa',
    categoryKey: 'commercial',
    title: 'Ministry of Finance Administrative Complex',
    titleAr: 'مشروع وزارة المالية - مباني إدارية متعددة',
    category: 'Government Administration',
    categoryAr: 'مشاريع حكومية وإدارية',
    location: 'Salwa Town, KSA',
    locationAr: 'مدينة سلوى، المملكة العربية السعودية',
    year: '2024',
    area: '45,000 m²',
    value: 'SAR 120M',
    image: '/ministry-of-finance.jpg',
    description: 'Construction skeleton of multiple administrative government buildings as specialized subcontractor, adhering strictly to sovereign building codes and highest structural engineering specifications.',
    descriptionAr: 'تنفيذ الهيكل الإنشائي العظم لمجموعة مباني إدارية حكومية تابعة لوزارة المالية كمقاول باطن متخصص وفق أعلى معايير الجودة والسلامة.',
    specs: [
      { label: 'Client / Authority', value: 'Ministry of Finance' },
      { label: 'Scope of Work', value: 'Construction Skeleton of Buildings' },
      { label: 'Project Value', value: 'SAR 120,000,000' },
      { label: 'Location', value: 'Salwa Border Town' }
    ]
  },
  {
    id: 'al-noor-commercial-residential',
    categoryKey: 'commercial',
    title: 'Al-Noor Multi-Story Commercial & Residential Center',
    titleAr: 'برج النور التجاري والسكني متعدد الأدوار',
    category: 'Commercial & Mixed-Use',
    categoryAr: 'مباني تجارية وسكنية',
    location: 'Al-Noor District, Dammam',
    locationAr: 'حي النور، الدمام',
    year: '2024',
    area: '16,500 m²',
    value: 'SAR 35M',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
    description: 'Comprehensive general contracting including foundation, concrete skeleton, high-end facade cladding, MEP installations, and surrounding site development in prime Dammam district.',
    descriptionAr: 'تنفيذ متكامل يشمل أعمال الإنشاء، التشطيبات الفاخرة، الأعمال الكهروميكانيكية (MEP)، وتطوير البنية التحتية والموقع العام.',
    specs: [
      { label: 'Scope of Work', value: 'Construction, Finishing, MEP & Site Works' },
      { label: 'Project Value', value: 'SAR 35,000,000' },
      { label: 'District', value: 'Al-Noor, Dammam' },
      { label: 'Compliance', value: 'Saudi Building Code (SBC)' }
    ]
  },
  {
    id: 'rayan-residential-villas-33',
    categoryKey: 'estates',
    title: 'Al-Rayan Residential Villa Compound (33 Units)',
    titleAr: 'مجمع فلل حي الريان السكني (٣٣ فيلا)',
    category: 'Residential Development',
    categoryAr: 'مشاريع مجمعات سكنية',
    location: 'Al-Rayan District, Dammam',
    locationAr: 'حي الريان، الدمام',
    year: '2023',
    area: '22,000 m²',
    value: 'SAR 26.4M',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    description: 'High-speed structural skeleton execution for 33 residential villa units in Al-Rayan district with precision reinforced concrete framing and strict quality control.',
    descriptionAr: 'تنفيذ أعمال العظم والهيكل الإنشائي لـ 33 فيلا سكنية بحي الريان مع الالتزام التام بالجداول الزمنية وضبط الجودة الخرسانية.',
    specs: [
      { label: 'Scope of Work', value: 'Construction Skeleton of Units' },
      { label: 'Unit Count', value: '33 Residential Units' },
      { label: 'Project Value', value: 'SAR 26,400,000' },
      { label: 'Location', value: 'Al-Rayan, Dammam' }
    ]
  },
  {
    id: 'al-doha-residential-villas-22',
    categoryKey: 'estates',
    title: 'Al-Doha Residential Villa Compound (22 Units)',
    titleAr: 'مشروع فلل الدوحة السكنية (٢٢ فيلا)',
    category: 'Residential Development',
    categoryAr: 'مشاريع سكنية',
    location: 'Al-Doha District, Dammam',
    locationAr: 'حي الدوحة، الدمام',
    year: '2023',
    area: '15,000 m²',
    value: 'SAR 14M',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85',
    description: 'Fast-track structural skeleton construction for 22 residential villa units in prime residential corridor of Al-Doha district.',
    descriptionAr: 'تنفيذ أعمال الهيكل الإنشائي العظم لـ 22 فيلا سكنية بحي الدوحة مع التزام دقيق بأصول الصنعة والمواصفات الهندسية.',
    specs: [
      { label: 'Scope of Work', value: 'Construction Skeleton of Units' },
      { label: 'Unit Count', value: '22 Villa Units' },
      { label: 'Project Value', value: 'SAR 14,000,000' },
      { label: 'Location', value: 'Al-Doha, Dammam' }
    ]
  },
  {
    id: 'al-dabab-multi-story-buildings',
    categoryKey: 'commercial',
    title: 'Al-Dabab Commercial & Residential Towers (4 Units)',
    titleAr: 'مباني الضباب التجارية والسكنية (٤ عمائر)',
    category: 'Commercial & Residential',
    categoryAr: 'أبراج ومباني تجارية وسكنية',
    location: 'Al-Dabab District, Dammam',
    locationAr: 'حي الضباب، الدمام',
    year: '2024',
    area: '28,000 m²',
    value: 'SAR 60M',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
    description: 'Turnkey execution of 4 multi-story commercial and residential buildings including full structural construction, luxury interior/exterior finishing, complete MEP networks, and site landscaping.',
    descriptionAr: 'تنفيذ شامل لـ 4 مباني تجارية وسكنية متعددة الأدوار تشمل الأعمال الإنشائية والتشطيبات المعمارية والشبكات الكهروميكانيكية وتطوير الموقع العام.',
    specs: [
      { label: 'Scope of Work', value: 'Construction, Finishing, MEP & Landscape' },
      { label: 'Building Count', value: '4 Multi-Story Units' },
      { label: 'Project Value', value: 'SAR 60,000,000' },
      { label: 'City', value: 'Dammam - Al-Dabab' }
    ]
  },
  {
    id: 'al-doha-luxury-villas-15',
    categoryKey: 'estates',
    title: 'Al-Doha Luxury Residential Compound (15 Villas)',
    titleAr: 'مجمع فلل الدوحة السكني الفاخر (١٥ فيلا)',
    category: 'Luxury Residential Compound',
    categoryAr: 'مجمعات فلل سكنية فاخرة',
    location: 'Al-Doha District, Dammam',
    locationAr: 'حي الدوحة، الدمام',
    year: '2023',
    area: '12,500 m²',
    value: 'SAR 30M',
    image: '/luxury-villas-compound.jpg',
    description: 'Turnkey development of 15 premium residential villas featuring modern architectural design, complete structural execution, custom luxury finishes, and dedicated electro-mechanical systems.',
    descriptionAr: 'تنفيذ تسليم مفتاح لـ 15 فيلا سكنية فاخرة بتصاميم معمارية عصرية وتشطيبات راقية وشبكات كهربائية وتكييف متقدمة.',
    specs: [
      { label: 'Scope of Work', value: 'Construction, Finishing & MEP Works' },
      { label: 'Unit Count', value: '15 Luxury Villas' },
      { label: 'Project Value', value: 'SAR 30,000,000' },
      { label: 'Location', value: 'Al-Doha, Dammam' }
    ]
  },
  {
    id: 'dammam-2nd-industrial-warehouses',
    categoryKey: 'industrial',
    title: 'Industrial Logistics Warehouses (19 Units)',
    titleAr: 'مجمع المستودعات الصناعية واللوجستية (١٩ مستودع)',
    category: 'Industrial Steel Structures',
    categoryAr: 'هياكل ومستودعات صناعية',
    location: '2nd Industrial City, Dammam',
    locationAr: 'المدينة الصناعية الثانية، الدمام',
    year: '2024',
    area: '34,000 m²',
    value: 'SAR 20.5M',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=85',
    description: 'Pre-engineered steel structural skeleton, industrial electrical distribution, heavy mechanical systems, and advanced waterproofing systems for 19 modern industrial warehouse units.',
    descriptionAr: 'تنفيذ الهياكل الإنشائية الحديدية والأعمال الكهربائية والميكانيكية والعزل المائي لـ 19 مستودع صناعي بالمدينة الصناعية الثانية.',
    specs: [
      { label: 'Scope of Work', value: 'Skeleton, Electrical, Mechanical & Waterproofing' },
      { label: 'Unit Count', value: '19 Industrial Units' },
      { label: 'Project Value', value: 'SAR 20,500,000' },
      { label: 'Location', value: '2nd Industrial City, Dammam' }
    ]
  },
  {
    id: 'riyadh-hiraj-car-showroom',
    categoryKey: 'industrial',
    title: 'Commercial Steel Structure Automotive Showroom',
    titleAr: 'معرض سيارات بهيكل حديدي تجاري - الرياض',
    category: 'Commercial Steel Structure',
    categoryAr: 'منشآت تجارية وهياكل حديدية',
    location: 'Hiraj Area, Riyadh City',
    locationAr: 'منطقة الحراج، مدينة الرياض',
    year: '2024',
    area: '8,500 m²',
    value: 'SAR 9.5M',
    image: '/commercial-steel-automotive-showroom.jpg',
    description: 'Engineered steel structure construction skeleton, exterior site landscaping, full electrical & mechanical systems, and specialized waterproofing for major auto showroom facility in Riyadh.',
    descriptionAr: 'تنفيذ الهيكل الحديدي وتطوير الموقع والأعمال الكهربائية والميكانيكية والعزل المائي لمعرض سيارات تجاري متكامل بالرياض.',
    specs: [
      { label: 'Scope of Work', value: 'Construction Skeleton, MEP & Waterproofing' },
      { label: 'Project Value', value: 'SAR 9,500,000' },
      { label: 'City', value: 'Riyadh - Hiraj Area' },
      { label: 'Typology', value: 'Commercial Automotive Showroom' }
    ]
  }
];

export const STATS = [
  { value: '315M+ SAR', label: 'Delivered Projects Value', labelAr: 'قيمة المشاريع المنجزة والمعتمدة' },
  { value: '100%', label: 'Saudi Owned & Registered', labelAr: 'شركة وطنية سعودية 100٪' },
  { value: '0 Incidents', label: 'HSE Safety & Quality Commitment', labelAr: 'التزام كامل بمعايير السلامة والجودة (HSE & QA/QC)' },
  { value: '7 Disciplines', label: 'Integrated Contracting Divisions', labelAr: 'قطاعات إنشائية وتخصصية متكاملة' }
];

export interface CoreServiceItem {
  num: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  image: string;
  tags: string[];
  tagsAr: string[];
}

export const CORE_SERVICES: CoreServiceItem[] = [
  {
    num: '01',
    title: 'General Construction Work',
    titleAr: 'أعمال الإنشاءات والمقاولات العامة',
    desc: 'Turnkey construction of multi-story residential & commercial buildings, luxury villas, factories, showrooms, and stores with total project lifecycle care.',
    descAr: 'تنفيذ شامل للمباني متعددة الأدوار، الفلل السكنية الفاخرة، المصانع، المعارض التجارية والمستودعات من أعمال الحفر والخرسانات حتى التسليم الكامل.',
    image: '/general-construction.jpg',
    tags: ['Turnkey Execution', 'Skeleton Framing', 'SBC Compliant'],
    tagsAr: ['تسليم مفتاح', 'الهيكل الإنشائي', 'كود البناء السعودي']
  },
  {
    num: '02',
    title: 'Steel Buildings & Pre-Engineered Warehouses',
    titleAr: 'المباني والهياكل الحديدية والمستودعات',
    desc: 'High-speed and quality engineered structural steel buildings, heavy framing, long-span open trusses, and industrial factories.',
    descAr: 'تصنيع وتركيب الهياكل الإنشائية المعدنية، المستودعات اللوجستية الحديثة والمصانع بسرعة وجودة هندسية عالية.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
    tags: ['Pre-Engineered Steel', 'Industrial Logistics', 'Long-Span Framing'],
    tagsAr: ['هياكل حديدية مسبقة الصنع', 'مجمعات لوجستية', 'جمالونات عريضة']
  },
  {
    num: '03',
    title: 'Finishing & Architectural Decorations',
    titleAr: 'التشطيبات المعمارية والديكورات الفاخرة',
    desc: 'High-end interior & exterior architectural finishes, marble columns, classical domes, stained glass, gypsum art, and symmetrical modern designs.',
    descAr: 'تشطيبات داخلية وخارجية راقية تشمل الواجهات، القباب الزجاجية المعشقة، الأعمدة الرخامية، الديكورات الجبسية واللمسات المعمارية المتناسقة.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    tags: ['Luxury Cladding', 'Gypsum Art', 'Marble & Glass'],
    tagsAr: ['تشطيبات فاخرة', 'ديكورات جبسية', 'رخام وزجاج معشق']
  },
  {
    num: '04',
    title: 'Electrical Work & Power Cabling',
    titleAr: 'الأعمال الكهربائية وتمديد الكابلات',
    desc: 'Complete electrical infrastructure for commercial & industrial facilities: switchboards, power distribution, transformers, normal & emergency lighting.',
    descAr: 'تنفيذ وتمديد الشبكات الكهربائية المتكاملة، لوحات التوزيع الرئيسية، كابلات القوى، وأنظمة الإنارة العامة والطوارئ للمنشآت.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=85',
    tags: ['Power Distribution', 'Low & High Voltage', 'Emergency Systems'],
    tagsAr: ['لوحات التوزيع الرئيسية', 'تمديد كابلات القوى', 'أنظمة الطوارئ']
  },
  {
    num: '05',
    title: 'HVAC & Central Air Conditioning',
    titleAr: 'أنظمة التكييف والتهوية الميكانيكية (HVAC)',
    desc: 'Installation of industrial & commercial air conditioning systems, custom ducting, and chillers with top Saudi market brands (Zamil, York, LG, Samsung, GE, Hitachi).',
    descAr: 'توريد وتركيب وتمديد مجاري الهواء (Ducting) لكافة أنظمة التكييف المركزي والمخفي والمبردات بالتعاون مع كبرى الماركات المعتمدة.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85',
    tags: ['Central Chillers', 'Custom Ducting', 'Zamil / York / LG'],
    tagsAr: ['مبردات مركزية', 'مجاري هواء (Duct)', 'ماركات معتمدة']
  },
  {
    num: '06',
    title: 'Waterproofing & Thermal Insulation',
    titleAr: 'أعمال العزل المائي والحراري المتطور',
    desc: 'Specialized membranes, polyurethane injection, foundation tanking, basement protection, and high-performance roof insulation.',
    descAr: 'فريق فني متخصص في تنفيذ العزل المائي للأسطح والأساسات والخزانات والبدرومات بأحدث المواد واللفائف العازلة المعتمدة.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
    tags: ['Foundation Tanking', 'Polyurethane Foam', 'Membrane Systems'],
    tagsAr: ['عزل الأساسات والخزانات', 'فوم البولي يوريثان', 'لفائف البيتومين']
  },
  {
    num: '07',
    title: 'Maintenance & Facility Renovation',
    titleAr: 'أعمال الصيانة الشاملة والتشغيل والترميم',
    desc: 'Comprehensive facility maintenance, MEP troubleshooting, electro-mechanical upgrades, flooring renovation, and customized commercial repairs.',
    descAr: 'خدمات صيانة دورية وطارئة، ترميم وتجديد المنشآت، صيانة وتطوير الأنظمة الكهروميكانيكية، وتجهيز المواقع وفق متطلبات العميل.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
    tags: ['Facility Retrofitting', '24/7 Troubleshooting', 'Preventative Care'],
    tagsAr: ['ترميم وتطوير المنشآت', 'صيانة وقائية وطارئة', 'تجهيز المواقع']
  }
];
