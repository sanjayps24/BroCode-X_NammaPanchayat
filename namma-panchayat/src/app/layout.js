import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "Namma Panchayat | ನಮ್ಮ ಪಂಚಾಯತ್",
  description: "High-accessibility PWA bridging the digital divide in rural Karnataka",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kn">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
