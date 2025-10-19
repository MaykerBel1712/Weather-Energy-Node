import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="bg-sidebar group-has-data-[collapsible=icon]/sidebar-wrapper:min-h-12 flex min-h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear relative py-0.5">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="bg-sidebar-border mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex-1 flex justify-center">
          <h1 className="text-sidebar-accent  font-bold text-lg  text-center">
            Sistema para la gestión de energía eléctrica del edificio Aulas Generales de la UFPS usando el Internet de las Cosas
          </h1>
        </div>
      </div>
    </header>
  )
}
