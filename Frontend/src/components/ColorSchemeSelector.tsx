import { colorSchemes } from "../assets 2/assets";

const ColorSchemeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-200">
        Color Scheme
      </label>

      <div className="grid grid-cols-6 gap-3">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => onChange(scheme.id)}
            className={`relative h-9 rounded-lg transition-all border
              ${
                value === scheme.id
                  ? "ring-2 ring-pink-500 border-pink-500"
                  : "border-white/10 hover:border-white/20"
              }`}
            style={{
              background: `linear-gradient(135deg, ${scheme.colors.join(",")})`,
            }}
            title={scheme.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSchemeSelector;
