export type FortuneType = 'tarot' | 'zodiac' | 'numerology' | 'palmistry' | 'bazi'

export interface FortuneReading {
  id: string
  type: FortuneType
  question?: string
  result: TarotReading | ZodiacReading | NumerologyReading
  isPremium: boolean
  createdAt: Date
}

export interface TarotCard {
  id: string
  name: string
  meaning: string
  reversed: boolean
  imageUrl?: string
}

export interface TarotReading {
  cards: TarotCard[]
  interpretation: string
  advice: string
}

export interface ZodiacReading {
  sign: string
  element: string
  quality: string
  interpretation: string
  advice: string
  luckyNumbers: number[]
  luckyColors: string[]
}

export interface NumerologyReading {
  lifePathNumber: number
  destinyNumber: number
  soulNumber: number
  interpretation: string
  advice: string
}
