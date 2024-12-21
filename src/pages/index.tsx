import { Card, CardContent, CardHeader } from "@/components/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"

export default function Home() {
  const [spotToken, setSpotAccToken] = useState<string>("");

  useEffect(() => {
    async function init() {
      let spot_acc_token = Cookies.get("spotify_access_token")
      if (spot_acc_token === undefined) {
        const res = await fetch("/api/spotify/get_token");
        const token = (await res.json()).access_token;
        var inOneHour = 1/24;
        Cookies.set("spotify_acc_token", token, {expires: inOneHour})
        setSpotAccToken(token);
      }
    } 
    init();
  }, [])

  console.log(spotToken);
  
  return (
    <div className="body flex flex-col items-center mt-5 min-h-screen">
      <div className="title flex flex-col justify-center items-center">
        <Image src="/images/logo.png" alt={"Test"} width={1024} height={416}/>
      </div>
      <Card className="border-black bg-[#6ee7b7] w-11/12 max-w-[500px] mb-5">
        <CardHeader className="text-3xl bold">
          Recently Added
        </CardHeader>
        <CardContent>
          MY ALBUMS
        </CardContent>
      </Card>
      <Card className="border-black bg-[#a5b4fd] w-11/12 max-w-[500px]">
        <CardHeader>
          My Albums
        </CardHeader>
        <CardContent>
          MY ALBUMS
        </CardContent>
      </Card>
    </div>
  );
}
