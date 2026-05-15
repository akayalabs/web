export default function NotFound() {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-cream text-sumi antialiased">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center px-6">
          <span className="overline">404</span>
          <h1 className="mt-4 font-display text-4xl">Sayfa bulunamadı / Page not found</h1>
          <a href="/tr" className="mt-8 underline decoration-brass underline-offset-4 hover:decoration-brass-deep">akayalabs.com</a>
        </main>
      </body>
    </html>
  );
}
