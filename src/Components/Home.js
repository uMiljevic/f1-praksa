import { useTypewriter, Cursor } from "react-simple-typewriter";
import { YoutubeFilled, XOutlined, InstagramOutlined, TikTokOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// F1TV Button
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';

export default function Home() {
    const [text] = useTypewriter({
        words: ['Formula 1', 'F1 Feeder', 'World Class Racing'],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 120,
    });

    // F1TV Button Colors
    const colors3 = ['hsl(354, 70%, 54%)', 'hsl(354, 70%, 54%, .8)', 'hsl(354, 70%, 54%, .7)'];
    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());


    return (
        <div className="main-home-container">
            {/* F1TV Button */}
            <Link to="https://f1tv.formula1.com/" target="_blanc">
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: `linear-gradient(135deg, ${colors3.join(', ')})`,
                                colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors3).join(', ')})`,
                                colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors3).join(', ')})`,
                                lineWidth: 0,
                            },
                        },
                    }}
                >
                    <Button type="primary" size="large" className="tvButton">
                        Formula1 TV
                    </Button>
                </ConfigProvider>
            </Link>


            <div className="home-position">
                <h1>
                    Welcome To <span style={{ fontWeight: 'bold', color: '#f44336' }}>
                        {text}
                    </span>
                    <span style={{ color: '#f44336' }}>
                        <Cursor />
                    </span>
                </h1>
            </div>

            <div className="footer-position">
                <div className="footer">
                    <Link to="https://www.youtube.com/@Formula1" target="_blanc">
                        <YoutubeFilled className="icon" />
                    </Link>
                    <Link to="https://x.com/F1" target="_blanc">
                        <XOutlined className="icon" />
                    </Link>
                    <Link to="https://www.instagram.com/f1/" target="_blanc">
                        <InstagramOutlined className="icon" />
                    </Link>
                    <Link to="https://www.tiktok.com/@f1" target="_blanc">
                        <TikTokOutlined className="icon" />
                    </Link>
                </div>
            </div>

            <div className="overlay"></div>

            <div className="video-container">
                <video src={`${process.env.PUBLIC_URL}/assets/img/f1VideoBG.mp4`} autoPlay loop muted />
            </div>
        </div>
    );
}