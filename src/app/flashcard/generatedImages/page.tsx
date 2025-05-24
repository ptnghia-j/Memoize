"use client"
import * as z from "zod";

import { Download, ImageIcon, Bot } from "lucide-react";
import { Heading } from "@/app/flashcard/generatedImages/_components/heading";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { amountOptions, resolutionOptions, apiOptions } from "./constants";
import { Card, CardFooter } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { Loader } from "@/components/ui/loader";
import Image from "next/image";

import {
  Form, 
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage, 
  FormItem
} from '@/components/ui/form'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const ImageGallery = () => {
  const router = useRouter();
  const [ images, setImages ] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
      api: "openai",
    }
  });

  const selectedApi = useWatch({
    control: form.control,
    name: "api",
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      let response;
      if (values.api === "google") {
        response = await axios.post('/api/googleImageGallery', {
          prompt: values.prompt,
          n: parseInt(values.amount, 10),
          // size is not sent for google as per requirements
        });
        const b64Images = response.data.map((image: {b64_json: string}) => `data:image/png;base64,${image.b64_json}`);
        setImages(b64Images);
      } else { // openai
        response = await axios.post('/api/imageGallery', values);
        const urls = response.data.map((image: {url: string}) => image.url);
        setImages(urls);
      }
    }
    catch(error: any) {
      if (axios.isAxiosError(error) && error.response && typeof error.response.data === 'string') {
        // Use the error message string from the API route's NextResponse
        toast.error(error.response.data);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred while generating images.");
      }
    }
    finally {
      router.refresh();
    }

  }

  return (
    <div>
      <Heading
        title = "Image Generation"
        description = {`Try generating images with ${selectedApi === "openai" ? "OpenAI DALL-E" : "Google Imagen"}.`}
        icon = {selectedApi === "openai" ? ImageIcon : Bot}
        iconColor = {selectedApi === "openai" ? "text-blue-500" : "text-green-500"}
        bgColor= {selectedApi === "openai" ? "bg-blue-500/10" : "bg-green-500/10"}
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {... form} >
            <form
              onSubmit = {form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Describe the image you want to generate"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="api"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {apiOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-2">
                    <Select
                      disabled={isLoading || selectedApi === "google"}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
            Generate
          </Button>
        </form>
          </Form>
          {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {images.length === 0 && !isLoading && (
          <Empty label="No images generated." />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  fill
                  alt="Generated"
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default ImageGallery