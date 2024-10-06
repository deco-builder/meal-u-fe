import React from "react";
// import { Heart, MessageSquare, Share2, Bookmark } from 'lucide-react';
import LoveIcon from "../../public/icon/love-icon";
import CommentIcon from "../../public/icon/comment-icon";

const CommunityCard = () => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src="/img/no-photo.png"
              alt="William Thacker"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="text-sm text-xl font-semibold">William Thacker</h2>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </div>
          <button className="text-xs px-4 py-2 outline text-[#7862FC] rounded-full font-semibold">
            Follow
          </button>
        </div>

        <div className="flex flex-row">
          <div className="mb-4">
            <h1 className="text-md font-medium mb-2 flex items-center">
              Date Night Sandwich
              <span className="ml-2 text-green-500">✓</span>
            </h1>
            <div className="flex space-x-2 mb-2">
              <span className="text-xs px-3 py-1 outline text-[#7862FC] rounded-full text-sm">
                Halal
              </span>
              <span className="text-xs px-3 py-1 outline text-[#7862FC] rounded-full text-sm">
                Gluten-Free
              </span>
            </div>
            <p className="text-xs text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="mb-4">
            <img
              src="/img/no-photo.png"
              alt="Date Night Sandwich"
              className="w-[100px] h-[80px] object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-4">
            <button className="flex items-center">
              <div className="flex items-center w-6 h-6 mr-1">
                <LoveIcon />
              </div>
              <span className="text-xs text-gray-700">10K</span>
            </button>
            <button className="flex items-center">
              <div className="flex items-center w-6 h-6 mr-1">
                <CommentIcon />
              </div>
              <span className="text-xs text-gray-700">927</span>
            </button>
            {/* <button>
             <CommentIcon />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
