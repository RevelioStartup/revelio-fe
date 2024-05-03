'use client'
import { Button } from '@/components/elements/Button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const CreateRundownButton = () => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-8 px-5 py-3 lg:px-10 lg:py-6 border border-teal-600 rounded-xl">
      <div className="flex flex-row gap-3">
        <i className="i-ph-list-checks-light size-6 text-gray-950" />
        <p>No rundowns created yet</p>
      </div>
      <Link href={`${pathname}/create-rundown`} className="w-full">
        <Button
          variant={'ghost'}
          width={'full'}
          data-testid="button-add-rundown-manual"
        >
          Add Rundown Manually
        </Button>
      </Link>
      <p className="font-bold text-teal-400 text-center">or</p>
      <Button>Generate with AI</Button>
    </div>
  )
}
