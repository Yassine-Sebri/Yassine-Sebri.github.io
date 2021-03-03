import main from "./img/NOmain.png";
import create from "./img/NOcreate.png";
import check from "./img/NOcheck.png";
import memory from "./img/NOmemory.png";
import solved from "./img/NOsolved.png";

const MCNO = () => {
  return (
    <div>
      <br />
      <h1>Microcorruption: New Orleans</h1>
      2021-02-28
      <br />
      <br />
      This will be the first of a series of posts where I detail my answers to
      various{" "}
      <a href="https://microcorruption.com/" target="__blank">
        microcorruption
      </a>{" "}
      ctf challenges. The objective of these challenges is to unlock a device by
      reverse-engineering its code and exploiting its vulnerabilities. With that
      out of the way, let's get hacking!
      <br />
      <br />
      The first thing I did was set up a break point at{" "}
      <span id="code">main</span>, since that's the entry point for our program.
      <br />
      <br />
      <img src={main} alt="main" />
      <br />
      <br />
      This code might seem intimidating if you aren't familiar with assembly,
      but it's actually quite simple. First, it calls a{" "}
      <span id="code">create_password</span> function, then it prints a string
      with the <span id="code">puts</span> function. Next, it gets a password
      from the user and checks if it's correct. Depending on the content of{" "}
      <span id="code">r15</span> after <span id="code">check_password</span> is
      executed, the door will either unlock or remain locked.
      <br />
      <br />
      First of all, Let's take a closer look at{" "}
      <span id="code">create_password</span>, since it seems like a promising
      function.
      <br />
      <br />
      <img src={create} alt="create_password" />
      <br />
      <br />
      The first instruction seems to be saving a hex number into{" "}
      <span id="code">r15</span> which will act as a memory address, then it
      proceeds to move 8 bytes into memory address <span id="code">0x2400</span>{" "}
      to <span id="code">0x2407</span>. it's probably safe to assume that the
      program will compare this sequence of bytes to the password given by the
      user later on, but let's follow along for now.
      <br />
      <br />
      <img src={check} alt="check_password" />
      <br />
      <br />A quick read through <span id="code">check_password</span> shows us
      that it follows the structure of a while loop, where{" "}
      <span id="code">r14</span> acts as a counter starting from 0 till it
      reaches the value 8. <span id="code">r14</span> will increment if the
      bytes at address <span id="code">0x2400</span> previously set by the{" "}
      <span id="code">create_password</span> function match the user input
      stored at the memory address in r13. if <span id="code">r14</span> reaches
      8, <span id="code">r15</span> receives the value 1 which will then unlock
      the door.
      <br />
      <br />
      Knowing that, we just have to enter the string stored{" "}
      <span id="code">0x2400</span> to solve the challenge. We can copy the
      string using the Live Memory Dump window.
      <br />
      <br />
      <img src={memory} alt="Live Memory Dump" />
      <br />
      <br />
      Et voila! It was a pretty straightforward solution meant to familiarize
      newcomers with reading and understanding assembly code.
      <br />
      <br />
      <img src={solved} alt="Challenge solved" />
    </div>
  );
};

export default MCNO;
