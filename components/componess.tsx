
import { ModeToggle } from "@/app/components/themetoggle"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export function Componess() {
  return (
    <>
    <ModeToggle />
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      <div>
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">Professor of Computer Science, Acme University</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-4 bg-muted p-4 rounded-lg">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Efficient Algorithms for Solving NP-Complete Problems
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">Published in Journal of Algorithms, 2018</p>
              </div>
              <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                View Paper
              </Link>
            </div>
            <div className="flex items-center gap-4 bg-muted p-4 rounded-lg">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Towards Quantum Supremacy in Natural Language Processing
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">Published in Nature Communications, 2021</p>
              </div>
              <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                View Paper
              </Link>
            </div>
            <div className="flex items-center gap-4 bg-muted p-4 rounded-lg">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Advances in Federated Learning for Edge Devices
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Published in IEEE Transactions on Wireless Communications, 2020
                </p>
              </div>
              <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                View Paper
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted p-6 rounded-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Publications</h2>
            <span className="text-muted-foreground">45</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Citations</h2>
            <span className="text-muted-foreground">2,345</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">H-Index</h2>
            <span className="text-muted-foreground">27</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
