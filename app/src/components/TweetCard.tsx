import { AnchorProvider, Program } from "@project-serum/anchor";
import { FaHeart, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import Link from "next/link";
import TweetFormUpdate from "./TweetFormUpdate";
import idl from "../idl/solana_twitter.json";
import { toast } from "sonner";

const programID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "");
const statePublicKey = new PublicKey(
  process.env.NEXT_PUBLIC_STATE_PUBLIC_KEY || ""
);

const TweetComponent = ({ tweet, onLike, onDelete }: any) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [isEditing, setIsEditing] = useState(false);

  const isMyTweet =
    wallet.connected && wallet.publicKey?.toBase58() === tweet.author;

  const handleLike = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      console.error("Wallet is not connected");
      toast.error("Wallet is not connected");
      return;
    }

    if (!tweet.tweetPublicKey) {
      console.error("Tweet public key is undefined" + JSON.stringify(tweet));
      toast.error("Tweet public key is missing");
      return;
    }

    try {
      const provider = new AnchorProvider(connection, wallet as any, {
        preflightCommitment: "processed",
      });
      const program = new Program(idl as any, programID, provider);

      await program.rpc.likeTweet({
        accounts: {
          tweet: new PublicKey(tweet.tweetPublicKey),
          user: wallet.publicKey,
          author: new PublicKey(tweet.author),
          systemProgram: SystemProgram.programId,
        },
      });

      toast.success("Tweet liked successfully");
      if (onLike) onLike();
    } catch (error) {
      toast.error(`Failed to like tweet: ${error}`);
      console.error(`Failed to like tweet:`, error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      console.error("Wallet is not connected");
      toast.error("Wallet is not connected");
      return;
    }

    try {
      const provider = new AnchorProvider(connection, wallet as any, {
        preflightCommitment: "processed",
      });
      const program = new Program(idl as any, programID, provider);

      await program.rpc.deleteTweet({
        accounts: {
          tweet: new PublicKey(tweet.tweetPublicKey),
          author: wallet.publicKey,
        },
      });

      toast.success("Tweet deleted successfully");
      if (onDelete) onDelete();
    } catch (error) {
      toast.error(`Failed to delete tweet: ${error}`);
      console.error(`Failed to delete tweet:`, error);
    }
  };

  const parseTweetContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a target="_blank" rel="noopener noreferrer" class="underline font-bold text-purple-500" href="$2" title="$2">$1</a>'
      ) // Links
      .replace(/<img link="([^"]+)" \/>/g, '<img src="$1" alt="image" />');
  };

  const renderContent = () => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: parseTweetContent(tweet.content) }}
      />
    );
  };

  function formatNumber(number: number) {
    if (number < 1000) {
      return number;
    }
    const suffixes = ["", "k", "m", "b", "t"];
    const i = Math.floor(Math.log(number) / Math.log(1000));
    return (number / Math.pow(1000, i)).toFixed(1) + suffixes[i];
  }

  const convertToLocalTime = (timestamp: string) => {
    const date = new Date(parseInt(timestamp, 16) * 1000);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString(undefined, options);
  };

  return (
    <>
      {isEditing ? (
        <TweetFormUpdate tweet={tweet} onClose={() => setIsEditing(false)} />
      ) : (
        <div className="px-8 py-4">
          <div className="flex justify-between">
            <div className="py-1 flex flex-row justify-between items-center">
              <div className="w-8 h-8 flex justify-center items-center rounded-full bg-teal-400 mr-2">
                {tweet.author.slice(0, 2)}
              </div>
              <h3 className="inline font-semibold">
                <Link
                  href={`/profile/${encodeURIComponent(tweet.author)}`}
                  passHref
                >
                  <p className="hover:underline">
                    {tweet.author.length > 6
                      ? `${tweet.author.slice(0, 3)}...${tweet.author.slice(
                          -3
                        )}`
                      : tweet.author}
                  </p>
                </Link>
              </h3>
            </div>
            <span className="text-gray-400 text-xs justify-end">
              {convertToLocalTime(tweet.timestamp)}
            </span>
          </div>
          {renderContent()}
          <div className="flex flex-col mt-2">
            <div className="flex flex-row justify-between">
              {tweet.topic && (
                <Link
                  href={`/topics?topic=${encodeURIComponent(tweet.topic)}`}
                  passHref
                >
                  <p className="inline-block mt-2 text-purple-500 hover:underline break-all">
                    #{tweet.topic}
                  </p>
                </Link>
              )}
              <div className="flex items-center">
                {isMyTweet && (
                  <div className="flex mr-4 mt-2">
                    <button
                      onClick={handleDelete}
                      className="flex px-2 rounded-full text-gray-500 hover:text-purple-500"
                      title="Delete tweet"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                )}
                <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={handleLike}
                    className="flex items-center text-gray-500 hover:text-red-500"
                  >
                    <FaHeart className="mr-2" />
                    {formatNumber(tweet.likes)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TweetComponent;
