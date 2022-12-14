import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconChecking from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code) //copia o codigo gerado para area de tranferencia

      alert('Bolão criado com sucesso, o código foi copiado para área de transferência')

      setPoolTitle('')
    } catch (error) {

      alert('Falha ao criar o bolão, tente novamente')

      setPoolTitle('')
    }
  }

  return (
    <div
      className='
      max-w-[1124px] 
      h-screen
      mx-auto
      grid
      grid-cols-2
      gap-28
      items-center
      '
    >
      <main>
        <Image src={logoImg} quality={100} alt="" />

        <h1
          className='
          mt-14
          text-white-100
          text-5xl
          font-bold
          leading-tight
       '
        >
          Crie seu própio bolão da copa e compartilhe entre amigos!</h1>

        <div
          className='
          mt-10
          flex
          items-center
          gap-3
        '
        >
          <Image src={usersAvatarExampleImg} alt="" />

          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500 pr-3'>+{props.userCount}</span>pessoas já estão usando
          </strong>
        </div>

        <form className='mt-10 flex gap-2' onSubmit={createPool}>
          <input
            className='
            flex-1
            px-6
            py-4
            rounded
            border
            text-gray-100
            bg-gray-800
            border-gray-600
          '
            type="text"
            required
            placeholder='Qual nome do seu bolão ?'

            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />

          <button
            className='
            px-6
            py-4
            rounded
            font-bold
            text-sm
            uppercase
            text-gray-900
            bg-yellow-500

            hover:bg-yellow-700
          '
            type='submit'
          >
            Criar meu bolão</button>
        </form>

        <p
          className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você recebera um código único que poderá usar para convidar outras pessoas
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 grid grid-cols-2 text-gray-100'>
          <div className='flex items-center gap-2'>
            <Image src={iconChecking} alt="" />

            <div className='flex flex-col'>
              <span className='font-bold text-xl'>{`+${props.poolCount}`}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <Image src={iconChecking} alt="" />

            <div className='flex flex-col'>
              <span className='font-bold text-xl'>{`+${props.guessCount}`}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} quality={100} alt="" />
    </div>
  )
}

export async function getStaticProps() {

  const [poolCountResponse, guesseCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.pools,
      guessCount: guesseCountResponse.data.guesses,
      userCount: userCountResponse.data.users,
    },
    revalidate: 20
  }
}