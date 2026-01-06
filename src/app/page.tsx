import {
  ChevronRight,
  Clock,
  Globe,
  MapPin,
  Plane,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-yellow-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-yellow-950/20" />

        {/* Decorative elements */}
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute -left-48 top-1/2 h-96 w-96 rounded-full bg-red-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-700 dark:text-yellow-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500" />
              </span>
              Now accepting new pilots
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
              Experience the skies of{" "}
              <span className="bg-gradient-to-r from-zinc-900 via-yellow-600 to-red-600 bg-clip-text text-transparent dark:from-zinc-100 dark:via-yellow-400 dark:to-red-500">
                Belgium
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Join Belgium&apos;s premier virtual airline. Fly stunning routes
              across Europe and beyond with our diverse fleet and passionate
              community of aviation enthusiasts.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="gap-2 bg-yellow-500 text-zinc-900 hover:bg-yellow-400"
                >
                  Start Flying Today
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#fleet">
                <Button variant="outline" size="lg">
                  Explore Our Fleet
                </Button>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <div>
                <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  50+
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Active Pilots
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  200+
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Destinations
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  15K+
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Hours Flown
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-zinc-200 bg-zinc-50/50 py-24 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Why fly with AirBelgie?
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              We offer everything you need for an immersive virtual aviation
              experience.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-yellow-500/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Global Routes
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Fly to over 200 destinations worldwide with our carefully
                crafted route network centered on Brussels.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-yellow-500/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Modern Fleet
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                From regional jets to long-haul widebodies, our fleet offers
                aircraft for every type of pilot.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-yellow-500/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Active Community
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Join group flights, events, and connect with fellow pilots
                through our Discord community.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-yellow-500/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Rank Progression
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Advance through pilot ranks as you accumulate hours and complete
                challenges.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-yellow-500/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                ACARS Tracking
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Track your flights automatically with our ACARS system.
                Compatible with all major simulators.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-yellow-500/50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Fly Anytime
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                No schedules, no pressure. Book and fly routes whenever it suits
                your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section
        id="fleet"
        className="border-t border-zinc-200 py-24 dark:border-zinc-800"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Our Fleet
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              A diverse selection of aircraft for every mission.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Aircraft Card 1 */}
            <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="aspect-[4/3] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                <div className="flex h-full items-center justify-center">
                  <Plane className="h-16 w-16 text-zinc-400 transition-transform group-hover:scale-110" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Airbus A320neo
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Short-haul workhorse
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
                  <span>180 seats</span>
                  <span>3,500 nm</span>
                </div>
              </div>
            </div>

            {/* Aircraft Card 2 */}
            <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="aspect-[4/3] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                <div className="flex h-full items-center justify-center">
                  <Plane className="h-16 w-16 text-zinc-400 transition-transform group-hover:scale-110" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Airbus A330-300
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Medium-haul flagship
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
                  <span>277 seats</span>
                  <span>6,350 nm</span>
                </div>
              </div>
            </div>

            {/* Aircraft Card 3 */}
            <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="aspect-[4/3] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                <div className="flex h-full items-center justify-center">
                  <Plane className="h-16 w-16 text-zinc-400 transition-transform group-hover:scale-110" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Boeing 787-9
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Long-haul dreamliner
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
                  <span>296 seats</span>
                  <span>7,635 nm</span>
                </div>
              </div>
            </div>

            {/* Aircraft Card 4 */}
            <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="aspect-[4/3] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                <div className="flex h-full items-center justify-center">
                  <Plane className="h-16 w-16 text-zinc-400 transition-transform group-hover:scale-110" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Embraer E190
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Regional connector
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
                  <span>100 seats</span>
                  <span>2,450 nm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to take off?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-300">
              Join AirBelgie today and become part of Belgium&apos;s finest
              virtual aviation community.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="gap-2 bg-yellow-500 text-zinc-900 hover:bg-yellow-400"
                >
                  Create Your Account
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300">
                  <Plane className="h-5 w-5 text-yellow-400" />
                </div>
                <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Air<span className="text-yellow-500">Belgie</span>
                </span>
              </div>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Belgium&apos;s premier virtual airline since 2024.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#fleet"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Fleet
                  </Link>
                </li>
                <li>
                  <Link
                    href="#routes"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Routes
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    PIREP
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Liveries
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Community
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Discord
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Group Flights
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Support
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:flex-row">
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} AirBelgie Virtual Airlines. All
              rights reserved.
            </p>
            <p className="text-sm text-zinc-500">
              Not affiliated with any real-world airline.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
