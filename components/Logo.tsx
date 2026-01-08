interface LogoProps {
  showText?: boolean
  className?: string
  textSize?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Logo({ showText = true, className = '', textSize = 'md' }: LogoProps) {
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Graphic */}
      <div className="relative flex-shrink-0">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Thick rounded dark teal-blue path forming L shape */}
          <path
            d="M7 7 L7 29 L29 29"
            stroke="#005B84"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Orange map pin at top-left - circular head */}
          <circle cx="7" cy="7" r="5.5" fill="#FF6700" />
          {/* Black dot in center of map pin */}
          <circle cx="7" cy="7" r="2" fill="#000" />
          
          {/* Pointed bottom of map pin connecting to blue line */}
          <path
            d="M7 12 L7 15"
            stroke="#FF6700"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          
          {/* Vibrant blue circle at right end */}
          <circle cx="29" cy="29" r="5.5" fill="#005BEC" />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div>
          <h1 className={`font-bold text-[#005BEC] ${textSizeClasses[textSize]}`}>
            Lyfestylz
          </h1>
        </div>
      )}
    </div>
  )
}

