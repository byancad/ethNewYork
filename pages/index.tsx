import { DeleteFlow } from "components/Forms/DeleteFlow";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { CreateFlow } from "../components/Forms/CreateFlow";
import styles from "../styles/Home.module.css";
import { serverRequest } from "../configs/axios";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAccessToken } from "utils/localStorage";
import ConnectWallet from "components/Modals/ConnectWallet";


const Home: NextPage = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken();
      console.log(accessToken);
      setToken(accessToken);
    })();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to 8trac</h1>
        <p className={styles.description}>A Music $treaming Platform</p>
        <div>
          {token ? (
            <Link href={"player"}>
              <Button mt={4} colorScheme="teal">
                Go to Player
              </Button>
            </Link>
          ) : (
            <Link
              href={`${process.env.SPOTIFY_BASE_URL}authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.API_BASE_URL}spotify&state=ahgjtirutyghdjke&scope=user-read-private user-read-email`}
            >
              <Button mt={4} colorScheme="teal">
                Connect Spotify
              </Button>
            </Link>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
