import main from "./img/Smain.png";
import check from "./img/Scheck.png";
import solved from "./img/Ssolved.png";

const MCS = () => {
  return (
    <div>
      <br />
      <h1>Microcorruption: Sydney</h1>
      2021-03-01
      <br />
      <br />
      As usual, let's start by taking a look at the <span id="code">
        main
      </span>{" "}
      function.
      <br />
      <br />
      <img src={main} alt="main" />
      <br />
      <br />
      Unlike last time, there doesn't seem to be a{" "}
      <span id="code">create_password</span> function, but the flow is pretty
      similar. First it gets a password from the user then it executes the{" "}
      <span id="code">check_password</span> function, and depending on the value
      of <span id="code">r15</span> after the execution it decides whether to
      open the lock or not. It seems that the{" "}
      <span id="code">check_password</span> function is key in this whole thing,
      so let's check it out.
      <br />
      <br />
      <img src={check} alt="check_password" />
      <br />
      <br />
      The <span id="code">check_password</span> performs a series of comparisons
      between the values stored at an offset from memory address{" "}
      <span id="code">r15</span> and a set of hexadecimal values. If the values
      match then <span id="code">r15</span> would receive the value 1,
      fulfilling the condition for unlocking the door. The memory values stored
      at <span id="code">r15</span> represent the password entered by the user,
      so all we have to do to solve the challenge is submit the hexadecimal
      values found in this function.
      <br />
      <br />
      Submitting the values as is won't solve the challenge, however. This
      challenge was probably designed to teach people about the concepts of "big
      endian" and "little endian". A big endian system stores the most
      significant byte of a word at the smallest memory address while a little
      endian system does the opposite. This might seem a bit confusing but it
      just means that if you give a 16 bit CPU that uses little endian a value
      of <span id="code">0x4142</span>, for example, it will be stored in memory
      as <span id="code">0x4241</span>.
      <br />
      <br />
      So in order to solve the challenge, we have to invert the hexadecimal
      values in the <span id="code">check_password</span> function two by two.
      So in this case the password would be (in hexadecimal){" "}
      <span id="code">2e3c62496638332b</span>
      <br />
      <br />
      <img src={solved} alt="solved" />
    </div>
  );
};

export default MCS;
