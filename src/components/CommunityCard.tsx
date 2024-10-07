import React from "react";
import LoveIcon from "../../public/icon/love-icon";
import CommentIcon from "../../public/icon/comment-icon";
import { formatDistanceToNow } from 'date-fns';

interface Creator {
  name: string;
  profile_picture: string;
}

interface CommunityRecipeData {
  id: number;
  creator: Creator;
  name: string;
  serving_size: number;
  meal_type: string;
  cooking_time: number;
  created_at: string;
  image: string;
  dietary_details: string[];
  total_price: number;
  likes_count: number;
  comments_count: number;
}

interface CommunityCardProps {
  recipe: CommunityRecipeData;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ recipe }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  console.log("RECIPE BOSS: ", recipe)
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-2 mt-2">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={recipe.creator.profile_picture || "/img/no-photo.png"}
              alt="William Thacker"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="text-sm text-xl font-semibold">
                {recipe.creator.name}
              </h2>
              <p className="text-xs text-gray-500">
              {formatDate(recipe.created_at)}
              </p>
            </div>
          </div>
          <button className="text-xs px-4 py-2 outline text-[#7862FC] rounded-full font-semibold">
            Follow
          </button>
        </div>

        <div className="flex flex-row">
          <div className="mb-4 w-[70%]">
            <h1 className="text-md font-medium mb-2 flex items-center">
              {recipe.name}
            </h1>
            <div className="flex space-x-2 mb-2">
              {recipe.dietary_details.slice(0, 1).map((detail, index) => (
                <span
                  key={index}
                  className="text-ss px-2 py-1 outline text-[#7862FC] rounded-full text-sm"
                >
                  {detail}
                </span>
              ))}
              {recipe.dietary_details.length > 1 && (
                <div className="text-ss px-2 py-1 outline text-[#7862FC] rounded-full text-sm">
                  +{recipe.dietary_details.length - 1}
                </div>
              )}
            </div>
            {/* <p className="text-xs text-gray-700">
              {recipe.meal_type} • {recipe.cooking_time} mins • $
              {recipe.total_price.toFixed(2)}
            </p> */}
          </div>

          <div className="mb-4">
            <img
              src={recipe.image || "/img/no-photo.png"}
              alt={recipe.name}
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
              <span className="text-xs text-gray-700">
                {recipe.likes_count}
              </span>
            </button>
            <button className="flex items-center">
              <div className="flex items-center w-6 h-6 mr-1">
                <CommentIcon />
              </div>
              <span className="text-xs text-gray-700">
                {recipe.comments_count}
              </span>
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
