import './globals.css'
import ReactQueryProvider from '@/utils/ReactQueryProvider'
import { Suspense } from "react";
import RecoilRootProvider from '@/utils/RecoilRootProvider'
import LoadingSpinner from '@/component/common/LoadingSpinner';
import CommonLayout from '@/component/common/CommonLayout';

export default function RootLayout({ children }) {

  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>
          <RecoilRootProvider>
            <CommonLayout>
              <Suspense fallback={<LoadingSpinner />}>
                {children}
              </Suspense>
            </CommonLayout>
          </RecoilRootProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
