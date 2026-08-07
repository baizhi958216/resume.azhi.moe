'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef } from 'react'

interface Burst {
  x: number
  y: number
  startedAt: number
  rotation: number
}

const SPARK_COUNT = 10
const SPARK_DURATION = 480

export default function PageMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return

    const context = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]')

      elements.forEach((element) => {
        const delay = Number(element.dataset.revealDelay ?? 0)
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34, filter: 'blur(9px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 91%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    })

    return () => context.revert()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return

    const context = canvas.getContext('2d')
    if (!context)
      return

    const bursts: Burst[] = []
    let frame = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * ratio)
      canvas.height = Math.round(window.innerHeight * ratio)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const easeOutCubic = (value: number) => 1 - (1 - value) ** 3

    const draw = (now: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let burstIndex = bursts.length - 1; burstIndex >= 0; burstIndex -= 1) {
        const burst = bursts[burstIndex]
        const progress = Math.min((now - burst.startedAt) / SPARK_DURATION, 1)
        const eased = easeOutCubic(progress)

        context.save()
        context.translate(burst.x, burst.y)
        context.rotate(burst.rotation)
        context.strokeStyle = `rgba(25, 58, 101, ${1 - progress})`
        context.lineWidth = 1.7 - progress * 0.6
        context.lineCap = 'round'

        for (let spark = 0; spark < SPARK_COUNT; spark += 1) {
          const angle = (Math.PI * 2 * spark) / SPARK_COUNT
          const innerRadius = 6 + eased * 18
          const outerRadius = innerRadius + 8 * (1 - progress * 0.35)
          context.beginPath()
          context.moveTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius)
          context.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius)
          context.stroke()
        }

        context.restore()
        if (progress >= 1)
          bursts.splice(burstIndex, 1)
      }

      if (bursts.length)
        frame = requestAnimationFrame(draw)
      else frame = 0
    }

    const handlePointerDown = (event: PointerEvent) => {
      bursts.push({
        x: event.clientX,
        y: event.clientY,
        startedAt: performance.now(),
        rotation: Math.random() * Math.PI,
      })
      if (!frame)
        frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[120] pointer-events-none motion-reduce:hidden" aria-hidden="true" />
}
