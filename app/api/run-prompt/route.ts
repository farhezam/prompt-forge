import { NextRequest, NextResponse } from 'next/server';

interface RunPromptRequest {
  prompt: string;
  input: string;
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

interface MiMoResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: RunPromptRequest = await request.json();

    const { prompt, input, apiKey, model = 'xiaomi-mimo-vl-7b-instruct', temperature = 0.7, maxTokens = 2048 } = body;

    // If no API key provided, return mock response
    if (!apiKey || apiKey.trim() === '') {
      const mockResponse = {
        response: 'This is a mock response since no API key was provided. Configure your MiMo API key in settings to get real results.',
        usage: {
          prompt_tokens: Math.ceil((prompt.length + input.length) / 4),
          completion_tokens: 50,
          total_tokens: Math.ceil((prompt.length + input.length) / 4) + 50,
        },
        latency: 100,
      };
      return NextResponse.json(mockResponse);
    }

    const startTime = Date.now();

    // Build request to MiMo API
    const response = await fetch('https://api.xiaomimimo.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: input },
        ],
        temperature: temperature,
        max_tokens: maxTokens,
      }),
    });

    const latency = Date.now() - startTime;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData.error?.message || `API request failed with status ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data: MiMoResponse = await response.json();

    const result = {
      response: data.choices[0]?.message?.content || '',
      usage: {
        prompt_tokens: data.usage.prompt_tokens,
        completion_tokens: data.usage.completion_tokens,
        total_tokens: data.usage.total_tokens,
      },
      latency: latency,
    };

    return NextResponse.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to run prompt: ${errorMessage}` },
      { status: 500 }
    );
  }
}
