'use client'
import React, { useState } from 'react'
import { AIAside } from './AIAside'
import { Button } from '@/components/elements/Button'

export const AIButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className="w-screen">
      <AIAside isOpen={isOpen} setIsOpen={setIsOpen} />

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
  )
}
