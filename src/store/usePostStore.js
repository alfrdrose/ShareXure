import axios from 'axios';
import { API_BASE_URL } from '../store/varConstant';
import { create } from 'zustand';

const usePostStore = create((set) => ({
  postData: null,

  fetchPost: async (type = 'video') => {
    console.log(`[fetchPost] Called with type: ${type}`);
    console.log(`[fetchPost] Sending POST to: ${API_BASE_URL}`);

    try {
      const response = await axios.post(API_BASE_URL, { type }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('[fetchPost] Response:', response.data);
      if (response.data) {
      set({ postData: response.data });
      } else {
        // fallback data if no response
        set({
          postData: {
            username: "default_user",
            profile_picture: "https://via.placeholder.com/150",
            post: {
              hype_count: 0,
              caption: "No post available",
              post_type: "image",
              post_url: "https://via.placeholder.com/600x400"
            }
          }
        });
      }

    } catch (error) {
      console.error('[fetchPost] Error:', error);
      console.log('[fetchPost] Response:', response.data);
    }
  }

}));

export default usePostStore;
