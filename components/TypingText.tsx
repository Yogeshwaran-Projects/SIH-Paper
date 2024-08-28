import React, { useState, useEffect } from 'react';

export function TypingText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50); // Adjust typing speed here
    return () => clearInterval(timer);
  }, [text]);

  return <p className="text-lg text-muted-foreground">{displayedText}</p>;
}