import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image
            src="/logo_light.png"
            height="60"
            width="60"
            alt="Logo"
            className="dark:hidden"
        />

        <Image
            src="/logo_dark.png"
            height="60"
            width="60"
            alt="Logo"
            className="hidden dark:block"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Loading...
      </p>
    </div>
  );
};