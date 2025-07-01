import './index.css';
import logo from '/New-Xure-Logo.png';
import gbadge from '/google-play-badge.png'
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  CheckIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowUpRightIcon,
  FireIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import usePostStore from './store/usePostStore';
import useRedirectStore from './store/getStoreLink';
import SkeletonPost from './components/skeletonPost';
import ConfirmRedirectModal from './components/ConfirmRedirectModal'; // ⬅️ import the modal

function App() {

  

  const postData = usePostStore((state) => state.postData);
  const fetchPost = usePostStore((state) => state.fetchPost);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const redirectToStore = useRedirectStore((state) => state.redirectToStore); 
  const handleConfirmRedirect = (urlOrCallback, label = "store") => {
    setRedirectUrl({ action: urlOrCallback, label });
    setModalOpen(true);
  };

  const [searchParams] = useSearchParams();
  const rawType = searchParams.get("type");
  const validTypes = ["video", "image"];
  const type = validTypes.includes(rawType) ? rawType : null;


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchPost(type).then(() => {
      setTimeout(() => setIsLoading(false), 1000); // simulate loading delay
    });
  }, [type]);

  if (!type) {
    return (
      <div className="min-h-screen w-full flex bg-[url('/bg.png')] bg-cover bg-center flex-col items-center justify-center">
        <div className="w-[400px] h-[300px] bg-[#1f1f1f] rounded flex flex-col items-center justify-center p-[9px]">
          <div className="p-[20px] flex-col flex items-center">
            <ExclamationTriangleIcon className="w-[300px] h-[90px] text-[#ceae7b] mb-[15px]"></ExclamationTriangleIcon>
            <span className="text-[#ceae7b] text-[20px] font-bold">Invalid Post Type</span>
            <span className="text-white text-[12px] mt-2 opacity-70 text-center">
            The content you're trying to view doesn't exist or the link may be broken.
            </span>
          </div>
          
        </div>
      </div>
    );
  }

  if (isLoading || !postData) {
    return (
      <>
        <SkeletonPost />
      </>
    );
  }

  const { username = "", profile_picture = "", post = {} } = postData;

  

  return (
    <>
    <div className="min-h-screen w-full flex bg-[url('/bg.png')] bg-cover bg-center">

      {/* Sidebar */}
      <div className="w-[450px] p-4 flex flex-col sticky top-0 h-screen">
        <div className="ml-[10px] mt-[10px] hidden">
          <div>
            <img src={logo} alt="Xure Logo" className="w-[120px]" />
            <div className="flex items-center bg-[#030303] rounded-full px-4 py-2 shadow w-[220px] max-w-md mt-[20px]">
              <MagnifyingGlassIcon className="h-5 w-5 text-white" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-3 w-full bg-transparent outline-none text-sm text-white"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[30px] mt-6">
            <div className="flex items-center gap-2.5 cursor-pointer text-white hover:text-[#ceae7b] transition-colors">
              <Bars3Icon className="h-5 w-5" />
              <span className="text-base">Xhibit</span>
            </div>
            <div className="flex items-center gap-2.5 cursor-pointer text-white hover:text-[#ceae7b] transition-colors">
              <BuildingStorefrontIcon className="h-5 w-5" />
              <span className="text-base">Xchange</span>
            </div>
            <div className="flex items-center gap-2.5 cursor-pointer text-white hover:text-[#ceae7b] transition-colors">
              <CalendarDaysIcon className="h-5 w-5" />
              <span className="text-base">Xclusives</span>
            </div>
          </div>
          <div className="mt-[30px]">
            <button className="bg-[#4c1f84] text-white px-6 py-2 w-[210px] rounded-lg hover:opacity-90 transition">
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 ml-[20px] mr-[20px] mt-[10px] pb-[120px] rounded-sm w-[full]">
        <div className="p-[20px] pb-[120px] bg-[#1f1f1f] rounded-sm">
          <div className="flex flex-row ml-[20px] mr-[20px]">
            <div className="w-14 h-14 rounded-full bg-white overflow-hidden">
              <img
                src={profile_picture}
                alt={username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col ml-[15px] mt-[6px]">
              <span className="text-[15px] text-[#ceae7b] font-semibold">{username}</span>
              <span className="text-[12px] text-white">XX followers</span>
            </div>
            <div className="ml-[20px] mt-[12px]">
              <button
                onClick={() => handleConfirmRedirect(() => redirectToStore(), "Xure App")}
                className="bg-[#4c1f84] text-white px-4 py-1.5 w-[100px] text-[12px] rounded-md hover:opacity-90 transition">
                Follow
              </button>
            </div>
          </div>

          <div className="mt-[20px] ml-[20px] mr-[20px]">
            <span className="text-sm text-white">{post.caption}</span>
          </div>

          <div className="flex justify-center mt-[30px]">
            <div className="w-[780px] h-[500px] bg-white rounded-lg overflow-hidden shadow">
              {post.post_type === "video" && (
                <video controls className="w-full h-full object-cover">
                  <source src={post.post_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {post.post_type === "image" && (
                <img
                  src={post.post_url}
                  alt="Post content"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="mt-[15px] border-b border-white pb-[15px] ml-[20px] mr-[20px]">
            <span className="text-white text-sm">Hyped by {post.hype_count} people</span>
          </div>

          <div className="mt-[15px] flex justify-between text-white text-sm ml-[20px] mr-[20px]">
            <div 
            onClick={() => handleConfirmRedirect(() => redirectToStore(), "Xure App")}
            className="flex items-center gap-1 cursor-pointer hover:text-[#ceae7b] transition-colors">
              <CheckIcon className="w-4 h-4" />
              <span>Hype</span>
            </div>
            <div onClick={() => handleConfirmRedirect(() => redirectToStore(), "Xure App")} className="flex items-center gap-1 cursor-pointer hover:text-[#ceae7b] transition-colors">
              <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
              <span>Comment</span>
            </div>
            <div onClick={() => handleConfirmRedirect(() => redirectToStore(), "Xure App")} className="flex items-center gap-1 cursor-pointer hover:text-[#ceae7b] transition-colors">
              <ArrowUpRightIcon className="w-4 h-4" />
              <span>Share</span>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-[25px] ml-[20px] mr-[20px]">
            <span className="text-[#ceae7b] font-semibold text-[16px]">XX Comments</span>
            {/* Example comments */}
            {[1, 2].map((c, i) => (
              <div key={i} className="flex flex-row items-center mt-[30px]">
                <div className="w-12 h-12 rounded-full bg-white overflow-hidden">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <span className="text-[14px] text-[#ceae7b] font-semibold leading-tight">Username</span>
                  <span className="text-[12px] text-white leading-snug">
                    {i === 0
                      ? "Let’s goooo! Hope someone pulls that alt-art Charizard 🔥🔥🔥"
                      : "This set is so stacked, I need to grab a slot 👀"}
                  </span>
                  <span className="text-[12px] text-[#ceae7b] leading-tight">2 days ago</span>
                </div>
                <div className="ml-auto pr-2 cursor-pointer text-[#ceae7b]">
                  <span onClick={() => handleConfirmRedirect(() => redirectToStore(), "Xure App")} className="text-xl leading-none">⋮</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side Panel */}
        <div className="w-[350px] p-4 sticky top-0 h-screen flex flex-col items-center mb-[40px]">

          <div className="flex w-[350px] h-full mr-[25px] mt-[10px] flex-col hidden">
            {/* remove hidden to show */}
            {/* Get on store/login */}
            <div className="flex items-center justify-between rounded-sm h-[120px] px-4 gap-2 w-full">
              <button
                onClick={() => {
                  setPendingRedirect({
                    url: "https://play.google.com/store/apps/details?id=com.xdeal&pcampaignid=web_share",
                    label: "Google Play Store"
                  });
                  setModalOpen(true);
                }}
              >
                <img src={gbadge} alt="Get it on Google Play" className="h-8" />
              </button>
              <a href="https://apps.apple.com/ph/app/xure/id6463198157" target="_blank">
                <img src="/applebadge.svg" alt="Download on the App Store" className="h-8" />
              </a>
              <button className="bg-[#6A1B9A] text-white text-sm px-4 py-2 rounded-md hover:opacity-90 transition whitespace-nowrap">
                Login
              </button>
            </div>

            {/* Find & Follow */}
            <div className="flex flex-col bg-[#1f1f1f] rounded-sm h-auto p-4 mt-[20px] w-full">
              <span className="text-[#ceae7b] font-extrabold text-[16px]">Find & Follow</span>
              {[1, 2].map((_, idx) => (
                <div key={idx} className="flex flex-row mt-[30px]">
                  <div className="w-12 h-12 rounded-full bg-white overflow-hidden">
                    <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col ml-4 mt-[8px]">
                    <span className="text-[14px] text-[#ceae7b] font-semibold leading-tight">Username</span>
                    <span className="text-[12px] text-white leading-snug">@Example</span>
                  </div>
                  <div className="ml-auto pr-2 cursor-pointer text-[#ceae7b]">
                    <button className="bg-[#4c1f84] mt-[8px] text-white px-2 py-1.5 w-[110px] text-sm rounded-md hover:opacity-90 transition">
                      Follow
                    </button>
                  </div>
                </div>
              ))}
              <span className="text-[#ceae7b] text-[14px] mt-[15px]">Show more</span>
            </div>

            {/* Xchange Items */}
            <div className="mt-[20px] bg-[#1f1f1f] p-[20px] rounded-sm">
              <div className="flex items-center gap-2 mt-[10px]">
                <FireIcon className="w-4 h-4 text-[#ceae7b]" />
                <span className="text-[#ceae7b] text-[16px] font-bold">Xchange Hot Items</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-[10px]">
                <div className="w-[150px]">
                  <div className="bg-white rounded-xl w-full h-[180px]"></div>
                  <div className="mt-1">
                    <span className="text-[#ceae7b] text-sm font-semibold block">PHP 5,000</span>
                    <span className="text-white text-xs truncate block">Pokemon trading cards</span>
                  </div>
                </div>
                <div className="w-[150px]">
                  <div className="bg-white rounded-xl w-full h-[180px]"></div>
                  <div className="mt-1">
                    <span className="text-[#ceae7b] text-sm font-semibold block">PHP 30,000</span>
                    <span className="text-white text-xs truncate block">Giratina Lost origins full set</span>
                  </div>
                </div>
                <span className="text-[#ceae7b] text-[14px] mt-[15px]">Show more</span>
              </div>
            </div>
          </div>
        </div>
    </div>
    <ConfirmRedirectModal
              open={modalOpen}
              onClose={() => {
                setModalOpen(false);
                setRedirectUrl(null);
              }}
              onConfirm={() => {
                if (redirectUrl?.action) redirectUrl.action();
                setModalOpen(false);
                setRedirectUrl(null);
              }}
              storeName={redirectUrl?.label || "external site"}
            />
            </>
  );
}

export default App;
