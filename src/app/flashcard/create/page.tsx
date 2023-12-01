"use client"

import Link from 'next/link'
import React from 'react'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import {
  Form, 
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage, 
  FormItem
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


const formSchema = z.object({
  title: z.string().min(1, {
    message: "Name for a set of cards is required"
  })
})

function CreateCard() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    }
  })

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/flashcard', values);
      router.push(`/flashcard/${response.data.id}`)

    } 
    catch {
      toast.error("Something went wrong")
    }
    
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          Name your set of cards! 
        </h1>
        <p className="text-sm text-slate-600">
        Don&apos;t worry, you can change this later.
        </p>
        <Form {... form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField 
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Collection name
                  </FormLabel>
                  <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="My first collection"
                    {...field}

                    />
                  </FormControl>
                  <FormDescription>
                    Give your collection a name, what do you want to learn?
                  </FormDescription>
                  <FormMessage />
                </FormItem>

              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/flashcard">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>

            </div>
          </form>

        </Form>
      </div>
    </div>
  )
}

export default CreateCard