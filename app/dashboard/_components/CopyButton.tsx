"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  text: string;
  children?: React.ReactNode;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, children }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Button onClick={handleCopy} variant="ghost" className="text-primary">
      {children || "Copy"}
    </Button>
  );
};

export default CopyButton;
