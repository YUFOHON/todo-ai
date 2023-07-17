import formatTodosForAI from "./formatTodosForAI";
const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAI(board);
  //   console.log("Formatted todos: ", todos)

  const response = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });
//   console.log(
//     "🚀 ~ file: fetchSuggestion.ts:14 ~ fetchSuggestion ~ response:",
//     response
//   );

  //   const GPTdata = await response.json();
  //   const { content } = GPTdata;
  //   return content;
};

export default fetchSuggestion;
