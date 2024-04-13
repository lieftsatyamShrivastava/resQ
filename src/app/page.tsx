
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import AuthImage from "@/images/auth.png";
export default function HomePage() {
  return (
    
  
    <div>
    <LoginLink>Sign in</LoginLink>
    <RegisterLink>Sign up</RegisterLink>
    </div>
    
  );
}
