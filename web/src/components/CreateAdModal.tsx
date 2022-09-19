import { FormEvent, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react'
import { Input } from './Form/Input'
import * as Checkbox from '@radix-ui/react-checkbox'
import axios from 'axios';

interface Game {
  id: string
  title: string
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChanel, setUseVoiceChanel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3333/games/')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
      "name": data.name,
      "yearsPlaying": Number(data.yearsPlaying),
      "discord": data.discord,
      "weekDays": weekDays,
      "hourStart": data.hourStart,
      "hourEnd": data.hourEnd,
      "useVoiceChanel": useVoiceChanel
    })
    alert('Anúncio criado com sucesso.')
    } catch (error) {
      console.log(error)
      alert('Erro ao criar o anúncio.')
    } 
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='fixed bg-[#2a2634] rounded-lg py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
            <select id='game' name='game' className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' placeholder='Selecione o game que deseja jogar'
              defaultValue='' >
              <option value="Jogo X">Selecione o seu jogo</option>
              {games.map(game => {
                return (
                  <option key={game.id} value={game.id}>{game.title}</option>
                )
              })}
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Seu nome</label>
            <Input type="text" id='name' name='name' placeholder='Seu nome ou nickname' />
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying">A quantos anos joga?</label>
              <Input type="number" name='yearsPlaying' id='yearsPlaying' placeholder='Tudo bem ser zero' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual o seu discord?</label>
              <Input type="text" id='discord' name='discord' placeholder='usuario#123' />
            </div>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDay">Quando costumar jogar?</label>
              <ToggleGroup.Root type='multiple' className='grid grid-cols-4 gap-2' value={weekDays} onValueChange={setWeekDays}>
                <ToggleGroup.Item value='0' className={`W-8 H-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Domingo'>D</ToggleGroup.Item>
                <ToggleGroup.Item value='1' className={`W-8 H-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Segunda'>S</ToggleGroup.Item>
                <ToggleGroup.Item value='2' className={`W-8 H-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Terça'>T</ToggleGroup.Item>
                <ToggleGroup.Item value='3' className={`W-8 H-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quarta'>Q</ToggleGroup.Item>
                <ToggleGroup.Item value='4' className={`W-8 H-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quinta'>Q</ToggleGroup.Item>
                <ToggleGroup.Item value='5' className={`W-8 H-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sexta'>S</ToggleGroup.Item>
                <ToggleGroup.Item value='6' className={`W-8 H-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sábado'>S</ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hourStart">Qual o horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input id='hourStart' name='hourStart' type="time" placeholder='De' />
                <Input id='hourEnd' name='hourEnd' type="time" placeholder='Até' />
              </div>
            </div>
          </div>
          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root
              checked={useVoiceChanel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChanel(true)
                } else {
                  setUseVoiceChanel(false)
                }
              }}
              className='w-6 h-6 p-1 rounded bg-zinc-900'
            >
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 font-semibold rounded-md hover:bg-zinc-600'>Cancelar</Dialog.Close>
            <button type="submit" className='bg-violet-500 px-5 h-12 font-semibold flex items-center gap-2 rounded-md hover:bg-violet-600'>
              <GameController />
              Criar anúncio
            </button>
          </footer>

        </form>
      </Dialog.Content>

    </Dialog.Portal>
  )
}