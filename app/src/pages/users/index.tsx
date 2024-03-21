import React, { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { Tweet } from "@/utils/tweetUtils";
import TweetSearch from "@/components/TweetSearch";
import { useRouter } from "next/router";

const AuthorTweets: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [author, setAuthor] = useState<string | null>(null);
  const [totalTweets, setTotalTweets] = useState<number>(0);

  const fetchTweets = useCallback(async (author: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/tweets/fetch-tweets?author=${encodeURIComponent(
          author
        )}&page=1&limit=10`
      );
      const data = await res.json();
      if (res.ok && data && data.data && data.data.length > 0) {
        setTweets(data.data);
        setTotalTweets(data.total);
        setHasResults(true);
      } else {
        setHasResults(false);
      }
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const search = (value: string) => {
    setAuthor(value);
  };

  useEffect(() => {
    if (author) {
      fetchTweets(author);
    }
  }, [author]);

  return (
    <div className="min-w-xl max-w-xl border-r border-l min-h-[100svh]">
      <header className="text-2xl font-bold pb-4 px-6 border-b pt-4">
        Users
      </header>
      <TweetSearch
        placeholder="Search by address"
        onSearch={search}
        modelValue={author || ""}
        onUpdateModelValue={setAuthor}
        disabled={false}
      />
      {author && loading && (
        <div className="p-8 text-gray-500 text-center">Loading...</div>
      )}
      {!loading && !hasResults && (
        <div className="p-8 text-gray-500 text-center">User not found...</div>
      )}
      {hasResults && (
        <div className="w-full">
          <div className="border p-4">
            <p className="font-semibold">{author}</p>
            <Link
              href={`/profile/${author}`}
              className="text-purple-500 hover:underline"
            >
              View profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorTweets;
