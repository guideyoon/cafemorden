"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState(1);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    if (!video1 || !video2) return;

    const playVideo = (video: HTMLVideoElement) => {
      video.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    };

    const handleVideo1Loaded = () => {
      setVideoLoaded(true);
      playVideo(video1);
    };

    const handleVideo2Loaded = () => {
      if (!videoLoaded) {
        setVideoLoaded(true);
      }
    };

    // 비디오 로드 완료 이벤트
    video1.addEventListener("loadeddata", handleVideo1Loaded);
    video2.addEventListener("loadeddata", handleVideo2Loaded);

    // 초기 재생 시도
    if (video1.readyState >= 2) {
      handleVideo1Loaded();
    } else {
      playVideo(video1);
    }

    const handleVideo1End = () => {
      setCurrentVideo(2);
      playVideo(video2);
    };

    const handleVideo2End = () => {
      setCurrentVideo(1);
      playVideo(video1);
    };

    video1.addEventListener("ended", handleVideo1End);
    video2.addEventListener("ended", handleVideo2End);

    return () => {
      video1.removeEventListener("loadeddata", handleVideo1Loaded);
      video2.removeEventListener("loadeddata", handleVideo2Loaded);
      video1.removeEventListener("ended", handleVideo1End);
      video2.removeEventListener("ended", handleVideo2End);
    };
  }, [videoLoaded]);

  return (
    <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={video1Ref}
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 hero-video ${
            currentVideo === 1 && videoLoaded ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ pointerEvents: "none" }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <video
          ref={video2Ref}
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 hero-video ${
            currentVideo === 2 && videoLoaded ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ pointerEvents: "none" }}
        >
          <source src="/hero2.mp4" type="video/mp4" />
        </video>
        {!videoLoaded && (
          <div className="absolute inset-0 bg-cream-light z-15" />
        )}
        <div className="absolute inset-0 bg-black/20 z-20" />
      </div>
      <div className="relative h-full flex items-center justify-center z-30">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 hero-title-shine" data-text="카페 모던">
            카페 모던
          </h1>
          <p className="text-xl md:text-2xl">따뜻한 커피와 모던한 공간에서 만나는 특별한 하루</p>
        </div>
      </div>
    </section>
  );
}

