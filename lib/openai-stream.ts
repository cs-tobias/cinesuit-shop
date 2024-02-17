
export interface OpenAIStreamPayload {
model: string,
temperature: number,
top_p: number,
frequency_penalty: number,
presence_penalty: number,
max_tokens: number,
stream: boolean,
n: 1
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure your API key is correctly configured
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`OpenAI API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("OpenAI response data:", data); // For debugging
    // Assuming the structure of OpenAI's response, adjust based on actual response
    const generatedText = data.choices[0].text; 
    return { text: generatedText }; // Return an object with the text
}
