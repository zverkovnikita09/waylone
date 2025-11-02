"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface PhoneTabProps {
  isCodeSent?: boolean;
  state?: string;
}

interface PhoneForm {
  code?: string;
  phone: string;
}

export const PhoneTab = ({ isCodeSent, state }: PhoneTabProps) => {
  const { control, handleSubmit } = useForm<PhoneForm>({
    defaultValues: {
      phone: "",
    },
  });

  const router = useRouter();

  const onSubmit = async ({ phone, code }: PhoneForm) => {
    const response = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, code }),
    });
    const data = await response.json();
    router.refresh();

    console.log(data);
  };

  if (isCodeSent) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Код подтверждения выслан на номер{" "}
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="phone"
        render={({ field: { value, onChange } }) => (
          <Input
            value={value}
            onChange={onChange}
            placeholder="+7 (000)-000-00-00"
            title="Номер телефона"
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

