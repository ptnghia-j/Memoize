import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount = 5, category = "" } = body;

    // Open Trivia DB API URL
    let apiUrl = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    if (category) {
      apiUrl += `&category=${category}`;
    }

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error(`API returned response code ${data.response_code}`);
    }

    // Format the questions for the frontend
    const formattedQuestions = data.results.map((q: any) => {
      // Decode HTML entities (Open Trivia DB returns HTML-encoded strings)
      const question = decodeURIComponent(q.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&'));
      const correctAnswer = decodeURIComponent(q.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&'));
      const incorrectAnswers = q.incorrect_answers.map((a: string) => 
        decodeURIComponent(a.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&'))
      );

      // Mix options randomly
      const options = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);

      return {
        question,
        options,
        answer: correctAnswer,
        category: q.category,
        difficulty: q.difficulty,
      };
    });

    return NextResponse.json({
      questions: formattedQuestions
    }, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }
}
