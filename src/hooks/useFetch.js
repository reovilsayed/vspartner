import { useEffect } from 'react';
import { useAuthHeader, useSignOut } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { queryClient } from '../lib/queryClient';
import requests from '../services/httpService';
const useFetch = (key, url, body, options = {}) => {
	const authHeader = useAuthHeader();
	const signOut = useSignOut();
	const { prefetch, pagePrefetchKey, ...configOptions } = options;
	const { data, isLoading, isError, isSuccess, error, refetch } = useQuery(key, () => requests.post(url, body, { token: authHeader() }), {
		...configOptions,
	});
	useEffect(() => {
		if (pagePrefetchKey && data?.next_page_url) {
			queryClient.prefetchQuery(
				pagePrefetchKey,
				() => requests.post(data?.next_page_url, prefetch?.body ? prefetch.body : body, { token: authHeader() }),
				{
					...configOptions,
				},
			);
		}
	}, [pagePrefetchKey, data]);
	if (isError) {
		if (error?.response?.status === 401) {
			signOut();
		}
	}
	return {
		data,
		isLoading,
		isError,
		isSuccess,
		refetch,
	};
};

export default useFetch;
