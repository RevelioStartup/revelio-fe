'use client'
import React, { useState } from 'react'
import { AIAside } from './AIAside'
import { Button } from '@/components/elements/Button'

export const AIButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className="w-full overflow-x-hidden">
      <AIAside isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <p className="whitespace-nowrap w-full" data-testid="ai-button">
            Ask AI
          </p>
        </Button>
      </div>
    </div>
  )
}
