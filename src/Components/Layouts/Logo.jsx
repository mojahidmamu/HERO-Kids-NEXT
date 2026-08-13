import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image alt="Logo" src={"/assets/logo.png"} width={80} height={70}></Image>
      <h2 className="text-xl font-bold">Hero Kidz</h2>
    </Link>
  );
};

export default Logo;
