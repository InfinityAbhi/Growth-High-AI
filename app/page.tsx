import { Suspense } from "react"
import { DashboardContent } from "@/components/dashboard-content"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function HomePage() {
  return (
    <LayoutWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </LayoutWrapper>
  )
}
