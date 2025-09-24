import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TarotReading, ZodiacReading, NumerologyReading } from '@/types/fortune'

interface User {
  id: string
  name: string | null
  email: string
  image: string | null
}

interface FortuneReading {
  id: string
  type: string
  question?: string
  result: TarotReading | ZodiacReading | NumerologyReading
  isPremium: boolean
  createdAt: Date
}

interface AppState {
  // ユーザー状態
  user: User | null
  setUser: (user: User | null) => void
  
  // 認証状態
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  
  // 占い履歴
  readings: FortuneReading[]
  addReading: (reading: FortuneReading) => void
  clearReadings: () => void
  
  // サブスクリプション状態
  subscription: {
    plan: 'free' | 'basic' | 'premium'
    status: 'active' | 'canceled' | 'past_due' | 'unpaid'
    remainingReadings: number
  } | null
  setSubscription: (subscription: { plan: string; status: string; remainingReadings: number } | null) => void
  
  // UI状態
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  
  // エラー状態
  error: string | null
  setError: (error: string | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // ユーザー状態
      user: null,
      setUser: (user) => set({ user }),
      
      // 認証状態
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      
      // 占い履歴
      readings: [],
      addReading: (reading) => set((state) => ({
        readings: [...state.readings, reading]
      })),
      clearReadings: () => set({ readings: [] }),
      
      // サブスクリプション状態
      subscription: null,
      setSubscription: (subscription) => set({ subscription }),
      
      // UI状態
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
      
      // エラー状態
      error: null,
      setError: (error) => set({ error }),
    }),
    {
      name: 'fortune-telling-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        readings: state.readings,
        subscription: state.subscription,
      }),
    }
  )
)
