import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  colorSchemes,
  dummyThumbnails,
  type AspectRatio,
  type IThumbnailPreview,
  type ThumbnailStyle,
} from "../assets 2/assets";

import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";

const Generate = () => {
  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnailPreview | null>(null);

  const [loading, setLoading] = useState(false);

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState("vibrant");

  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

//   const handleGenerate = async () => {
//   if (!title) return;

//   setLoading(true);

//   try {
//     const generated: IThumbnailPreview = {
//       _id: Date.now().toString(),
//        userId: string,
//       title: title,
//       color_scheme: colorSchemeId as typeof colorSchemes[number]["id"],
//       image_url: dummyThumbnails[0].image_url,
//     };

//     setThumbnail(generated);
//   } catch (error) {
//     console.error("Error generating thumbnail:", error);
//   } finally {
//     setLoading(false);
//   }
// };


  // yha se krna hai mood khrab ho. rha hai bd me krungi
  
  return (
    <>
      <SoftBackdrop />

      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* LEFT PANEL */}
            <div
              className={`space-y-6 ${
                id ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Create your thumbnail
                  </h2>
                  <p className="text-sm text-white/60 mt-1">
                    Describe your vision and let AI bring it to life
                  </p>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-sm text-white/70">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full h-11 rounded-lg bg-white/5 border border-white/10 px-4 text-white outline-none focus:ring-2 focus:ring-pink-500/60"
                  />
                </div>

                <AspectRatioSelector
                  value={aspectRatio}
                  onChange={setAspectRatio}
                />

                <StyleSelector
                  value={style}
                  onChange={setStyle}
                  isOpen={styleDropdownOpen}
                  setIsOpen={setStyleDropdownOpen}
                />

                <ColorSchemeSelector
                  value={colorSchemeId}
                  onChange={setColorSchemeId}
                />

                {/* Additional Details */}
                <div className="space-y-1">
                  <label className="text-sm text-white/70">
                    Additional details
                  </label>
                  <textarea
                    value={additionalDetails}
                    onChange={(e) =>
                      setAdditionalDetails(e.target.value)
                    }
                    rows={4}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white outline-none resize-none focus:ring-2 focus:ring-pink-500/60"
                  />
                </div>

                <button
                  // onClick={handleGenerate}
                  disabled={loading}
                  className="w-full h-11 rounded-full bg-pink-600 hover:bg-pink-500 transition text-white disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Generate Thumbnail"}
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100">
                  Preview
                </h2>

                <PreviewPanel
                  thumbnail={thumbnail}
                  isLoading={loading}
                  aspectRatio={aspectRatio}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
