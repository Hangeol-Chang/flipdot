"use client";
import { useState, useEffect } from 'react';

export default function Page() {
    const [text, setText] = useState('HELLO_WORLD!');
    const [style, setStyle] = useState('basic');
    const [dotSize, setDotSize] = useState(20);
    const [spacing, setSpacing] = useState(2);
    const [animationMode, setAnimationMode] = useState('static');
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const generateUrl = () => {
        const params = new URLSearchParams({
            text,
            style,
            dotSize: dotSize.toString(),
            spacing: spacing.toString(),
            animationMode
        });
        return `/api/svg?${params.toString()}`;
    };

    const markdownCode = `![Flip Dot Display](${origin}${generateUrl()})`;

    return (
        <div style={{
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            color: 'white'
        }}>
            <h1>Flip Dot API Example</h1>
            <p>GitHub README.md에서 사용할 수 있는 flip dot 이미지를 생성하는 API입니다.</p>
            
            <div style={{
                background: '#222',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h2>설정</h2>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>텍스트: </label>
                    <input 
                        type="text" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        style={{ 
                            padding: '5px', 
                            backgroundColor: '#333', 
                            color: 'white', 
                            border: '1px solid #555',
                            borderRadius: '4px'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>스타일: </label>
                    <select 
                        value={style} 
                        onChange={(e) => setStyle(e.target.value)}
                        style={{ 
                            padding: '5px', 
                            backgroundColor: '#333', 
                            color: 'white', 
                            border: '1px solid #555',
                            borderRadius: '4px'
                        }}
                    >
                        <option value="basic">Basic</option>
                        <option value="retro">Retro</option>
                        <option value="modern">Modern</option>
                    </select>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>애니메이션: </label>
                    <select 
                        value={animationMode} 
                        onChange={(e) => setAnimationMode(e.target.value)}
                        style={{ 
                            padding: '5px', 
                            backgroundColor: '#333', 
                            color: 'white', 
                            border: '1px solid #555',
                            borderRadius: '4px'
                        }}
                    >
                        <option value="static">Static (정적)</option>
                        <option value="sequential">Sequential (순차)</option>
                        <option value="scroll">Scroll (스크롤)</option>
                    </select>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Dot 크기: {dotSize}px </label>
                    <input 
                        type="range" 
                        min="10" 
                        max="40" 
                        value={dotSize} 
                        onChange={(e) => setDotSize(parseInt(e.target.value))}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>간격: {spacing}px </label>
                    <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={spacing} 
                        onChange={(e) => setSpacing(parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div style={{
                background: '#222',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h2>미리보기</h2>
                <img 
                    src={generateUrl()} 
                    alt="Flip Dot Display"
                    style={{ 
                        maxWidth: '100%', 
                        backgroundColor: '#111', 
                        padding: '10px',
                        borderRadius: '4px'
                    }}
                />
            </div>

            <div style={{
                background: '#222',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                <h2>사용법</h2>
                
                <h3>API URL</h3>
                <code style={{
                    background: '#333',
                    padding: '10px',
                    borderRadius: '4px',
                    display: 'block',
                    marginBottom: '15px',
                    wordBreak: 'break-all'
                }}>
                    {origin}{generateUrl()}
                </code>
                
                <h3>Markdown 코드 (GitHub README용)</h3>
                <code style={{
                    background: '#333',
                    padding: '10px',
                    borderRadius: '4px',
                    display: 'block',
                    marginBottom: '15px',
                    wordBreak: 'break-all'
                }}>
                    {markdownCode}
                </code>
                
                <button 
                    onClick={() => navigator.clipboard.writeText(markdownCode)}
                    style={{
                        backgroundColor: '#007ACC',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Markdown 코드 복사
                </button>
            </div>

            <div style={{
                background: '#222',
                padding: '20px',
                borderRadius: '8px'
            }}>
                <h2>파라미터</h2>
                <ul>
                    <li><strong>text</strong>: 표시할 텍스트 (영문자, 숫자, 특수문자 지원)</li>
                    <li><strong>style</strong>: 스타일 테마 (basic, retro, modern)</li>
                    <li><strong>animationMode</strong>: 애니메이션 모드 (static, sequential, scroll)</li>
                    <li><strong>dotSize</strong>: 각 dot의 크기 (10-40px)</li>
                    <li><strong>spacing</strong>: dot 간의 간격 (1-10px)</li>
                </ul>
                
                <h3>특수 기능</h3>
                <ul>
                    <li><strong>띄어쓰기</strong>: 공백 또는 '_' (언더스코어) 사용</li>
                    <li><strong>특수문자</strong>: ! ? . , : ; - + = * / \ ( ) [ ] @ # $ % &</li>
                    <li><strong>URL 인코딩</strong>: 특수문자가 URL에서 자동으로 인코딩되어도 정상 처리</li>
                </ul>
                
                <h3>예제 텍스트</h3>
                <div style={{ marginTop: '10px' }}>
                    <button 
                        onClick={() => setText('HELLO_WORLD!')}
                        style={{
                            backgroundColor: '#444',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            margin: '5px'
                        }}
                    >
                        HELLO_WORLD!
                    </button>
                    <button 
                        onClick={() => setText('ABC_123')}
                        style={{
                            backgroundColor: '#444',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            margin: '5px'
                        }}
                    >
                        ABC_123
                    </button>
                    <button 
                        onClick={() => setText('GITHUB.COM/USER')}
                        style={{
                            backgroundColor: '#444',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            margin: '5px'
                        }}
                    >
                        GITHUB.COM/USER
                    </button>
                    <button 
                        onClick={() => setText('SCORE:_100%')}
                        style={{
                            backgroundColor: '#444',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            margin: '5px'
                        }}
                    >
                        SCORE:_100%
                    </button>
                </div>
            </div>
        </div>
    );
}