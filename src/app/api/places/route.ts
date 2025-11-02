import { Point } from "@/shared/lib/mapUtils";
import { NextResponse } from "next/server";

export const CATEGORIES = [
  { title: "Музеи", category: "museum", icon: /* <MdOutlineMuseum /> */"" },
  { title: "Парки", category: "park", icon: /* <PiPark /> */"" },
  { title: "Храмы", category: "church", icon: /* <PiChurch /> */"" },
  { title: "Памятники", category: "monument", icon: /* <TbBuildingMonument /> */"" },
  { title: "Театры", category: "theatre", icon: /* <MdOutlineTheaters /> */"" },
  { title: "Кремли", category: "cremlin", icon: /* <GiGreekTemple /> */"" },
];

export type Categories =
  | "theatre"
  | "cremlin"
  | "park"
  | "museum"
  | "monument"
  | "church";

export interface Place {
  coords: Point;
  title: string;
  id: number;
  category: Categories;
  description: string;
  images: string[];
  rating: number;
  history?: string;
  reviews?: string[];
  address: string;
}

export async function GET(request: Request) {
  try {
    // Получаем query-параметры
    const url = new URL(request.url);
    const name = url.searchParams.get("name") || "Guest";
    const age = url.searchParams.get("age") || "unknown";

    const data: Place[] = [
      {
        coords: [51.676, 39.183],
        title: "Благовещенский кафедральный собор",
        id: 1,
        category: "church",
        description: "Один из крупнейших православных храмов в России, открыт в 2009 году, высота около 97 м.",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqin-RVc7JEzu3mtG9_K6XCnw17CnxEzDQg&s",
        ],
        rating: 4.8,
        address: 'Воронеж'
      },
      {
        coords: [51.673, 39.210],
        title: "Каменный мост",
        id: 2,
        category: "monument",
        description: "Арочный кирпичный мост XIX века (1826 год) — один из символов Воронежа и популярное место для свадебных фотосессий.",
        images: [
          "https://sobor-vrn.ru/upload/iblock/117/1174546bdac0f763fba1239380013af6.jpg",
        ],
        rating: 4.6,
        address: 'Воронеж'
      },
      {
        coords: [51.680, 39.194],
        title: "Адмиралтейская площадь",
        id: 3,
        category: "monument",
        description: "Площадь на Петровской набережной, посвящённая истории российского флота: ростральная колонна, триумфальная арка и вид на водохранилище.",
        images: [
          "https://postmania.ru//files/products/0625-a.800x600.jpg",
        ],
        rating: 4.5,
        address: 'Воронеж'
      },
      {
        coords: [51.673, 39.183],
        title: "Петровский сквер",
        id: 4,
        category: "park",
        description: "Центральный сквер имени Петра I, разбит в 1830 году, с памятником императору и уютной зоной отдыха.",
        images: [
          "https://riavrn.ru/i/67/671aede83cf4c91544ea8a99ca37d501.jpg",
        ],
        rating: 4.4,
        address: 'Воронеж'
      },
      {
        coords: [51.673, 39.192],
        title: "Площадь Победы",
        id: 5,
        category: "monument",
        description: "Мемориальный комплекс в честь защитников Воронежа в Великой Отечественной войне; открыт 9 мая 1975 года.",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqin-RVc7JEzu3mtG9_K6XCnw17CnxEzDQg&s"
        ],
        rating: 4.3,
        address: 'Воронеж'
      },
      {
        coords: [51.674, 39.175],
        title: "Художественный музей им. Крамского",
        id: 6,
        category: "museum",
        description: "Музей искусства с коллекциями живописи, графики и декоративно‑прикладного искусства.",
        images: [
          "https://postmania.ru//files/products/0625-a.800x600.jpg",
        ],
        rating: 4.2,
        address: 'Воронеж'
      },
      {
        coords: [51.676, 39.180],
        title: "Воронежский театр оперы и балета",
        id: 7,
        category: "theatre",
        description: "Главный театр города, расположен на площади Ленина — предлагаются классические и современные постановки.",
        images: [
          "https://sobor-vrn.ru/upload/iblock/117/1174546bdac0f763fba1239380013af6.jpg",
        ],
        rating: 4.7,
        address: 'Воронеж'
      },
      {
        coords: [51.670, 39.185],
        title: "Музей «Арсенал»",
        id: 8,
        category: "museum",
        description: "Филиал краеведческого музея, посвящённый Великой Отечественной войне — расположен в здании XVIII века.",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqin-RVc7JEzu3mtG9_K6XCnw17CnxEzDQg&s"
        ],
        rating: 4.1,
        address: 'Воронеж'
      },
      {
        coords: [51.679, 39.170],
        title: "Улица Кардашова и памятник С. Есенину",
        id: 9,
        category: "monument",
        description: "Историческая улица в центре города, на которой установлен памятник поэту С. Есенину и другие городские элементы.",
        images: [
          "https://postmania.ru//files/products/0625-a.800x600.jpg",
        ],
        rating: 4.0,
        address: 'Воронеж'
      },
      {
        coords: [51.681, 39.200],
        title: "Корабль‑музей «Гото Предестинация»",
        id: 10,
        category: "monument",
        description: "Реконструкция первого русского военного корабля времён Петра I, пришвартована в районе Адмиралтейской площади.",
        images: [
          "https://riavrn.ru/i/67/671aede83cf4c91544ea8a99ca37d501.jpg"
        ],
        rating: 4.4,
        address: 'Воронеж'
      }
    ];


    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("GET request error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}