'use client'
import { orpc } from '@/utils/orpc'
import { useQuery } from '@tanstack/react-query'

const TITLE_TEXT = `
     ██╗ ██████╗ ██████╗ ███████╗     █████╗ ███╗   ██╗ █████╗ ██╗  ██╗   ██╗███████╗████████╗███████╗     █████╗ ██████╗ ██████╗ 
     ██║██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗████╗  ██║██╔══██╗██║  ╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝    ██╔══██╗██╔══██╗██╔══██╗
     ██║██║   ██║██████╔╝███████╗    ███████║██╔██╗ ██║███████║██║   ╚████╔╝ ███████╗   ██║   ███████╗    ███████║██████╔╝██████╔╝
██   ██║██║   ██║██╔══██╗╚════██║    ██╔══██║██║╚██╗██║██╔══██║██║    ╚██╔╝  ╚════██║   ██║   ╚════██║    ██╔══██║██╔═══╝ ██╔═══╝ 
╚█████╔╝╚██████╔╝██████╔╝███████║    ██║  ██║██║ ╚████║██║  ██║███████╗██║   ███████║   ██║   ███████║    ██║  ██║██║     ██║     
 ╚════╝  ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝   ╚══════╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚═╝     ╚═╝     
`

export default function Home() {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions())

  return (
    <div className='container mx-auto max-w-full px-4 py-2 flex flex-col min-h-screen'>
      <div className='overflow-x-auto font-mono text-sm flex justify-center mb-8'>
        <div className='bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent text-center shadow-lg p-4 rounded-lg'>
          <pre>{TITLE_TEXT}</pre>
        </div>
      </div>
      <div className='grid gap-6 flex-grow'>
        <section>

        </section>
      </div>
      
      <footer className='mt-auto pt-6 border-t mt-8 text-sm text-gray-500'>
        <div className='flex items-center justify-center gap-2 py-4'>
          <div className={`h-2 w-2 rounded-full ${healthCheck.data ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>
            API Status: {healthCheck.isLoading ? 'Checking...' : healthCheck.data ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </footer>
    </div>
  )
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <li className='border-primary border-l-2 py-1 pl-3'>
      <h3 className='font-medium'>{title}</h3>
      <p className='text-muted-foreground text-sm'>{description}</p>
    </li>
  )
}
