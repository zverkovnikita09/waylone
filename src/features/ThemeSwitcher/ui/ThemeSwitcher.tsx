"use client";
import { Button } from "@/shared/ui/Button";
import { MoonSunToggle } from "./MoonSunToggle";
import { useCallback, useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Button variant="secondary" onClick={toggleTheme} size="xs">
      <MoonSunToggle theme={theme} />
    </Button>
  );
};

