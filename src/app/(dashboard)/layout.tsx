import Navbar from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> 
      <main className="flex-1">
        {children}
      </main>
      {/* Aquí podrías poner un Footer si lo necesitaras después */}
    </div>
  );
}