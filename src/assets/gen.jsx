import React, { useState } from 'react';
const Gen = () => {
    const [topic, setTopic] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateContent = async () => {
        if (!topic) {
            alert('Please enter a topic');
            return;
        }
        setGeneratedContent('');
        setLoading(true);

        try {
            const eventSource = new EventSource('https://blogai-backend.onrender.com' + encodeURIComponent(topic));
            eventSource.onmessage = (event) => {
                if (event.data === '[DONE]') {
                    eventSource.close();
                    setLoading(false);
                }else {
                    setGeneratedContent(prevContent => prevContent + event.data);
                }
            };
        } catch (error) {
            alert('Event Source error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Live Blog Post Generator</h2>
      <input
        type="text"
        placeholder="Enter a topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
      />
      <button
        onClick={handleGenerateContent}
        disabled={loading || !topic}
        style={{ marginTop: '10px', padding: '10px 20px' }}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      <div style={{ whiteSpace: 'pre-wrap', marginTop: '20px', minHeight: '200px' }}>
        {generatedContent}
      </div>
    </div>
    );
};

export default Gen;
