'use client'

import { useState } from 'react'
import { FortuneType } from '@/types/fortune'
import { FortuneService } from '@/services/fortune-service'
import { TarotReading, ZodiacReading, NumerologyReading } from '@/types/fortune'

export default function FortunePage() {
  const [selectedType, setSelectedType] = useState<FortuneType | null>(null)
  const [question, setQuestion] = useState('')
  const [birthMonth, setBirthMonth] = useState(1)
  const [birthDay, setBirthDay] = useState(1)
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState<TarotReading | ZodiacReading | NumerologyReading | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTarotReading = async () => {
    setIsLoading(true)
    try {
      const reading = await FortuneService.getTarotReading(question)
      setResult(reading)
    } catch (error) {
      console.error('Error getting tarot reading:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleZodiacReading = async () => {
    setIsLoading(true)
    try {
      const reading = await FortuneService.getZodiacReading(birthMonth, birthDay)
      setResult(reading)
    } catch (error) {
      console.error('Error getting zodiac reading:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNumerologyReading = async () => {
    setIsLoading(true)
    try {
      const reading = await FortuneService.getNumerologyReading(birthDate)
      setResult(reading)
    } catch (error) {
      console.error('Error getting numerology reading:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderResult = () => {
    if (!result) return null

    if (selectedType === 'tarot') {
      const tarotResult = result as TarotReading
      return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
          <h3 className="text-2xl font-bold mb-4">タロット占い結果</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {tarotResult.cards.map((card, index) => (
              <div key={index} className="bg-white/20 rounded-lg p-4 text-center">
                <h4 className="font-bold text-lg">{card.name}</h4>
                <p className="text-sm text-white/80">{card.meaning}</p>
                {card.reversed && (
                  <span className="text-red-300 text-xs">逆位置</span>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-2">解釈</h4>
              <p className="text-white/90">{tarotResult.interpretation}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">アドバイス</h4>
              <p className="text-white/90">{tarotResult.advice}</p>
            </div>
          </div>
        </div>
      )
    }

    if (selectedType === 'zodiac') {
      const zodiacResult = result as ZodiacReading
      return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
          <h3 className="text-2xl font-bold mb-4">星座占い結果</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-2">{zodiacResult.sign}</h4>
              <p className="text-white/80">元素: {zodiacResult.element}</p>
              <p className="text-white/80">性質: {zodiacResult.quality}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">ラッキーナンバー</h4>
              <p className="text-white/80">{zodiacResult.luckyNumbers.join(', ')}</p>
              <h4 className="font-bold mb-2 mt-4">ラッキーカラー</h4>
              <p className="text-white/80">{zodiacResult.luckyColors.join(', ')}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-bold mb-2">解釈</h4>
              <p className="text-white/90">{zodiacResult.interpretation}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">アドバイス</h4>
              <p className="text-white/90">{zodiacResult.advice}</p>
            </div>
          </div>
        </div>
      )
    }

    if (selectedType === 'numerology') {
      const numerologyResult = result as NumerologyReading
      return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
          <h3 className="text-2xl font-bold mb-4">数秘術結果</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <h4 className="font-bold text-lg">ライフパスナンバー</h4>
              <p className="text-3xl font-bold">{numerologyResult.lifePathNumber}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <h4 className="font-bold text-lg">運命数</h4>
              <p className="text-3xl font-bold">{numerologyResult.destinyNumber}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <h4 className="font-bold text-lg">ソウルナンバー</h4>
              <p className="text-3xl font-bold">{numerologyResult.soulNumber}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-2">解釈</h4>
              <p className="text-white/90">{numerologyResult.interpretation}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">アドバイス</h4>
              <p className="text-white/90">{numerologyResult.advice}</p>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          占いを始める
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setSelectedType('tarot')}
            className={`p-6 rounded-lg text-center transition-all ${
              selectedType === 'tarot'
                ? 'bg-purple-600 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <div className="text-4xl mb-2">🔮</div>
            <h3 className="text-xl font-bold">タロット占い</h3>
            <p className="text-sm opacity-80">カードから未来を読み解く</p>
          </button>
          
          <button
            onClick={() => setSelectedType('zodiac')}
            className={`p-6 rounded-lg text-center transition-all ${
              selectedType === 'zodiac'
                ? 'bg-purple-600 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <div className="text-4xl mb-2">♈</div>
            <h3 className="text-xl font-bold">星座占い</h3>
            <p className="text-sm opacity-80">生年月日から運勢を占う</p>
          </button>
          
          <button
            onClick={() => setSelectedType('numerology')}
            className={`p-6 rounded-lg text-center transition-all ${
              selectedType === 'numerology'
                ? 'bg-purple-600 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <div className="text-4xl mb-2">🔢</div>
            <h3 className="text-xl font-bold">数秘術</h3>
            <p className="text-sm opacity-80">数字から人生を読み解く</p>
          </button>
        </div>

        {selectedType && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            {selectedType === 'tarot' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">タロット占い</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">質問（任意）</label>
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60"
                      placeholder="占いたいことを入力してください"
                    />
                  </div>
                  <button
                    onClick={handleTarotReading}
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
                  >
                    {isLoading ? '占い中...' : 'タロットカードを引く'}
                  </button>
                </div>
              </div>
            )}

            {selectedType === 'zodiac' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">星座占い</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">生まれ月</label>
                      <select
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(parseInt(e.target.value))}
                        className="w-full p-3 rounded-lg bg-white/20 text-white"
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}月
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white mb-2">生まれ日</label>
                      <select
                        value={birthDay}
                        onChange={(e) => setBirthDay(parseInt(e.target.value))}
                        className="w-full p-3 rounded-lg bg-white/20 text-white"
                      >
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}日
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={handleZodiacReading}
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
                  >
                    {isLoading ? '占い中...' : '星座占いを開始'}
                  </button>
                </div>
              </div>
            )}

            {selectedType === 'numerology' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">数秘術</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">生年月日</label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/20 text-white"
                    />
                  </div>
                  <button
                    onClick={handleNumerologyReading}
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
                  >
                    {isLoading ? '占い中...' : '数秘術を開始'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {renderResult()}
      </div>
    </div>
  )
}
