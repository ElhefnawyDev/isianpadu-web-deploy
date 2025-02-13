import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog"
import ReactMarkdown from "react-markdown"

interface ProfileCardProps {
  name: string
  title: string
  bio: string
  imageSrc: string
}

export function ProfileCard({ name, title, bio, imageSrc }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-64 h-64 overflow-hidden rounded-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <h2 className="text-xl font-medium">{name}</h2>
      <p className="text-muted-foreground">{title}</p>
      <Dialog>
        <DialogTrigger className="text-blue-600 hover:underline">
          Bio &gt;
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <div className="space-y-1">
                <h3 className="text-xl font-medium">{name}</h3>
                <p className="text-muted-foreground text-sm">{title}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-sm leading-relaxed space-y-4 text-justify">
            {bio.split('\n\n').map((paragraph, index) => (
              <ReactMarkdown key={index}>{paragraph}</ReactMarkdown>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}