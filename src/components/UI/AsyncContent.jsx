import { Suspense } from "react";
import { Await } from "react-router-dom";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

function AsyncContent({ resolve, children }) {
  return (
    <Suspense fallback={<LoadingState />}>
      <Await
        resolve={resolve}
        errorElement={
          <ErrorState message="Loading interupted, please try again later" />
        }
      >
        {children}
      </Await>
    </Suspense>
  );
}

export default AsyncContent;
