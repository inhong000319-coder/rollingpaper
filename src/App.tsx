import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import MessageForm from './components/MessageForm/MessageForm';
import MessageList from './components/MessageList/MessageList';
import type { Message } from './types/Message';
import './App.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // 메시지 목록 조회
  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('메시지 조회 실패:', error.message);
    } else {
      setMessages(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // 메시지 전송
  const handleSubmit = async (newMsg: Omit<Message, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({ author: newMsg.author, content: newMsg.content })
      .select()
      .single();

    if (error) {
      console.error('메시지 전송 실패:', error.message);
      alert('메시지 전송에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    if (data) {
      setMessages((prev) => [data, ...prev]);
    }
  };

  return (
    <div className="app" id="app-root">
      <main className="app__container">
        <ProfileHeader
          name="서인홍"
          description="취업을 갈망하는 개발자지망생"
        />
        <MessageForm onSubmit={handleSubmit} />
        <MessageList messages={messages} loading={loading} />
      </main>
    </div>
  );
}

export default App;
