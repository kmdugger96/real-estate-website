"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, ArrowRight, Loader2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ResourcesPage() {
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const isDownloadEnabled = !!supabaseUrl

  const documents = [
    {
      title: "Wholesale Contract",
      description: "Standard wholesale real estate contract template for assigning purchase agreements to end buyers.",
      fileSize: "245 KB",
      category: "Wholesaling",
      filename: "wholesale-contract.pdf",
    },
    {
      title: "Purchase Contract",
      description:
        "Comprehensive purchase and sale agreement for residential real estate transactions with standard contingencies.",
      fileSize: "312 KB",
      category: "Buying",
      filename: "purchase-contract.pdf",
    },
    {
      title: "Joint Venture Agreement",
      description:
        "Partnership agreement template for co-investing in real estate deals with defined roles and profit splits.",
      fileSize: "198 KB",
      category: "Partnerships",
      filename: "joint-venture-agreement.pdf",
    },
  ]

  const handleDownload = async (filename: string, title: string) => {
    if (!isDownloadEnabled) {
      alert("Downloads are being configured. Please check back soon or contact kyle@sendkyledeals.com")
      return
    }

    try {
      setDownloadingFile(filename)

      const publicUrl = `${supabaseUrl}/storage/v1/object/public/public-contracts/${filename}`

      const response = await fetch(publicUrl)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("File not found. Please contact support.")
        }
        throw new Error("Failed to download file")
      }

      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Download failed:", error)
      alert(
        error instanceof Error
          ? error.message
          : "Unable to download file. Please try again or contact support at kyle@sendkyledeals.com",
      )
    } finally {
      setDownloadingFile(null)
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF84]/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#00FF84]/10 text-[#00FF84] border-[#00FF84]/20 hover:bg-[#00FF84]/20">
              Free Resources
            </Badge>
            <h1 className="font-space-grotesk text-5xl md:text-7xl font-bold mb-6 text-balance">
              Resources & <span className="text-[#00FF84]">Documents</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              Download essential real estate contracts and templates to help you close more deals with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {!isDownloadEnabled && (
              <Card className="border-[#00FF84]/30 bg-[#00FF84]/5 backdrop-blur mb-6">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    Downloads are currently being configured. Please check back soon or contact{" "}
                    <a href="mailto:kyle@sendkyledeals.com" className="text-[#00FF84] hover:underline">
                      kyle@sendkyledeals.com
                    </a>{" "}
                    for immediate access.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6">
              {documents.map((doc, index) => (
                <Card
                  key={index}
                  className="border-border/50 bg-card/50 backdrop-blur hover:border-[#00FF84]/30 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-[#00FF84]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-space-grotesk text-xl font-bold mb-1">{doc.title}</h3>
                            <Badge variant="outline" className="text-xs mb-2">
                              {doc.category}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">{doc.fileSize}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">{doc.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent hover:bg-[#00FF84]/10 hover:text-[#00FF84] hover:border-[#00FF84]/30"
                          onClick={() => handleDownload(doc.filename, doc.title)}
                          disabled={!isDownloadEnabled || downloadingFile === doc.filename}
                        >
                          {downloadingFile === doc.filename ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-8 md:p-12">
                <h2 className="font-space-grotesk text-2xl md:text-3xl font-bold mb-4 text-center">
                  Need Help Using These Documents?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                  These templates are provided as a starting point. Always consult with a qualified real estate attorney
                  in your state before using any legal documents in your transactions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/submit-deal">
                    <Button size="lg" className="bg-[#00FF84] text-black hover:bg-[#00FF84]/90 text-lg px-8">
                      Submit a Deal
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
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-4">More Resources Coming Soon</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              I'm constantly adding new templates, guides, and educational content to help you succeed in real estate
              investing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-lg font-bold mb-2">Deal Analysis Templates</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Spreadsheets and calculators for evaluating rental properties, flips, and wholesale deals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-lg font-bold mb-2">Marketing Materials</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Buyer lists, seller scripts, and marketing templates to help you find and close more deals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-[#00FF84]" />
                </div>
                <h3 className="font-space-grotesk text-lg font-bold mb-2">Educational Guides</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Step-by-step guides on wholesaling, creative financing, and building your investor network.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
