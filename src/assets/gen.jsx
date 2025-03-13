import React, { useState } from 'react';
import axios from 'axios';
require('dotenv').config()

const Gen = () => {
    const API_URL = process.env.URL;
    const [topic, setTopic] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateContent = async () => {
        if (!topic) {
            alert('Please enter a topic');
            return;
        }
 
        setLoading(true);

        try {
            const response = await axios.post('${API_URL}/generate-content', { topic });
            setGeneratedContent(response.data.content);
        } catch (error) {
            alert('Error generating content456');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>AI Content Generator</h1>
            <textarea
                placeholder="Enter a topic or keywords"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows="4"
                cols="50"
            ></textarea>
            <br />
            <button onClick={handleGenerateContent} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Blog Post'}
            </button>
            {generatedContent && (
                <div>
                    <h2>Generated Blog Post</h2>
                    <p>{generatedContent}</p>
                </div>
            )}
        </>
    );
};

export default Gen;
