# Local AI Chatbot

Ollama and Next.js togheter running deepseek-r1:14b 9GB model locally.

## Getting Started

First, download Ollama and run it:
[https://ollama.com/download](https://ollama.com/download)

Check [http://localhost:11434](http://localhost:11434) to see if Ollama server is running.

Run on terminal once:

```bash
ollama run deepseek-r1:14b
```

Next, run the development server:

```bash
git clone https://github.com/RatimbumCode/local-ai-chatbot.git

cd local-ai-chatbot

pnpm install

pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the chat.

## Learn More

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
