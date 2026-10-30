'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ChatWidget = dynamic(() => import('./chat-widget').then((m) => m.ChatWidget), { ssr: false })

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

/**
 * Loads the chat widget once the page is interactive and the browser is idle,
 * so its code stays out of the critical bundle on every page.
 */
export function ChatWidgetLazy() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const w = window as IdleWindow
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 3000 })
      return () => w.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(() => setReady(true), 1500)
    return () => window.clearTimeout(id)
  }, [])

  return ready ? <ChatWidget /> : null
}
