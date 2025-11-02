"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
interface EmailTabProps {
  isCodeSent?: boolean;
  state?: string;
}

interface EmailForm {
  code?: string;
  email: string;
}

export const EmailTab = ({ isCodeSent, state }: EmailTabProps) => {
  const { control, handleSubmit } = useForm<EmailForm>({
    defaultValues: { email: "" },
  });

  const router = useRouter();

  const onSubmit = async ({ email, code }: EmailForm) => {
    const response = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });
    const data = await response.json();
    router.refresh();

    console.log(data);
  };

  if (isCodeSent) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} key={"code-form"}>
        <Controller
          control={control}
          name="code"
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder=""
              title="Код подтверждения"
              inputSize="sm"
            />
          )}
        />
        <p className="text-sm text-secondary-text mt-sm">
          Код подтверждения выслан на почту{" "}
          <span className="font-bold">{state}</span>
        </p>
        <div className="mt-xl">
          <Button type="submit" fullWidth>
            Подтвердить
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} key={"email-form"}>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <Input
            value={value}
            onChange={onChange}
            placeholder="example@mail.ru"
            title="Email"
            inputSize="sm"
          />
        )}
      />
      <div className="mt-xl">
        <Button type="submit" fullWidth>
          Получить код подтверждения
        </Button>
      </div>
    </form>
  );
};

