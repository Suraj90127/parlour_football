import "./globals.css";
import { AlertContextProvider } from "./helpers/AlertContext";
import UserContextProvider from "./helpers/UserContext";

export const metadata = {
    title: "parlour football",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
           <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                rel="shortcut icon"
                href="/logo.png"
                type="image/x-icon"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Shadows+Into+Light&display=swap"
                rel="stylesheet"
            />
            <meta charSet="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <title>
                Parlour Football - Live Football Betting on Every League Worldwide
            </title>
            <meta
                name="description"
                content="Parlour Football offers live betting on ongoing football matches from leagues around the world. Bet on your favorite teams and win big with our platform."
            />
            <meta
                name="keywords"
                content="football betting, live football bets, online betting, soccer betting, bet on football, live sports betting, Parlour Football"
            />
            <meta name="author" content="Parlour Football" />

            <meta
                property="og:title"
                content="Parlour Football - Live Football Betting on Every League Worldwide"
            />
            <meta
                property="og:description"
                content="Join Parlour Football for live betting on matches from leagues around the globe. Bet on your favorite teams in real-time and enjoy the excitement of winning."
            />
            <meta
                property="og:image"
                content="https://www.parlour-football.com/logo.png"
            />
            <meta
                property="og:url"
                content="https://www.parlour-football.com"
            />
            <meta property="og:type" content="website" />

            <link rel="canonical" href="https://www.parlour-football.com" />

            <link
                rel="icon"
                href="https://www.parlour-football.com/logo.png"
                type="image/x-icon"
            />

            <meta name="robots" content="index, follow" />
        </head>

            <body>
                <UserContextProvider>
                    <AlertContextProvider>{children}</AlertContextProvider>
                </UserContextProvider>
            </body>
        </html>
    );
}
