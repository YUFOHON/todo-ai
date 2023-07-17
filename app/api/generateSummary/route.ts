import { NextResponse } from "next/server";
import openai from "@/store/openai";
export async function POST(request: Request) {
  const { todos } = await request.json();
  // console.log("🚀 ~ file: route.ts:5 ~ POST ~ todos:", todos);

  //    communicate with opoenAI GPT
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, welcome the user always a Mr.Bruce and say welcome to Bruce's todo list.`,
      },
      {
        role: "user",
        content: `Hi there,provide a summary of the following todos, Count how many todos are in each category suich as To do,
        in progress,and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { data } = response;
  // console.log("🚀 ~ file: route.ts:29 ~ POST ~ data:", data);
  // console.log(data.choices[0].message);
  return NextResponse.json(data.choices[0].message);
}
