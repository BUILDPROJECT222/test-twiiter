// src/utils/tweetUtils.ts
import { PublicKey } from "@solana/web3.js";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

interface TweetAccountData {
  id: string;
  author: string;
  timestamp: string;
  topic: string;
  content: string;
  likes: string;
}

export class Tweet {
  publicKey: PublicKey;
  accountData: TweetAccountData;
  id: any;

  constructor(tweetData: { publicKey: string; account: TweetAccountData }) {
    this.publicKey = new PublicKey(tweetData.publicKey);
    this.accountData = tweetData.account;
  }

  get tweetId(): string {
    return this.accountData.id;
  }

  get author(): string {
    return this.accountData.author;
  }

  get authorDisplay(): string {
    const authorBase58 = this.accountData.author;
    return authorBase58.slice(0, 4) + ".." + authorBase58.slice(-4);
  }

  get createdAt(): string {
    return dayjs.unix(parseInt(this.accountData.timestamp)).format("lll");
  }

  get createdAgo(): string {
    return dayjs.unix(parseInt(this.accountData.timestamp)).fromNow();
  }

  get topic(): string {
    return this.accountData.topic;
  }

  get content(): string {
    return this.accountData.content;
  }

  get likes(): number {
    return parseInt(this.accountData.likes);
  }
}
