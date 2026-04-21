import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { dark } from "@clerk/themes";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0F0F11] flex flex-col items-center justify-center p-4 font-sans text-white">

      <div className="mb-8 flex flex-col items-center">
       <div className="nav-logo">
          <Image src="/mathub.png" alt="MatchHub" className="logo-img" width={40} height={40} />
        </div>
        <h1 className="text-3xl font-bold tracking-wide">MatchHub</h1>
        <p className="text-gray-400 text-sm mt-1">Encuentra tu squad perfecto</p>
      </div>

      <SignUp 
        appearance={{
          elements: {
            baseTheme: dark,
            card: "bg-[#161618] border border-[#2A2A2D] shadow-2xl rounded-2xl",
            headerTitle: "text-white text-xl font-bold",
            headerSubtitle: "text-gray-400 text-sm",
            socialButtonsBlockButton: "bg-[#0F0F11] border border-[#2A2A2D] text-white hover:bg-[#1f1f23]",
            formButtonPrimary: "bg-[#00C2FF] hover:bg-[#00A3D9] text-black font-bold",
            formFieldLabel: "text-gray-400 text-xs font-medium",
            formFieldInput: "bg-[#0F0F11] border border-[#2A2A2D] text-white rounded-lg",
            footerActionText: "text-gray-400",
            footerActionLink: "text-[#00C2FF] hover:text-[#00A3D9]"
          }
        }}
        signInUrl="/login"
      />
    </div>
  );
}