import React, { useEffect, useState } from "react";

import { Tweet } from "@/utils/tweetUtils";
import TweetForm from "../components/TweetForm";
import TweetList from "../components/TweetList";

const Home = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);

  const fetchTweets = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tweets/fetch-tweets?page=${page}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch tweets");
      const { data, total } = await res.json();
      const newDataReversed = data.reverse();
      const specialTweetIndex = newDataReversed.findIndex(
        (tweet: { id: string }) => tweet.id === "00"
      );
      if (specialTweetIndex !== -1) {
        const [specialTweet] = newDataReversed.splice(specialTweetIndex, 1);
        newDataReversed.push(specialTweet);
      }
      setTweets((prev) => [...newDataReversed, ...prev]);
      setHasNextPage(tweets.length < total);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchTweets(page + 1);
    }
  };

  const handleUpdateTweets = (updatedTweets: Tweet[]) => {
    setTweets(updatedTweets);
  };

  useEffect(() => {
    fetchTweets(1);
  }, []);

  return (
    <div className="min-w-xl max-w-xl border-r border-l min-h-[100svh]">
      <header className="text-2xl font-bold pb-4 px-6 border-b pt-4">
        SOLX
      </header>
      <TweetForm />
      <TweetList
        tweets={tweets}
        loading={loading}
        hasMore={hasNextPage}
        onMore={handleLoadMore}
        onUpdateTweets={handleUpdateTweets}
        onLike={() => {}}
        onUnlike={() => {}}
      />
    </div>
  );
};

export default Home;
