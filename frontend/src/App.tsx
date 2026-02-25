import { useState, useEffect } from 'react';
import { StoryPage } from './components/StoryPage';
import { storyPages } from './data/storyContent';

const TOTAL_PAGES = storyPages.length;

function App() {
  const [currentPage, setCurrentPage] = useState(0); // 0 = landing, -1 = loading, 1-5 = story pages
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleExplore = () => {
    setCurrentPage(-1);
    setLoadingProgress(0);
  };

  useEffect(() => {
    if (currentPage !== -1) return;

    const duration = 5000;
    const interval = 50;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setLoadingProgress(Math.min((step / steps) * 100, 100));
      if (step >= steps) {
        clearInterval(timer);
        setCurrentPage(1);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < TOTAL_PAGES) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Show story page
  if (currentPage > 0) {
    const story = storyPages[currentPage - 1];
    return (
      <StoryPage
        story={story}
        totalStories={TOTAL_PAGES}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
        showNext={currentPage < TOTAL_PAGES}
        showPrevious={currentPage > 1}
      />
    );
  }

  // Show loading screen
  if (currentPage === -1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-accent/20 animate-pulse"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 2 + 1}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-10 px-4 z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-foreground animate-in fade-in duration-700">
            THE EJ FILES
          </h1>

          <div className="space-y-3">
            <p className="text-accent text-lg sm:text-xl font-semibold tracking-widest uppercase animate-pulse">
              Accessing classified files...
            </p>
            <p className="text-muted-foreground text-sm tracking-wide">
              Decrypting. Please stand by.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-72 sm:w-96 mx-auto space-y-2">
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-75 shadow-glow"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-muted-foreground text-xs tabular-nums text-right">
              {Math.round(loadingProgress)}%
            </p>
          </div>

          {/* Spinning loader icon */}
          <div className="flex justify-center">
            <div className="w-10 h-10 border-2 border-border border-t-accent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl mx-auto text-center space-y-16">
          {/* Title Section */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
              THE EJ FILES
            </h1>
            <div className="h-1 w-32 mx-auto bg-accent rounded-full animate-in fade-in duration-1000 delay-300" />
          </div>

          {/* Explore Button */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 flex flex-col items-center gap-6">
            <button
              onClick={handleExplore}
              className="group relative inline-flex items-center justify-center px-12 py-6 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-background bg-accent rounded-none border-0 shadow-glow hover:shadow-glow-lg hover:scale-105 active:scale-95 transition-all duration-300 uppercase overflow-hidden"
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              <span className="relative z-10">Explore the Extraordinary</span>
            </button>
            <p className="text-muted-foreground text-base sm:text-lg font-light tracking-wide animate-pulse">
              Something extraordinary awaits...
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} • Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'the-ej-files'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors underline underline-offset-4"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
