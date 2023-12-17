export interface EmailCheckerProps {
  className?: string;
  singleMode?: boolean;
}
export function EmailChecker({ className }: EmailCheckerProps) {
  return (
    <div className={`${className}`}>
      <h1>EmailChecker works!</h1>
    </div>
  );
}
