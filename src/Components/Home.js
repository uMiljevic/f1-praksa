import { useTypewriter, Cursor } from "react-simple-typewriter";
import { YoutubeFilled, XOutlined, InstagramOutlined, TikTokOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Home() {
    const [text] = useTypewriter({
        words: ['Formula 1', 'F1 Feeder', 'World Class Racing'],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 120,
    });
    
    
    return (
        <div className="main-home-container">


            <div className="home-position">
                <h1>
                    Welcome To <span style={{fontWeight: 'bold', color: '#f44336'}}>
                                    {text}
                                </span>
                    <span style={{color: 'red'}}>
                        <Cursor />
                    </span>
                </h1>
            </div>

            <div className="footer-position">
                <div className="footer">
                    <Link to="https://www.youtube.com/@Formula1" target="_blanc">
                    <YoutubeFilled className="icon"/>
                    </Link>
                    <XOutlined  className="icon"/>
                    <InstagramOutlined  className="icon"/>
                    <TikTokOutlined  className="icon"/>
                </div>
            </div>

            <div className="overlay"></div>

        <div className="video-container">
          <video src={`${process.env.PUBLIC_URL}/assets/img/f1VideoBG.mp4`} autoPlay loop muted/>
        </div>
        </div>
    );
}