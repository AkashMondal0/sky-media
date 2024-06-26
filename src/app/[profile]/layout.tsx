import Lg_Navigation from "@/components/home/navigation/lg-navigation"

export default async function RootLayout({ children, modal }: {
  children: React.ReactNode
  modal: React.ReactNode
}) {

  return (
    <>
      <div className="flex h-full md:py-0 py-14">
        <Lg_Navigation />
        {children}
        {modal}
      </div>
    </>
  )
}
