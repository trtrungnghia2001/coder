import { Button } from '@/components/ui/button'
import UpdateMeForm from '@/features/_authentication/components/UpdateMeForm'
import { useAuthStore } from '@/features/_authentication/data/store'
import ThemeSwitch from '@/features/theme/components/ThemeSwitch'
import { Link } from 'react-router-dom'

const links = [`signin`, `signup`, `forgot password`, `data table`, `dnd kit`]

const HomePage = () => {
  const { auth } = useAuthStore()
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center max-w-lg w-full">
        <div>Hello: {auth?.name}</div>{' '}
        <div>
          <ThemeSwitch />
        </div>
        <ul className="flex flex-wrap gap-2 justify-center items-center">
          {links.map((link) => (
            <li key={link}>
              <Button asChild className="capitalize" variant={'outline'}>
                <Link to={`/` + link.replaceAll(' ', '-')}>{link}</Link>
              </Button>
            </li>
          ))}
        </ul>
        <UpdateMeForm />
      </div>
    </div>
  )
}

export default HomePage
