export interface ZodiacSign {
  id: string
  name: string
  element: string
  quality: string
  dates: string
  symbol: string
  description: string
}

export const zodiacSigns: ZodiacSign[] = [
  {
    id: 'aries',
    name: '牡羊座',
    element: '火',
    quality: '活動宮',
    dates: '3月21日 - 4月19日',
    symbol: '♈',
    description: '情熱的で積極的なリーダーシップを持つ星座'
  },
  {
    id: 'taurus',
    name: '牡牛座',
    element: '土',
    quality: '固定宮',
    dates: '4月20日 - 5月20日',
    symbol: '♉',
    description: '安定感があり、実用的で忍耐強い星座'
  },
  {
    id: 'gemini',
    name: '双子座',
    element: '風',
    quality: '柔軟宮',
    dates: '5月21日 - 6月21日',
    symbol: '♊',
    description: '好奇心旺盛でコミュニケーション能力が高い星座'
  },
  {
    id: 'cancer',
    name: '蟹座',
    element: '水',
    quality: '活動宮',
    dates: '6月22日 - 7月22日',
    symbol: '♋',
    description: '感情豊かで家族を大切にする星座'
  },
  {
    id: 'leo',
    name: '獅子座',
    element: '火',
    quality: '固定宮',
    dates: '7月23日 - 8月22日',
    symbol: '♌',
    description: '自信に満ちた創造性豊かな星座'
  },
  {
    id: 'virgo',
    name: '乙女座',
    element: '土',
    quality: '柔軟宮',
    dates: '8月23日 - 9月22日',
    symbol: '♍',
    description: '完璧主義で実用的な星座'
  },
  {
    id: 'libra',
    name: '天秤座',
    element: '風',
    quality: '活動宮',
    dates: '9月23日 - 10月23日',
    symbol: '♎',
    description: 'バランス感覚に優れた調和を重んじる星座'
  },
  {
    id: 'scorpio',
    name: '蠍座',
    element: '水',
    quality: '固定宮',
    dates: '10月24日 - 11月22日',
    symbol: '♏',
    description: '深い洞察力と情熱を持つ星座'
  },
  {
    id: 'sagittarius',
    name: '射手座',
    element: '火',
    quality: '柔軟宮',
    dates: '11月23日 - 12月21日',
    symbol: '♐',
    description: '冒険心旺盛で哲学的な星座'
  },
  {
    id: 'capricorn',
    name: '山羊座',
    element: '土',
    quality: '活動宮',
    dates: '12月22日 - 1月19日',
    symbol: '♑',
    description: '責任感が強く、目標達成能力が高い星座'
  },
  {
    id: 'aquarius',
    name: '水瓶座',
    element: '風',
    quality: '固定宮',
    dates: '1月20日 - 2月18日',
    symbol: '♒',
    description: '独創的で人道主義的な星座'
  },
  {
    id: 'pisces',
    name: '魚座',
    element: '水',
    quality: '柔軟宮',
    dates: '2月19日 - 3月20日',
    symbol: '♓',
    description: '直感的で共感力が高い星座'
  }
]

export const getZodiacSign = (month: number, day: number): ZodiacSign => {
  const date = new Date(2024, month - 1, day)
  const monthDay = month * 100 + day
  
  if (monthDay >= 321 && monthDay <= 419) return zodiacSigns[0] // 牡羊座
  if (monthDay >= 420 && monthDay <= 520) return zodiacSigns[1] // 牡牛座
  if (monthDay >= 521 && monthDay <= 621) return zodiacSigns[2] // 双子座
  if (monthDay >= 622 && monthDay <= 722) return zodiacSigns[3] // 蟹座
  if (monthDay >= 723 && monthDay <= 822) return zodiacSigns[4] // 獅子座
  if (monthDay >= 823 && monthDay <= 922) return zodiacSigns[5] // 乙女座
  if (monthDay >= 923 && monthDay <= 1023) return zodiacSigns[6] // 天秤座
  if (monthDay >= 1024 && monthDay <= 1122) return zodiacSigns[7] // 蠍座
  if (monthDay >= 1123 && monthDay <= 1221) return zodiacSigns[8] // 射手座
  if (monthDay >= 1222 || monthDay <= 119) return zodiacSigns[9] // 山羊座
  if (monthDay >= 120 && monthDay <= 218) return zodiacSigns[10] // 水瓶座
  if (monthDay >= 219 && monthDay <= 320) return zodiacSigns[11] // 魚座
  
  return zodiacSigns[0] // デフォルト
}
