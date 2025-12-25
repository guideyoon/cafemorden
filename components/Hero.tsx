"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState(1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    if (!video1 || !video2) return;

    const playVideo = (video: HTMLVideoElement) => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsReady(true);
          })
          .catch((error) => {
            console.log("Video autoplay failed:", error);
            // 재생 실패해도 표시
            setIsReady(true);
          });
      }
    };

    // canplay 이벤트로 재생 가능한 즉시 재생
    const handleVideo1CanPlay = () => {
      if (!isReady) {
        playVideo(video1);
      }
    };

    // loadeddata 이벤트로도 시도 (더 빠른 시점)
    const handleVideo1LoadedData = () => {
      if (!isReady && video1.readyState >= 2) {
        playVideo(video1);
      }
    };

    const handleVideo1End = () => {
      setCurrentVideo(2);
      if (video2.readyState >= 2) {
        playVideo(video2);
      } else {
        video2.addEventListener("canplay", () => playVideo(video2), { once: true });
      }
    };

    const handleVideo2End = () => {
      setCurrentVideo(1);
      if (video1.readyState >= 2) {
        playVideo(video1);
      } else {
        video1.addEventListener("canplay", () => playVideo(video1), { once: true });
      }
    };

    // 여러 이벤트 리스너로 빠른 재생 시도
    video1.addEventListener("canplay", handleVideo1CanPlay);
    video1.addEventListener("loadeddata", handleVideo1LoadedData);
    video1.addEventListener("ended", handleVideo1End);
    video2.addEventListener("ended", handleVideo2End);

    // 이미 로드된 경우 즉시 재생
    if (video1.readyState >= 2) {
      playVideo(video1);
    } else {
      // 강제로 로드 시작
      video1.load();
    }

    return () => {
      video1.removeEventListener("canplay", handleVideo1CanPlay);
      video1.removeEventListener("loadeddata", handleVideo1LoadedData);
      video1.removeEventListener("ended", handleVideo1End);
      video2.removeEventListener("ended", handleVideo2End);
    };
  }, [isReady]);

  return (
    <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={video1Ref}
          autoPlay
          muted
          loop={false}
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 hero-video ${
            currentVideo === 1 && isReady ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ pointerEvents: "none" }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <video
          ref={video2Ref}
          muted
          loop={false}
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 hero-video ${
            currentVideo === 2 && isReady ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ pointerEvents: "none" }}
        >
          <source src="/hero2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20 z-20" />
      </div>
      <div className="relative h-full flex items-center justify-center z-30">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 hero-title-shine" data-text="카페 모던">
            카페 모던
          </h1>
          <p className="text-xl md:text-2xl">
            따뜻한 커피와 모던한 공간에서 만나는<br />
            특별한 하루
          </p>
        </div>
      </div>
    </section>
  );
}

