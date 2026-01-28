'use client'

export default function GlobeIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300"
    >
      {/* Outer circle */}
      <circle
        cx="40"
        cy="40"
        r="38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        fill="none"
      />
      
      {/* Horizontal lines */}
      <ellipse
        cx="40"
        cy="40"
        rx="38"
        ry="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        fill="none"
        transform="rotate(0 40 40)"
      />
      <ellipse
        cx="40"
        cy="40"
        rx="38"
        ry="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        fill="none"
        transform="rotate(60 40 40)"
      />
      <ellipse
        cx="40"
        cy="40"
        rx="38"
        ry="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        fill="none"
        transform="rotate(120 40 40)"
      />
      
      {/* Vertical lines */}
      <line
        x1="40"
        y1="2"
        x2="40"
        y2="78"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <line
        x1="2"
        y1="40"
        x2="78"
        y2="40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      
      {/* Center dot */}
      <circle
        cx="40"
        cy="40"
        r="2"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  )
}

