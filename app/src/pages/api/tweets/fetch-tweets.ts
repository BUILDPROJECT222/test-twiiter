import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";

import { NodeWallet } from "../../../utils/walletUtils";
import idl from "../../../idl/solana_twitter.json";

const programID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID as string);
const connection = new Connection(clusterApiUrl("devnet"), "processed");

async function fetchTweets(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      page = 1,
      limit = 10,
      topic,
      author,
      id,
      content,
      likes,
    } = req.query;

    console.log("Query ID:", id);

    const serverKeypair = web3.Keypair.generate();
    const wallet = new NodeWallet(serverKeypair);
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });
    const program = new Program(idl as any, programID, provider);

    let tweets = (await program.account.tweetAccount.all()) as unknown as any[];

    tweets = tweets.filter((tweet) => {
      const tweetAcc = tweet.account;

      if (id && tweetAcc.id.toString() !== String(id)) return false;
      if (topic && tweetAcc.topic !== topic) return false;
      if (author) {
        const authorPubKey = new PublicKey(author as string).toString();
        if (tweetAcc.author.toString() !== authorPubKey) return false;
      }
      if (content && !tweetAcc.content.includes(content as string))
        return false;
      if (likes && tweetAcc.likes !== likes) return false;
      return true;
    });

    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedTweets = tweets.slice(
      startIndex,
      startIndex + Number(limit),
    );

    res.status(200).json({
      data: paginatedTweets.map((tweet) => ({
        ...tweet.account,
        tweetPublicKey: tweet.publicKey.toString(),
        author: tweet.account.author.toString(),
      })),
      page: Number(page),
      limit: Number(limit),
      total: tweets.length,
    });
  } catch (error) {
    console.error("Failed to fetch tweets:", error);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
}

export default fetchTweets;
