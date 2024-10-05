import React, { useState, useEffect, useRef } from "react";

interface InlineEditProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  onChange,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
    if (isEditing) {
      setEditedValue(value);
    }
  }, [isEditing, value]);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(editedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  if (isEditing) {
    return (
      <div className="leadin flex leading-relaxed">
        <div
          role="textbox"
          ref={inputRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e: React.FormEvent<HTMLDivElement>) =>
            setEditedValue(e.currentTarget.textContent ?? "")
          }
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`editable bg-transparent ${className}`}
        >
          {editedValue}
        </div>
      </div>
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer leading-relaxed hover:bg-primary hover:bg-opacity-10 ${className} border-b border-transparent hover:border-current`}
    >
      {value}
    </span>
  );
};

export default InlineEdit;
