// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Spotify from "../../spotify";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var client_id = process.env.CLIENT_ID;
  var redirect_uri = `${process.env.API_BASE_URL}spotify`;
  var state = "ahgjtirutyghdjke";
  var scope =
    "streaming user-read-email user-modify-playback-state user-read-private";
  var scopex =
    "user-read-private user-read-email app-remote-control streaming user-modify-playback-state user-read-playback-state user-read-currently-playing";
  console.log(process.env.SPOTIFY_BASE_URL);
  res.redirect(
    `${
      process.env.SPOTIFY_BASE_URL
    }authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${encodeURIComponent(
      scope
    )}`
  );
}
