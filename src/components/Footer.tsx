"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2 text-sm">
            <span>Por</span>
            <a
              href="https://github.com/MarquinDj"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 underline"
            >
              Marcus Santos
            </a>
          </div>

          <div className="text-xs text-gray-400">
            Sistema de Avaliação da Taxa de Aceleração de Envelhecimento
            Fotovoltaico
          </div>

          <div className="text-xs text-gray-500">
            {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
