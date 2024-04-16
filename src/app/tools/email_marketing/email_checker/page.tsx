import { EmailChecker } from "../components/email_checker"

const toolId = "email_checker"
const requireLogin = true
export default function EmailCheckerPage() {
  return <EmailChecker toolId={toolId} requireLogin singleMode></EmailChecker>
} 