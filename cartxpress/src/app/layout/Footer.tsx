export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} CartXpress. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
