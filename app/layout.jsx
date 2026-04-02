import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Sentimetrics — Smart Mobile Recommendation Platform',
  description:
    'Skip the endless scrolling. Instantly discover the perfect smartphone tailored to your exact needs, and compare your top choices side-by-side with precision data.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
