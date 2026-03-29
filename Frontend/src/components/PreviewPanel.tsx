import type { AspectRatio, IThumbnail } from "../assets 2/assets";
import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {
  const aspectClasses: Record<AspectRatio, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  const onDownload = () => {
    if (!thumbnail?.image_url) return;
    window.open(thumbnail.image_url, "_blank");
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* ASPECT BOX */}
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 ${aspectClasses[aspectRatio]}`}
      >
        {/* LOADING */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 gap-2">
            <Loader2Icon className="size-8 animate-spin text-zinc-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-300">
                AI is creating your thumbnail...
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                This may take 10–20 seconds
              </p>
            </div>
          </div>
        )}

        {/* IMAGE PREVIEW */}
        {!isLoading && thumbnail?.image_url && (
          <div className="group relative h-full w-full">
            <img
              src={thumbnail.image_url}
              alt="Generated thumbnail"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={onDownload}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md bg-white/30 px-4 py-2 text-xs font-medium ring-2 ring-white/40 backdrop-blur transition hover:scale-105 active:scale-95"
            >
              <DownloadIcon className="size-4" />
              Download
            </button>
          </div>
        )}

        {/* EMPTY STATE (CENTERED PERFECTLY) */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="flex flex-col items-center justify-center text-center">
            <ImageIcon className="size-12 text-white/30" />
            <p className="mt-3 text-sm font-medium text-zinc-200">
              Generate your first thumbnail
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Fill out the form and click generate
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
