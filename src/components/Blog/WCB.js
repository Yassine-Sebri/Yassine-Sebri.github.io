import vim from "./img/WCB/vim.png";
import nasm from "./img/WCB/nasm.png";
import hexdump from "./img/WCB/hexdump.png";
import qemu from "./img/WCB/qemu.png";
import vim2 from "./img/WCB/vim2.png";
import qemu2 from "./img/WCB/qemu2.png";
import vim3 from "./img/WCB/vim3.png";
import qemu3 from "./img/WCB/qemu3.png";

const WCB = () => {
  return (
    <div>
      <br />
      <h1>Writing a Custom Bootloader</h1>
      2021-03-07
      <br />
      <br />
      So I've been planning on writing my own operating system for a while and I
      think now that I understand the basics of how it all works I should try
      doing it. It probably won't be easy but hopefully by the end of it I will
      have a better understanding of how computers do their magic.
      <br />
      <br />
      Anyway, why did I decide that a bootloader should be the first software I
      write if I'm going to create an OS? That's because a bootloader is the
      first program loaded into memory by the BIOS when you boot up a computer.
      It's the bootloader's job to help the computer find the operating system,
      though in most cases it just loads a second bootloader because the first
      one is very limited in size (512 bytes only).
      <br />
      <br />
      We're going to write the program in assembly so we need a tool to
      translate our instructions to opcode, and{" "}
      <a href="https://www.nasm.us/" target="__blank">
        NASM
      </a>{" "}
      is perfect for that. We're also using{" "}
      <a href="https://www.qemu.org/" target="__blank">
        QEMU
      </a>{" "}
      to emulate the booting process. With that out of the way, let's try
      creating our bootloader.
      <br />
      <br />
      <img src={vim} alt="Bootloader code" />
      <br />
      <br />
      The first thing to do is to make sure that creates code for a CPU in 16
      bits mode because all x86 CPUs start in 16 bits mode when reset. The next
      piece of code is what the CPU is going to execute after the bootloader is
      loaded in memory. In this case, it's an infinite loop that won't do
      anything but we'll change that eventually.
      <br />
      <br />
      Line 8 pads the program with 0s till it reaches byte 510. It does that
      because our bootloader needs to be 512 bytes in size and end with{" "}
      <span id="code">0x55aa</span>. The reason why it's{" "}
      <span id="code">0xaa55</span> in code is that x86 CPUs use little endian
      notation, so they have to be inversed.
      <br />
      <br />
      <img src={nasm} alt="nasm" />
      <br />
      <br />
      Next we "compile" our code with NASM like so. The{" "}
      <span id="keyword">-f bin</span> option instructs NASM to produce raw
      machine code rather than a package for linking. We can check the output
      using the <span id="keyword">hexdump</span> command.
      <br />
      <br />
      <img src={hexdump} alt="hexdump" />
      <br />
      <br />
      The file is exaclty what we need it to be. Let's try runnning it using
      QEMU.
      <br />
      <br />
      <img src={qemu} alt="qemu" />
      <br />
      <br />
      Seems like our binary is working as expected, but It's not doing much.
      Let's try making it print some text. To do that we will use a{" "}
      <a
        href="https://en.wikipedia.org/wiki/BIOS_interrupt_call"
        target="__blank"
      >
        BIOS interrupt call
      </a>{" "}
      as follows.
      <br />
      <br />
      <img src={vim2} alt="Interrupt call" />
      <br />
      <br />
      We "compile" our code and run it in QEMU. As we can see, we were able to
      print a character on screen.
      <br />
      <br />
      <img src={qemu2} alt="qemu" />
      <br />
      <br />
      Now, let's try something more complicated, like printing some ASCII art on
      boot. To do that we will need to use more{" "}
      <a href="https://en.wikipedia.org/wiki/INT_10H" target="__blank">
        INT 10H
      </a>{" "}
      functions.
      <br />
      <br />
      <img src={vim3} alt="final program" />
      <br />
      <br />
      And done! Now we just have to "compile" our code and run it on QEMU.
      <br />
      <br />
      <img src={qemu3} alt="final product" />
    </div>
  );
};

export default WCB;
