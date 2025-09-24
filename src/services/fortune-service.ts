import { TarotReading, ZodiacReading, NumerologyReading } from '@/types/fortune'
import { getTarotReading } from '@/data/tarot-cards'
import { getZodiacSign } from '@/data/zodiac-signs'

export class FortuneService {
  // タロット占い
  static async getTarotReading(question?: string): Promise<TarotReading> {
    const cards = getTarotReading(3)
    
    // カードの解釈を生成
    const interpretation = this.generateTarotInterpretation(cards, question)
    const advice = this.generateTarotAdvice(cards)
    
    return {
      cards,
      interpretation,
      advice
    }
  }
  
  // 星座占い
  static async getZodiacReading(birthMonth: number, birthDay: number): Promise<ZodiacReading> {
    const sign = getZodiacSign(birthMonth, birthDay)
    
    const interpretation = this.generateZodiacInterpretation(sign)
    const advice = this.generateZodiacAdvice(sign)
    const luckyNumbers = this.generateLuckyNumbers()
    const luckyColors = this.generateLuckyColors(sign.element)
    
    return {
      sign: sign.name,
      element: sign.element,
      quality: sign.quality,
      interpretation,
      advice,
      luckyNumbers,
      luckyColors
    }
  }
  
  // 数秘術
  static async getNumerologyReading(birthDate: string): Promise<NumerologyReading> {
    const lifePathNumber = this.calculateLifePathNumber(birthDate)
    const destinyNumber = this.calculateDestinyNumber(birthDate)
    const soulNumber = this.calculateSoulNumber(birthDate)
    
    const interpretation = this.generateNumerologyInterpretation(lifePathNumber, destinyNumber, soulNumber)
    const advice = this.generateNumerologyAdvice(lifePathNumber)
    
    return {
      lifePathNumber,
      destinyNumber,
      soulNumber,
      interpretation,
      advice
    }
  }
  
  // タロット解釈生成
  private static generateTarotInterpretation(cards: any[], question?: string): string {
    const cardNames = cards.map(card => card.name).join('、')
    const reversedCards = cards.filter(card => card.reversed)
    
    let interpretation = `あなたが引いたカードは${cardNames}です。`
    
    if (reversedCards.length > 0) {
      interpretation += ` その中でも${reversedCards.map(card => card.name).join('、')}は逆位置で出ており、`
      interpretation += `内面の課題や注意すべき点を示しています。`
    }
    
    if (question) {
      interpretation += ` あなたの質問「${question}」に対して、これらのカードは重要なメッセージを伝えています。`
    }
    
    interpretation += ` 現在の状況を客観的に見つめ、直感を大切にしながら行動することが大切です。`
    
    return interpretation
  }
  
  // タロットアドバイス生成
  private static generateTarotAdvice(cards: any[]): string {
    const adviceList = [
      '直感を信じて行動してください',
      '過去の経験を活かして未来を切り開いてください',
      '周囲の人との調和を大切にしてください',
      '新しい可能性に目を向けてください',
      '内面の声に耳を傾けてください'
    ]
    
    return adviceList[Math.floor(Math.random() * adviceList.length)]
  }
  
  // 星座解釈生成
  private static generateZodiacInterpretation(sign: any): string {
    const interpretations = [
      `${sign.name}のあなたは、${sign.element}の${sign.quality}として、${sign.description}。`,
      `現在の星の配置は、あなたの${sign.element}の性質を強く後押ししています。`,
      `${sign.name}の持つ特性が、今後の人生に大きな影響を与えるでしょう。`,
      `あなたの${sign.element}のエネルギーが、新しい可能性を開く鍵となります。`
    ]
    
    return interpretations.join(' ')
  }
  
  // 星座アドバイス生成
  private static generateZodiacAdvice(sign: any): string {
    const adviceMap: { [key: string]: string[] } = {
      '火': ['情熱を大切にしてください', '積極的に行動してください', 'リーダーシップを発揮してください'],
      '土': ['着実に努力を続けてください', '実用的なアプローチを心がけてください', '安定を重視してください'],
      '風': ['コミュニケーションを大切にしてください', '新しいアイデアを取り入れてください', '柔軟性を保ってください'],
      '水': ['感情を大切にしてください', '直感を信じてください', '深い理解を求めてください']
    }
    
    const adviceList = adviceMap[sign.element] || adviceMap['火']
    return adviceList[Math.floor(Math.random() * adviceList.length)]
  }
  
  // ラッキーナンバー生成
  private static generateLuckyNumbers(): number[] {
    const numbers = []
    while (numbers.length < 3) {
      const num = Math.floor(Math.random() * 100) + 1
      if (!numbers.includes(num)) {
        numbers.push(num)
      }
    }
    return numbers.sort((a, b) => a - b)
  }
  
  // ラッキーカラー生成
  private static generateLuckyColors(element: string): string[] {
    const colorMap: { [key: string]: string[] } = {
      '火': ['赤', 'オレンジ', 'ゴールド'],
      '土': ['緑', 'ブラウン', 'ベージュ'],
      '風': ['青', 'シルバー', '白'],
      '水': ['青', 'ターコイズ', 'パープル']
    }
    
    return colorMap[element] || ['青', '緑', '紫']
  }
  
  // 数秘術計算
  private static calculateLifePathNumber(birthDate: string): number {
    const digits = birthDate.replace(/\D/g, '')
    let sum = 0
    
    for (const digit of digits) {
      sum += parseInt(digit)
    }
    
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }
  
  private static calculateDestinyNumber(birthDate: string): number {
    const digits = birthDate.replace(/\D/g, '')
    let sum = 0
    
    for (const digit of digits) {
      sum += parseInt(digit)
    }
    
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }
  
  private static calculateSoulNumber(birthDate: string): number {
    const digits = birthDate.replace(/\D/g, '')
    let sum = 0
    
    for (const digit of digits) {
      sum += parseInt(digit)
    }
    
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    }
    
    return sum
  }
  
  // 数秘術解釈生成
  private static generateNumerologyInterpretation(lifePath: number, destiny: number, soul: number): string {
    return `あなたのライフパスナンバーは${lifePath}、運命数は${destiny}、ソウルナンバーは${soul}です。これらの数字が組み合わさって、あなたの人生の方向性を示しています。`
  }
  
  // 数秘術アドバイス生成
  private static generateNumerologyAdvice(lifePath: number): string {
    const adviceMap: { [key: number]: string } = {
      1: 'リーダーシップを発揮してください',
      2: '協調性を大切にしてください',
      3: '創造性を表現してください',
      4: '着実に努力を続けてください',
      5: '自由を求めて行動してください',
      6: '責任感を持って行動してください',
      7: '内面の探求を深めてください',
      8: '物質的な成功を目指してください',
      9: '奉仕の精神を持ってください'
    }
    
    return adviceMap[lifePath] || '直感を信じて行動してください'
  }
}
