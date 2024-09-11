import Hero from '@/components/Shared/Hero'
import Navbar from '@/components/Shared/Navbar'

export default function HomePage() {
  return (
    <div className='max-w-[1200px] mx-auto '>
      <Navbar />
      <Hero />
    </div>
  )
}

