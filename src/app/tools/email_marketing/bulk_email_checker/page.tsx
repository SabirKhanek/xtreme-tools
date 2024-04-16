import { EmailChecker } from "../components/email_checker";

const toolId = "bulk_email_checker";
const requireLogin = true;
export default function EmailCheckerPage() {
  return (
    <EmailChecker toolId={toolId} requireLogin maxEmails={10}></EmailChecker>
  );
}
