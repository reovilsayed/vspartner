import { useMutation } from 'react-query';
import requests from '../services/httpService';
import { notify } from '../lib/queryClient';
import { useAuthHeader } from 'react-auth-kit';
export const useUpdateStatus = (contentType = 'video') => {
	const authHeader = useAuthHeader();
	const makeApiCall = ({ status, id, payload }) => {
		switch (contentType) {
			case 'notification':
				return requests.post(`/notification-status-update`, {
					status,
					notification_id: id,
				});
			case 'payment':
				return requests.post(`/admin/mark-as-paid`, {
					...payload,
					user_id: id,
				});
			case 'note':
				return requests.post(
					`/note-create`,
					{
						...payload,
					},
					{ token: authHeader() },
				);
			default:
				return requests.post(`/admin/update-video-status`, {
					status,
					video_id: id,
					...payload,
				});
		}
	};
	return useMutation(makeApiCall, {
		onSuccess: newPost => {
			notify();
		},
		onError: error => {
			notify('Fails', true);
		},
	});
};

export const useUpdate = useUpdateStatus;
export const useCreate = useUpdateStatus;
