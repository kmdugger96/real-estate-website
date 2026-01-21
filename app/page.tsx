import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Users,
  Zap,
  FileText,
  Home,
  DollarSign,
  BarChart3,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF84]/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#00FF84]/10 text-[#00FF84] border-[#00FF84]/20 hover:bg-[#00FF84]/20">
              Connecting Wholesalers, Investors & Lenders
            </Badge>
            <h1 className="font-space-grotesk text-5xl md:text-7xl font-bold mb-6 text-balance">
              The Missing Link Between <span className="text-[#00FF84]">Deals & Closings</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              I connect wholesalers, investors, and lenders in your market—so good deals actually close.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/submit-deal">
                <Button size="lg" className="bg-[#00FF84] text-black hover:bg-[#00FF84]/90 text-lg px-8">
                  📄 Submit a Deal
                </Button>
              </Link>
              <Link href="/submit-deal">
                <Button size="lg" className="bg-[#00FF84] text-black hover:bg-[#00FF84]/90 text-lg px-8">
                  🔍 Find Deals
                </Button>
              </Link>
              <Link href="/submit-deal">
                <Button size="lg" className="bg-[#00FF84] text-black hover:bg-[#00FF84]/90 text-lg px-8">
                  💰 Explore Lending
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#00FF84]" />
                <span>Active Buyers in Your Market</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#00FF84]" />
                <span>24hr Response Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#00FF84]" />
                <span>100% Confidential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4">
              Your Resource for All Things Real Estate
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Whether you're moving deals, acquiring properties, or providing capital—I'm your connection to the right
              people in your market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">FOR WHOLESALERS</h3>
                <p className="text-sm text-[#00FF84] mb-3 font-medium">Moving Deals Fast</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Get your deals underwritten and in front of active buyers in your market. Fair terms, fast decisions,
                  and connections that actually close.
                </p>
                <Link href="/submit-deal">
                  <Button variant="outline" className="w-full bg-transparent">
                    Submit Your Deal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">FOR INVESTORS</h3>
                <p className="text-sm text-[#00FF84] mb-3 font-medium">Finding Your Next Opportunity</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Access off-market deals I've personally underwritten. Connect with wholesalers and sellers in your
                  target market—whether you're flipping, holding, or house hacking.
                </p>
                <Link href="/submit-deal">
                  <Button variant="outline" className="w-full bg-transparent">
                    Browse Opportunities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">FOR LENDERS</h3>
                <p className="text-sm text-[#00FF84] mb-3 font-medium">Deploying Capital on Good Deals</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Find vetted short-term and long-term lending opportunities. I connect you with serious borrowers on
                  deals I've underwritten and approved.
                </p>
                <Link href="/submit-deal">
                  <Button variant="outline" className="w-full bg-transparent">
                    Explore Lending Options
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4">Why Work With Me?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Speed, confidentiality, and market connections—on every deal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">Fast Decisions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Submit in 5 minutes. Get underwriting and market connections within 24 hours—not days or weeks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">Total Confidentiality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your deals stay private. I never contact sellers or share your information without approval.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">Honest Market Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transparent underwriting based on real comps and local market data. No lowballs, no hidden agendas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">Direct Access to Me</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Work directly with me—no middlemen, no gatekeepers. You get personal attention on every deal.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">Zero Obligation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Free evaluation, no strings attached. If it's not a fit, walk away—no pressure, ever.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">Flexible Timeline</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Close in 7 days or 60 days—your choice. I adapt to your schedule and contract terms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4">Simple 3-Step Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              From deal submission to closing—I handle the connections
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-[#00FF84] text-black font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">Submit Your Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tell me what you're looking for—whether you're selling a deal, buying property, or lending capital.
                  Takes under 5 minutes.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-[#00FF84] text-black font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">I Find Your Match</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I underwrite deals, tap into my local network, and connect you with the right buyers, sellers, or
                  funding sources in your market.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-[#00FF84] text-black font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-space-grotesk text-xl font-bold mb-2">You Close the Deal</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I handle the coordination and paperwork. You focus on closing—on your timeline, with terms that work
                  for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-4">New to Real Estate Investing?</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Whether you've closed 100 deals or you're just starting out—I work with investors at every experience
              level.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Need help underwriting your first deal? Looking for guidance on creative financing? I'm here to help.
            </p>
            <Link href="/resources">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Download Free Resources
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#00FF84]/5 to-transparent">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-[#00FF84]/20 bg-card/50 backdrop-blur">
            <CardContent className="p-12 text-center">
              <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-4">Got a Deal? Let's Connect.</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
                Free evaluation, zero commitment, 24hr response.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/submit-deal">
                  <Button size="lg" className="bg-[#00FF84] text-black hover:bg-[#00FF84]/90 text-lg px-8">
                    Submit Your Deal Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/book-appointment">
                  <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                    Schedule a Call
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
