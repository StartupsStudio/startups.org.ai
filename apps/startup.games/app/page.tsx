export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Startup.Games</h1>
        <p className="text-xl text-center">
          Gamification platform for founders, builders, and investors
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Competitions</h2>
            <p>Create and participate in startup competitions</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Leaderboards</h2>
            <p>Track rankings and progress</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Achievements</h2>
            <p>Earn badges and recognition</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Quests</h2>
            <p>Complete guided startup journeys</p>
          </div>
        </div>
      </div>
    </main>
  )
}
