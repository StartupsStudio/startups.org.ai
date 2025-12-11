import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Startups.org.ai</h1>
      <p className="text-lg text-fd-muted-foreground mb-8 max-w-2xl">
        AI-powered platform for building and validating startups.
        Comprehensive tools and frameworks for founders, builders, and investors.
      </p>
      <div className="flex gap-4">
        <Link
          href="/docs"
          className="px-6 py-3 bg-fd-primary text-fd-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Documentation
        </Link>
        <Link
          href="/docs/packages"
          className="px-6 py-3 border border-fd-border rounded-lg font-medium hover:bg-fd-accent transition-colors"
        >
          Explore Packages
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">
        <div className="p-6 border border-fd-border rounded-lg text-left">
          <h2 className="text-xl font-semibold mb-2">Ideate</h2>
          <p className="text-fd-muted-foreground">Generate and refine startup ideas with AI assistance</p>
        </div>
        <div className="p-6 border border-fd-border rounded-lg text-left">
          <h2 className="text-xl font-semibold mb-2">Validate</h2>
          <p className="text-fd-muted-foreground">Test hypotheses and validate market fit</p>
        </div>
        <div className="p-6 border border-fd-border rounded-lg text-left">
          <h2 className="text-xl font-semibold mb-2">Build</h2>
          <p className="text-fd-muted-foreground">Execute with AI-powered workflows</p>
        </div>
      </div>
    </main>
  )
}
