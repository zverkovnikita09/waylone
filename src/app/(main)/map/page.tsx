import { Page } from "./PageContent";
import { Place } from "@/app/api/places/types";

export default async function Map() {
  const data: Place[] = await fetch("http://localhost:3000/api/places", {
    cache: "no-cache",
  }).then((res) => res.json());

  return <Page places={data} />;
}

