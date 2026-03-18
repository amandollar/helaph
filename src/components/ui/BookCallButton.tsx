import Button from "./Button";
import { CONTACT } from "../../constants";

interface BookCallButtonProps {
  children?: string;
  className?: string;
}

export default function BookCallButton({ 
  children = "Start your project",
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
