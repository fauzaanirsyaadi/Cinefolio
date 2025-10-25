'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { requestPasswordReset } from './actions';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    const result = await requestPasswordReset(values);
    if (result.success) {
      toast({
        title: 'Password Reset Requested',
        description: 'If an account exists, a reset link has been sent to your email.',
      });
      router.push('/login');
    } else {
      setError(result.error || 'An error occurred.');
      toast({
        title: 'Request Failed',
        description: result.error || 'An unknown error occurred.',
        variant: 'destructive',
      });
    }
  }

  return (
    <main className="container mx-auto px-4 py-32 animate-fade-in-up">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight font-headline">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to receive a password reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} className="bg-background text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Remember your password?{' '}
              <Link href="/login" passHref>
                <span className="underline cursor-pointer">Log in</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
