import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import {  sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

import { router } from "./router";

export const config = createConfig({
  chains: [ sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
  },
});

function App() {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
