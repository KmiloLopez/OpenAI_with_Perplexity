import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export const aiRequest = async (complementary: string) => {
  const perplexity = createOpenAI({
    apiKey: import.meta.env.VITE_REACT_APP_PERPLEXITY_API_KEY ?? "",
    baseURL: "https://api.perplexity.ai/",
  });

  const { text } = await generateText({
    model: perplexity("llama-3.1-sonar-large-128k-online"),
    prompt: `crea una aplicacion web en react, con backend y frontend por separado, hay un usuario que al hacer login el backend genera un httpOnly para ser consumido cuando el ususrio refresca la pagina para hacer una actualizacion del token jwt, se esta usando el modelo vista controlador, y para el frontend se usa useContext
`,
  });

  return text;
};
// Eres un espiritu del mas allá, que esta siendo contactado y me respondes en forma ligeramente misteriosa, macabra, oscura y con coherencia.

//         Te daré una pregunta con la respuesta al final, quiero que me des la respuesta sin revelar explícitamente la solución, dandome encambio información relacionada lo mas conocida por las personas en general. En el texto de la respuesta no incluyas: palabra clave enviada despues de la pregunta o la propia pregunta, puedes enviar las iniciales de los nombres al final de tu repuesta en caso de ser necesario. A cuantinuación la pregunta y respuesta que son el contexto total que necesitas saber para responder, solo da un valor agregado a tu respuesta para darle sentido: ${complementary}.

//
