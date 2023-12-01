export interface OutlineGeneratorProps {
  className?: string;
}
export function OutlineGenerator({ className }: OutlineGeneratorProps) {
  return (
    <div className={`${className}`}>
      <div className={`${className}`}>
        <div>
          <h1 className="text-primary text-4xl font-semibold">
            Outline Generator
          </h1>
          <p className="text-sm text-black/70 my-2">
            Online Tool for generating outline for a given topic
          </p>
        </div>
        <div className="w-full border border-black rounded-xl justify-between min-h-[69.5vh] p-6 flex flex-col"></div>
      </div>
    </div>
  );
}
