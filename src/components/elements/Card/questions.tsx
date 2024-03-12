import { useState } from 'react'
import { Typography } from '@mui/material'

function Questions() {
  const [items, setItems] = useState([
    {
      id: 1,
      isVisible: false,
      title: 'What is Revelio, and how will it help me?',
      text: `Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.`,
    },
    {
      id: 2,
      isVisible: false,
      title: 'Is Revelio free?',
      text: `Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.`,
    },
    {
      id: 3,
      isVisible: false,
      title: 'Can I use Revelio with other people?',
      text: `Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers!`,
    },
    {
      id: 4,
      isVisible: false,
      title: `How can I get help if I'm stuck when using this app?`,
      text: `The best place to get help is inside Frontend Mentor's Discord community. There's a help channel where you can ask questions and seek support from other community members.`,
    },
  ])

  const handleToggle = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, isVisible: !item.isVisible }
          : { ...item, isVisible: false }
      )
    )
  }

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-4 mt-5">
          <div
            className="flex items-center justify-between hover:text-[#14b8a6] hover:text-bold"
            style={{ transition: '0.2s ease' }}
            onClick={() => handleToggle(item.id)}
            role="button"
          >
            <button className="text-start font-bold leading-5">
              <Typography variant={'h6'} mb={1}>
                {item.title}
              </Typography>
            </button>
            <button>
              {item.isVisible ? (
                <i
                  className="i-ph-arrow-down-bold"
                  data-testid="i-ph-arrow-down-bold"
                />
              ) : (
                <i
                  className="i-ph-arrow-right-bold "
                  data-testid="i-ph-arrow-right-bold"
                />
              )}
            </button>
          </div>
          <div
            className={`transition-all duration-350 ease-in-out ${item.isVisible ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0'}`}
          >
            <p className="text-sm xl:pr-10 xl:font">{item.text}</p>
          </div>
          <div className="w-full border-[1px]"></div>
        </div>
      ))}
    </>
  )
}

export default Questions
