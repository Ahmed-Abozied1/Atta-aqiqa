import { FooterNav } from "./FooterNav"
import { FooterLogo } from "./FooterLogo"
import { FooterContact } from "./FooterContact"
import { FooterCopyright } from "./FooterCopyright"

export const Footer = () => {
  return (
    <footer className="bg-primary text-bg py-10">
      <div className="container">
        <FooterLogo />

        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 mt-8">
          <div className="order-1 md:order-2 flex flex-col items-center md:items-start text-center md:text-right w-full max-w-xl">
            <FooterContact />
          </div>

          <div className="order-2 md:order-1 w-full">
            <FooterNav />
          </div>
        </div>

        <FooterCopyright />
      </div>
    </footer>
  )
}
