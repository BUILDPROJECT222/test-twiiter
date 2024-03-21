import { AnchorProvider, Program } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import React, { useEffect, useRef, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import Link from "next/link";
import idl from "../idl/solana_twitter.json"; // Adjust the path to your IDL file

const programID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "");
const statePublicKey = new PublicKey(
  process.env.NEXT_PUBLIC_STATE_PUBLIC_KEY || ""
);

interface Tweet {
  id: string;
  author: string;
  content: string;
  topic: string;
}

interface TweetFormUpdateProps {
  tweet: Tweet;
  onClose: () => void;
}

const TweetFormUpdate: React.FC<TweetFormUpdateProps> = ({
  tweet,
  onClose,
}) => {
  const wallet = useWallet();
  const { connected } = useWallet();
  const { connection } = useConnection();
  const [content, setContent] = useState(tweet.content);
  const [topic, setTopic] = useState(tweet.topic);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = `${scrollHeight}px`;
  }, [content]);

  const characterLimit = 280 - content.length;
  const characterLimitColour =
    characterLimit < 0
      ? "text-red-500"
      : characterLimit <= 10
      ? "text-yellow-500"
      : "text-gray-400";
  const canTweet = content.length > 0 && characterLimit >= 0;

  const handleUpdateTweet = async () => {
    if (!canTweet || !wallet.publicKey || !wallet.connected) return;

    const provider = new AnchorProvider(connection, wallet as any, {
      preflightCommitment: "processed",
    });
    const program = new Program(idl as any, programID, provider);

    try {
      await program.rpc.updateTweet(topic, content, {
        accounts: {
          tweet: new PublicKey(tweet.id),
          author: wallet.publicKey,
          state: statePublicKey,
          systemProgram: SystemProgram.programId,
        },
      });

      console.log("Tweet updated successfully");
      onClose();
    } catch (error) {
      console.error("Failed to update tweet:", error);
    }
  };

  return (
    <div>
      {connected ? (
        <div className="px-8 py-4 border-l-4 border-purple-500">
          <div className="py-1">
            <h3 className="inline font-semibold">
              {/* Profile link */}
              <Link href={`/profile`} passHref>
                <p className="hover:underline">{tweet.author}</p>
              </Link>
            </h3>
          </div>

          {/* Content field */}
          <textarea
            ref={textareaRef}
            rows={1}
            className="text-xl w-full focus:outline-none resize-none mb-3"
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="flex flex-wrap items-center justify-between -m-2">
            {/* Topic field */}
            <div className="relative m-2 mr-4">
              <input
                type="text"
                placeholder="topic"
                className="text-purple-500 rounded-full pl-10 pr-4 py-2 bg-gray-100"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-4 m-2 ml-auto">
              <div className={characterLimitColour}>{characterLimit} left</div>
              <button
                className="text-gray-500 px-4 py-2 rounded-full border bg-white hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={`text-white px-4 py-2 rounded-full font-semibold ${
                  canTweet
                    ? "bg-purple-500"
                    : "bg-purple-300 cursor-not-allowed"
                }`}
                disabled={!canTweet}
                onClick={handleUpdateTweet}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-8 py-4 bg-gray-50 text-gray-500 text-center border-b">
          Connect your wallet to start tweeting...
        </div>
      )}
    </div>
  );
};

export default TweetFormUpdate;
