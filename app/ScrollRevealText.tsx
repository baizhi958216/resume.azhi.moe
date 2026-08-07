'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useMemo, useRef } from 'react'

interface ScrollRevealTextProps {
  text: string
  className?: string
}

function segmentText(text: string) {
  return text.match(/[A-Za-z0-9][A-Za-z0-9+./-]*|\S|\s+/gu) ?? [text]
}

export default function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const rootRef = useRef<HTMLParagraphElement>(null)
  const wordRef = useRef<Array<HTMLSpanElement | null>>([])
  const segments = useMemo(() => segmentText(text), [text])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = rootRef.current
    const words = wordRef.current.filter((word): word is HTMLSpanElement => Boolean(word))
    if (!root || !words.length || reduceMotion)
      return

    const context = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.14, filter: 'blur(7px)', y: 5 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.035,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 88%',
            end: 'bottom 54%',
            scrub: 0.7,
          },
        },
      )
    }, root)

    return () => context.revert()
  }, [segments])

  let animatedIndex = 0

  return (
    <p ref={rootRef} className={`relative${className ? ` ${className}` : ''}`} aria-label={text}>
      <span aria-hidden="true">
        {/* eslint-disable react/no-array-index-key -- 静态分段数组，重复词需用索引区分 */}
        {segments.map((segment, index) => {
          if (/^\s+$/.test(segment))
            return segment
          const refIndex = animatedIndex++
          return (
            <span
              className="inline-block will-change-[opacity,filter,transform] motion-reduce:opacity-100! motion-reduce:blur-none! motion-reduce:transform-none!"
              ref={(element) => { wordRef.current[refIndex] = element }}
              key={`${segment}-${index}`}
            >
              {segment}
            </span>
          )
        })}
        {/* eslint-enable react/no-array-index-key */}
      </span>
    </p>
  )
}
