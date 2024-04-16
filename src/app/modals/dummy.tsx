import { Button } from "../components/button";
import { useModal } from "../shared/contexts/modals";

export interface DummyModalProps {
  className?: string;
}
export function DummyModal({ className }: DummyModalProps) {
  const modals = useModal();

  return (
    <div className={`${className}`}>
      <Button onClick={() => modals.handleCloseModal("Hi from modal")}>
        Close me
      </Button>
    </div>
  );
}
