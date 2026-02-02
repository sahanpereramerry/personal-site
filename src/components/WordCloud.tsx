import { useState } from 'react';

interface Word {
  text: string;
  weight: number;
  href: string;
}

const words: Word[] = [
  { text: 'AI Systems', weight: 1.4, href: '#work' },
  { text: 'Marketing', weight: 1.3, href: '#work' },
  { text: 'Automation', weight: 1.2, href: '/articles/briefing-system' },
  { text: 'Thought Leadership', weight: 1.1, href: '/articles/ceo-writing' },
  { text: 'Data Science', weight: 1.0, href: '#about' },
  { text: 'Ethics', weight: 0.9, href: '#about' },
  { text: 'Briefing Systems', weight: 1.1, href: '/articles/briefing-system' },
  { text: 'Content Strategy', weight: 1.0, href: '/articles/ceo-writing' },
  { text: 'RSS Automation', weight: 0.85, href: '/articles/briefing-system' },
  { text: 'CEO Writing', weight: 0.95, href: '/articles/ceo-writing' },
  { text: 'AI Governance', weight: 1.0, href: '/articles/ceo-writing' },
  { text: 'Team Alignment', weight: 0.9, href: '#about' },
];

export default function WordCloud() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 py-8">
      {words.map((word, index) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <a
            key={word.text}
            href={word.href}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="transition-all duration-300 ease-out cursor-pointer"
            style={{
              fontSize: `${word.weight * 1.25}rem`,
              opacity: isOtherHovered ? 0.3 : 1,
              transform: isHovered ? 'scale(1.15)' : 'scale(1)',
              color: isHovered ? '#a78bfa' : '#9ca3af',
            }}
          >
            {word.text}
          </a>
        );
      })}
    </div>
  );
}
