import React from "react";

interface FlipLinkProps {
  children: string;
  href?: string;
  className?: string;
  gradient?: string; // CSS gradient for text color
}

export const FlipLink = ({ children, href, className = "", gradient }: FlipLinkProps) => {
  const Tag = href ? "a" : "span";
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  const letterStyle = gradient
    ? {
        background: gradient,
        WebkitBackgroundClip: "text" as const,
        WebkitTextFillColor: "transparent" as const,
        backgroundClip: "text" as const,
      }
    : undefined;

  return (
    <Tag
      {...props}
      className={`group relative block overflow-hidden whitespace-nowrap font-black uppercase ${className}`}
      style={{ lineHeight: 0.75 }}
    >
      <div className="flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{
              transitionDelay: `${i * 25}ms`,
              ...letterStyle,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{
              transitionDelay: `${i * 25}ms`,
              ...letterStyle,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </Tag>
  );
};
