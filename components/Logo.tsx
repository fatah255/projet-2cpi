import Image from "next/image";

export function Logo(props: React.ComponentPropsWithoutRef<"svg">) {
  return <Image src="/logo.svg" alt="logo" width={50} height={50} />;
}
