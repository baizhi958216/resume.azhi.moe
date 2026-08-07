'use client'

import { useEffect, useRef } from 'react'

const ICON_VERSION = '1.94.0'
const ICON_BASE = `https://unpkg.com/@lobehub/icons-static-svg@${ICON_VERSION}/icons`

const STICKERS = [
  { name: 'OpenAI', slug: 'openai', size: 68 },
  { name: 'Claude', slug: 'claude-color', size: 68 },
  { name: 'Gemini', slug: 'gemini-color', size: 68 },
  { name: 'DeepSeek', slug: 'deepseek-color', size: 68 },
  { name: 'Qwen', slug: 'qwen-color', size: 68 },
  { name: 'Hugging Face', slug: 'huggingface-color', size: 68 },
  { name: 'GitHub', slug: 'github', size: 68 },
  { name: 'Cursor', slug: 'cursor', size: 68 },
  { name: 'Vercel', slug: 'vercel', size: 68 },
  { name: 'Grok', slug: 'grok', size: 68 },
  { name: 'Doubao', slug: 'doubao-color', size: 68 },
  { name: 'Ollama', slug: 'ollama', size: 68 },
  { name: 'Copilot', slug: 'copilot-color', size: 68 },
  { name: 'Meta', slug: 'meta-color', size: 68 },
  { name: 'Anthropic', slug: 'anthropic', size: 68 },
  { name: 'Cloudflare', slug: 'cloudflare-color', size: 68 },
  { name: 'Dify', slug: 'dify-color', size: 68 },
  { name: 'ChatGLM', slug: 'chatglm-color', size: 68 },
  { name: 'Tencent Hunyuan', slug: 'hunyuan-color', size: 68 },
  { name: 'Baidu Wenxin', slug: 'wenxin-color', size: 68 },
  { name: 'MiniMax', slug: 'minimax-color', size: 68 },
] as const

interface StickerBody {
  element: HTMLDivElement
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  rotation: number
  angularVelocity: number
}

interface DragState {
  body: StickerBody
  pointerId: number
  offsetX: number
  offsetY: number
  lastX: number
  lastY: number
  lastTime: number
}

type DeviceOrientationPermissionEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'denied' | 'granted'>
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function IconStickers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickersRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const container = containerRef.current
    const stickerElementsRef = stickersRef.current.filter(
      (element): element is HTMLDivElement => Boolean(element),
    )
    if (!container || stickerElementsRef.length === 0)
      return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const pointer = { x: 0, y: 0, active: false }
    const gravity = { x: 0, y: 0.152 }
    const mobileStickerCount = 6
    const mobileStickerIndices = new Set(
      Array.from({ length: STICKERS.length }, (_, index) => index)
        .sort(() => Math.random() - 0.5)
        .slice(0, mobileStickerCount),
    )
    let width = 0
    let height = 0
    let bodies: StickerBody[] = []
    let frame = 0
    let lastTime = performance.now()
    let visible = true
    let drag: DragState | null = null
    const desktopDrag = window.matchMedia(
      '(min-width: 641px) and (hover: hover) and (pointer: fine)',
    ).matches
    const mobileMotion = window.matchMedia('(pointer: coarse)').matches
      && 'DeviceOrientationEvent' in window
    let orientationListening = false

    const paint = () => {
      bodies.forEach((body) => {
        body.element.style.transform = `translate3d(${body.x - body.radius}px, ${body.y - body.radius}px, 0) rotate(${body.rotation}deg)`
      })
    }

    const arrange = () => {
      const compact = width < 640
      const activeStickers = stickerElementsRef
        .map((element, index) => ({ element, index }))
        .filter(({ element, index }) => {
          const active = !compact || mobileStickerIndices.has(index)
          element.style.display = active ? 'grid' : 'none'
          return active
        })

      bodies = activeStickers.map(({ element, index: stickerIndex }, index) => {
        const baseSize = STICKERS[stickerIndex].size
        const size = Math.round(baseSize * (compact ? 0.78 : 1))
        const radius = size / 2
        element.style.width = `${size}px`
        element.style.height = `${size}px`

        if (reducedMotion) {
          const columns = compact ? 3 : 6
          const rows = Math.ceil(activeStickers.length / columns)
          const column = index % columns
          const row = Math.floor(index / columns)
          return {
            element,
            x: width * (0.4 + column * (0.55 / Math.max(1, columns - 1))),
            y: height * (0.38 + row * (0.56 / Math.max(1, rows - 1))),
            vx: 0,
            vy: 0,
            radius,
            rotation: ((index % 3) - 1) * 7,
            angularVelocity: 0,
          }
        }

        return {
          element,
          x: radius + Math.random() * Math.max(1, width - radius * 2),
          y: -height * 0.42 + Math.random() * height * 1.08,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 0.45,
          radius,
          rotation: (Math.random() - 0.5) * 28,
          angularVelocity: (Math.random() - 0.5) * 0.34,
        }
      })
      paint()
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      arrange()
    }

    const resolveCollisions = () => {
      for (let firstIndex = 0; firstIndex < bodies.length; firstIndex++) {
        const first = bodies[firstIndex]
        for (
          let secondIndex = firstIndex + 1;
          secondIndex < bodies.length;
          secondIndex++
        ) {
          const second = bodies[secondIndex]
          const dx = second.x - first.x
          const dy = second.y - first.y
          const distance = Math.hypot(dx, dy) || 0.001
          const collisionDistance = (first.radius + second.radius) * 0.92
          const overlap = collisionDistance - distance
          if (overlap <= 0)
            continue

          const nx = dx / distance
          const ny = dy / distance
          const firstIsDragged = drag?.body === first
          const secondIsDragged = drag?.body === second
          if (firstIsDragged) {
            second.x += nx * overlap
            second.y += ny * overlap
          }
          else if (secondIsDragged) {
            first.x -= nx * overlap
            first.y -= ny * overlap
          }
          else {
            first.x -= nx * overlap * 0.5
            first.y -= ny * overlap * 0.5
            second.x += nx * overlap * 0.5
            second.y += ny * overlap * 0.5
          }

          const relativeVelocity
            = (second.vx - first.vx) * nx + (second.vy - first.vy) * ny
          if (relativeVelocity < 0) {
            const impulse = relativeVelocity * 0.76
            if (!firstIsDragged) {
              first.vx += impulse * nx
              first.vy += impulse * ny
              first.angularVelocity -= impulse * 0.14
            }
            if (!secondIsDragged) {
              second.vx -= impulse * nx
              second.vy -= impulse * ny
              second.angularVelocity += impulse * 0.14
            }
          }
        }
      }
    }

    const update = (step: number) => {
      bodies.forEach((body) => {
        if (drag?.body === body)
          return

        body.vx += gravity.x * step
        body.vy += gravity.y * step

        if (pointer.active && !drag) {
          const dx = body.x - pointer.x
          const dy = body.y - pointer.y
          const distance = Math.hypot(dx, dy) || 0.001
          const reach = body.radius + 58
          if (distance < reach) {
            const force = (reach - distance) / reach
            body.vx += (dx / distance) * force * 1.3 * step
            body.vy += (dy / distance) * force * 1.3 * step
            body.angularVelocity += (dx / distance) * force * 0.045
          }
        }

        body.vx *= 0.996
        body.vy *= 0.996
        body.angularVelocity *= 0.992
        body.x += body.vx * step
        body.y += body.vy * step
        body.rotation += body.angularVelocity * step

        if (body.x - body.radius < 0) {
          body.x = body.radius
          body.vx = Math.abs(body.vx) * 0.78
          body.angularVelocity += 0.16
        }
        else if (body.x + body.radius > width) {
          body.x = width - body.radius
          body.vx = -Math.abs(body.vx) * 0.78
          body.angularVelocity -= 0.16
        }

        if (body.y + body.radius > height) {
          body.y = height - body.radius
          body.vy = -Math.abs(body.vy) * 0.58
          body.angularVelocity *= 0.8
        }
      })
      resolveCollisions()
      paint()
    }

    const animate = (time: number) => {
      const step = clamp((time - lastTime) / 16.67, 0.25, 2)
      lastTime = time
      if (visible)
        update(step)
      frame = requestAnimationFrame(animate)
    }

    const updatePointer = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active
        = pointer.x >= 0
          && pointer.x <= rect.width
          && pointer.y >= 0
          && pointer.y <= rect.height
    }
    const clearPointer = () => {
      pointer.active = false
    }

    const updateGravity = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null)
        return

      const screenOrientation = window.screen.orientation?.angle
        ?? (window as Window & { orientation?: number }).orientation
        ?? 0
      const angle = ((screenOrientation % 360) + 360) % 360
      let tiltX = event.gamma
      let tiltY = event.beta

      if (angle === 90) {
        tiltX = event.beta
        tiltY = -event.gamma
      }
      else if (angle === 270) {
        tiltX = -event.beta
        tiltY = event.gamma
      }
      else if (angle === 180) {
        tiltX = -event.gamma
        tiltY = -event.beta
      }

      const targetX = clamp(tiltX / 45, -1.2, 1.2) * 0.18
      const targetY = clamp(tiltY / 45, -1.2, 1.2) * 0.18
      gravity.x += (targetX - gravity.x) * 0.18
      gravity.y += (targetY - gravity.y) * 0.18
    }

    const startOrientationListener = () => {
      if (orientationListening)
        return
      window.addEventListener('deviceorientation', updateGravity, { passive: true })
      orientationListening = true
    }

    const requestMotionPermission = async () => {
      window.removeEventListener('pointerdown', requestMotionPermission, true)
      const orientationEvent = DeviceOrientationEvent as DeviceOrientationPermissionEvent
      try {
        if (!orientationEvent.requestPermission || await orientationEvent.requestPermission() === 'granted')
          startOrientationListener()
      }
      catch {
        // Sensor permission was denied or is unavailable; keep the default gravity.
      }
    }

    const startDrag = (event: PointerEvent) => {
      if (!desktopDrag || event.button !== 0 || drag)
        return

      const body = bodies.find(
        ({ element }) => element === event.currentTarget,
      )
      if (!body)
        return

      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      drag = {
        body,
        pointerId: event.pointerId,
        offsetX: x - body.x,
        offsetY: y - body.y,
        lastX: body.x,
        lastY: body.y,
        lastTime: event.timeStamp,
      }
      body.vx = 0
      body.vy = 0
      pointer.active = false
      body.element.classList.add('is-dragging')
      body.element.setPointerCapture(event.pointerId)
      event.preventDefault()
    }

    const moveDrag = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointerId)
        return

      const rect = container.getBoundingClientRect()
      const nextX = clamp(
        event.clientX - rect.left - drag.offsetX,
        drag.body.radius,
        width - drag.body.radius,
      )
      const nextY = clamp(
        event.clientY - rect.top - drag.offsetY,
        drag.body.radius,
        height - drag.body.radius,
      )
      const elapsed = Math.max(1, event.timeStamp - drag.lastTime)
      const frameScale = 16.67 / elapsed
      drag.body.vx = clamp((nextX - drag.lastX) * frameScale, -30, 30)
      drag.body.vy = clamp((nextY - drag.lastY) * frameScale, -30, 30)
      drag.body.angularVelocity = clamp(drag.body.vx * 0.035, -1.2, 1.2)
      drag.body.x = nextX
      drag.body.y = nextY
      drag.lastX = nextX
      drag.lastY = nextY
      drag.lastTime = event.timeStamp
      resolveCollisions()
      paint()
      event.preventDefault()
    }

    const endDrag = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointerId)
        return

      const { body, pointerId } = drag
      body.element.classList.remove('is-dragging')
      if (body.element.hasPointerCapture(pointerId))
        body.element.releasePointerCapture(pointerId)
      if (reducedMotion) {
        body.vx = 0
        body.vy = 0
        body.angularVelocity = 0
      }
      drag = null
      updatePointer(event)
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible)
        lastTime = performance.now()
    })

    resizeObserver.observe(container)
    intersectionObserver.observe(container)
    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('pointerout', clearPointer)
    if (mobileMotion) {
      const orientationEvent = DeviceOrientationEvent as DeviceOrientationPermissionEvent
      if (orientationEvent.requestPermission)
        window.addEventListener('pointerdown', requestMotionPermission, { capture: true, once: true })
      else
        startOrientationListener()
    }
    if (desktopDrag) {
      stickerElementsRef.forEach(element =>
        element.addEventListener('pointerdown', startDrag),
      )
      window.addEventListener('pointermove', moveDrag, { passive: false })
      window.addEventListener('pointerup', endDrag)
      window.addEventListener('pointercancel', endDrag)
    }
    resize()
    if (!reducedMotion)
      frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerout', clearPointer)
      window.removeEventListener('pointerdown', requestMotionPermission, true)
      window.removeEventListener('deviceorientation', updateGravity)
      stickerElementsRef.forEach(element =>
        element.removeEventListener('pointerdown', startDrag),
      )
      window.removeEventListener('pointermove', moveDrag)
      window.removeEventListener('pointerup', endDrag)
      window.removeEventListener('pointercancel', endDrag)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="resume-stickers absolute inset-0 size-full"
      aria-hidden="true"
    >
      {STICKERS.map((sticker, index) => (
        <div
          key={sticker.slug}
          ref={(element) => {
            stickersRef.current[index] = element
          }}
          className="resume-sticker"
          title={sticker.name}
        >
          {/* eslint-disable-next-line next/no-img-element -- LobeHub 官方固定版本 SVG 贴纸资源 */}
          <img
            src={`${ICON_BASE}/${sticker.slug}.svg`}
            alt=""
            draggable={false}
            decoding="async"
          />
        </div>
      ))}
    </div>
  )
}
