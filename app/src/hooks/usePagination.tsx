import { useCallback, useEffect, useState } from "react";

export const usePagination = (
  perPage: number,
  prefetchCb: () => Promise<any[]>,
  pageCb: (page: number, keys: any[]) => Promise<any>,
) => {
  const [allPublicKeys, setAllPublicKeys] = useState<any[]>([]);
  const [prefetchLoading, setPrefetchLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const loading = prefetchLoading || pageLoading;

  let prefetchPromise: Promise<void> | null = null;

  const prefetch = useCallback(() => {
    prefetchPromise = (async () => {
      try {
        setPrefetchLoading(true);
        const keys = await prefetchCb();
        setAllPublicKeys(keys);
      } finally {
        setPrefetchLoading(false);
      }
    })();
    return prefetchPromise;
  }, [prefetchCb]);

  const getPagePublicKeys = useCallback(
    (page: number) => {
      return allPublicKeys.slice((page - 1) * perPage, page * perPage);
    },
    [allPublicKeys, perPage],
  );

  const hasPage = useCallback(
    (page: number) => {
      return getPagePublicKeys(page).length > 0;
    },
    [getPagePublicKeys],
  );

  const getPage = useCallback(
    async (page: number) => {
      await prefetchPromise;
      if (!hasPage(page)) return [];
      try {
        setPageLoading(true);
        return await pageCb(page, getPagePublicKeys(page));
      } finally {
        setPageLoading(false);
      }
    },
    [hasPage, pageCb, getPagePublicKeys],
  );

  return {
    allPublicKeys,
    loading,
    getPagePublicKeys,
    hasPage,
    getPage,
    prefetch,
  };
};
