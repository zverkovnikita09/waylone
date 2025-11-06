import { PropsWithChildren } from "react";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileLink } from "../ProfileLink";
import { IoStatsChartSharp } from "react-icons/io5";
import { GiPositionMarker } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { TbRoute } from "react-icons/tb";
import { MdOutlineSettings, MdExitToApp } from "react-icons/md";
import { Button } from "@/shared/ui/Button";
import { logoutAction } from "@/app/actions/authActions";
import { Card } from "@/shared/ui/Card";

const PROFILE_LINKS = [
  { title: "Обзор", href: "/profile", icon: <IoStatsChartSharp /> },
  { title: "Мои места", href: "/profile/places", icon: <GiPositionMarker /> },
  { title: "Мои маршруты", href: "/profile/routes", icon: <TbRoute /> },
  { title: "Избранное", href: "/profile/favorite", icon: <FaRegStar /> },
];

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="max-w-[1200px] mx-auto w-full py-2xl px-xl">
      <ProfileHeader />
      <div className="mt-2xl flex gap-2xl">
        <div className="w-full max-w-[250px] bg-main-bg shadow-md p-lg rounded-2xl h-max transition-all duration-base">
          <div className="flex flex-col gap-xs pb-lg">
            {PROFILE_LINKS.map(({ href, title, icon }) => (
              <ProfileLink key={title} href={href}>
                {icon}
                {title}
              </ProfileLink>
            ))}
          </div>

          <div className="py-lg border-t border-gray-200">
            <ProfileLink href="/profile/settings">
              <MdOutlineSettings />
              Настройки
            </ProfileLink>
          </div>

          <div className="pt-lg border-t border-gray-200">
            <form action={logoutAction}>
              <Button
                type="submit"
                IconLeft={<MdExitToApp />}
                className="w-full justify-start"
                fullWidth
              >
                Выйти
              </Button>
            </form>
          </div>
        </div>

        {/* Контент */}
        <Card className="flex-1">{children}</Card>
      </div>
    </div>
  );
}

