import { Page } from "./pageContent";
import { Place } from "@/app/api/places/route";

export default async function Map() {
  const data: Place[] = await fetch("http://localhost:3000/api/places", {
    cache: "no-cache",
  }).then((res) => res.json());

  return <Page places={data} />;
}

