import { Html, Head, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css"
        />
        <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
