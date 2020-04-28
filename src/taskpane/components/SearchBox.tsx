import * as React from "react";

interface SeachBoxProps {
  value: string;
  onChange: (ev: React.SyntheticEvent<HTMLInputElement>) => void;
}

const SeachBox: React.FC<SeachBoxProps> = ({ value, onChange }: SeachBoxProps) => {
  return (
    <div className="searchBox">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search stocks..."
        autoCorrect="off"
        autoComplete="off"
      />
    </div>
  );
};

export default SeachBox;
