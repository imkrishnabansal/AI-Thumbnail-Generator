import type { JSX } from "react/jsx-runtime";
import type { ThumbnailStyle } from "../assets 2/assets";
import {
  Cpu,
  Image,
  Square,
  Sparkles,
  ChevronDown,
} from "lucide-react";

interface StyleSelectorProps {
  value: ThumbnailStyle;
  onChange: (value: ThumbnailStyle) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const styles: {
  value: ThumbnailStyle;
  label: string;
  icon: JSX.Element;
}[] = [
    {
    value: "Creative / AI Art",
    label: "Creative / AI Art",
    icon: <Sparkles size={14} />,
  },
  {
    value: "Bold & Graphic",
    label: "Bold & Graphic",
    icon: <Square size={14} />,
  },
  {
    value: "Photorealistic",
    label: "Photorealistic",
    icon: <Image size={14} />,
  },
  {
    value: "Minimalist",
    label: "Minimalist",
    icon: <Cpu size={14} />,
  },
];

const StyleSelector = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
}: StyleSelectorProps) => {
  return (
    <div className="relative space-y-1.5">
      <p className="text-xs text-white/70">Style</p>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10
        flex items-center justify-between text-xs text-white hover:bg-white/10 transition"
      >
        <span>{value}</span>
        <ChevronDown
          size={14}
          className={`transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full rounded-xl bg-[#0f0f14]
        border border-white/10 shadow-xl overflow-hidden">
          {styles.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => {
                onChange(style.value);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-xs flex items-center gap-2 transition
                ${
                  value === style.value
                    ? "bg-pink-600 text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
            >
              {style.icon}
              <span>{style.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleSelector;
