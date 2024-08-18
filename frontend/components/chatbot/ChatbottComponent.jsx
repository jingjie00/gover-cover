import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, List, Card } from 'antd';
import { AudioOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';

// Speech recognition and text-to-speech setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to the latest message
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { type: 'user', content: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');

    try {
      // Make the API call to the backend
      const response = await axios.post('https://oushmfoeoipomvcdirjg.execute-api.us-east-1.amazonaws.com/govercoverAI', {
        message: inputText,
      });

      const botMessage = { type: 'bot', content: response.data.message };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // Speak the bot's response
      speakText(response.data.message);
    } catch (error) {
      const botMessage = { type: 'bot', content: 'Sorry, something went wrong. Please try again.' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.pitch = 1;
    speech.rate = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  };

  const handleSpeechRecognition = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      handleSendMessage(); // Automatically send the message after recognition
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Card title="Chatbot" bordered={false} style={{ marginBottom: '20px' }}>
        <List
          dataSource={messages}
          renderItem={(message) => (
            <List.Item
              style={{
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Card
                style={{
                  maxWidth: '75%',
                  background: message.type === 'user' ? '#e6f7ff' : '#f0f0f0',
                  textAlign: message.type === 'user' ? 'right' : 'left',
                }}
              >
                {message.content}
              </Card>
            </List.Item>
          )}
        />
        <div ref={messageEndRef} />
      </Card>

      <Input
        placeholder="Type your message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onPressEnter={handleSendMessage}
        suffix={
          <AudioOutlined
            onClick={handleSpeechRecognition}
            style={{ fontSize: '24px', cursor: 'pointer', color: isListening ? '#1890ff' : '#000' }}
          />
        }
      />

      <Button
        type="primary"
        icon={<SendOutlined />}
        style={{ marginTop: '10px', width: '100%' }}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </div>
  );
};

export default Chatbot;
