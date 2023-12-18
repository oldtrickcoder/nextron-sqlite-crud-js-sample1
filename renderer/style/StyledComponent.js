import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:  'Poppins', sans-serif;
}

@keyframes Magnifying {
  from{
    transform: scale(1);
  }
  to{
    transform: scale(1.5);
  }
}

@keyframes PopUp {
  0%{
    transform: scale(1.5);
    top:120vh;
    
  }
  50%{
    transform: scale(1.5);

  }
  75%{
    transform: rotate3d(360deg);
    top:-5vh;
  }
  100%{

    top:10vh;

  }
}


@keyframes rotateMe {
  from{
    transform:  rotateY(360deg);

    
  }
  to{
    transform:rotateY(-360deg);
    
  }

  
}

.HeadRow{
  width:85vw;
  border-radius:20px;
}
.HeadRow th{
  padding-right:20px;
  padding-left:20px;
  width:max-content;
}

.TableBody {
  overflow-y:scroll;
  overflow-x:hidden;
}
.DataRow  td{
  text-align:center;
  padding:20px;
}
`;

export default GlobalStyle;
