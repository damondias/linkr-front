import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`

	padding: 0;
	margin: 0;
	box-sizing: border-box;

	body, html {
		width: 100vw;
		height: 100vh;

		font-family: 'Oswald', sans-serif;
		color: #ffffff;
		
	}

	:root{
		width: 100%;
  		height: auto;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'Lato', 'Oswald', 'Passion One', sans-serif;
		
		box-sizing: border-box;
    	word-break: break-word;
  	    background: #eeeae4;
	}

`

export default GlobalStyle