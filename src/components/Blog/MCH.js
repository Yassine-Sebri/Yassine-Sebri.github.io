import main from "./img/Hmain.png";
import login from "./img/Hlogin.png";
import test from "./img/Htest.png";
import solved from "./img/Hsolved.png";

const MCH = () => {
  return (
    <div>
      <br />
      <h1>Microcorruption: Hanoi</h1>
      2021-03-02
      <br />
      <br />
      This challenge is different from the previous ones because solving it
      doesn't involve finding the "correct" password. This might seem confusing
      but it will become clear as we try to solve the challenge.
      <br />
      <br />
      As usual, let us start by checking the <span id="code">main</span>{" "}
      function.
      <br />
      <br />
      <img src={main} alt="main" />
      <br />
      <br />
      It doesn't seem to have much going on. It just calls a{" "}
      <span id="code">login</span> function and sets <span id="code">r15</span>{" "}
      to 0 when it is done. It seems like we have to check{" "}
      <span id="code">login</span> in order to understand what exactly the
      program is doing.
      <br />
      <br />
      <img src={login} alt="login" />
      <br />
      <br />
      The first part is pretty standard. It asks the user for a password and
      then stores it at memory address <span id="code">0x2400</span>. What's
      interesting, however, is that it asks for a password between 8 and 16
      characters. Keep that in mind because it will be important. Next, it calls
      a <span id="code">test_password_valid</span> function and depending on the
      value of <span id="code">r15</span> after it's executed it decides to skip
      instruction <span id="code">0x445a</span> which sets memory address{" "}
      <span id="code">0x2410</span> to <span id="code">0x17</span> or execute
      it.
      <br />
      <br />
      Instruction <span id="code">0x455a</span> compares the value at address{" "}
      <span id="code">0x2410</span> with <span id="code">0x28</span>, and
      depending on the result the door will either unlock or remain closed. In
      other words, our objective is to somehow change the value of{" "}
      <span id="code">0x2410</span> to <span id="code">0x28</span>. Let's check{" "}
      <span id="code">test_password_valid</span> for any clues that might help.
      <br />
      <br />
      <img src={test} alt="test" />
      <br />
      <br />
      This function seems to do a lot less than I thought. The most interseting
      parts for to me were instructions <span id="code">0x445c</span> and{" "}
      <span id="code">0x4472</span>. It's just a very roundabout way of giving{" "}
      <span id="code">r15</span> the value 0 and I'm not sure if it was just
      there to confuse players or there is more to it. Either way, after
      fiddling with it for a while and being unable to figure out what I'm
      supposed to make out of this function I decided to take a step back and
      focus on what I need to do.
      <br />
      <br />
      To open the door I just need to find a way to set the value of{" "}
      <span id="code">0x2410</span> to <span id="code">0x28</span>. I know that
      the password I type will be stored at <span id="code">0x2400</span> so I
      can modify the values from there to <span id="code">0x240F</span> since
      the password should be 16 characters long...
      <br />
      <br />
      Hold on a second! There are no instructions that check if the password I
      give is 16 characters long. In other words, all I have to do is{" "}
      <span id="keyword">overflow</span> the input into the address I need by
      giving input larger than the expected size.
      <br />
      <br />I tested the idea by giving a password of 18{" "}
      <span id="code">0x28</span> and as I thought, it worked. This challenge
      was particularly fun because not only was it a good way to introduce the
      foundation for buffer overflows, but it also reminded me of how important
      it is for a hacker to think outside of the box and not be constrained by
      expected behavior.
      <br />
      <br />
      <img src={solved} alt="solved" />
    </div>
  );
};

export default MCH;
