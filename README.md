# 🧠 Manual Quiz - Interactive Health Assessment

## 📝 Project Description
This project is an interactive quiz application for Manual, designed to assess users' health
conditions and provide personalized recommendations. The quiz focuses on issues like hair loss
and erectile dysfunction, offering a holistic approach to men's wellness. Built with Next.js
and TypeScript, this application provides a smooth, responsive user experience with server-side
rendering capabilities.
___

## 🏛 Architecture
The project directory structure is as follows:
```
.
└── manual-landing
    ├── node_modules/**
    ├── public
    │    ├── assets/**
    │    ├── fonts/**
    │    ├── favicon.ico
    │    ├── next.svg
    │    └── vercel.svg
    ├── README.md
    ├── src
    │    ├── components
    │    │    ├── Banner/**
    │    │    ├── Content/**
    │    │    ├── Footer/**
    │    │    └── Quiz/**
    │    ├── contexts
    │    │    ├── quiz.context.test.tsx
    │    │    └── quiz.context.tsx
    │    ├── mocked-data-source
    │    │    └── quiz.json
    │    ├── pages
    │    │    ├── _app.tsx
    │    │    └── index.tsx
    │    ├── styles
    │    │    └── globals.css
    │    └── types
    │         └── quiz.ts
    ├── .env
    ├── .eslintrc.json
    ├── .gitignore
    ├── global.d.ts
    ├── jest.config.js
    ├── jest.setup.js
    ├── next.config.mjs
    ├── next-env.d.ts
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.js
    ├── postcss.config.mjs
    ├── README.md
    ├── tailwind.config.ts
    └── tsconfig.json

obs.: (/** is to avoid unnecessary details)
```
---
## 🛠 Technologies Used
- NextJS
- TypeScript
- React
- Tailwind CSS
- Jest
- React testing library
___
## 🗂 Main Files and Their Functions
- **Banner:** The landing page component that introduces users to the quiz and prompts them to start.
- **Quiz:** The core component that renders questions, handles user responses, and manages the quiz flow. 
- **Content:** Displays information about the health issues addressed by Manual. 
- **Footer:** Contains navigation links and company information. 
- **QuizContext:** Manages the global state for the quiz, including user answers and quiz progression.
___
## ⏰ Development Time
- 4h (divided in 2 batches of 2h, since I have been busy lately)

And by the way, thanks for giving a deadline that covers my current work responsibilities. 👍
___
## 🚀 Installation and Use
1. **Clone the repository** <br />
`git clone https://github.com/your-username/manual-quiz.git`
2. **Navigate to the project directory** <br />
`cd manual-quiz`
3. **Install dependencies** <br />
`pnpm i` or `pnpm install`
4. **Run for development** <br />
`pnpm dev`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
___
## 🧪 Tests
1. To run the test suite <br />
`pnpm test`
2. To update snapshots <br />
`pnpm test:update`
___
## 📬 Contact
📧 lucas@padilha.io <br>
📞 +351912015235 <br>
🔗 [LinkedIn](https://www.linkedin.com/in/lucas-padilhax/)
