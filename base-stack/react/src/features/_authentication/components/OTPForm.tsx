import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { formOtpSchema, type OtpDTO } from '../data/schema'
import { useAuthStore } from '../data/store'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { Loader } from 'lucide-react'

const defaultValues: OtpDTO = { otp: '' }

const OTPForm = () => {
  const { opt } = useAuthStore()
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: OtpDTO) => await opt(data),
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(error.message),
  })

  const form = useForm<OtpDTO>({
    resolver: zodResolver(formOtpSchema),
    defaultValues: defaultValues,
  })

  // 2. Define a submit handler.
  function onSubmit(values: OtpDTO) {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  containerClassName='flex items-center justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader className="animate-spin" />}
          Verify
        </Button>
      </form>
    </Form>
  )
}

export default OTPForm
