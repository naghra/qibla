/** ISO 3166-1 alpha-3 → alpha-2 (common passport MRZ codes) */
const ISO3_TO_ISO2 = {
  AFG: 'AF', ALB: 'AL', DZA: 'DZ', AND: 'AD', AGO: 'AO', ATG: 'AG', ARG: 'AR', ARM: 'AM',
  AUS: 'AU', AUT: 'AT', AZE: 'AZ', BHS: 'BS', BHR: 'BH', BGD: 'BD', BRB: 'BB', BLR: 'BY',
  BEL: 'BE', BLZ: 'BZ', BEN: 'BJ', BTN: 'BT', BOL: 'BO', BIH: 'BA', BWA: 'BW', BRA: 'BR',
  BRN: 'BN', BGR: 'BG', BFA: 'BF', BDI: 'BI', KHM: 'KH', CMR: 'CM', CAN: 'CA', CPV: 'CV',
  CAF: 'CF', TCD: 'TD', CHL: 'CL', CHN: 'CN', COL: 'CO', COM: 'KM', COG: 'CG', COD: 'CD',
  CRI: 'CR', HRV: 'HR', CUB: 'CU', CYP: 'CY', CZE: 'CZ', DNK: 'DK', DJI: 'DJ', DMA: 'DM',
  DOM: 'DO', ECU: 'EC', EGY: 'EG', SLV: 'SV', GNQ: 'GQ', ERI: 'ER', EST: 'EE', ETH: 'ET',
  FJI: 'FJ', FIN: 'FI', FRA: 'FR', GAB: 'GA', GMB: 'GM', GEO: 'GE', DEU: 'DE', GHA: 'GH',
  GRC: 'GR', GRD: 'GD', GTM: 'GT', GIN: 'GN', GNB: 'GW', GUY: 'GY', HTI: 'HT', HND: 'HN',
  HUN: 'HU', ISL: 'IS', IND: 'IN', IDN: 'ID', IRN: 'IR', IRQ: 'IQ', IRL: 'IE', ISR: 'IL',
  ITA: 'IT', JAM: 'JM', JPN: 'JP', JOR: 'JO', KAZ: 'KZ', KEN: 'KE', KIR: 'KI', PRK: 'KP',
  KOR: 'KR', KWT: 'KW', KGZ: 'KG', LAO: 'LA', LVA: 'LV', LBN: 'LB', LSO: 'LS', LBR: 'LR',
  LBY: 'LY', LIE: 'LI', LTU: 'LT', LUX: 'LU', MKD: 'MK', MDG: 'MG', MWI: 'MW', MYS: 'MY',
  MDV: 'MV', MLI: 'ML', MLT: 'MT', MHL: 'MH', MRT: 'MR', MUS: 'MU', MEX: 'MX', FSM: 'FM',
  MDA: 'MD', MCO: 'MC', MNG: 'MN', MNE: 'ME', MAR: 'MA', MOZ: 'MZ', MMR: 'MM', NAM: 'NA',
  NRU: 'NR', NPL: 'NP', NLD: 'NL', NZL: 'NZ', NIC: 'NI', NER: 'NE', NGA: 'NG', NOR: 'NO',
  OMN: 'OM', PAK: 'PK', PLW: 'PW', PAN: 'PA', PNG: 'PG', PRY: 'PY', PER: 'PE', PHL: 'PH',
  POL: 'PL', PRT: 'PT', QAT: 'QA', ROU: 'RO', RUS: 'RU', RWA: 'RW', KNA: 'KN', LCA: 'LC',
  VCT: 'VC', WSM: 'WS', SMR: 'SM', STP: 'ST', SAU: 'SA', SEN: 'SN', SRB: 'RS', SYC: 'SC',
  SLE: 'SL', SGP: 'SG', SVK: 'SK', SVN: 'SI', SLB: 'SB', SOM: 'SO', ZAF: 'ZA', SSD: 'SS',
  ESP: 'ES', LKA: 'LK', SDN: 'SD', SUR: 'SR', SWZ: 'SZ', SWE: 'SE', CHE: 'CH', SYR: 'SY',
  TWN: 'TW', TJK: 'TJ', TZA: 'TZ', THA: 'TH', TLS: 'TL', TGO: 'TG', TON: 'TO', TTO: 'TT',
  TUN: 'TN', TUR: 'TR', TKM: 'TM', TUV: 'TV', UGA: 'UG', UKR: 'UA', ARE: 'AE', GBR: 'GB',
  USA: 'US', URY: 'UY', UZB: 'UZ', VUT: 'VU', VAT: 'VA', VEN: 'VE', VNM: 'VN', YEM: 'YE',
  ZMB: 'ZM', ZWE: 'ZW', PSE: 'PS', HKG: 'HK', MAC: 'MO', XKX: 'XK',
};

const NAME_TO_ISO2 = {
  egypt: 'EG', 'egyptian': 'EG', 'saudi arabia': 'SA', 'united states': 'US', 'united kingdom': 'GB',
  france: 'FR', 'germany': 'DE', 'netherlands': 'NL', 'india': 'IN', 'pakistan': 'PK',
  bangladesh: 'BD', 'thailand': 'TH', uae: 'AE', 'united arab emirates': 'AE',
};

function normalizeCountryCode(value) {
  if (!value || typeof value !== 'string') return '';
  const raw = value.trim();
  const upper = raw.toUpperCase();
  if (/^[A-Z]{2}$/.test(upper)) return upper;
  if (/^[A-Z]{3}$/.test(upper) && ISO3_TO_ISO2[upper]) return ISO3_TO_ISO2[upper];
  const named = NAME_TO_ISO2[raw.toLowerCase()];
  if (named) return named;
  return '';
}

function normalizeName(value) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\p{L}\p{M}\s'-]/gu, '');
}

function normalizePassportNumber(value) {
  return String(value ?? '').replace(/[\s<]/g, '').toUpperCase();
}

/** Parse YYMMDD from MRZ — birth dates infer 19xx/20xx century. */
export function parseMrzDate(yymmdd, { isExpiry = false } = {}) {
  if (!yymmdd || yymmdd.length !== 6 || !/^\d{6}$/.test(yymmdd)) return '';
  const yy = Number(yymmdd.slice(0, 2));
  const mm = yymmdd.slice(2, 4);
  const dd = yymmdd.slice(4, 6);
  if (Number(mm) < 1 || Number(mm) > 12 || Number(dd) < 1 || Number(dd) > 31) return '';

  let year;
  if (isExpiry) {
    year = yy >= 50 ? 1900 + yy : 2000 + yy;
  } else {
    const now = new Date();
    const currentTwo = now.getFullYear() % 100;
    year = yy > currentTwo ? 1900 + yy : 2000 + yy;
  }

  return `${year}-${mm}-${dd}`;
}

function cleanMrzLine(line) {
  return String(line ?? '')
    .toUpperCase()
    .replace(/\s/g, '')
    .replace(/[^A-Z0-9<]/g, '')
    .padEnd(44, '<')
    .slice(0, 44);
}

/** Parse ICAO TD3 passport MRZ (two lines × 44 chars). */
export function parseTd3Mrz(line1, line2) {
  const l1 = cleanMrzLine(line1);
  const l2 = cleanMrzLine(line2);
  if (l1.length < 36 || l2.length < 36) return null;
  if (!l1.startsWith('P')) return null;

  const issuingCountry = normalizeCountryCode(l1.slice(2, 5));
  const nameField = l1.slice(5).replace(/<+$/, '');
  const nameParts = nameField.split('<<');
  const lastName = normalizeName((nameParts[0] || '').replace(/</g, ' '));
  const firstName = normalizeName(nameParts.slice(1).join(' ').replace(/</g, ' '));

  const passportNumber = normalizePassportNumber(l2.slice(0, 9));
  const nationality = normalizeCountryCode(l2.slice(10, 13));
  const dateOfBirth = parseMrzDate(l2.slice(13, 19));
  const genderChar = l2.slice(20, 21);
  const passportExpiryDate = parseMrzDate(l2.slice(21, 27), { isExpiry: true });

  const gender = genderChar === 'M' ? 'male' : genderChar === 'F' ? 'female' : 'other';

  return {
    firstName,
    lastName,
    passportNumber,
    nationality,
    passportCountry: issuingCountry || nationality,
    dateOfBirth,
    passportExpiryDate,
    gender,
  };
}

/** Prefer MRZ values when present — MRZ is more reliable for dates and numbers. */
export function mergePassportData(vision, mrz) {
  if (!mrz) return { ...vision };
  const pick = (mrzVal, visionVal) => (mrzVal ? mrzVal : visionVal);
  return {
    firstName: pick(mrz.firstName, vision.firstName),
    lastName: pick(mrz.lastName, vision.lastName),
    passportNumber: pick(mrz.passportNumber, vision.passportNumber),
    nationality: pick(mrz.nationality, vision.nationality),
    passportCountry: pick(mrz.passportCountry, vision.passportCountry) || pick(mrz.nationality, vision.nationality),
    dateOfBirth: pick(mrz.dateOfBirth, vision.dateOfBirth),
    passportIssueDate: vision.passportIssueDate || '',
    passportExpiryDate: pick(mrz.passportExpiryDate, vision.passportExpiryDate),
    gender: mrz.gender !== 'other' ? mrz.gender : vision.gender,
    confidence: mrz.passportNumber && mrz.dateOfBirth ? 'high' : vision.confidence,
  };
}

export { ISO3_TO_ISO2, NAME_TO_ISO2, normalizeCountryCode, normalizeName, normalizePassportNumber };
