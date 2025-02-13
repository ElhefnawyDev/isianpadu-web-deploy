interface FrameProps {
    children: React.ReactNode
    className?: string
  }
  
  export default function Frame({ children, className = "" }: FrameProps) {
    return (
      <div className={`relative p-8 ${className}`}>
        {/* Outer frame */}
        <div className="absolute inset-0 border-4 border-[#0a40e1] transform rotate-2" />
        {/* Inner frame */}
        <div className="absolute inset-0 border-4 border-[#dc2626] transform -rotate-1" />
        {/* Content container */}
        <div className="relative bg-white z-10">
          {children}
        </div>
      </div>
    )
  }