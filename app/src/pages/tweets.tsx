import React, { useEffect, useState } from "react";

import { Tweet } from "../../src/utils/tweetUtils";
import TweetCard from "../components/TweetCard";
import { useRouter } from "next/router";

const TweetPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [tweet, setTweet] = useState<Tweet | null>(null);

  useEffect(() => {
    const fetchTweet = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(
          `/api/tweets/fetch-tweets?id=${encodeURIComponent(id.toString())}`,
        );
        const data = await res.json();
        if (res.ok && data && data.data.length > 0) {
          setTweet(new Tweet(data.data[0]));
        } else {
          setTweet(null);
        }
      } catch (error) {
        console.error("Failed to fetch tweet:", error);
        setTweet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTweet();
  }, [id]);

  return (
    <div className="min-w-xl max-w-xl border-r border-l min-h-[100svh] ">
      <header className="text-2xl font-bold pb-4 px-6 border-b pt-4">
        Tweets
      </header>{" "}
      {loading && (
        <div className="p-8 text-gray-500 text-center">Loading...</div>
      )}
      {!loading && !tweet && (
        <div className="p-8 text-gray-500 text-center">Tweet not found</div>
      )}
      {!loading && tweet && (
        <TweetCard
          tweet={tweet}
          onDelete={() => router.push("/")}
          onLike={() => {}}
          onUnlike={() => {}}
        />
      )}
    </div>
  );
};

export default TweetPage;
