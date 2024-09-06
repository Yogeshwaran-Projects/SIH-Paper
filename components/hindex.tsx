"use client"
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ModeToggle } from "@/app/components/themetoggle";

export function Hindex() {
  const router = useRouter();

  return (
    <>
    <ModeToggle />
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative">
      <div className="absolute top-4 left-4">
        <ArrowLeft 
          className="w-8 h-8 text-primary cursor-pointer"
          onClick={() => router.back()} 
        />
      </div>
      <div className="max-w-lg w-full p-8 bg-card rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-5xl font-bold">H-Index</h1>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-28 h-28 bg-primary rounded-full text-primary-foreground text-7xl font-bold">
              42
            </div>
            <p className="text-muted-foreground mt-4 text-center">
              Your H-Index is calculated as the largest number h such that you have published h papers that have each
              been cited at least h times.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold">Publications</h2>
              <p className="text-muted-foreground">125</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold">Citations</h2>
              <p className="text-muted-foreground">3,250</p>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Top Cited Papers</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Groundbreaking Discoveries in Quantum Physics</h3>
                <p className="text-muted-foreground">450 citations</p>
              </div>
              <div className="text-primary font-medium">2018</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Advancements in Machine Learning Algorithms</h3>
                <p className="text-muted-foreground">375 citations</p>
              </div>
              <div className="text-primary font-medium">2020</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Innovative Approaches to Sustainable Energy</h3>
                <p className="text-muted-foreground">325 citations</p>
              </div>
              <div className="text-primary font-medium">2019</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
