// import "@/styles/globals.css";
// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }





// alx-graphql-0x03

// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import { ApolloProvider } from "@apollo/client";
// import client from "@/graphql/apolloClient";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <ApolloProvider client={client}>
//       <Component {...pageProps} />
//     </ApolloProvider>
//   );
// }




// // alx-graphql-0x03

// import type { AppProps } from "next/app";
// import ErrorBoundary from "@/components/ErrorBoundary";
// import "@/styles/globals.css";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <ErrorBoundary>
//       <Component {...pageProps} />
//     </ErrorBoundary>
//   );
// }





// commbined alx-graphql-0x02 and alx-graphql-0x03

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apolloClient";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ApolloProvider>
  );
}



