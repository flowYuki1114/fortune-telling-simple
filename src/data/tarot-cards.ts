import { TarotCard } from '@/types/fortune'

export const tarotCards: TarotCard[] = [
  // 大アルカナ
  {
    id: 'fool',
    name: '愚者',
    meaning: '新しい始まり、冒険、可能性',
    reversed: false,
  },
  {
    id: 'magician',
    name: '魔術師',
    meaning: '意志力、創造力、行動力',
    reversed: false,
  },
  {
    id: 'high-priestess',
    name: '女教皇',
    meaning: '直感、神秘、内なる知恵',
    reversed: false,
  },
  {
    id: 'empress',
    name: '女帝',
    meaning: '豊かさ、母性、創造性',
    reversed: false,
  },
  {
    id: 'emperor',
    name: '皇帝',
    meaning: '権威、秩序、リーダーシップ',
    reversed: false,
  },
  {
    id: 'hierophant',
    name: '教皇',
    meaning: '伝統、教育、精神的な指導',
    reversed: false,
  },
  {
    id: 'lovers',
    name: '恋人',
    meaning: '愛、選択、調和',
    reversed: false,
  },
  {
    id: 'chariot',
    name: '戦車',
    meaning: '勝利、意志力、コントロール',
    reversed: false,
  },
  {
    id: 'strength',
    name: '力',
    meaning: '内なる強さ、忍耐、勇気',
    reversed: false,
  },
  {
    id: 'hermit',
    name: '隠者',
    meaning: '内省、探求、孤独',
    reversed: false,
  },
  {
    id: 'wheel-of-fortune',
    name: '運命の輪',
    meaning: '変化、運命、サイクル',
    reversed: false,
  },
  {
    id: 'justice',
    name: '正義',
    meaning: '公平、バランス、真実',
    reversed: false,
  },
  {
    id: 'hanged-man',
    name: '吊るされた男',
    meaning: '犠牲、待機、新しい視点',
    reversed: false,
  },
  {
    id: 'death',
    name: '死神',
    meaning: '終わり、変化、再生',
    reversed: false,
  },
  {
    id: 'temperance',
    name: '節制',
    meaning: 'バランス、調和、忍耐',
    reversed: false,
  },
  {
    id: 'devil',
    name: '悪魔',
    meaning: '誘惑、束縛、物質主義',
    reversed: false,
  },
  {
    id: 'tower',
    name: '塔',
    meaning: '破壊、突然の変化、解放',
    reversed: false,
  },
  {
    id: 'star',
    name: '星',
    meaning: '希望、インスピレーション、癒し',
    reversed: false,
  },
  {
    id: 'moon',
    name: '月',
    meaning: '幻想、不安、潜在意識',
    reversed: false,
  },
  {
    id: 'sun',
    name: '太陽',
    meaning: '成功、喜び、活力',
    reversed: false,
  },
  {
    id: 'judgement',
    name: '審判',
    meaning: '復活、再生、新しい始まり',
    reversed: false,
  },
  {
    id: 'world',
    name: '世界',
    meaning: '完成、達成、旅の終わり',
    reversed: false,
  },
]

export const getRandomTarotCard = (): TarotCard => {
  const randomIndex = Math.floor(Math.random() * tarotCards.length)
  const card = tarotCards[randomIndex]
  const reversed = Math.random() < 0.5
  return { ...card, reversed }
}

export const getTarotReading = (numCards: number = 3): TarotCard[] => {
  const cards: TarotCard[] = []
  const usedIndices = new Set<number>()
  
  while (cards.length < numCards) {
    const randomIndex = Math.floor(Math.random() * tarotCards.length)
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex)
      const card = tarotCards[randomIndex]
      const reversed = Math.random() < 0.5
      cards.push({ ...card, reversed })
    }
  }
  
  return cards
}
