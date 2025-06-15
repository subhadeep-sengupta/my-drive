import { Button } from "~/components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Cloud, Shield, Zap, Users, HardDrive, Download } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function HomePage() {
  const session = await auth();
  if (session.userId) {
    return redirect("/drive");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HardDrive className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold">My Drive</span>
          </div>
          <Button
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800"
          >
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
            Your Files, Everywhere
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300 md:text-2xl">
            Store, sync, and share your files with the power and simplicity of
            My Drive. Access your content from anywhere, anytime.
          </p>
          <form
            action={async () => {
              "use server";

              const session = await auth();

              if (!session.userId) {
                return redirect("/sign-in");
              }
              return redirect("/drive");
            }}
          >
            <Button
              type="submit"
              size="lg"
              className="rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-gray-600 hover:to-gray-800 hover:shadow-xl"
            >
              Get Started
            </Button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Everything You Need
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Powerful features designed to keep your digital life organized and
            accessible.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 transition-colors hover:border-gray-600">
            <CardContent className="p-6">
              <Cloud className="mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                Cloud Storage
              </h3>
              <p className="text-gray-400">
                Store your files securely in the cloud with unlimited access
                from any device.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 transition-colors hover:border-gray-600">
            <CardContent className="p-6">
              <Shield className="mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                Secure & Private
              </h3>
              <p className="text-gray-400">
                Your files are protected with enterprise-grade security and
                encryption.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 transition-colors hover:border-gray-600">
            <CardContent className="p-6">
              <Zap className="mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                Lightning Fast
              </h3>
              <p className="text-gray-400">
                Upload, download, and sync your files at blazing fast speeds.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 transition-colors hover:border-gray-600">
            <CardContent className="p-6">
              <Users className="mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                Easy Sharing
              </h3>
              <p className="text-gray-400">
                Share files and folders with anyone, anywhere with simple link
                sharing.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 transition-colors hover:border-gray-600">
            <CardContent className="p-6">
              <Download className="mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                Offline Access
              </h3>
              <p className="text-gray-400">{`Access your most important files even when you're offline.`}</p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 transition-colors hover:border-gray-600">
            <CardContent className="p-6">
              <HardDrive className="mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                Generous Storage
              </h3>
              <p className="text-gray-400">
                Start with 15GB free and upgrade to get all the space you need.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-2xl border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 p-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            Join millions of users who trust My Drive with their most important
            files.
          </p>
          <form
            action={async () => {
              "use server";

              const session = await auth();

              if (!session.userId) {
                console.log("redirecting to sign-in");
                return redirect("/sign-in");
              }

              return redirect("/drive");
            }}
          >
            <Button
              type="submit"
              size="lg"
              className="rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-gray-600 hover:to-gray-800 hover:shadow-xl"
            >
              Get Started
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto border-t border-gray-800 px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center space-x-2 md:mb-0">
            <HardDrive className="h-6 w-6 text-gray-400" />
            <span className="text-gray-400">
              © 2024 My Drive. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
