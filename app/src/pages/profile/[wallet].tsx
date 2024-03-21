import React, { useEffect, useState } from "react";

import { Tweet } from "../../utils/tweetUtils";
import TweetForm from "../../components/TweetForm";
import TweetList from "../../components/TweetList";
import { useRouter } from "next/router";

const Profile: React.FC = () => {
  const router = useRouter();
  const { wallet: walletAddress } = router.query;
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProfileTweets = async () => {
      if (!walletAddress || !hasMore) return;

      setLoading(true);
      try {
        const res = await fetch(
          `/api/tweets/fetch-tweets?author=${walletAddress}&page=${page}&limit=10`
        );
        const { data } = await res.json();

        if (res.ok) {
          if (Array.isArray(data)) {
            setTweets((prevTweets) => [...prevTweets, ...data]);
            setHasMore(data.length > 0);
          } else {
            console.error("Data is not an array:", data);
          }
        } else {
          throw new Error("Failed to fetch tweets");
        }
      } catch (error) {
        console.error("Error fetching tweets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileTweets();
  }, [walletAddress, page, hasMore]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="min-w-xl max-w-xl lg:min-w-full border-r border-l min-h-[100svh]">
      <header className="text-2xl font-bold pb-4 px-6 border-b pt-4">
        {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-6)}
      </header>
      <TweetForm />
      <TweetList
        tweets={tweets}
        loading={loading}
        hasMore={hasMore}
        onMore={handleLoadMore}
        onUpdateTweets={setTweets}
        onLike={() => {}}
        onUnlike={() => {}}
      />
    </div>
  );
};

export default Profile;
