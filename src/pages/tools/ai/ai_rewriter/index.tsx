export interface AIRewriterProps {
  className?: string;
}
export function AIRewriter({ className }: AIRewriterProps) {
  return (
    <div className={`${className}`}>
      <div className={`${className}`}>
        <div>
          <h1 className="text-primary text-4xl font-semibold">AI Rewriter</h1>
          <p className="text-sm text-black/70 my-2">
            Online Tool for rewriting and paraphrasing using AI
          </p>
        </div>
        <div className="w-full border border-black rounded-xl justify-between min-h-[69.5vh] p-6 flex flex-col"></div>
      </div>
    </div>
  );
}
