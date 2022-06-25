// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { spotifyRequest } from 'configs/axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import Spotify from '../../spotify';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code, state } = req.query;
  const base64Str = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
    "utf8"
  ).toString("base64");
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${base64Str}`,
  };
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code?.toString());
  params.append("redirect_uri", `${process.env.API_BASE_URL}spotify`);

  try {
    const response = await spotifyRequest().post(
      "api/token",
      params,
      {
        headers: headers,
      }
    );

    const data = response.data;
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ name: 'John poop' });
  }
  
}
