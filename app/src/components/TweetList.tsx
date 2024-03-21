import React from "react";
import { Tweet } from "@/utils/tweetUtils";
import TweetCard from "../components/TweetCard";

interface TweetListProps {
  tweets: Tweet[];
  loading: boolean;
  hasMore: boolean;
  onUpdateTweets: (tweets: Tweet[]) => void;
  onMore: () => void;
  onLike: () => void;
  onUnlike: () => void;
}

const TweetList: React.FC<TweetListProps> = ({
  tweets,
  loading,
  hasMore,
  onUpdateTweets,
  onMore,
  onLike,
  onUnlike,
}) => {
  const uniqueTweets = Array.from(
    new Map(tweets.map((tweet) => [tweet.id, tweet])).values()
  );

  const onDelete = (deletedTweet: Tweet) => {
    const filteredTweets = tweets.filter(
      (tweet) => tweet.id !== deletedTweet.id
    );
    onUpdateTweets(filteredTweets);
  };

  return (
    <div className="divide-y border-r border-l">
      {uniqueTweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          onDelete={() => onDelete(tweet)}
          onLike={onLike}
          onUnlike={onUnlike}
        />
      ))}
      {loading ? (
        <div className="flex items-center justify-center mt-10">
          <div className="w-12 h-12 border-t-4 border-purple-500 rounded-full animate-spin"></div>
          <div className="ml-3 text-gray-500">Loading...</div>
        </div>
      ) : hasMore ? (
        <div className="p-8 text-center">
          <button
            onClick={onMore}
            className="px-4 py-2 rounded-full border bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TweetList;
