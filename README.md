# Local AI Chatbot

Ollama and Next.js together running deepseek-r1:14b 9GB model locally, and other LLMs of your choice.

![App Homepage](https://raw.githubusercontent.com/RatimbumCode/local-ai-chatbot/refs/heads/main/public/github-sample.png)

## Getting Started

First, download Ollama and run it:
[https://ollama.com/download](https://ollama.com/download)

Check [http://localhost:11434](http://localhost:11434) to see if Ollama server is running.

Run on terminal once:

```bash
ollama run deepseek-r1:14b
```

If you want, you can run other LLMs and add it to app/data/models.json.

Clone the repository:

```bash
git clone https://github.com/RatimbumCode/local-ai-chatbot.git

cd local-ai-chatbot
```

Make a copy of .env.local.example and rename it to .env.local

```bash
node -e "require('fs').copyFileSync('.env.local.example', '.env.local')"
```

Run the development server:

```bash
pnpm install

pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the chat.

## Learn More

To learn more about, take a look at the following resources:

- [Ollama](https://github.com/ollama/ollama)
- [Ollama-js](https://github.com/ollama/ollama-js)
- [Deepseek](https://www.deepseek.com/)
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
