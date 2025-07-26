const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({});

exports.generateRecipeController = async (req, res) => {
    try {
        const { ingredients, culture, dietaryNeeds } = req.body;
        // const ingredients = ['tomatoes', 'cheese', 'bread'];
        // const culture = "Italian";
        // const dietaryNeeds = "Vegetarian";

        if (!ingredients || !culture || !dietaryNeeds) {
            return res.status(400).json({ error: "Please provide ingredients, culture, and dietary needs." });
        }

        const prompt = ` Generate a recipe using the following details:
                - Ingredients: ${ingredients.join(", ")}
                - Culture: ${culture}
                - Dietary Needs: ${dietaryNeeds}

                Please include:
                - A suitable recipe name
                - A clear list of ingredients
                - Step-by-step preparation instructions
                - Ensure the recipe is appropriate for the dietary needs and reflects the cultural context
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        console.log(response.text);

    const recipeText = response.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log(recipeText);

    return res.status(200).json({ recipe: recipeText });
} catch (error) {
    console.error("Error generating recipe:", error);
    return res.status(500).json({ error: "Failed to generate recipe" });
}
};
