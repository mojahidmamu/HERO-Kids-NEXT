import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image alt="Logo" src={"/assets/logo.png"} width={65} height={50}></Image>
      <h2 className="text-xl font-bold">Hero <span className="text-purple-600">Kidz</span></h2>
    </Link>
  );
};

export default Logo;
