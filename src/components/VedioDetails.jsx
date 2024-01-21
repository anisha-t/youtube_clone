import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVedioCard";



// Functional component for displaying video details
const VideoDetails = () => {
    // State variables for storing video details and related videos
    const [video, setVideo] = useState();
    const [relatedVideos, setRelatedVideos] = useState();

    // Get video ID from the URL parameters
    const { id } = useParams();

    // Access setLoading function from the Context
    const { setLoading } = useContext(Context);

    // useEffect hook to fetch video details and related videos when the component mounts or when the video ID changes
    useEffect(() => {
        // Add custom class to the root element for styling purposes
        document.getElementById("root").classList.add("custom-h");

        // Fetch video details and related videos
        fetchVideoDetails();
        fetchRelatedVideos();
    }, [id]);

    // Function to fetch video details from the API
    const fetchVideoDetails = () => {
        // Set loading to true before making the API request
        setLoading(true);

        // Call the fetchDataFromApi function to fetch video details
        fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
            // Log the API response for debugging
            console.log(res);

            // Set the video state with the fetched data
            setVideo(res);

            // Set loading to false after the API request is complete
            setLoading(false);
        });
    };

    // Function to fetch related videos from the API
    const fetchRelatedVideos = () => {
        // Set loading to true before making the API request
        setLoading(true);

        // Call the fetchDataFromApi function to fetch related videos
        fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
            // Log the API response for debugging
            console.log(res);

            // Set the relatedVideos state with the fetched data
            setRelatedVideos(res);

            // Set loading to false after the API request is complete
            setLoading(false);
        });
    };

    // JSX for rendering video details and related videos
    return (
        <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
                {/* Video Details Section */}
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    {/* Video Player Section */}
                    <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            controls
                            width="100%"
                            height="100%"
                            style={{ backgroundColor: "#000000" }}
                            playing={true}
                        />
                    </div>
                    {/* Video Title Section */}
                    <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                        {video?.title}
                    </div>
                    {/* Video Author and Stats Section */}
                    <div className="flex justify-between flex-col md:flex-row mt-4">
                        {/* Video Author Section */}
                        <div className="flex">
                            <div className="flex items-start">
                                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={video?.author?.avatar[0]?.url}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col ml-3">
                                {/* Author Name and Badge Section */}
                                <div className="text-white text-md font-semibold flex items-center">
                                    {video?.author?.title}
                                    {video?.author?.badges[0]?.type ===
                                        "VERIFIED_CHANNEL" && (
                                        <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                                    )}
                                </div>
                                {/* Author Subscribers Section */}
                                <div className="text-white/[0.7] text-sm">
                                    {video?.author?.stats?.subscribersText}
                                </div>
                            </div>
                        </div>
                        {/* Video Views and Likes Section */}
                        <div className="flex text-white mt-4 md:mt-0">
                            {/* Likes Section */}
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                                <AiOutlineLike className="text-xl text-white mr-2" />
                                {`${abbreviateNumber(
                                    video?.stats?.views,
                                    2
                                )} Likes`}
                            </div>
                            {/* Views Section */}
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                                {`${abbreviateNumber(
                                    video?.stats?.views,
                                    2
                                )} Views`}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Videos Section */}
                <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                    {/* Map through related videos and render SuggestionVideoCard */}
                    {relatedVideos?.contents?.map((item, index) => {
                        if (item?.type !== "video") return false;
                        return (
                            <SuggestionVideoCard
                                key={index}
                                video={item?.video}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Export the VideoDetails component
export default VideoDetails;
