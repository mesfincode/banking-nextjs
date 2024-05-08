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
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'


const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  formSchema
  // 2. Define a submit handler.
  const  onSubmit= async(data: z.infer<typeof formSchema>) =>{
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)
    try{
          // sign up with appwrite
          if(type=== 'sign-up'){
            const newUser = await signUp(data);
            console.log(newUser);
            setUser(newUser);

          }
          if(type=== 'sign-in'){
            const response = await signIn({email:data.email,password: data.password});
            if(response) router.push('/');
          }
    }catch(e){
    console.log(e)

    }finally{
      setIsLoading(false)
    }
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
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {
                  type === 'sign-up' && (
                    <>
                      <div className='flex gap-2'>
                        <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />
                        <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />

                      </div>
                      <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your specific address" />
                      <CustomInput control={form.control} name="state" label="State" placeholder="Example: NY" />

                      <div className='flex gap-2'>
                        <CustomInput control={form.control} name="city" label="City" placeholder="" />
                        <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="Example: 11101" />

                      </div>
                      <div className='flex gap-2'>
                        <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
                        <CustomInput control={form.control} name="ssn" label="SSN" placeholder="Example: 1234" />

                      </div>
                    </>
                  )
                }

                <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
                <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

                <Button type="submit" className='form-btn w-full' disabled={isLoading}>
                  {
                    isLoading ? (<>
                      <Loader2 size={20} className='animate-spin' /> &nbsp;Loading
                    </>) : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                  }
                </Button>
              </form>
            </Form>
            <footer className='flex justify-center items-center gap-1'>
              <p className='text-14 font-normal text-gray-600'>
                {
                  type === 'sign-in' ? "Don't have an account? " : "Already hava an account? "
                }
              </p>
              <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link' >
                {type === 'sign-in' ? 'sign-up' : 'Sign In'}
              </Link>
            </footer>
          </>
        )
      }
    </div>
  )
}

export default AuthForm
