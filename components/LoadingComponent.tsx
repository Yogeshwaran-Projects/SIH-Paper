import React from 'react'

export default function LoadingComponent() {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="animate-bounce">
            <div className="h-12 w-12 animate-spin text-primary" />
          </div>
          <p className="text-muted-foreground animate-pulse">Hang tight, we&apos;re getting everything ready for you!</p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-muted-foreground">we&apos;reworking hard to make this the best experience for you.</p>
          </div>
        </div>
      </div>
    )
  }