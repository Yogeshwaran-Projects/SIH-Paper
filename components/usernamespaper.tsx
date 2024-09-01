import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useUserContext } from "@/context/UserContext";

export function Usernamespaper() {
  const { userData } = useUserContext();
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
        <div className="flex flex-col items-start space-y-2">
  <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
  <h3 className="text-lg text-muted-foreground">Usernames across all the platform</h3>
</div>

          <div className="flex items-center gap-2">
            <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
            
            </Link>
            
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 grid gap-4">
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Usernames</h3>
          <div className="grid gap-2 text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Google Scholar:</span>
              <span>{userData.name}123</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Web of Science:</span>
              <span>{userData.name}_wob</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Scopus:</span>
              <span>{userData.name}_123</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ResearchGate:</span>
              <span>{userData.name}-123</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ORCID:</span>
              <span>0000-0001-2345-6789</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Publons:</span>
              <span>{userData.name}_p</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Key Metrics</h3>
          <div className="grid gap-2 text-muted-foreground grid-cols-2">
            <div>
              <span>Google Scholar Citations:</span>
            </div>
            <div>
              <span>1,234</span>
            </div>
            <div>
              <span>Web of Science Citations:</span>
            </div>
            <div>
              <span>987</span>
            </div>
            <div>
              <span>Scopus Citations:</span>
            </div>
            <div>
              <span>876</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ChromeIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}


function ScanSearchIcon(props) {
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
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
      <path d="m16 16-1.9-1.9" />
    </svg>
  )
}