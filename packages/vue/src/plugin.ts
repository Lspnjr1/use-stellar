import type { App, InjectionKey, Plugin } from 'vue';
import type { WalletAdapter } from '@stellar-wallet-kit/core';
import { WALLET_KEY } from './useWallet';

export interface WalletPluginOptions {
  adapters: WalletAdapter[];
  /**
   * When true, the plugin will attempt to restore a previous wallet session
   * on mount. Silent-capable adapters reconnect automatically; prompting
   * adapters only restore intent and populate `restoredWallet`.
   */
  autoConnect?: boolean;
  /**
   * When true, the public address of the connected wallet is persisted
   * alongside the wallet type. Never persists secret material.
   */
  persistAddress?: boolean;
}

export const WALLET_PORT_KEY: InjectionKey<WalletPluginOptions> = Symbol('stellar-wallet-options');

export const WalletPlugin: Plugin = {
  install(app: App, options: WalletPluginOptions) {
    app.provide(WALLET_PORT_KEY, options);
    app.provide(WALLET_KEY, options.adapters);
  },
};

export default WalletPlugin;
