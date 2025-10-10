import { LoginButton } from "@/features/Login";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { CustomLink } from "@/shared/ui/CustomLink";
import Link from "next/link";

const links = [
  { name: "Карта", href: "/map" },
  { name: "Маршруты", href: "/routes" },
  { name: "Места", href: "/places" },
  { name: "События", href: "/events" },
];

interface HeaderProps {
  isAutorized?: boolean;
}

export const Header = ({ isAutorized }: HeaderProps) => {
  return (
    <div className="flex bg-main-bg py-xl px-3xl shadow-md justify-between items-center relative z-10 transition-all duration-base">
      <div></div>
      <div className="flex gap-2xl">
        {links.map(({ href, name }) => (
          <CustomLink key={name} href={href}>
            {name}
          </CustomLink>
        ))}
      </div>
      <div className="flex gap-lg items-center">
        <ThemeSwitcher />
        {isAutorized ? (
          <Link href="/profile">
            <div className="w-[40px] h-[40px] bg-[linear-gradient(135deg,#6366f1_0%,#f59e0b_100%)] text-white rounded-full font-semibold grid place-content-center">
              НЗ
            </div>
          </Link>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
};

