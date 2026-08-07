'use client'

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

export interface TextTypeLine { text: string, accent?: boolean }

function distribute(progress: number, lengths: number[]): number[] {
  return lengths
    .reduce<{ counts: number[], remaining: number }>(
      (acc, length) => {
        const count = Math.min(length, Math.max(acc.remaining, 0))
        return { counts: [...acc.counts, count], remaining: acc.remaining - count }
      },
      { counts: [], remaining: progress },
    )
    .counts
}

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

interface TextTypeProps {
  /** One item per phrase; each phrase is a list of lines typed sequentially. */
  phrases: TextTypeLine[][]
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  initialDelay?: number
  loop?: boolean
  showCursor?: boolean
  cursorCharacter?: string
  cursorBlinkDuration?: number
  variableSpeed?: { min: number, max: number }
  startOnVisible?: boolean
}

export default function TextType({
  phrases,
  as: Tag = 'div',
  className = '',
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  initialDelay = 0,
  loop = true,
  showCursor = true,
  cursorCharacter = '|',
  cursorBlinkDuration = 0.55,
  variableSpeed,
  startOnVisible = false,
}: TextTypeProps) {
  const [progress, setProgress] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnVisible)
  const containerRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )

  const phrase = useMemo(() => phrases[phraseIndex] ?? [], [phrases, phraseIndex])
  const totalChars = useMemo(
    () => phrase.reduce((sum, line) => sum + line.text.length, 0),
    [phrase],
  )
  const label = useMemo(
    () => phrases.map(lines => lines.map(line => line.text).join('')).join('，'),
    [phrases],
  )

  useEffect(() => {
    if (!startOnVisible || !containerRef.current)
      return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed)
      return typingSpeed
    const { min, max } = variableSpeed
    return Math.random() * (max - min) + min
  }, [variableSpeed, typingSpeed])

  useEffect(() => {
    if (!isVisible || reduceMotion || !phrases.length)
      return
    let timeout: ReturnType<typeof setTimeout>

    if (isDeleting) {
      if (progress <= 1) {
        timeout = setTimeout(() => {
          setProgress(0)
          setPhraseIndex(prev => (prev + 1) % phrases.length)
          setIsDeleting(false)
        }, deletingSpeed)
      }
      else {
        timeout = setTimeout(() => setProgress(prev => prev - 1), deletingSpeed)
      }
    }
    else if (progress === 0) {
      timeout = setTimeout(setProgress, initialDelay, 1)
    }
    else if (progress < totalChars) {
      timeout = setTimeout(
        () => setProgress(prev => prev + 1),
        variableSpeed ? getRandomSpeed() : typingSpeed,
      )
    }
    else if (loop || phraseIndex < phrases.length - 1) {
      timeout = setTimeout(setIsDeleting, pauseDuration, true)
    }

    return () => clearTimeout(timeout)
  }, [
    progress,
    isDeleting,
    phraseIndex,
    totalChars,
    phrases,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
    isVisible,
    reduceMotion,
    variableSpeed,
    getRandomSpeed,
  ])

  const lineCounts = useMemo(
    () => distribute(progress, phrase.map(line => line.text.length)),
    [phrase, progress],
  )

  let cursorLine = 0
  for (let index = 0; index < lineCounts.length; index += 1) {
    if (lineCounts[index] > 0)
      cursorLine = index
  }

  const renderLine = (line: TextTypeLine, index: number, count: number) => {
    const content = line.text.slice(0, reduceMotion ? line.text.length : count)
    const cursor
      = !reduceMotion && showCursor && index === cursorLine
        ? (
            <span
              className="text-type__cursor"
              style={{ animationDuration: `${cursorBlinkDuration}s` }}
              aria-hidden="true"
            >
              {cursorCharacter}
            </span>
          )
        : null

    return (
      <Fragment key={`${line.text}-${index}`}>
        {index > 0 && <br />}
        {line.accent
          ? (
              <em>
                {content}
                {cursor}
              </em>
            )
          : (
              <span>
                {content}
                {cursor}
              </span>
            )}
      </Fragment>
    )
  }

  return (
    <Tag ref={containerRef as never} className={`text-type${className ? ` ${className}` : ''}`} aria-label={label}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {phrase.map((line, index) =>
          renderLine(line, index, reduceMotion ? line.text.length : lineCounts[index]),
        )}
      </span>
    </Tag>
  )
}
