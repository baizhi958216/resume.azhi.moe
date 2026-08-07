'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'
import 'lenis/dist/lenis.css'

const HEADER_OFFSET = -100

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.15,
      easing: value => Math.min(1, 1.001 - 2 ** (-10 * value)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const handleAnchorClick = (event: MouseEvent) => {
      const targetElement = event.target as Element | null
      const anchor = targetElement?.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor)
        return

      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#')
        return

      const target = document.querySelector<HTMLElement>(hash)
      if (!target)
        return

      event.preventDefault()
      history.pushState(null, '', hash)

      const isSkipLink = anchor.classList.contains('skip-link')
      if (isSkipLink) {
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }

      lenis.scrollTo(target, {
        offset: isSkipLink ? 0 : HEADER_OFFSET,
        duration: 1.2,
      })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      gsap.ticker.remove(ticker)
      gsap.ticker.lagSmoothing(true)
    }
  }, [])

  return null
}
