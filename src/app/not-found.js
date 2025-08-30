export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            color: 'white',
            backgroundColor: '#000'
        }}>
            <h1 style={{ fontSize: '4rem', margin: '0' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>페이지를 찾을 수 없습니다</h2>
            <p style={{ fontSize: '1rem', marginBottom: '2rem', color: '#ccc' }}>
                요청하신 페이지가 존재하지 않거나 이동되었습니다.
            </p>
            <a 
                href="/" 
                style={{
                    backgroundColor: '#007ACC',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontSize: '1rem'
                }}
            >
                홈으로 돌아가기
            </a>
        </div>
    );
}
