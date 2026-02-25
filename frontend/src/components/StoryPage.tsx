import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SiYoutube } from 'react-icons/si';
import { StoryContent } from '../data/storyContent';

interface StoryPageProps {
  story: StoryContent;
  totalStories: number;
  onNext?: () => void;
  onPrevious?: () => void;
  showNext: boolean;
  showPrevious: boolean;
}

export function StoryPage({ story, totalStories, onNext, onPrevious, showNext, showPrevious }: StoryPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 px-4 py-12">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
              <span className="text-sm font-mono text-accent tracking-wider">
                CLASSIFIED FILE {story.pageNumber} OF {totalStories}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground">
              {story.title}
            </h1>
            <div className="h-1 w-24 mx-auto bg-accent rounded-full" />
          </div>

          {/* Content */}
          <div className="space-y-8 animate-in fade-in duration-1000 delay-300">
            {story.sections.map((section, index) => (
              <div
                key={index}
                className="bg-card/50 border border-border/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm hover:border-accent/30 transition-all duration-300"
              >
                {section.heading && (
                  <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-4">
                    {section.heading}
                  </h2>
                )}
                <div className="text-base sm:text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* YouTube CTA — only on File 5 */}
          {story.pageNumber === 5 && (
            <div className="flex justify-center animate-in fade-in duration-1000 delay-400">
              <a
                href="https://www.youtube.com/@E.J-Money"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="group gap-3 bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold text-base px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <SiYoutube className="h-6 w-6 shrink-0" />
                  Watch E.J. on YouTube
                </Button>
              </a>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 animate-in fade-in duration-1000 delay-500">
            <div>
              {showPrevious && (
                <Button
                  onClick={onPrevious}
                  variant="outline"
                  size="lg"
                  className="group border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <ChevronLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Previous File
                </Button>
              )}
            </div>
            <div>
              {showNext && (
                <Button
                  onClick={onNext}
                  size="lg"
                  className="group bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow hover:shadow-glow-lg transition-all duration-300"
                >
                  Next File
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} • Built with love using{' '}
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
