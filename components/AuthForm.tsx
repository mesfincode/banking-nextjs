"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'


const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)
  const [isLoading , setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof authFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false);

    },1000)
    console.log(values)
  }
  return (
    <div className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='cursor-pointer flex items-center gap-1'>
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt='Horizon logo'
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
        </Link>
        <div>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {
              user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'

            }
            <p className='text-16 font-normal text-gray-600'>
              {
                user ? 'Link your account to get started' : 'Please enter your detail'
              }
            </p>
          </h1>
        </div>
      </header>
      {
        user ? (
          <div className='flex flex-col gap-4'>

          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
              <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

              <Button type="submit" className='form-btn' disabled={isLoading}>
                {
                  isLoading ?(<>
                  <Loader2 size={20} className='animate-spin'/> &nbsp;Loading
                  </>):type === 'sign-in' ? 'Sign In' : 'Sign Up'
                }
                </Button>
            </form>
          </Form>
        )
      }
    </div>
  )
}

export default AuthForm
