import { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { optionType } from '../Forms/interface'
import { twMerge } from 'tailwind-merge'

interface ToggleProps {
  options: optionType[]
  selectedOption: number
  setSelectedOption: Dispatch<SetStateAction<number>>
}

const Toggle = ({
  options,
  selectedOption,
  setSelectedOption,
}: ToggleProps) => {
  const handleClick = (index: number) => {
    setSelectedOption(index)
  }

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {options.map(({ label }, index) => (
        <li
          key={index + (label ? label : '')}
          className="relative m-1 flex h-10 w-full cursor-pointer items-center justify-center rounded-full p-1 text-center"
          onClick={() => handleClick(index)}
          onKeyDown={() => {}}
        >
          <div
            className={twMerge(
              'relative z-20 flex w-full flex-row items-center justify-center text-center gap-1 whitespace-nowrap font-bold',
              selectedOption == index && 'text-gray-100'
            )}
          >
            <p>{label}</p>
          </div>
          {index === selectedOption && (
            <motion.div
              layoutId="underline"
              className="bg-teal-400 w-full h-full rounded-full absolute"
            />
          )}
        </li>
      ))}
    </div>
  )
}

export default Toggle
