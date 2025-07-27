const { GoogleGenAI } = require("@google/genai");
const Recipe = require("../models/recipeModels");
require("dotenv").config();

const ai = new GoogleGenAI({});

exports.generateRecipeController = async (req, res) => {
    try {
        const { ingredients, culture, dietaryNeeds, prepTime } = req.body;

        if (!ingredients || !culture || !dietaryNeeds) {
            return res.status(400).json({ error: "Please provide ingredients, culture, and dietary needs." });
        }

        const prompt = ` Generate a recipe using the following details:
                - Ingredients: ${ingredients.join(", ")}
                - Culture: ${culture}
                - Dietary Needs: ${dietaryNeeds.join(", ")}
                - Preparation Time: ${prepTime}

                Please include:
                - A suitable recipe name/title, in title field
                - A short description about the recipe along with it's culutural background, which would be in description field
                - A clear list of ingredients, in form of an array of strings
                - Step-by-step preparation instructions, in form of array of strings in instructions field
                - Ensure the recipe is appropriate for the dietary needs and reflects the cultural context
                - Include a url of an image of that link

                Respond in this exact JSON format:
                {
                  "title": "",
                  "description": "",
                  "ingredients": [],
                  "instructions": [],
                  "image": ""
                }
                Only return valid JSON with no extra commentary.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        let recipeJSON = response.candidates?.[0]?.content?.parts?.[0]?.text;
        recipeJSON = recipeJSON.replace(/```json|```/g, "").trim();

        console.log(recipeJSON)

        const recipeData = JSON.parse(recipeJSON);
        
        recipeData.culture = culture;
        recipeData.userId = req.user.id;
        recipeData.dietaryNeeds = dietaryNeeds;
        recipeData.prepTime = prepTime;
        
        const newRecipe = new Recipe(recipeData);
        await newRecipe.save();

        console.log(newRecipe)
        
        return res.status(200).json({ recipe: newRecipe });

    } catch (error) {
        console.error("Error generating recipe:", error);
        return res.status(500).json({ error: "Failed to generate recipe" });
    }
};
