export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-14 items-center px-4 md:px-6">
          <h1 className="font-serif text-xl font-semibold text-navy-dark">
            Fast Passport <span className="text-gold">CRM</span>
          </h1>
        </div>
      </header>
      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}
