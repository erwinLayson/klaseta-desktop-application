import { useState } from "react";

interface PasswordInputProps {
  id: string;
  name: string;
  autoComplete: "current-password" | "new-password";
  placeholder?: string;
  required?: boolean;
  enterKeyHint?: "done" | "next" | "go";
  ariaDescribedBy?: string;
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PasswordInput({
  id,
  name,
  autoComplete,
  placeholder = "Enter your password",
  required = true,
  enterKeyHint = "done",
  ariaDescribedBy,
  value,
  onChange
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        enterKeyHint={enterKeyHint}
        required={required}
        aria-describedby={ariaDescribedBy}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-[#DDE9F0] bg-[#FBFDFD] py-2.5 pl-3.5 pr-16 text-sm text-[#3C4044] placeholder:text-[#A1AEB8] transition-colors focus:border-[#5D8DD4] focus:outline-2 focus:outline-offset-0 focus:outline-[#BAD5ED]"
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        aria-pressed={visible}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-1.5 right-1.5 rounded-md px-2.5 text-xs font-semibold text-[#3A66B2] transition-colors hover:bg-[#EBF6FB] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#5D8DD4]"
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
