import { Suspense } from "react";
import { Await } from "react-router-dom";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

function AsyncContent({ resolve, children }) {
  return (
    <Suspense fallback={<LoadingState />}>
      <Await resolve={resolve} errorElement={<ErrorState />}>
        {children}
      </Await>
    </Suspense>
  );
}

export default AsyncContent;
