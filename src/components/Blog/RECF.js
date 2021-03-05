import RECFZIP from "./img/RECFZIP.png";
import RECFread from "./img/RECFread.png";
import RECFbin from "./img/RECFbin.png";
import RECFdd from "./img/RECFdd.png";
import RECFlzma from "./img/RECFlzma.png";
import RECFbin2 from "./img/RECFbin2.png";
import RECFlzma2 from "./img/RECFlzma2.png";
import RECFcpio from "./img/RECFcpio.png";
import RECFfs from "./img/RECFfs.png";

const RECF = () => {
  return (
    <div>
      <br />
      <h1>Reverse-Engineering A Camera's Firmware</h1>
      2021-03-04
      <br />
      <br />I decided to get into reverse engineering firmware in order to
      understand how low level components work a bit better. In case you don't
      know what firmware is, it's a special piece of software that dictates how
      hardware works. Without firmware, hardware would just be a an assemblage
      of electronic components lacking purpose.
      <br />
      <br />
      To get started, I downloaded the firmware of an old D-Link camera. If you
      want to follow along, you can download the firmware{" "}
      <a href="http://legacyfiles.us.dlink.com/DCS-932L/REVA/FIRMWARE/DCS-932L_REVA_FIRMWARE_1.14.04.ZIP">
        here
      </a>
      . With that out of the way, let us get started.
      <br />
      <br />
      The first step is to unzip the file we have. It seems to contain a pdf
      file and .bin file.
      <br />
      <br />
      <img src={RECFZIP} alt="Unzipping" />
      <br />
      <br />A quick look at the binary file tells us that it's not
      human-readable. We can use the <span id="keyword">strings</span> command
      to extract redable words but that won't get us far. We need to find a
      different method in order to extract information.
      <br />
      <br />
      <img src={RECFread} alt="Binary file" />
      <br />
      <br />
      This is where <a href="https://github.com/ReFirmLabs/binwalk">
        binkwalk
      </a>{" "}
      comes in. It's a fast, easy to use tool for analyzing, reverse
      engineering, and extracting firmware images. It will parse the file and
      return a table of content based on what it finds. Let's try running it
      against our binary.
      <br />
      <br />
      <img src={RECFbin} alt="binwalk output" />
      <br />
      <br />
      It seems we were able to get some pretty useful information. At{" "}
      <span id="code">0x19F70</span> sits a U-Boot string. U-Boot is a popular,
      open-source bootloader used in embedded devices. A bootloader's job is to
      load the OS when the device is turned on. At{" "}
      <span id="code">0x50000</span> we can find the uImage header which
      contains useful information. This camera seems to use a MIPS CPU and use
      Linux as an OS. The kernel image uses LZMA compression and it starts at{" "}
      <span id="code">0x50040</span>. Let's try extracting it!
      <br />
      <br />
      To do that, we will use the <span id="keyword">dd</span> command.
      <br />
      <br />
      <img src={RECFdd} alt="dd" />
      <br />
      <br />
      The <span id="keyword">if</span> option stands for input file. The{" "}
      <span id="keyword">skip</span> option allows you to specify which byte you
      want to start copying from and <span id="keyword">of</span> stands for
      output file. You probably noticed that I skipped the{" "}
      <span id="keyword">bs</span> option (which stands for block size) and
      that's because it would take a while to explain. If you're curious you can
      just google it but it's not very important for our purposes here. We can
      check the output file with the <span id="keyword">file</span> command and
      it confirms that it is indeed LZMA compressed data.
      <br />
      <br />
      Next, we should unpack the output file with the{" "}
      <span id="keyword">unlzma</span> command.
      <br />
      <br />
      <img src={RECFlzma} alt="unlzma" />
      <br />
      <br />
      It seems that the decompressed file might be another binary, so let's use
      binwalk to check it out.
      <br />
      <br />
      <img src={RECFbin2} alt="binwalk output" />
      <br />
      <br />
      We learn that the camera is using Linux kernel version 2.6, which was
      released around 15 years ago, even though the image itself is relatively
      recent. This means that it could potentially be vulnerable to tons of
      kernel exploits that have been discovered over the years. There is also
      more LZMA compressed data so let's extract it.
      <br />
      <br />
      <img src={RECFlzma2} alt="unlzma" />
      <br />
      <br />
      It seems we found a cpio archive. Let's extract it!
      <br />
      <br />
      <img src={RECFcpio} alt="extract cpio archive" />
      <br />
      <br />
      You can find what these options di with a simple{" "}
      <span id="keyword">man</span> but I think I should mention that the most
      critical one is <span id="keyword">--no-absolute-filenames</span> because
      without it you might risk overwriting your root directory.
      <br />
      <br />
      Et voila! We were able to extract the file system from the firmware,
      giving us a better chance to understand how exactly this camera works.
      <br />
      <br />
      <img src={RECFfs} alt="Linux filesystem" />
    </div>
  );
};

export default RECF;
