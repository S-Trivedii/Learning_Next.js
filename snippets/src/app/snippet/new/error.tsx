"use client";

type ErrorPageProps = {
  error: Error;
};

const ErrorPage = ({ error }: ErrorPageProps) => {
  return <div>{error.message}</div>;
};

export default ErrorPage;

/*
error.tsx, this file is automatically used by Next.js to catch errors thrown in:
  - The current route segment
  - Its child segments

*/
