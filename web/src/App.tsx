import './styles/main.css'
import { GameBanner } from './components/GameBanner'
import logoImg from './assets/logo.svg'
import { CreatAdBanner } from './components/CreatAdBanner'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'


interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games/')
      .then(respose => {
        setGames(respose.data)
      })
  }, [])


  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo" className='max-w-[286px]' />
      <h1 className='text-6xl text-white font-black mt-20'>
        O seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D]">duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreatAdBanner />
          <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
