import axios from 'axios';

export interface DiffChunk {
  file: string;
  patch: string;
}

export interface DiffResult {
  beforeHtml: string;
  afterHtml: string;
  diff: DiffChunk[];
  summary: string;
}

export async function mockGenerateEdit(prompt: string, contextHtml: string): Promise<DiffResult> {
  return {
    beforeHtml: contextHtml || '<h1>Hello</h1>',
    afterHtml: (contextHtml || '<h1>Hello</h1>').replace('</h1>', ' <span style="color:#2563eb">(Edited)</span></h1>'),
    diff: [
      {
        file: 'index.html',
        patch: `--- a/index.html\n+++ b/index.html\n@@\n- <h1>Hello</h1>\n+ <h1>Hello <span style=\"color:#2563eb\">(Edited)</span></h1>`
      }
    ],
    summary: `Applied edit: ${prompt}`
  };
}

export async function generateWithOpenAI(prompt: string, contextHtml: string): Promise<DiffResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY missing');
  const url = 'https://api.openai.com/v1/responses';
  const { data } = await axios.post(
    url,
    {
      model: 'gpt-5-codex',
      input: [
        {
          role: 'system',
          content:
            'Perform code editing on HTML/CSS/JS snippets and return diff patches plus preview HTML.'
        },
        {
          role: 'user',
          content: JSON.stringify({ prompt, contextHtml })
        }
      ]
    },
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  // Map real response to DiffResult here when integrating
  return data as DiffResult;
}

