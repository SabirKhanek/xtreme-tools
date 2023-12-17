export interface ToolBodyProps {
  className?: string;
  ToolDescription?: React.FC<any>;
  children: React.ReactNode;
  heading: string;
  subheading: string;
}
export function ToolBody({
  className,
  ToolDescription,
  children,
  heading,
  subheading,
}: ToolBodyProps) {
  return (
    <div className={`${className}`}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">{heading}</h1>
        <p className="text-sm text-black/70 my-2">{subheading}</p>
      </div>
      <div className={`w-full border border-black rounded-xl p-6 ${className}`}>
        {children}
      </div>
      <div className="w-full border border-black rounded-xl p-6 my-5">
        {ToolDescription && <ToolDescription />}
        <span className="text-black/70 font-semibold text-lg">
          <span className="text-primary">Contact Us </span>
          <span>
            for suggestions, complaints, or just feedback without hesitation.
          </span>
        </span>
      </div>
    </div>
  );
}
