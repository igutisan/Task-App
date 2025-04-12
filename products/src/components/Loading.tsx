import '../styles/loading.scss';

interface LoadingProps {
    message?: string;
    type?: 'fullscreen' | 'inline';
}

const Loading = ({ message = 'Cargando...', type = 'fullscreen' }: LoadingProps) => {
    return (
        <div className={`loading-wrapper ${type}`}>
            <div className="loading-content">
                <div className="loading-animation">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                    <div className="circle circle-4"></div>
                </div>
                {message && <p className="loading-message">{message}</p>}
            </div>
        </div>
    );
};

export default Loading; 