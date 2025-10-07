export type ApiHealthResponse = {
  status: 'online' | 'offline' | 'error';
  statusCode?: number;
  message?: string;
};

export async function checkApiHealth(): Promise<ApiHealthResponse> {
  try {
    const response = await fetch(process.env.API_URL!, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5e3),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        status: 'online',
        statusCode: response.status,
        message: data.message || 'Connected',
      };
    }

    return {
      status: 'error',
      statusCode: response.status,
      message: 'API returned error',
    };
  } catch (error) {
    console.error('API health check failed:', error);
    return {
      status: 'offline',
      message: 'Backend service unavailable',
    };
  }
}
