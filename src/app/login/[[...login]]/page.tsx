import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0F0F11] flex flex-col items-center justify-center p-4 font-sans text-white">
      <div className="mb-8 flex flex-col items-center">
       <div className="nav-logo">
          <Image src="/mathub.png" alt="MatchHub" className="logo-img" width={40} height={40} />
        </div>
        <h1 className="text-3xl font-bold tracking-wide">MatchHub</h1>
        <p className="text-gray-400 text-sm mt-1">Encuentra tu squad perfecto</p>
      </div>

      <SignIn 
        appearance={{
          elements: {
            baseTheme: dark,
            card: "bg-[#161618] border border-[#2A2A2D] shadow-2xl rounded-2xl",
            headerTitle: "text-white text-xl font-bold",
            headerSubtitle: "text-gray-400 text-sm",
            socialButtonsBlockButton: "bg-[#0F0F11] border border-[#2A2A2D] text-white hover:bg-[#1f1f23]",
            socialButtonsBlockButtonText: "text-white font-medium",
            formButtonPrimary: "bg-[#00C2FF] hover:bg-[#00A3D9] text-black font-bold",
            formFieldLabel: "text-gray-400 text-xs font-medium",
            formFieldInput: "bg-[#0F0F11] border border-[#2A2A2D] text-white rounded-lg focus:ring-[#00C2FF]",
            footerActionText: "text-gray-400",
            footerActionLink: "text-[#00C2FF] hover:text-[#00A3D9]"
          }
        }}
        signUpUrl="/register"
        fallbackRedirectUrl="/perfil"
      />

      <div className="mt-8 text-[10px] text-gray-500 uppercase tracking-widest">
        Seguridad gestionada por Clerk
      </div>
    </div>
  );
}