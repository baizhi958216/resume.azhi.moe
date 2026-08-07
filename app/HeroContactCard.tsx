'use client'

import type { PointerEvent } from 'react'
import { useRef } from 'react'
import { FiMail, FiMapPin } from 'react-icons/fi'
import { SiGithub, SiWechat, SiX } from 'react-icons/si'

export default function HeroContactCard() {
  const cardRef = useRef<HTMLElement>(null)
  const frameRef = useRef<number | null>(null)

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const card = cardRef.current
    if (!card || event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return

    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    if (frameRef.current)
      cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      card.style.setProperty('--card-rotate-x', `${(0.5 - y) * 8}deg`)
      card.style.setProperty('--card-rotate-y', `${(x - 0.5) * 10}deg`)
      card.style.setProperty('--card-glow-x', `${x * 100}%`)
      card.style.setProperty('--card-glow-y', `${y * 100}%`)
    })
  }

  function resetCard() {
    const card = cardRef.current
    if (frameRef.current)
      cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      card?.style.setProperty('--card-rotate-x', '0deg')
      card?.style.setProperty('--card-rotate-y', '0deg')
    })
  }

  return (
    <aside
      ref={cardRef}
      className="hero-contact relative hidden w-full flex-col self-center overflow-hidden rounded-md bg-accent-soft/45 p-7 shadow-[0_14px_34px_rgba(25,58,101,.07)] backdrop-blur-[10px] transition-[transform,box-shadow,border-color] duration-250 hover:shadow-[0_24px_48px_rgba(25,58,101,.13)] max-sm:p-[22px] sm:flex"
      aria-label="联系方式"
      data-reveal
      data-reveal-delay="0.16"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetCard}
      onPointerCancel={resetCard}
    >
      <div className="mb-[30px]">
        <span className="font-mono text-xs leading-[1.3] tracking-[0.08em] text-accent">CONTACT · 2026</span>
        <h2 className="mt-3.5 mb-2.5 font-serif text-[25px] leading-[1.2] font-medium tracking-[-0.035em] text-ink">联系方式</h2>
        <p className="font-serif text-[15px] leading-[1.8] text-muted">如需进一步了解我的项目经历与技术实践，欢迎通过邮件、GitHub 或 X 联系。</p>
      </div>
      <dl className="[&_div]:grid [&_div]:grid-cols-[24px_1fr] [&_div]:items-center [&_div]:gap-3 [&_div]:border-t [&_div]:border-accent/10 [&_div]:py-2.5 [&_dd]:m-0 [&_dd]:text-sm [&_dd]:text-ink/80 [&_dd]:[overflow-wrap:anywhere] [&_a]:hover:text-accent">
        <div>
          <FiMapPin className="text-sm text-accent" aria-hidden="true" />
          <dt className="sr-only">所在地</dt>
          <dd>广州</dd>
        </div>
        <div>
          <SiWechat className="text-sm text-accent" aria-hidden="true" />
          <dt className="sr-only">微信</dt>
          <dd>AndyCongDev</dd>
        </div>
        <div>
          <FiMail className="text-sm text-accent" aria-hidden="true" />
          <dt className="sr-only">邮箱</dt>
          <dd><a href="mailto:1475289190@qq.com">1475289190@qq.com</a></dd>
        </div>
      </dl>
      <div className="mt-[22px] flex gap-2 border-t border-accent/10 pt-4 [&_a]:inline-flex [&_a]:size-[38px] [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:border [&_a]:border-accent/15 [&_a]:bg-white/40 [&_a]:text-accent [&_a]:transition-colors [&_a]:hover:border-accent [&_a]:hover:bg-accent [&_a]:hover:text-paper [&_svg]:text-base">
        <a href="https://github.com/baizhi958216" target="_blank" rel="noreferrer" aria-label="GitHub：baizhi958216"><SiGithub aria-hidden="true" /></a>
        <a href="https://x.com/baizhi958216" target="_blank" rel="noreferrer" aria-label="X：@baizhi958216"><SiX aria-hidden="true" /></a>
      </div>
    </aside>
  )
}
