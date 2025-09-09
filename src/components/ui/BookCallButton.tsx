import Button from "./Button";
import { CONTACT } from "../../constants";

interface BookCallButtonProps {
  children?: string;
  className?: string;
}

export default function BookCallButton({ 
  children = "Book a Call",
  className = ""
}: BookCallButtonProps) {
  return (
    <Button
      href={CONTACT.whatsapp}
      variant="gradient"
      size="lg"
      className={className}
    >
      {children}
    </Button>
  );
}
