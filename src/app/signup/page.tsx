"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import type { FormEvent } from "react";
import { SignupForm } from "@/components/SignupForm";

export default function SignupPage() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const emailAddress = formData.get("emailAddress");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("confirm-password");

    const response = await fetch(
      "http://airbelgie.rbcdigital.co.uk:3008/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailAddress,
          password,
          firstName,
          lastName,
          passwordConfirmation,
        }),
      },
    );

    if (response.ok) {
      console.log("test");
    } else {
      // Handle errors
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Air Belgie
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="https://imgproc.airliners.net/photos/airliners/1/3/3/4534331.jpg?v=v4b0f91a7af8"
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
