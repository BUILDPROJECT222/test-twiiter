// src/utils/walletUtils.ts

import { Keypair, PublicKey, Transaction } from "@solana/web3.js";

import { Wallet } from "@project-serum/anchor";

export class NodeWallet implements Wallet {
  publicKey: PublicKey;
  payer: Keypair;

  constructor(private keypair: Keypair) {
    this.publicKey = keypair.publicKey;
    this.payer = keypair;
  }

  static generate(): NodeWallet {
    const keypair = Keypair.generate();
    return new NodeWallet(keypair);
  }

  async signTransaction(tx: Transaction): Promise<Transaction> {
    tx.sign(this.keypair);
    return tx;
  }

  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    return Promise.all(txs.map((tx) => this.signTransaction(tx)));
  }
}
