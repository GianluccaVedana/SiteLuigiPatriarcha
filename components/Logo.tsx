import React from 'react'

interface LogoProps {
  size?: number
  className?: string
  showText?: boolean
}

export default function Logo({ size = 80, className = '', showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="https://drive.google.com/uc?export=view&id=1smcwnvrm2Q0HkkbrKrhWPMig7aZq7AGX"
        alt="29ª Taça Luigi Patriarcha"
        width={size}
        height={size}
        style={{ objectFit: 'contain' }}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="font-black text-white text-sm leading-tight tracking-wide uppercase">
            Taça Luigi Patriarcha
          </span>
          <span className="text-gold-500 text-xs leading-tight tracking-widest uppercase">
            29ª Edição · Futsal
          </span>
        </div>
      )}
    </div>
  )
}
