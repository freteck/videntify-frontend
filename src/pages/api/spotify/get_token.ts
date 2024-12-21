// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const client_id = process.env.SPOTIFY_CLIENT;
const client_secret = process.env.SPOTIFY_SECRET;
const encoded_auth_token = new Buffer.from(client_id + ":" + client_secret).toString('base64')

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  "Authorization": `Basic ${encoded_auth_token}`
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = {
    "grant_type": "client_credentials"
  };

  const spot_token_req = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: headers,
    body: new URLSearchParams({
      "grant_type": "client_credentials"
    }).toString() 
  });
  const spot_token = await spot_token_req.json();
  console.log(spot_token)
  res.status(200).json(spot_token);
}
