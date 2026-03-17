interface HighlighterProps {
  readonly text: string;
  readonly highlight: string;
  readonly className?: string;
}

export function Highlighter({ text, highlight, className = "bg-primary/30 text-primary-foreground rounded-sm px-0.5" }: HighlighterProps) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  // Escape special regex characters
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={`hl-${part}-${i}`} className={className}>
            {part}
          </mark>
        ) : (
          <span key={`txt-${part}-${i}`}>{part}</span>
        )
      )}
    </span>
  );
}
