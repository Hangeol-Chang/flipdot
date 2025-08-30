import Footer from '../../components/layout/footer'
import Header from '../../components/layout/header'  
import RecoilRootWrapper from '../../wrappers/RecoilRootWrapper'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flip Dot',
  description: 'Flip Dot Display Generator',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={``}
        style={{
          backgroundColor : 'black',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          margin: 0
        }}
      >
          <Header />
          <div className={``} style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <RecoilRootWrapper>
                {children}
            </RecoilRootWrapper>
          </div>
          <Footer />
      </body>
    </html>
  )
}
