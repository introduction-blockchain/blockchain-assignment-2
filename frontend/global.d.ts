export {};

declare global {
  interface Window {
    ethereum?: {
	  on(arg0: string, arg1: () => void): unknown;
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}
