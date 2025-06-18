
import { SignInButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      <SignInButton forceRedirectUrl={`/drive`}>
        <Button variant="outline"
          className="border-gray-600 text-white hover:bg-gray-800"> Sign in</Button>
      </SignInButton>
    </div>
  );
}
