import type { AspectRatio } from "../assets 2/assets";
import { Smartphone, Tablet, Monitor } from "lucide-react";

interface AspectRatioSelectorProps {
  value: AspectRatio;
  onChange: (value: AspectRatio) => void;
}

const ratios = [
  { value: "9:16" as AspectRatio, label: "9:16", icon: Smartphone },
  { value: "1:1" as AspectRatio, label: "1:1", icon: Tablet },
  { value: "16:9" as AspectRatio, label: "16:9", icon: Monitor },
];

const AspectRatioSelector = ({
  value,
  onChange,
}: AspectRatioSelectorProps) => {
  return (
    <div className="space-y-1.5">
      <p className="text-xs text-white/70">Aspect Ratio</p>

      <div className="grid grid-cols-3 gap-2">
        {ratios.map(({ value: ratio, label, icon: Icon }) => (
          <button
            key={ratio}
            type="button"
            onClick={() => onChange(ratio)}
            className={`flex items-center justify-center gap-1.5
              h-9 w-20 px-2 rounded-1.5xl text-xs border transition
              ${
                value === ratio
                  ? "bg-pink-600 border-pink-500 text-white"
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
              }`}
          >
            <Icon size = {14}/>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
