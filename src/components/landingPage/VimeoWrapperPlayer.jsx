import Vimeo from "@u-wave/react-vimeo";

export default function VimeoWrapperPlayer() {
  function onPlay() {
    console.log("play");
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-4xl aspect-video mx-4">
        <Vimeo
          video={1051039311}
          autoplay={false}
          responsive
          onPlay={onPlay}
        />
      </div>
    </div>
  );
}
