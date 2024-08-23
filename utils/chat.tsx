// import { GoogleGenerativeAI } from "@google/generative-ai";
// import PromptSync from "prompt-sync";
// import chalk from "chalk";
// const prompt = PromptSync({ sigint: true });

// chalk.level = 1;

// const genAI = new GoogleGenerativeAI("API_KEY");
// const initialized = false;

// function initializeModel() {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//   // console.log(model)
//   const chat = model.startChat({
//     history: [
//       {
//         role: "user",
//         parts: `You are Sam, a person I hired to chat in place of me to provide information about Vinit based on the following. I want you to go through my resume I will insert below and answer the questions of based on my resume and project details any recruiter that is interacting with you. I also want you to go through the Links I will provide and answer based on the information you get through those links as well. Be a little mix of casual and formal while interacting with the recruiter, also ask for the Email of the recruiter for me to contact them if they are willing to consider me for hiring into their organization. Here is my resume : Vinit Gupta
//         Portfolio | Leetcode | Linkedin | Github EXPERIENCE
//         Tata Consultancy Services, Kolkata — Java Developer October 2023 - PRESENT
//         +91 83890732221
//         thevinitgupta@gmail.com
//         .
// .
// .
// % increase in user retention.
//         ● Utilized NextJS, TailwindCSS, and Appwrite backend to optimize user experience, reducing page load times by 40% and boosting overall user satisfaction.

//         Here are links to the websites that I want you to go through :
//         https://github.com/thevinitgupta/
//         https://dev.to/thevinitgupta/
//         https://leetcode.com/thevinitgupta/

//         Keep the limit of your answers to less than 100 tokens
//         While asking for the recruiter for their email, ask for their consent to sharing their email in a formal similar to the following : Would you like to hire me? If yes, I would like to have your email so I can contact you with further details about me.`,
//       },
//       {
//         role: "model",
//         parts: "Great to meet you. What would you like to know about Vinit?",
//       },
//     ],
//     generationConfig: {
//       maxOutputTokens: 350,
//     },
//   });
//   return chat;
// }

// async function run() {
//   // For text-only input, use the gemini-pro model
//   let chat = null,
//     chatbotOn = true;
//   if (!initialized) {
//     chat = initializeModel();
//   }
//   console.log(chalk.cyanBright("Hi, I am Sam - Vinit's Virtual Assistant."));

//   while (chatbotOn) {
//     const msg = prompt(
//       chalk.greenBright("What do you want to ask about Vinit?  --->  ")
//     );

//     const result = await chat.sendMessage(msg);
//     const response = await result.response;
//     const text = response.text();
//     console.log(chalk.yellowBright("Sam : "), chalk.blueBright(text));
//     const promptResponse = prompt(
//       chalk.magentaBright(
//         "If you don't have any more questions, type : 'bye' else press Enter --->  "
//       )
//     );
//     if (promptResponse.toLocaleLowerCase() === "bye") {
//       chatbotOn = false;
//       console.log(
//         chalk.redBright(`
//       BBBBB   Y     Y   EEEEE
//       B    B   Y   Y    E
//       BBBBB      Y      EEEE
//       B    B     Y      E
//       BBBBB      Y      EEEEE
//       `)
//       );
//     }
//   }
//   return;
// }

// run();
