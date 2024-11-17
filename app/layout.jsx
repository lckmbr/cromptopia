import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Cromptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="assets/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="assets/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="assets/favicon_io/favicon-16x16.png"
        />
      </head>
      <Provider>
        <body>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <div className="app">
            <Nav></Nav>
            {children}
          </div>
        </body>
      </Provider>
    </html>
  );
};
export default RootLayout;
