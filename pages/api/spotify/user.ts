// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAccessToken } from 'utils/localStorage'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const token = req.query.token
    // const token = await getAccessToken();
  const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type" : 'application/json'
      }
  })
  console.log(response.data)
}
