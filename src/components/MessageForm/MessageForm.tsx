import { useState } from 'react';
import type { Message } from '../../types/Message';
import './MessageForm.css';

interface MessageFormProps {
    onSubmit: (message: Omit<Message, 'id' | 'date'>) => void;
}

function MessageForm({ onSubmit }: MessageFormProps) {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!author.trim() || !content.trim()) return;

        onSubmit({
            author: author.trim(),
            content: content.trim(),
        });

        setAuthor('');
        setContent('');
    };

    return (
        <section className="message-form" id="message-form">
            <h2 className="message-form__title">메시지 남기기</h2>
            <form onSubmit={handleSubmit}>
                <div className="message-form__field">
                    <label className="message-form__label" htmlFor="author-input">
                        작성자
                    </label>
                    <input
                        id="author-input"
                        className="message-form__input"
                        type="text"
                        placeholder="이름 또는 별명을 입력하세요"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        maxLength={20}
                    />
                </div>
                <div className="message-form__field">
                    <label className="message-form__label" htmlFor="message-input">
                        메시지
                    </label>
                    <textarea
                        id="message-input"
                        className="message-form__textarea"
                        placeholder="따뜻한 메시지를 남겨주세요. 욕설 또는 비난 시 찾아냅니다.^^"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={3}
                        maxLength={300}
                    />
                </div>
                <button
                    type="submit"
                    className="message-form__submit"
                    id="submit-message-btn"
                    disabled={!author.trim() || !content.trim()}
                >
                    <svg
                        className="message-form__submit-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22 2L11 13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M22 2L15 22L11 13L2 9L22 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    메시지 보내기
                </button>
            </form>
        </section>
    );
}

export default MessageForm;
