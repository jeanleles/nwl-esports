import { MagnifyingGlassPlus } from "phosphor-react"
import * as Dialog from '@radix-ui/react-dialog'

export function CreatAdBanner() {
    return (
        <div className='pt-1 self-stretch mt-8 rounded-lg overflow-hidden bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D]'>
            <div className='bg-[#2a2634] px-8 py-6 flex justify-between items-center'>
                <div>
                    <strong className='text-2xl font-black text-white block'>Não encotrou seu duo?</strong>
                    <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players</span>
                </div>
                <Dialog.Trigger className='py-3 px-4 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition all ease delay-75 flex items-center gap-2'>
                    <MagnifyingGlassPlus size={22} />
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}