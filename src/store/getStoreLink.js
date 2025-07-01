import { create } from 'zustand';

const useRedirectStore = create((set) => ({
  getStoreLink: () => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes('android') || userAgent.includes('windows')) {
      return 'https://play.google.com/store/apps/details?id=com.xdeal';
    } else if (userAgent.includes('iphone') || userAgent.includes('mac')) {
      return 'https://apps.apple.com/ph/app/xure/id6463198157';
    } else {
      return 'https://xure.ph'; // Fallback
    }
  },

  redirectToStore: () => {
    const link = useRedirectStore.getState().getStoreLink();
    window.location.href = link;
  }
}));

export default useRedirectStore;
