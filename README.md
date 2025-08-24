# alx-graphql-0x02
Application of GraphQL in React



3. Application of GraphQL in React
mandatory
Score: 0.0% (Checks completed: 0.0%)
Objectives: To kickstart the development of your rick and morty application using Next.js, you will set up a new project with TypeScript, ESLint, and Tailwind CSS.

Instructions:

Create a project alx-rick-and-morty-app in alx-graphql-0x01 directory
Change directory into alx-rick-and-morty-app
Install the following dependencies:

npm install @apollo/client graphql
npm install @types/graphql
Create an empty directory named: ‘graphql’ in your root directory
Create an empty file apolloClient.ts under graphql directory
Replace the content of the file with the follow:

import { ApolloClient, InMemoryCache, HttpLink} from "@apollo/client"

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql"
  }),
  cache: new InMemoryCache()
})

export default client;
Create an empty file queries.ts under graphql directory
Replace the content of the file with the follow:
import { gql } from "@apollo/client";

export const GET_EPISODES = gql
  query getEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        pages
        next
        prev
        count
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
;
Open your _app.tsx file located under pages directory

Replace the content with the follow:

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
Save and close your files
Run npm run dev from the terminal
From a tab in your browser type http://localhost:3000 to see the changes made.
Repo:

GitHub repository: alx-graphql-0x01
Directory: alx-rick-and-morty-app
File: README.md, graphql/apolloClient.ts, graphql/queries.ts, pages/_app.tsx
ChatGPT said:

Perfect! Let’s carefully set up Task 3: Application of GraphQL in React step by step. This task is about initializing a Next.js project with TypeScript, Tailwind CSS, and Apollo Client.

📌 Task 3: Application of GraphQL in React
🎯 Objective

Set up a Next.js + TypeScript project.

Configure Apollo Client to fetch data from the Rick & Morty GraphQL API.

Prepare queries in a modular way.

✅ 1. Project Setup
# Create the project directory
mkdir alx-graphql-0x01
cd alx-graphql-0x01

# Scaffold Next.js project with TypeScript
npx create-next-app@latest alx-rick-and-morty-app --typescript
cd alx-rick-and-morty-app

# Install Apollo Client and GraphQL dependencies
npm install @apollo/client graphql
npm install @types/graphql

# Install Tailwind CSS (if not yet)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

✅ 2. Create GraphQL Folder & Files
mkdir graphql
cd graphql
ni apolloClient.ts 
ni queries.ts
cd ..

✅ 3. Configure Apollo Client

graphql/apolloClient.ts

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;

✅ 4. Create Queries

graphql/queries.ts

import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query getEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        pages
        next
        prev
        count
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

✅ 5. Configure _app.tsx

Replace content of pages/_app.tsx:

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

✅ 6. Run the Project
npm run dev


Open browser: http://localhost:3000

You should see the default Next.js landing page (Apollo Client is set up and ready for queries).

✅ 7. Repo Structure for Task 3
alx-graphql-0x01/
└── alx-rick-and-morty-app/
    ├── README.md
    ├── graphql/
    │   ├── apolloClient.ts
    │   └── queries.ts
    └── pages/
        └── _app.tsx

🚀 Git Commands to Save Task 3
# Go to repo root
cd alx-graphql-0x01/alx-rick-and-morty-app

# Stage files
git add graphql/apolloClient.ts graphql/queries.ts pages/_app.tsx

# Add README.md if you want
touch README.md
git add README.md

# Commit
git commit -m "Task 3: Setup Next.js project with TypeScript, Tailwind CSS, and Apollo Client"

# Push
git push


✅ Task 3 is now fully ready:

Next.js + TypeScript project

Apollo Client configured

GraphQL queries modularized

Tailwind CSS installed

If you want, I can create a starter page that fetches and displays episodes using GET_EPISODES query next — this will make the app functional for your project.

Do you want me to do that?



















TASK 4
-------------------------------------------------------------------------------------------------
4. Query the graphql endpoint
mandatory
Score: 0.0% (Checks completed: 0.0%)
Objectives: Learn to query the Rick and Morty GraphQL endpoint to retrieve data about episodes.

Instructions:

Duplicate alx-graphql-0x01 to alx-graphql-0x02
Change directory to alx-rick-and-morty-app
Create an empty directory named: interfaces under the root directory
Create an empty file name: index.ts under the interfaces directory
Replace the content with the follow:
interface InfoProps {
    pages: number
    next: number
    prev: number
    count: number
}

export interface EpisodeProps {
  id: number
  name: string
  air_date: string
  episode: string
  info: InfoProps
}

export type EpisodeCardProps = Pick<EpisodeProps, 'id' | 'name'| 'air_date' | "episode">
Open your index.tsx file located under pages directory
Replace the content with the follow:
import { useQuery } from "@apollo/client"
import { GET_EPISODES } from "@/graphql/queries"
import { EpisodeProps } from "@/interfaces"
import EpisodeCard from "@/components/common/EpisodeCard"
import { useEffect, useState } from "react"



const Home: React.FC = () => {

  const [page, setPage] = useState<number>(1)
  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: {
      page: page
    }
  })

  useEffect(() => {
    refetch()
  }, [page, refetch])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>

  const results = data?.episodes.results
  const info = data?.episodes.info

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      {/* Header */}
      <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">Rick and Morty Episodes</h1>
        <p className="mt-2 text-lg italic">Explore the multiverse of adventures!</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results && results.map(({ id, name, air_date, episode }: EpisodeProps, key: number) => (
            <EpisodeCard
              id={id}
              name={name}
              air_date={air_date}
              episode={episode}
              key={key}
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-6">
          <button 
            onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
            Previous
          </button>
          <button 
            onClick={() => setPage(prev => prev < info.pages ? prev + 1 : prev)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
            Next
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
        <p>&copy; 2024 Rick and Morty Fan Page</p>
      </footer>
    </div>
  )
}

export default Home
Create the following file components/common/EpisodeCard.tsx

Replace the content of the file with the follow:

import { EpisodeCardProps } from "@/interfaces";

const EpisodeCard = ({ id, name, air_date, episode }: EpisodeCardProps) => {
  return (
    <div key={id} className="bg-white cursor-pointer shadow-md rounded-lg p-4 m-4 transition-transform duration-200 hover:scale-105">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <span className="border px-2 text-xs rounded-full bg-blue-600 text-white flex items-center">{episode}</span>
      </div>
      <p className="text-gray-600">{air_date}</p>
    </div>
  );
};

export default EpisodeCard;
Save and close your files
Run npm run dev from the terminal
From a tab in your browser type http://localhost:3000 to see the changes made.
Repo:

GitHub repository: alx-graphql-0x02
Directory: alx-rick-and-morty-app
File: README.md, components/common/EpisodeCard.tsx,interfaces/index.ts, pages/index.tsx
ChatGPT said:

Perfect 🚀 You’re now at Task 4: Query the GraphQL endpoint — this is where your Rick and Morty app starts pulling in real episode data. Let’s carefully follow your instructions so everything is correct.

📌 Task 4: Query the GraphQL Endpoint
🎯 Objective

Duplicate your existing setup into a new repo directory (alx-graphql-0x02).

Add TypeScript interfaces for GraphQL results.

Create an EpisodeCard component.

Display episode data with pagination in index.tsx.

✅ 1. Duplicate Repo
# Go to parent directory
cd ..

# Duplicate the repo
cp -r alx-graphql-0x01 alx-graphql-0x02

# Enter new project
cd alx-graphql-0x02/alx-rick-and-morty-app

✅ 2. Create Interfaces
mkdir interfaces
cd interfaces
ni index.ts


interfaces/index.ts

interface InfoProps {
  pages: number
  next: number
  prev: number
  count: number
}

export interface EpisodeProps {
  id: number
  name: string
  air_date: string
  episode: string
  info: InfoProps
}

export type EpisodeCardProps = Pick<EpisodeProps, 'id' | 'name' | 'air_date' | 'episode'>

✅ 3. Update Home Page

Replace content of pages/index.tsx:

import { useQuery } from "@apollo/client"
import { GET_EPISODES } from "@/graphql/queries"
import { EpisodeProps } from "@/interfaces"
import EpisodeCard from "@/components/common/EpisodeCard"
import { useEffect, useState } from "react"

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: { page }
  })

  useEffect(() => {
    refetch()
  }, [page, refetch])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>

  const results = data?.episodes.results
  const info = data?.episodes.info

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      {/* Header */}
      <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">Rick and Morty Episodes</h1>
        <p className="mt-2 text-lg italic">Explore the multiverse of adventures!</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results && results.map(({ id, name, air_date, episode }: EpisodeProps, key: number) => (
            <EpisodeCard
              id={id}
              name={name}
              air_date={air_date}
              episode={episode}
              key={key}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-6">
          <button 
            onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
            Previous
          </button>
          <button 
            onClick={() => setPage(prev => prev < info.pages ? prev + 1 : prev)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
            Next
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
        <p>&copy; 2024 Rick and Morty Fan Page</p>
      </footer>
    </div>
  )
}

export default Home

✅ 4. Create EpisodeCard Component
mkdir -p components/common
cd components/common
ni EpisodeCard.tsx


components/common/EpisodeCard.tsx

import { EpisodeCardProps } from "@/interfaces";

const EpisodeCard = ({ id, name, air_date, episode }: EpisodeCardProps) => {
  return (
    <div key={id} className="bg-white cursor-pointer shadow-md rounded-lg p-4 m-4 transition-transform duration-200 hover:scale-105">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <span className="border px-2 text-xs rounded-full bg-blue-600 text-white flex items-center">
          {episode}
        </span>
      </div>
      <p className="text-gray-600">{air_date}</p>
    </div>
  );
};

export default EpisodeCard;

✅ 5. Run App
npm run dev


Open 👉 http://localhost:3000

You’ll see:

A styled Rick and Morty Episodes page

Episodes displayed as cards

Working Next/Previous pagination buttons

✅ 6. Repo Structure
alx-graphql-0x02/
└── alx-rick-and-morty-app/
    ├── README.md
    ├── graphql/
    │   ├── apolloClient.ts
    │   └── queries.ts
    ├── interfaces/
    │   └── index.ts
    ├── components/
    │   └── common/
    │       └── EpisodeCard.tsx
    └── pages/
        ├── _app.tsx
        └── index.tsx


Would you like me to also add a sample README.md with instructions (setup, run, and usage) so your repo is fully ready for submission?




































# alx-graphql-0x03
ReactGuard: Mastering Error Handling

Tasks 0. Create the ErrorBoundary Component
--------------------------------------------------------------------------------------------

mandatory
Objective: Implement an ErrorBoundary class component in TypeScript that can catch and handle JavaScript errors in your application.

Instructions:

Duplicate alx-graphql-0x02 to alx-graphql-0x03
Change directory to alx-rick-and-morty-app
Create a new file named ErrorBoundary.tsx in the components directory.
Implement the ErrorBoundary class by extending React.Component. Use the following structure:
interface State {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}


class ErrorBoundary extends React.Component<ErrorBoundaryProps , State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

Save and close your files
Run npm run dev from the terminal
From a tab in your browser type http://localhost:3000 to see the changes made.
Repo:

GitHub repository: alx-graphql-0x03
Directory: alx-rick-and-morty-app
File: README.md, components/ErrorBoundary.tsx,
ChatGPT said:

Perfect, Sylvester 👍

Here’s a step-by-step guide to completing Task 0: Create the ErrorBoundary Component:

✅ Step 1: Duplicate Repository

In your terminal:

cp -r alx-graphql-0x02 alx-graphql-0x03
cd alx-graphql-0x03/alx-rick-and-morty-app

✅ Step 2: Create the ErrorBoundary Component

Inside your components/ directory, create a file named ErrorBoundary.tsx.

📄 components/ErrorBoundary.tsx

import React, { ReactNode } from "react";

interface State {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>⚠️ Oops, there is an error!</h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              background: "#0070f3",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            🔄 Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

✅ Step 3: Wrap Your App with ErrorBoundary

Open pages/_app.tsx and wrap your app like this:

📄 pages/_app.tsx

import type { AppProps } from "next/app";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

✅ Step 4: Run the Project

In your terminal:

npm run dev


Then visit http://localhost:3000
 🎉

If any runtime error happens, you should see “Oops, there is an error!” with a Try Again button.

📌 Files you added/modified:

components/ErrorBoundary.tsx ✅

pages/_app.tsx ✅

README.md (document what you did) ✅