import { Switch } from '@/components/ui/switch'
import { useTheme } from '../data/context'

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme()
  return <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
}

export default ThemeSwitch
