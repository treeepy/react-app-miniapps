import React from 'react';

interface NewsListProps {
    news: any[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
    return (
        <div>
            <h2 className="text-2xl mb-4">Latest News</h2>
            <ul>
                {news.map((item, index) => (
                    <li key={index} className="border p-2 my-2">
                        <h3 className="text-xl">{item.title}</h3>
                        <p>{item.description}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            Read more
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;