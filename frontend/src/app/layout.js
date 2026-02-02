import "@/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen px-6 py-8">
        {children}
      </body>
    </html>
  );
}