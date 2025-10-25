
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyOtp, resendOtp } from './actions';

const formSchema = z.object({
  otp: z.string().min(6, { message: 'Your OTP must be 6 characters.' }).max(6),
});

function VerifyOtpComponent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!email) {
        setError('Email not found. Please try registering again.');
        return;
    }
    setError(null);
    const result = await verifyOtp({ otp: values.otp, email });
    if (result.success) {
      toast({
        title: 'Account Verified',
        description: 'You have been successfully registered. Please log in.',
      });
      router.push('/login');
    } else {
      setError(result.error || 'An error occurred.');
      toast({
        title: 'Verification Failed',
        description: result.error || 'Invalid OTP code.',
        variant: 'destructive',
      });
    }
  }

  async function handleResendOtp() {
    if (!email || cooldown > 0) return;

    setIsResending(true);
    const result = await resendOtp({ email });
    setIsResending(false);

    if (result.success) {
      toast({
        title: 'OTP Resent',
        description: 'A new OTP has been generated. Check the server console.',
      });
      setCooldown(60); // Start 60-second cooldown
    } else {
      toast({
        title: 'Resend Failed',
        description: result.error || 'Could not resend OTP.',
        variant: 'destructive',
      });
    }
  }


  return (
     <main className="container mx-auto px-4 py-32 animate-fade-in-up">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight font-headline">Verify Your Account</CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to <span className="font-medium text-foreground">{email}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••"
                          {...field}
                          className="bg-background text-base text-center tracking-[0.5em]"
                          maxLength={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Verifying...' : 'Verify'}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                Didn't receive a code?{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={handleResendOtp}
                  disabled={isResending || cooldown > 0}
                >
                  {isResending
                    ? 'Sending...'
                    : cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : 'Resend OTP'}
                </Button>
              </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOtpComponent />
        </Suspense>
    )
}
