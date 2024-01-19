/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingScreen from "@/containers/LoadingScreen";
import { lazy, Suspense, ComponentType } from "react";

type LazyComponentType = ComponentType<any>;

const withLazyLoading = (
  importComponent: () => Promise<{ default: LazyComponentType }>
) => {
  const LazyComponent = lazy(importComponent);

  return (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default withLazyLoading;
