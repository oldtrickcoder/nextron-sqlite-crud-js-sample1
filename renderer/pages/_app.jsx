import React from "react";
import GlobalContext from "../context";
import GlobalStyle from "../style/StyledComponent";
function MyApp({ Component, pageProps }) {
  return (
    <GlobalContext>
      <GlobalStyle />
      <Component {...pageProps} />
    </GlobalContext>
  );
}

export default MyApp;
