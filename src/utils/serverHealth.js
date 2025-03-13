export const checkServerHealth = async () => {
    const BASE_URL = import.meta.env.VITE_API_URL || "";

    // Usar concatenación segura con new URL()
    const healthURL = new URL('/actuator/health', BASE_URL).toString();

    try {
        // Implementar timeout con AbortController
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(healthURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            signal: controller.signal // Usar signal en lugar de timeout
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Server health check failed');
        }

        const data = await response.json();
        return data.status === 'UP';
    } catch (error) {
        console.error('Server health check error:', error);
        return false;
    }
};
