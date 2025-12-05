import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formUpdateMeSchema, type UpdateMeDTO } from '../data/schema'
import { useAuthStore } from '../data/store'
import { toast } from 'sonner'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CircleMinus, Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect } from 'react'

const defaultValues: UpdateMeDTO = {
  address: '',
  avatarUrl: '',
  gender: '',
  bio: '',
  name: '',
  phoneNumber: '',
  username: '',
  education: '',
  work: '',
  socialLinks: [{ value: '' }],
}

const UpdateMeForm = () => {
  const { updateMe, getMe } = useAuthStore()
  const { data, isSuccess } = useQuery({
    queryKey: ['me'],
    queryFn: async () => await getMe(),
  })

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: UpdateMeDTO) => {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item.value)
          })
        } else if (typeof value === 'string') {
          formData.append(key, value)
        }
      })

      return await updateMe(formData)
    },
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(error.message),
  })

  const form = useForm<UpdateMeDTO>({
    resolver: zodResolver(formUpdateMeSchema),
    defaultValues: defaultValues,
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialLinks',
  })

  useEffect(() => {
    if (data && isSuccess) {
      form.reset({
        ...data.data,
        socialLinks: data.data.socialLinks.map((s) => ({ value: s })),
      })
    }
  }, [data, isSuccess])

  function onSubmit(values: UpdateMeDTO) {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PhoneNumber</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select
                value={field.value}
                onValueChange={(val) => val && field.onChange(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </FormControl>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="work"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-3">
          {fields.map((item, index) => (
            <FormField
              control={form.control}
              key={item.id}
              name={`socialLinks.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Links</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input {...field} placeholder="https://your-link.com" />

                      <Button
                        type="button"
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => remove(index)}
                      >
                        <CircleMinus />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="button"
            variant={'outline'}
            onClick={() => append({ value: '' })}
          >
            + Add link
          </Button>
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader className="animate-spin" />}
          Update Me
        </Button>
      </form>
    </Form>
  )
}

export default UpdateMeForm
