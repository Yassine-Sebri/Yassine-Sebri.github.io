import Typewriter from "typewriter-effect";

const App = () => {
  return (
    <Typewriter
      options={{
        loop: false,
        delay: 65,
        autoStart: true,
        cursor: "█",
        strings: [""],
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Hi! <br>")
          .pauseFor(300)
          .typeString(" I'm Yassine,")
          .pauseFor(100)
          .typeString(" a student,")
          .pauseFor(100)
          .typeString(" developer and hacker.<br/>")
          .pauseFor(500)
          .typeString(
            "I love tinkering with different technologies and exploring their inner workings.<br/>"
          )
          .pauseFor(300)
          .typeString(
            "My interests include CTF challenges and competitive programming.<br/>"
          )
          .pauseFor(300)
          .typeString("Feel free to check my work.<br/>");
      }}
    />
  );
};

export default App;
