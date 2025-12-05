import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRight, Loader } from "lucide-react";
import {
  formForgotPasswordSchema,
  type ForgotPasswordDTO,
} from "../data/schema";
import { useAuthStore } from "../data/store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const defaultValues: ForgotPasswordDTO = { email: "" };

const ForgotPasswordForm = () => {
  const { forgotPassword } = useAuthStore();
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: ForgotPasswordDTO) => await forgotPassword(data),
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(error.message),
  });

  const form = useForm<ForgotPasswordDTO>({
    resolver: zodResolver(formForgotPasswordSchema),
    defaultValues: defaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: ForgotPasswordDTO) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Create Account
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            <ArrowRight size={16} />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
