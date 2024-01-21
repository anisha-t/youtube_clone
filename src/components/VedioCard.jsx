import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";

import VideoLength from "../shared/vedioLength"; 

const VideoCard = ({ video }) => {
    return (
        // Link to the video details page
        <Link to={`/video/${video?.videoId}`}>
            {/* Container for each video card */}
            <div className="flex flex-col mb-8">
                {/* Container for video thumbnail and length */}
                <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
                    {/* Video thumbnail src:Specifies the source URL for the image. 
                    It uses optional chaining (`?.`) to avoid errors if `video` or `thumbnails[0]` is null or undefined. 
                    It retrieves the URL of the first thumbnail from the `video` object.*/}
                    <img
                        className="h-full w-full object-cover"
                        src={video?.thumbnails[0]?.url}
                        alt="Video Thumbnail"
                    />
                    {/* Display video length if available */}
                    {video?.lengthSeconds && (
                        <VideoLength time={video?.lengthSeconds} />
                    )}
                </div>
                {/* Container for video information */}
                <div className="flex text-white mt-3">
                    {/* Container for author's avatar */}
                    <div className="flex items-start">
                        <div className="flex h-9 w-9 rounded-full overflow-hidden">
                            {/* Author's avatar */}
                            <img
                                className="h-full w-full object-cover"
                                src={video?.author?.avatar[0]?.url}
                                alt="Author's Avatar"
                            />
                        </div>
                    </div>
                    {/* Container for video title and author information */}
                    <div className="flex flex-col ml-3 overflow-hidden">
                        {/* Video title */}
                        <span className="text-sm font-bold line-clamp-2">
                            {video?.title}
                        </span>
                        {/* Author's name and verification badge */}
                        <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                            {video?.author?.title}
                            {/* Display verification badge if the channel is verified */}
                            {video?.author?.badges[0]?.type ===
                                "VERIFIED_CHANNEL" && (
                                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                            )}
                        </span>
                        {/* Container for views count and published time */}
                        <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                            {/* Display abbreviated views count */}
                            <span>{`${abbreviateNumber(
                                video?.stats?.views,
                                2
                            )} views`}</span>
                            {/* Dot separator */}
                            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                                .
                            </span>
                            {/* Display published time */}
                            <span className="truncate">
                                {video?.publishedTimeText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
