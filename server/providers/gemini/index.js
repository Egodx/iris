const {VertexAI} = require('@google-cloud/vertexai');
const fs = require('fs');

const providerConfig = require('./config');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI(providerConfig.vertexai);

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: providerConfig.general.model,
    generation_config: providerConfig.generationConfig,
});



const describeImage = async (path, langCode) => {

    const encodedFile = fs.readFileSync(path, {encoding: 'base64'});
    const prompts = require('./prompts/prompts.json');
    if (!prompts[langCode]) return;
    const req = {
        contents: [{
            role: 'user',
            parts: [{
                inline_data: {
                    mime_type: 'image/jpeg',
                    data: encodedFile
                }
            }, {text: prompts[langCode]}]
        }],
    };

    const streamingResp = await generativeModel.generateContentStream(req);
    const response = await streamingResp.response;

    return response.candidates[0].content.parts[0].text;
}

module.exports = describeImage;
