import './globals.css'
import ReactQueryProvider from '@/utils/ReactQueryProvider'
import { Suspense } from "react";
import RecoilRootProvider from '@/utils/RecoilRootProvider'
import StyledComponentsRegistry from '@/utils/StyleRegistry';
import LoadingSpinner from '@/component/common/LoadingSpinner';
import CommonLayout from '@/component/common/CommonLayout';
import NavigationEvents from '@/utils/NavigationEvent';

export default function RootLayout({ children }) {

  return (
    <html lang="ko">
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
      </head>
      <body>
        <ReactQueryProvider>
          <RecoilRootProvider>
            <StyledComponentsRegistry>
                  <CommonLayout>
                    <Suspense fallback={<LoadingSpinner />}>
                      {children}
                    </Suspense>
                  </CommonLayout>
            </StyledComponentsRegistry>
          </RecoilRootProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
