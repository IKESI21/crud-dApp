# 🚀 Solana CRUD App

A full-stack decentralized application built with Solana, Anchor, and TypeScript that demonstrates basic CRUD operations on the blockchain.

## ✨ Features

- 🔗 Solana blockchain integration
- ⚓ Anchor framework for smart contract development
- ⚛️ Modern TypeScript frontend
- 🎯 Simple and intuitive CRUD operations
- 🔒 Secure wallet integration

## 🛠️ Prerequisites

- Node.js v18.18.0+
- Rust v1.77.2+
- Anchor CLI v0.30.1+
- Solana CLI v1.18.17+

## 🚀 Quick Start

1. **Clone and Install**
```bash
git clone <repo-url>
cd <repo-name>
pnpm install
```

2. **Start Development**
```bash
pnpm dev
```

## 📦 Project Structure

### 🦀 Anchor Program (`/anchor`)
The Solana smart contract written in Rust using the Anchor framework.

#### Key Commands
```bash
# Generate new program ID
pnpm anchor keys sync

# Build the program
pnpm anchor-build

# Start local validator
pnpm anchor-localnet

# Run tests
pnpm anchor-test

# Deploy to devnet
pnpm anchor deploy --provider.cluster devnet
```

> 📝 After running `anchor keys sync`, remember to update the program ID in `anchor/lib/counter-exports.ts`

### 🌐 Web App (`/web`)
React-based frontend application for interacting with the Solana program.

#### Key Commands
```bash
# Start development server
pnpm dev

# Build for production
pnpm build
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Solana Foundation
- Anchor Framework
- React Community