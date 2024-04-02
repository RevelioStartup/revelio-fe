import { useState } from 'react'
import { Typography } from '@mui/material'

function Questions() {
  const [items, setItems] = useState([
    {
      id: 1,
      isVisible: false,
      title: 'What is Revelio, and how will it help me?',
      text: `Revelio is a one-stop event planning app that will ease your whole event planning activity, supported with an AI assistant to make your event planning experience seamless.`,
    },
    {
      id: 2,
      isVisible: false,
      title: 'Is Revelio free?',
      text: `Revelio offer Freemium membership. Free plan users will still be able to use Revelio features, but premium feature like AI Assistant is currently not offered.`,
    },
    {
      id: 3,
      isVisible: false,
      title: `How can I get help if I'm stuck when using this app?`,
      text: `You can ask us any questions regarding Revelio through our Instagram or email account.`,
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
          <button
            id={item.id.toString()}
            className="flex items-center justify-between hover:text-[#14b8a6] hover:text-bold"
            style={{ transition: '0.2s ease' }}
            onClick={() => handleToggle(item.id)}
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
          </button>
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
