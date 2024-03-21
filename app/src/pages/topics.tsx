import React, { useEffect, useState } from "react";

import { Tweet } from "../utils/tweetUtils";
import TweetList from "../components/TweetList";
import TweetSearch from "../components/TweetSearch";
import { useRouter } from "next/router";

const TopicPage: React.FC = () => {
  const router = useRouter();
  const [topic, setTopic] = useState<string | null>(
    router.query.topic as string
  );
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const fetchTopicTweets = async (
    currentTopic: string,
    currentPage: number
  ) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/tweets/fetch-tweets?topic=${encodeURIComponent(
          currentTopic
        )}&page=${currentPage}&limit=10`
      );
      if (!res.ok) throw new Error("Failed to fetch tweets");
      const { data, total } = await res.json();
      setTweets((prevTweets) => [...prevTweets, ...data]);
      setHasNextPage(tweets.length + data.length < total);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.query.topic) {
      // Clear previous tweets when topic changes
      setTweets([]);
      setPage(1);
      setTopic(router.query.topic as string);
      fetchTopicTweets(router.query.topic as string, 1);
    }
  }, [router.query.topic]);

  const handleLoadMore = () => {
    if (hasNextPage && topic) {
      const nextPage = page + 1;
      fetchTopicTweets(topic, nextPage);
      setPage(nextPage);
    }
  };

  const search = (value: string) => {
    setTopic(value);
    setTweets([]);
    setPage(1);
    setHasNextPage(false);
    fetchTopicTweets(value, 1);
    router.push({ pathname: "/topics", query: { topic: value } }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    const urlTopic = router.query.topic as string;
    if (urlTopic && urlTopic !== topic) {
      setTopic(urlTopic);
      setTweets([]);
      setPage(1);
      setHasNextPage(false);
      fetchTopicTweets(urlTopic, 1);
    }
  }, [router.query.topic]);

  return (
    <div className="min-w-xl max-w-xl border-r border-l min-h-[100svh]">
      <header className="text-2xl font-bold pb-4 px-6 border-b pt-4">
        Topics
      </header>
      <TweetSearch
        modelValue={topic || ""}
        onUpdateModelValue={setTopic}
        placeholder="Search by topic"
        onSearch={search}
        disabled={loading}
      />
      <TweetList
        tweets={tweets}
        loading={loading}
        hasMore={hasNextPage}
        onMore={handleLoadMore}
        onUpdateTweets={setTweets}
        onLike={() => {}}
        onUnlike={() => {}}
      />
      {!loading && tweets.length === 0 && (
        <div className="p-8 text-gray-500 text-center">
          No tweets were found in this topic...
        </div>
      )}
    </div>
  );
};

export default TopicPage;
