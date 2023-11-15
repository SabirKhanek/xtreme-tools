export interface SecurePasswordGeneratorProps {
  className?: string;
}
export function SecurePasswordGenerator({
  className,
}: SecurePasswordGeneratorProps) {
  return (
    <div className={`${className}`}>
      <h1>SecurePasswordGenerator works!</h1>
    </div>
  );
}
