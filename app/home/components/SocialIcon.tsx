import Image from "next/image";

type SocialIconProps = {
  href: string;
  src: string;
  alt: string;
  size?: number;
};

const SocialIcon: React.FC<SocialIconProps> = ({
  href,
  src,
  alt,
  size = 24,
}) => {
  return (
    <a
      href={href}
      aria-label={alt}
      className="flex items-center justify-center w-[48px] h-[48px] bg-white shadow-[0px_16px_30px_-10px_rgba(0,0,0,0.08)] rounded-[26.25px]"
    >
      <Image src={src} alt={alt} width={size} height={size} />
    </a>
  );
};

export default SocialIcon;
