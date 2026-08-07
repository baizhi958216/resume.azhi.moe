'use client'

import { useSyncExternalStore } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'resume-theme'

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function subscribeToThemeChange(onChange: () => void) {
  window.addEventListener('resume-theme-change', onChange)
  window.addEventListener('storage', onChange)

  return () => {
    window.removeEventListener('resume-theme-change', onChange)
    window.removeEventListener('storage', onChange)
  }
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemeChange,
    getCurrentTheme,
    () => 'light',
  )

  function toggleTheme() {
    const nextTheme: Theme = getCurrentTheme() === 'dark' ? 'light' : 'dark'

    document.documentElement.dataset.theme = nextTheme
    document.documentElement.style.colorScheme = nextTheme
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    window.dispatchEvent(new Event('resume-theme-change'))
  }

  const isDark = theme === 'dark'

  return (
    <button
      className="theme-toggle grid size-10 shrink-0 place-items-center rounded-[10px] border border-line bg-white/35 text-ink transition hover:-translate-y-px hover:border-accent/35 hover:bg-white/80 hover:text-accent focus-visible:border-accent/50 focus-visible:text-accent max-sm:size-[38px]"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? '切换到日间模式' : '切换到夜间模式'}
      aria-pressed={isDark}
      title={isDark ? '切换到日间模式' : '切换到夜间模式'}
    >
      {isDark
        ? (
            <FiSun className="size-[17px]" aria-hidden="true" />
          )
        : (
            <FiMoon className="size-[17px]" aria-hidden="true" />
          )}
    </button>
  )
}
