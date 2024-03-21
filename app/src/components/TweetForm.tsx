// src/components/TweetForm.tsx
import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import React, { useRef, useState } from "react";
import { useAutoresizeTextarea, useSlug } from "../hooks";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import idl from "../idl/solana_twitter.json";
import { toast } from "sonner";

const programID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "");
const statePublicKey = new PublicKey(
  process.env.NEXT_PUBLIC_STATE_PUBLIC_KEY || ""
);

const TweetForm = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const slugTopic = useSlug(topic);
  const effectiveTopic = slugTopic;
  const characterLimit = 280 - content.length;
  const characterLimitColour =
    characterLimit < 0
      ? "text-red-500"
      : characterLimit <= 10
      ? "text-yellow-500"
      : "text-gray-400";
  const textareaRef = useRef(null);

  useAutoresizeTextarea(textareaRef);

  const handleSendTweet = async () => {
    if (!effectiveTopic) {
      toast.error("Please enter a topic");
      return;
    }

    if (!content) {
      toast.error("Please enter tweet content");
      return;
    }

    if (!wallet.connected || !wallet.publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      const provider = new AnchorProvider(connection, wallet as any, {
        preflightCommitment: "processed",
      });
      const program = new Program(idl as any, programID, provider);

      // Generate a new keypair for the tweet account
      const tweetKeypair = web3.Keypair.generate();

      await program.rpc.tweet(effectiveTopic, content, {
        accounts: {
          tweet: tweetKeypair.publicKey,
          author: wallet.publicKey,
          state: statePublicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [tweetKeypair],
      });

      toast.success("Tweet sent successfully");

      setContent("");
      setTopic("");
    } catch (error) {
      toast.error("Error sending tweet");
      console.error("Error sending tweet:", error);
    }
  };

  const canTweet =
    content.length > 0 &&
    wallet.publicKey &&
    wallet.connected &&
    content.length > 0 &&
    effectiveTopic.length > 0;

  return (
    <div className="px-8 py-4 border-b">
      <textarea
        ref={textareaRef}
        className="text-xl w-full focus:outline-none resize-none mb-3"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <span className="text-gray-500 text-2xl py-1 bg-gray-100 rounded-l-lg px-1">
            #
          </span>
          <input
            type="text"
            placeholder="Topic"
            className="text-purple-400 rounded-r-lg pl-1 pr-2 py-2 bg-gray-100 flex-grow focus:outline-none"
            value={effectiveTopic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className={characterLimitColour}>{characterLimit} left</div>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              canTweet
                ? "bg-purple-400 text-white"
                : "bg-purple-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!canTweet}
            onClick={handleSendTweet}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetForm;
