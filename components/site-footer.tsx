import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#00FF84] flex items-center justify-center">
                <span className="text-black font-bold text-lg">S</span>
              </div>
              <span className="font-space-grotesk text-xl font-bold">SendKyleDeals</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"Fast funding & underwriting for real estate investors."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-space-grotesk font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/submit-deal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Submit Deal
                </Link>
              </li>
              <li>
                <Link
                  href="/book-appointment"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-space-grotesk font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-space-grotesk font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@sendkyledeals.com</li>
              <li>For assistance call:</li>
              <li>(732) 410-1010</li>
              <li className="leading-relaxed">
                30 N GOULD ST STE R
                <br />
                SHERIDAN, WY 82801
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 SendKyleDeals. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms-and-conditions" className="hover:text-foreground transition-colors">
              Terms and Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
