"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const emailAddress = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch(
        "https://airbelgie.rbcdigital.co.uk/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailAddress, password }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        // Save auth state and redirect
        login(data.accessToken, {
          id: data.user?.id ?? data.userId ?? "",
          email: emailAddress as string,
          firstName: data.user?.firstName,
          lastName: data.user?.lastName,
        });

        router.push("/");
      } else {
        const errorData = await response.json().catch(() => null);
        setError(
          errorData?.message ?? "Invalid email or password. Please try again.",
        );
      }
    } catch {
      setError(
        "Unable to connect. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
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
            <LoginForm
              onSubmit={handleSubmit}
              error={error}
              isSubmitting={isSubmitting}
            />
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
