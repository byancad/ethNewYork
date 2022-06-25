// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const token = req.query.token
  const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type" : 'application/json'
      }
  })
  const data = response.data;
  res.status(200).json(data);

}
