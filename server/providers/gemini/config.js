module.exports = { 
    general:
    {
        model: process.env.IRIS_GEMINI_MODEL ?? 'gemini-pro-vision'
    },
    vertexai:
    {
        project: process.env.IRIS_GEMINI_VERTEXAI_PROJECT  ?? 'PLEASE SPECIFY YOUR PROJECT IN VERTEXAI',
        location: process.env.IRIS_GEMINI_VERTEXAI_LOCATION  ?? 'PLEASE SPECIFY SERVER LOCATION IN VERTEXAI'
    },
    generationConfig:
    {
        max_output_tokens: process.env.IRIS_GEMINI_MAX_OUTPUT_TOKENS ?? 2048,
        temperature: process.env.IRIS_GEMINI_TEMPERATURE ?? 0.4,
        top_p: process.env.IRIS_GEMINI_TOP_P ?? 1,
        top_k: process.env.IRIS_GEMINI_TOP_K ?? 32
    }
}