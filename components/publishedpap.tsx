import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { SVGProps } from "react"
import { ModeToggle } from "@/app/components/themetoggle"




function FilterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

export function Publishedpap() {
  return (
    <>
    <ModeToggle />
    <main className="flex-1  py-10 md:py-16 lg:py-20">
      <div className="container px-6 md:px-8">
        <div className="flex items-center justify-between mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Published Papers</h2>
          <div className="flex items-center gap-6">
            <Input type="search" placeholder="Search papers..." className="max-w-md py-3 px-4 text-lg" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="py-2 px-4 text-lg">
                  <FilterIcon className="w-5 h-5 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px]">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Published</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Unpublished</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>Newest First</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Oldest First</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Most Cited</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">The Impact of Climate Change on Biodiversity</h3>
                <p className="text-muted-foreground line-clamp-4">
                  This paper examines the effects of global warming on the world&apos;s ecosystems and the loss of
                  biodiversity. It explores potential mitigation strategies and policy recommendations.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Published: May 2022</div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Download
              </Link>
            </CardFooter>
          </Card>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">The Future of Renewable Energy</h3>
                <p className="text-muted-foreground line-clamp-4">
                 This paper explores the potential of renewable energy sources, such as solar, wind, and hydroelectric
                  power, to meet the world&apos;s growing energy demands.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Published: September 2021</div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Download
              </Link>
            </CardFooter>
          </Card>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">The Role of Artificial Intelligence in Healthcare</h3>
                <p className="text-muted-foreground line-clamp-4">
                  This paper investigates the potential applications of artificial intelligence in the healthcare
                  industry, including disease diagnosis, drug discovery, and patient monitoring.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Published: March 2023</div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Download
              </Link>
            </CardFooter>
          </Card>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">The Impact of Social Media on Mental Health</h3>
                <p className="text-muted-foreground line-clamp-4">
                  This paper examines the psychological effects of social media use, including increased anxiety,
                  depression, and feelings of isolation, and proposes strategies for mitigating these negative impacts.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Published: November 2022</div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Download
              </Link>
            </CardFooter>
          </Card>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">The Impact of Social Media on Mental Health</h3>
                <p className="text-muted-foreground line-clamp-4">
                  This paper examines the psychological effects of social media use, including increased anxiety,
                  depression, and feelings of isolation, and proposes strategies for mitigating these negative impacts.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Published: November 2022</div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Download
              </Link>
            </CardFooter>
          </Card>  <Card className="h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">The Impact of Social Media on Mental Health</h3>
                <p className="text-muted-foreground line-clamp-4">
                  This paper examines the psychological effects of social media use, including increased anxiety,
                  depression, and feelings of isolation, and proposes strategies for mitigating these negative impacts.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Published: November 2022</div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Download
              </Link>
            </CardFooter>
          </Card>  <Card className="h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">The Impact of Social Media on Mental Health</h3>
                <p className="text-muted-foreground line-clamp-4">
                  This paper examines the psychological effects of social media use, including increased anxiety,
                  depression, and feelings of isolation, and proposes strategies for mitigating these negative impacts.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Published: November 2022</div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Download
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-12 md:mt-16 lg:mt-20">
          <div className="flex items-center justify-between mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Visitors and Downloads</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Visitors Today</CardTitle>
              </CardHeader>
              <CardContent >
                <div className="text-5xl font-bold">2,345</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Visitors</CardTitle>
              </CardHeader>
              <CardContent >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>Yogesh Das</div>
                    <div className="font-semibold text-lg">3,456</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Leo Das</div>
                    <div className="font-semibold text-lg">2,789</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Antony Das</div>
                    <div className="font-semibold text-lg">1,987</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold">8,765</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
