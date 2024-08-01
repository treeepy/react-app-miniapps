import Head from 'next/head';
import { useState, useEffect } from 'react';
import NewsList from './NewsList';
const Home = () => {
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const [news, setNews] = useState<any[]>([]);

    const handleSubscriptionChange = (topic: string) => {
        setSubscriptions(prev => {
            if (prev.includes(topic)) {
                return prev.filter(sub => sub !== topic);
            } else {
                return [...prev, topic];
            }
        });
    };

    useEffect(() => {
        // Fetch news based on subscriptions
        const fetchNews = async () => {
            const response = await fetch('/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscriptions })
            });
            const data = await response.json();
            setNews(data);
        };

        fetchNews();
    }, [subscriptions]);

    return (
        <div className="min-h-screen p-4">
            <Head>
                <title>News Bot Mini App</title>
                <meta name="description" content="A simple news bot mini app with Telegram integration" />
            </Head>
            <main className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">News Bot Mini App</h1>
                <div className="mb-4">
                    <h2 className="text-2xl">Select Your News Topics</h2>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={subscriptions.includes('technology')}
                                onChange={() => handleSubscriptionChange('technology')}
                            />
                            Technology
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={subscriptions.includes('business')}
                                onChange={() => handleSubscriptionChange('business')}
                            />
                            Business
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={subscriptions.includes('sports')}
                                onChange={() => handleSubscriptionChange('sports')}
                            />
                            Sports
                        </label>
                        {/* Add more categories as needed */}
                    </div>
                </div>
                <NewsList news={news} />
            </main>
        </div>
    );
};

export default Home;