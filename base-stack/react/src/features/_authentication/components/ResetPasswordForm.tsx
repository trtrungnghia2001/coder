import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formResetPasswordSchema, type ResetPasswordDTO } from '../data/schema'
import { useAuthStore } from '../data/store'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import InputPassword from '@/components/custom/input-password'
import { Loader } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

const defaultValues: ResetPasswordDTO = {
  token: '',
  password: '',
  confirmPassword: '',
}

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams()
  const { resetPassword } = useAuthStore()
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: ResetPasswordDTO) => await resetPassword(data),
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(error.message),
  })

  const form = useForm<ResetPasswordDTO>({
    resolver: zodResolver(formResetPasswordSchema),
    defaultValues: defaultValues,
  })

  // 2. Define a submit handler.
  function onSubmit(values: ResetPasswordDTO) {
    const token = searchParams.get('token')
    if (!token) {
      toast.error('Token is missing!')
      return
    }
    mutate({ ...values, token })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <InputPassword placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader className="animate-spin" />}
          Reset Password
        </Button>
      </form>
    </Form>
  )
}

export default ResetPasswordForm
