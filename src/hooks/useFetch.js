// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
import {
  useAuthHeader,
  useSignOut,
  withAuthHeader,
  withAuthUser,
} from "react-auth-kit";
import { useQuery } from "react-query";
import { queryClient } from "../lib/queryClient";
import requests from "../services/httpService";
import usePreloader from "./usePreloader";
const useFetch = (key, url, body, options = {}) => {
  const authHeader = useAuthHeader();
  const [, setShowLoader] = usePreloader();
  const signOut = useSignOut();
  const { prefetch, pagePrefetchKey, noPreLoader, ...configOptions } = options;
  const { data, isLoading, isError, isSuccess, error, refetch } = useQuery(
    key,
    () => requests.post(url, body),
    {
      ...configOptions,
	  'Authorization': authHeader()
    }
  );
  useEffect(() => {
    if (pagePrefetchKey && data?.next_page_url) {
      queryClient.prefetchQuery(
        pagePrefetchKey,
        () =>
          requests.post(
            data?.next_page_url,
            prefetch?.body ? prefetch.body : body,
            { Authorization: authHeader() }
          ),
        {
          ...configOptions,
        }
      );
    }
  }, [pagePrefetchKey, data]);
  if (isError) {
    if (error?.response?.status === 401) {
      //signOut();
    }
  }

  useEffect(() => {
    !noPreLoader && setShowLoader && setShowLoader(isLoading);
  }, [isLoading, noPreLoader]);

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useFetch;
