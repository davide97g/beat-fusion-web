import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import ErrorBoundary from "@/components/ErrorBoundary";

const IndexPage = lazy(() => import("@/pages/index"));
const DocsPage = lazy(() => import("@/pages/docs"));
const PricingPage = lazy(() => import("@/pages/pricing"));
const BlogPage = lazy(() => import("@/pages/blog"));
const AboutPage = lazy(() => import("@/pages/about"));

function App() {
  return (
    <Routes>
      <Route
        element={
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <IndexPage />
            </Suspense>
          </ErrorBoundary>
        }
        path="/"
      />
      <Route
        element={
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <DocsPage />
            </Suspense>
          </ErrorBoundary>
        }
        path="/docs"
      />
      <Route
        element={
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <PricingPage />
            </Suspense>
          </ErrorBoundary>
        }
        path="/pricing"
      />
      <Route
        element={
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <BlogPage />
            </Suspense>
          </ErrorBoundary>
        }
        path="/blog"
      />
      <Route
        element={
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <AboutPage />
            </Suspense>
          </ErrorBoundary>
        }
        path="/about"
      />
    </Routes>
  );
}

export default App;
