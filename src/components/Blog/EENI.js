import find from "./img/EENI/find.png";
import level00 from "./img/EENI/level00.png";
import code1 from "./img/EENI/code1.png";
import echo from "./img/EENI/echo.png";
import path from "./img/EENI/path.png";
import code2 from "./img/EENI/code2.png";
import level02 from "./img/EENI/levle02.png";
import code3 from "./img/EENI/code3.png";
import script from "./img/EENI/script.png";
import level03 from "./img/EENI/levle03.png";
import code4 from "./img/EENI/code4.png";
import level04 from "./img/EENI/levle04.png";

const EENI = () => {
  return (
    <div>
      <br />
      <h1>Exploit Education: Nebula - Part I</h1>
      2021-03-14
      <br />
      <br />
      This will be the first of a series of writeups documenting how I exploit{" "}
      <a href="https://exploit.education/nebula/" target="__blank">
        Nebula
      </a>
      , a vulnerable machine provided by{" "}
      <a href="https://exploit.education" target="__blank">
        Exploit Education
      </a>
      . It might be a little bit on the easy side because it's meant to
      introduce people to linux exploitation, but everyone could use a refresher
      on the basics every now and then, right? Anyway, let's dive in!
      <br />
      <br />
      The first challenge asks us to find a <span id="keyword">
        Set UID
      </span>{" "}
      program that will run as flag00. Set UID or SUID for short is a special
      file permission that allows a user to run a program with the privileges of
      the user that owns the file. This can allow users to execute programs that
      require higher privileges without the need for an intermediate such as
      sudo.
      <br />
      <br />
      After we ssh into the machine, we login as level00. Next we run a{" "}
      <span id="keyword">find</span> command to look for the SUID program. We
      specify that we want to start looking from the root directory, then we add
      the user and permission flags. We also tell the command To execute the ls
      command when it finds a corresponding file and finally we redirect all
      errors to /dev/null.
      <br />
      <br />
      <img src={find} alt="" />
      <br />
      <br />
      And we get a hit. We excute the program we found and that gets us a shell
      as flag00.
      <br />
      <br />
      <img src={level00} alt="" />
      <br />
      <br />
      That was pretty easy. Let's move on to the second challenge.
      <br />
      <br />
      It shows us some C code and asks us to find a vulnerability.
      <br />
      <br />
      <img src={code1} alt="" />
      <br />
      <br />
      The vulnerability is easy to spot if you're used to this kind of thing and
      that's that echo doesn't use an absolute path. We can exploit that by
      writing an echo program and putting it into the tmp folder, then adding
      the tmp folder to the path.
      <br />
      <br />
      <img src={echo} alt="" />
      <br />
      <img src={path} alt="" />
      <br />
      <br />
      <span id="keyword">level02</span> asks the same thing with this code:
      <br />
      <br />
      <img src={code2} alt="" />
      <br />
      <br />
      The vulnerability here is that the binary uses an environment variable
      that we can modify. We simply need to change the value of the{" "}
      <span id="keyword">USER</span> variable.
      <br />
      <br />
      <img src={level02} alt="" />
      <br />
      <br />
      <span id="keyword">level03</span> tells us that there is a crontab being
      called every couple of minutes. A cron is just a program that gets
      executed regularly after a fixed period of time. The flag03 directory only
      has a file and a directory. The file is call writable.sh so we can assume
      that's the one being executed by the cron.
      <br />
      <br />
      <img src={code3} alt="" />
      <br />
      <br />
      The script is pretty easy to follow. It scans the writable.d directory for
      executable files, excutes them then removes them. So we just need a simple
      script to get the flag.
      <br />
      <br />
      <img src={script} alt="" />
      <br />
      <br />
      Now we just wait for a the cron to be executed.
      <br />
      <br />
      <img src={level03} alt="" />
      <br />
      <br />
      This is the code for <span id="keyword">level04</span>.
      <br />
      <br />
      <img src={code4} alt="" />
      <br />
      <br />
      The objective is to read a file called token, but the problem is that the
      code refuses to read any file with the word token in it. The solution is
      to use <span id="keyword">symbolic links</span>.
      <br />
      <br />
      <img src={level04} alt="" />
      <br />
      <br />
      And that concludes the first part of this series. These first challenges
      turned out to be quite easy, but I kind of expected that. Maybe There will
      be more interesting ones in the future.
    </div>
  );
};

export default EENI;
