![IRIS](./iris.png)


# IRIS - Image Reader Server
IRIS utilizes one specific ability of multimodal large language models - image description. How to use it? You decide.
My intention is to make IRIS a controllable gateway for selected LLMs that is easy to deploy and customize. Currently only Google Gemini is supported. IRIS can be used with the [Iriso app](https://github.com/Egodx/iriso) or standalone.

## Why not use Gemini or GPT4V API directly?
- You do not share your API keys  
- One interface for multiple LLMs
- Currently Gemini and GPT4V are regionally locked, IRIS can help to avoid this lock
- Request rate limiting is under your full control
- You have control over the prompt to describe images, which makes abuse or jailbreak almost impossible
- Simple access contol that can be extended to anything you need
 
## How to set up
IRIS is an extendable base for your needs and a backend for the [Iriso app](https://github.com/Egodx/iriso). Therefore, many things have been intentionally simplified to make it easy to deploy even for inexperienced developers. Here are the steps to run on GCP:
1. Get yourself a Google account
2. Activate [VertexAI console](https://cloud.google.com/vertex-ai)
3. Create a new project
4. Activate Google Cloud Run, Secret Manager, Artifact Registry (optional)
5. Set up [Application Default Credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc) for Google Cloud. As a result you'll receive `application_default_credentials.json`
6. Create a secret in Google Secret Manager - Simple json array with access tokens for all IRIS users you need (GUIDs is a good option)
    ```
    [
      "TOKEN-ONE-LONG-ENOUGH-AND-HARD-TO-GUESS",
      "ANOTHER-TOKEN-FOR-ANOTHER-USER",
      .....
    ]
    ```
Store it as `tokens.json`. Since IRIS was originally intended for individuals or small groups of people with visual impairments, there is no need for user management. However, if you want to scale it for larger groups, it is quite easy to implement such a feature with NoSQL or SQL DB.

7. Create another secret from  `application_default_credentials.json`
8. Get two values from VertexAI: `PROJECT` (e.g. random-words-123456) and `LOCATION` (e.g. us-central1)
9. You can now build your own IRIS server from Dockerfile or use the unmodified server that is available to everyone from the Google Artifcat Registry: `europe-west10-docker.pkg.dev/wide-gecko-408120/egodx/image-reader-server:latest`
10. Create a new service in Google Cloun Run
    1. Use the Docker repository from step 9 or your repository that is in GAR. DockerHub doesn't work. Your repo must be available under  **https://\*.pkg.dev/**
    2. Set container port - `21088`
    3. Create 2 variables: `IRIS_GEMINI_VERTEXAI_LOCATION` and `IRIS_GEMINI_VERTEXAI_PROJECT`. Set the values to `LOCATION` and  `PROJECT` respectively
    4. Mount your secrets as `/root/.config/gcloud/application_default_credentials.json` and `/usr/node/tokens/tokens.json`
11. If everything is configured correctly, you can test your IRIS server by sending a request using CURL
```
curl -X POST -F "file=@cat.jpg" -F "lang=en" -H "Authorization: Bearer YOUR_TOKEN_FROM_TOKENS_JSON"  https://YOUR_SERVER_URL.run.app/upload
```
Response should be like
```
{
    "text":" This is a picture of a ginger kitten sleeping on a white fluffy blanket. The kitten is on its back with its eyes closed and its paws in the air. It has a contented smile on its face."
}
```
## Language support
Now IRIS supports 8 languages:
* Chinese
* English
* French
* German
* Portuguese
* Russian
* Spanish
* Turkish

You can add a new language by adding its prompt to the **prompts.json** in the vision provider folder. For example, Gemini provider can support up to 37 languages.

## Roadmap
* Improve documentation
* New vision provider - *GPT4V*
* New local vision provider - *llama.cpp*
* More languages and better prompts 
 
## License
GPLv3. 
See [gnu-gpl-v3.0.md](./gnu-gpl-v3.0.md)