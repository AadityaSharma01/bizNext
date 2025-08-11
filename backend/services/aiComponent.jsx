import { CohereClientV2 } from 'cohere-ai';

function cleanAiRes(input) {
    return input
        .replace(/^```html\n?/, '')     // Remove starting code block if present
        .replace(/^`+|`+$/g, '')        // Remove wrapping backticks
        .replace(/^"+|"+$/g, '')        // Remove wrapping double quotes
        .replace(/```$/, '')            // Remove ending code block
        .trim();
}

async function cohereCall(input) {
    try {
        const cohere = new CohereClientV2({
            token: '6R8vrIZ3TGejy3IHTNDdCHDfxvLIEpaYeYl6601Y',
        });

        const response = await cohere.chat({
            model: 'command-a-03-2025',
            messages: [
                {
                    role: 'user',
                    content: `${input}

You are given structured sales data. Each entry includes:
1. "Month" – the month of the sale,
2. "Key" – the product name,
3. "Value" – the quantity sold.

Your tasks:
- Analyze product-wise total sales across all months.
- Based on trends and volume, determine whether each product is worth restocking.
- Prioritize profitability and sales volume in your recommendation.
- Finally, generate a month-wise table summarizing product sales.

Be concise and clear.

Bind the response into a well structured HTML code for better format.
Remove the BoilerPlate HTML, Head and Body tags, start with a div tag.
Return ONLY the HIGHLY MODULARLY STYLED HTML code.
Use verdana type font style, and a dark theme.
RETURNED A TABLE.

thank you and know that I love you <3`,
                },
            ],
        });

        const raw = response.message.content[0].text;
        const cleaned = cleanAiRes(raw);
        return cleaned;

    } catch (error) {
        console.error('Cohere call failed:', error);
        return null;
    }
}

export default cohereCall;
