"use client";

type OptionCardProps = {
  name: string;
  value: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (value: string) => void;
  type?: "radio" | "checkbox";
};

/** Scelta a card: superficie cliccabile ampia, stato visibile anche a tastiera. */
export function OptionCard({
  name,
  value,
  label,
  hint,
  checked,
  onChange,
  type = "radio",
}: OptionCardProps) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-700 ${
        checked
          ? "border-teal-700 bg-teal-50/60"
          : "border-line-strong bg-white hover:border-ink-600/40"
      }`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="mt-1 h-4 w-4 shrink-0 accent-[#2b7a78]"
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {hint && (
          <span className="mt-1 block text-xs leading-relaxed text-muted">
            {hint}
          </span>
        )}
      </span>
    </label>
  );
}
