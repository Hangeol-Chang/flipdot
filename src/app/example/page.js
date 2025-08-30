'use client';
import { useState, useEffect } from 'react';

export default function ExamplePage() {
    const [mode, setMode] = useState('text'); // 'text' 또는 'custom'
    const [text, setText] = useState('HELLO_WORLD!');
    const [style, setStyle] = useState('dark');
    const [dotSize, setDotSize] = useState(20);
    const [spacing, setSpacing] = useState(2);
    const [animationMode, setAnimationMode] = useState('static');
    const [speed, setSpeed] = useState(1.0);
    const [direction, setDirection] = useState('normal');
    const [row, setRow] = useState('');
    const [column, setColumn] = useState('');
    const [align, setAlign] = useState('start');
    const [justify, setJustify] = useState('start');
    const [customDots, setCustomDots] = useState('');
    const [dotOn, setDotOn] = useState('');
    const [dotOff, setDotOff] = useState('');
    const [background, setBackground] = useState('');
    const [origin, setOrigin] = useState('');
    const [windowWidth, setWindowWidth] = useState(800);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
            setWindowWidth(window.innerWidth);
            
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const generateUrl = () => {
        const params = new URLSearchParams();
        
        if (mode === 'custom' && customDots) {
            params.append('customdots', customDots);
        } else {
            params.append('text', text);
        }
        
        params.append('style', style);
        params.append('dotSize', dotSize.toString());
        params.append('spacing', spacing.toString());
        params.append('animationMode', animationMode);
        
        if (speed !== 1.0) params.append('speed', speed.toString());
        if (direction !== 'normal') params.append('direction', direction);
        if (row) params.append('row', row);
        if (column) params.append('column', column);
        if (align !== 'start') params.append('align', align);
        if (justify !== 'start') params.append('justify', justify);
        if (dotOn) params.append('dotOn', dotOn.replace('#', ''));
        if (dotOff) params.append('dotOff', dotOff.replace('#', ''));
        if (background) params.append('background', background.replace('#', ''));
        
        return `/api/svg?${params.toString()}`;
    };

    const markdownCode = `![Flip Dot Display](${origin}${generateUrl()})`;
    
    const isWideScreen = windowWidth >= 1200;

    return (
        <div style={{
            padding: '20px',
            maxWidth: isWideScreen ? '1400px' : '900px',
            margin: '0 auto',
            color: 'white'
        }}>
            <h1>Flip Dot API Example</h1>
            <p>GitHub README.md에서 사용할 수 있는 flip dot 이미지를 생성하는 API입니다.</p>
            
            {/* 예제 텍스트 - 태그 스타일 */}
            <div style={{ 
                marginBottom: '20px',
                padding: '15px',
                background: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333'
            }}>
                <h3 style={{ 
                    margin: '0 0 10px 0', 
                    color: '#fff',
                    fontSize: '16px'
                }}>
                    🎯 Quick Examples - 클릭해서 바로 시작하세요!
                </h3>
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px' 
                }}>
                    <button 
                        onClick={() => {
                            setMode('text');
                            setText('Hello_World!!');
                        }}
                        style={{
                            backgroundColor: '#777',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(0,102,204,0.3)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#555';
                            e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#777';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Hello World
                    </button>
                    <button 
                        onClick={() => {
                            setMode('text');
                            setText('GitHub_Profile');
                        }}
                        style={{
                            backgroundColor: '#777',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(40,167,69,0.3)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#555';
                            e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#777';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Multi-line Text
                    </button>
                    <button 
                        onClick={() => {
                            setMode('text');
                            setText('SCORE:95%');
                        }}
                        style={{
                            backgroundColor: '#777',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(220,53,69,0.3)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#555';
                            e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#777';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        score: 95%
                    </button>
                   
                    <button 
                        onClick={() => {
                            setMode('custom');
                            setCustomDots('00100000100,00010001000,00111111100,01101110110,11111111111,10111111101,10100000101,00011011000,');
                            setText('');
                        }}
                        style={{
                            backgroundColor: '#777',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(111,66,193,0.3)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#555';
                            e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#777';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Custom Pattern
                    </button>
                </div>
            </div>
            
            <div style={{
                display: 'flex',
                flexDirection: isWideScreen ? 'row' : 'column',
                gap: '20px',
                alignItems: 'flex-start'
            }}>
                {/* 설정 패널 */}
                <div style={{
                    background: '#222',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    flex: isWideScreen ? '1' : 'none',
                    width: isWideScreen ? 'auto' : '100%'
                }}>
                    <h2>설정</h2>
                    
                    {/* 모드 선택 */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>모드: </label>
                        <select 
                            value={mode} 
                            onChange={(e) => {
                                const newMode = e.target.value;
                                setMode(newMode);
                                
                                if (newMode === 'custom') {
                                    // 커스텀 모드로 전환
                                    if (!customDots) {
                                        setCustomDots('10110,01001,10110');
                                    }
                                } else {
                                    // 텍스트 모드로 전환
                                    if (!text) {
                                        setText('HELLO_WORLD!');
                                    }
                                }
                                
                                console.log('Mode changed to:', newMode); // 디버깅용
                            }}
                            style={{ 
                                padding: '5px', 
                                backgroundColor: '#333', 
                                color: 'white', 
                                border: '1px solid #555',
                                borderRadius: '4px',
                                width: '100%'
                            }}
                        >
                            <option value="text">텍스트 모드</option>
                            <option value="custom">커스텀 도트 모드</option>
                        </select>
                    </div>

                    {/* 텍스트 입력 */}
                    {mode === 'text' ? (
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
                                    borderRadius: '4px',
                                    width: '100%'
                                }}
                                placeholder="예: Hello+World (띄어쓰기는 +, 줄바꿈은 _ 또는 %0A)"
                            />
                        </div>
                    ) : (
                        <div style={{ marginBottom: '15px' }}>
                            <label>커스텀 도트 패턴: </label>
                            <textarea 
                                value={customDots} 
                                onChange={(e) => setCustomDots(e.target.value)}
                                style={{ 
                                    padding: '5px', 
                                    backgroundColor: '#333', 
                                    color: 'white', 
                                    border: '1px solid #555',
                                    borderRadius: '4px',
                                    width: '100%',
                                    height: '60px'
                                }}
                                placeholder="예: 10110,01001,10110 (1=켜짐, 0=꺼짐, 콤마로 행 구분)"
                            />
                        </div>
                    )}
                    
                    {/* 설정 그리드 */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '15px',
                        marginBottom: '15px'
                    }}>
                        {/* 스타일 */}
                        <div>
                            <label>스타일: </label>
                            <select 
                                value={style} 
                                onChange={(e) => setStyle(e.target.value)}
                                style={{ 
                                    padding: '5px', 
                                    backgroundColor: '#333', 
                                    color: 'white', 
                                    border: '1px solid #555',
                                    borderRadius: '4px',
                                    width: '100%'
                                }}
                            >
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                                <option value="retro">Retro</option>
                                <option value="modern">Modern</option>
                            </select>
                        </div>
                        
                        {/* 애니메이션 */}
                        <div>
                            <label>애니메이션: </label>
                            <select 
                                value={animationMode} 
                                onChange={(e) => setAnimationMode(e.target.value)}
                                style={{ 
                                    padding: '5px', 
                                    backgroundColor: '#333', 
                                    color: 'white', 
                                    border: '1px solid #555',
                                    borderRadius: '4px',
                                    width: '100%'
                                }}
                            >
                                <option value="static">Static</option>
                                <option value="sequential">Sequential</option>
                                <option value="scroll">Scroll</option>
                                <option value="waterfall">Waterfall</option>
                            </select>
                        </div>

                        {/* Dot 크기 */}
                        <div>
                            <label>Dot 크기: {dotSize}px </label>
                            <input 
                                type="range" 
                                min="10" 
                                max="40" 
                                value={dotSize} 
                                onChange={(e) => setDotSize(parseInt(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                        
                        {/* 간격 */}
                        <div>
                            <label>간격: {spacing}px </label>
                            <input 
                                type="range" 
                                min="1" 
                                max="10" 
                                value={spacing} 
                                onChange={(e) => setSpacing(parseInt(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>

                        {/* 행 제한 */}
                        <div>
                            <label>행 제한: </label>
                            <input 
                                type="number" 
                                value={row} 
                                onChange={(e) => setRow(e.target.value)}
                                style={{ 
                                    padding: '5px', 
                                    backgroundColor: '#333', 
                                    color: 'white', 
                                    border: '1px solid #555',
                                    borderRadius: '4px',
                                    width: '100%'
                                }}
                                placeholder="예: 10"
                            />
                        </div>

                        {/* 열 제한 */}
                        <div>
                            <label>열 제한: </label>
                            <input 
                                type="number" 
                                value={column} 
                                onChange={(e) => setColumn(e.target.value)}
                                style={{ 
                                    padding: '5px', 
                                    backgroundColor: '#333', 
                                    color: 'white', 
                                    border: '1px solid #555',
                                    borderRadius: '4px',
                                    width: '100%'
                                }}
                                placeholder="예: 20"
                            />
                        </div>
                        
                        {/* 세로 정렬 (align) */}
                        <div>
                            <label>세로 정렬: </label>
                            <select 
                                value={align} 
                                onChange={(e) => setAlign(e.target.value)}
                                style={{ 
                                    padding: '5px', 
                                    backgroundColor: '#333', 
                                    color: 'white', 
                                    border: '1px solid #555',
                                    borderRadius: '4px',
                                    width: '100%'
                                }}
                            >
                                <option value="start">위</option>
                                <option value="center">가운데</option>
                                <option value="end">아래</option>
                            </select>
                        </div>
                        
                        {/* 가로 정렬 (justify) */}
                        <div>
                            <label>가로 정렬: </label>
                            <select 
                                value={justify} 
                                onChange={(e) => setJustify(e.target.value)}
                                style={{ 
                                    padding: '5px', 
                                    backgroundColor: '#333', 
                                    color: 'white', 
                                    border: '1px solid #555',
                                    borderRadius: '4px',
                                    width: '100%'
                                }}
                            >
                                <option value="start">왼쪽</option>
                                <option value="center">가운데</option>
                                <option value="end">오른쪽</option>
                            </select>
                        </div>
                    </div>

                    {/* 방향 (조건부) */}
                    {(animationMode === 'scroll' || animationMode === 'waterfall') && (
                        <div style={{ marginBottom: '15px' }}>
                            <label>방향: </label>
                            <select 
                                value={direction} 
                                onChange={(e) => setDirection(e.target.value)}
                                style={{ 
                                    padding: '5px', 
                                    backgroundColor: '#333', 
                                    color: 'white', 
                                    border: '1px solid #555',
                                    borderRadius: '4px',
                                    width: '100%'
                                }}
                            >
                                <option value="normal">
                                    {animationMode === 'scroll' ? '오른쪽→왼쪽' : '아래→위'}
                                </option>
                                <option value="reverse">
                                    {animationMode === 'scroll' ? '왼쪽→오른쪽' : '위→아래'}
                                </option>
                            </select>
                        </div>
                    )}

                    {/* 속도 (조건부) */}
                    {(animationMode === 'sequential' || animationMode === 'scroll' || animationMode === 'waterfall') && (
                        <div style={{ marginBottom: '15px' }}>
                            <label>속도: {speed}x </label>
                            <input 
                                type="range" 
                                min="0.5" 
                                max="3" 
                                step="0.1"
                                value={speed} 
                                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                    )}

                    {/* 커스텀 색상 */}
                    <details style={{ marginBottom: '15px' }}>
                        <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>커스텀 색상 (선택사항)</summary>
                        
                        <div style={{ marginBottom: '10px' }}>
                            <label>Dot ON 색상: </label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input 
                                    type="color" 
                                    value={dotOn || '#00ff00'} 
                                    onChange={(e) => setDotOn(e.target.value)}
                                    style={{ 
                                        padding: '2px', 
                                        backgroundColor: '#333', 
                                        border: '1px solid #555',
                                        borderRadius: '4px',
                                        width: '50px',
                                        height: '30px'
                                    }}
                                />
                                <input 
                                    type="text" 
                                    value={dotOn} 
                                    onChange={(e) => setDotOn(e.target.value)}
                                    style={{ 
                                        padding: '5px', 
                                        backgroundColor: '#333', 
                                        color: 'white', 
                                        border: '1px solid #555',
                                        borderRadius: '4px',
                                        flex: 1
                                    }}
                                    placeholder="#00ff00"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <label>Dot OFF 색상: </label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input 
                                    type="color" 
                                    value={dotOff || '#333333'} 
                                    onChange={(e) => setDotOff(e.target.value)}
                                    style={{ 
                                        padding: '2px', 
                                        backgroundColor: '#333', 
                                        border: '1px solid #555',
                                        borderRadius: '4px',
                                        width: '50px',
                                        height: '30px'
                                    }}
                                />
                                <input 
                                    type="text" 
                                    value={dotOff} 
                                    onChange={(e) => setDotOff(e.target.value)}
                                    style={{ 
                                        padding: '5px', 
                                        backgroundColor: '#333', 
                                        color: 'white', 
                                        border: '1px solid #555',
                                        borderRadius: '4px',
                                        flex: 1
                                    }}
                                    placeholder="#333333"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <label>배경 색상: </label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input 
                                    type="color" 
                                    value={background || '#000000'} 
                                    onChange={(e) => setBackground(e.target.value)}
                                    style={{ 
                                        padding: '2px', 
                                        backgroundColor: '#333', 
                                        border: '1px solid #555',
                                        borderRadius: '4px',
                                        width: '50px',
                                        height: '30px'
                                    }}
                                />
                                <input 
                                    type="text" 
                                    value={background} 
                                    onChange={(e) => setBackground(e.target.value)}
                                    style={{ 
                                        padding: '5px', 
                                        backgroundColor: '#333', 
                                        color: 'white', 
                                        border: '1px solid #555',
                                        borderRadius: '4px',
                                        flex: 1
                                    }}
                                    placeholder="#000000"
                                />
                            </div>
                        </div>
                    </details>
                </div>

                {/* 미리보기 패널 */}
                <div style={{
                    background: '#222',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    flex: isWideScreen ? '3' : 'none',
                    width: isWideScreen ? 'auto' : '100%'
                }}>
                    <h2>미리보기</h2>
                    <div style={{
                        backgroundColor: '#111', 
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        minHeight: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img 
                            src={generateUrl()} 
                            alt="Flip Dot Display"
                            style={{ 
                                maxWidth: '100%',
                                maxHeight: '400px',
                                border: '2px solid #444',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* 사용법 */}
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
                    wordBreak: 'break-all',
                    fontSize: '12px'
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
                    wordBreak: 'break-all',
                    fontSize: '12px'
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

            {/* 파라미터 가이드 */}
            <div style={{
                background: '#222',
                padding: '20px',
                borderRadius: '8px'
            }}>
                <h2>파라미터 가이드</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: isWideScreen ? 'repeat(2, 1fr)' : '1fr', gap: '20px' }}>
                    <div>
                        <h3>기본 파라미터</h3>
                        <ul style={{ lineHeight: '1.6' }}>
                            <li><strong>text</strong>: 표시할 텍스트</li>
                            <li><strong>customdots</strong>: 커스텀 도트 패턴</li>
                            <li><strong>style</strong>: 스타일 테마</li>
                            <li><strong>dotSize</strong>: 각 dot의 크기</li>
                            <li><strong>spacing</strong>: dot 간의 간격</li>
                        </ul>
                        
                        <h3>애니메이션 파라미터</h3>
                        <ul style={{ lineHeight: '1.6' }}>
                            <li><strong>animationMode</strong>: static, sequential, scroll, waterfall</li>
                            <li><strong>speed</strong>: 애니메이션 속도 (0.5-3.0x)</li>
                            <li><strong>direction</strong>: 애니메이션 방향</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3>크기 제한</h3>
                        <ul style={{ lineHeight: '1.6' }}>
                            <li><strong>row</strong>: 행 개수 제한</li>
                            <li><strong>column</strong>: 열 개수 제한</li>
                        </ul>
                        
                        <h3>색상 커스터마이징</h3>
                        <ul style={{ lineHeight: '1.6' }}>
                            <li><strong>dotOn</strong>: 켜진 dot 색상</li>
                            <li><strong>dotOff</strong>: 꺼진 dot 색상</li>
                            <li><strong>background</strong>: 배경 색상</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}