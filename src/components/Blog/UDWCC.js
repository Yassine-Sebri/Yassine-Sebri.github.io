import fork from "./img/UDWCC/fork.png";
import pid1 from "./img/UDWCC/pid1.png";
import pid2 from "./img/UDWCC/pid2.png";
import pstree from "./img/UDWCC/pstree.png";
import pidns from "./img/UDWCC/pidns.png";
import pid3 from "./img/UDWCC/pid3.png";
import pid4 from "./img/UDWCC/pid4.png";
import shell from "./img/UDWCC/shell.png";
import ps from "./img/UDWCC/ps.png";
import mount from "./img/UDWCC/mount.png";
import shell2 from "./img/UDWCC/shell2.png";
import shell3 from "./img/UDWCC/shell3.png";
import shell4 from "./img/UDWCC/shell4.png";

const UDWCC = () => {
  return (
    <div>
      <br />
      <h1>Understanding Docker by Writing a Custom Container</h1>
      2021-03-11
      <br />
      <br />
      I've been playing around with Docker for the past of days. It's an
      interesting technology because of how versatile it is, with its use cases
      ranging from application building and deployement to CTF challenges. But
      how does it work exactly?
      <br />
      <br />
      <a
        href="https://www.youtube.com/channel/UClcE-kVhqyiHCcjYwcpfj9w"
        target="__blank"
      >
        LiveOverflow
      </a>{" "}
      made an excellent{" "}
      <a href="https://youtu.be/-YnMr1lj4Z8" target="__blank">
        video
      </a>{" "}
      on the topic, and I suggest you go watch it in case you're not familiar
      with containerization. The gist of it, however, is that a container is
      just a fancy word for an application that makes use of the Linux kernel
      functionalities, mainly{" "}
      <a
        href="https://man7.org/linux/man-pages/man7/namespaces.7.html"
        target="__blank"
      >
        namespaces
      </a>
      .
      <br />
      <br />
      You can think of a namespace as a way to isolate processes. In more
      technical terms, processes within a namespace seem to have their own
      instance of resources. There are 8 types of namespaces:{" "}
      <span id="keyword">Cgroup</span>, <span id="keyword">IPC</span>,{" "}
      <span id="keyword">Network</span>, <span id="keyword">Mount</span>,{" "}
      <span id="keyword">PID</span>, <span id="keyword">Time</span>,{" "}
      <span id="keyword">User</span> and <span id="keyword">UTS</span>. With
      that, introductions are over. Let's write some code!
      <br />
      <br />
      <img src={fork} alt="testing clone" />
      <br />
      <br />
      We're going to use the{" "}
      <a
        target="blank"
        href="https://man7.org/linux/man-pages/man2/clone.2.html"
      >
        clone
      </a>{" "}
      syscall to interact with the namespace API, so it would be a good idea to
      demonstrate how it works under "normal" circumstances before diving
      deeper. What the program does is pretty simple: it prints out its{" "}
      <span id="keyword">pid</span> then it clones the{" "}
      <span id="keyword">print_pid</span> function into a child process and
      prints its <span id="keyword">pid</span>. Let's execute it.
      <br />
      <br />
      <img src={pid1} alt="output" />
      <br />
      <br />
      Hooray! We were able to clone the <span id="keyword">print_pid</span>{" "}
      function into a child process. We can also visualize this by making the
      child function sleep for some time, setting the flag to{" "}
      <span id="keyword">CLONE_VFORK</span> in the clone function so the parent
      process is suspended, then using the <span id="keyword">pstree</span>{" "}
      command.
      <br />
      <br />
      <img src={pid2} alt="output" />
      <img src={pstree} alt="output" />
      <br />
      <br />
      In case you didn't know, that's how all processes in Linux are created.
      There is a process called the <span id="keyword">init</span> process,
      which is started during the bootup process, that forks and clones itself
      to create other processes that, in turn, do the same thing. Pretty neat,
      huh? But let's not get ahead of ourselves. The point of all of this is to
      demonstrate how namespaces work, so let us get started.
      <br />
      <br />
      <img src={pidns} alt="testing pid namespace" />
      <br />
      <br />
      As you can see, the program is almost the same. The only difference is
      that this time, I set the <span id="keyword">CLONE_NEWPID</span> flag.
      Now, we just need to execute it.
      <br />
      <br />
      <img src={pid3} alt="output" />
      <br />
      <br />
      Seems like the clone function wasn't executed. The reason for that is
      explained in the{" "}
      <a
        target="blank"
        href="https://man7.org/linux/man-pages/man2/clone.2.html"
      >
        clone
      </a>{" "}
      documentation: Only a <span id="keyword">privileged</span> process can
      employ <span id="keyword">CLONE_NEWNS</span>. Let's try executing it
      again, but this time with root privileges.
      <br />
      <br />
      <img src={pid4} alt="output" />
      <br />
      <br />
      And it worked! We were successfully able to isolate the child process into
      a new PID namespace. Now, let us upgrade it into an interactive shell.
      <br />
      <br />
      <img src={shell} alt="shell code" />
      <br />
      <br />
      The code is pretty simple: the <span id="keyword">shell</span> function
      uses a <span>system</span> syscall to call the{" "}
      <span id="keyword">zsh</span> binary, which should result in an
      interactive shell. I also added the <span id="keyword">CLONE_VFORK</span>{" "}
      flag so that the program is suspended till I exit the shell.
      <br />
      <br />
      <img src={ps} alt="output" />
      <br />
      <br />
      The program was successful, but for some reason the process wasn't
      isolated in a PID namespace, at least that's what it looks like. Truth of
      the matter is that the <span id="keyword">ps</span> command works by
      reading the files in the <span id="keyword">proc filesystem</span>. So in
      order to see the PID subtree of the new namespace, we need to remount it
      after cloning the process. This means we would also need to use the mount
      namespace so we don't overwrite our original namespace. The flag for that
      is <span id="keyword">CLONE_NEWNS</span>.
      <br />
      <br />
      <img src={mount} alt="" />
      <br />
      <br />
      The <span id="keyword">shell</span> function will mount the proc file
      system when it's being executed, then after we're done with our shell we
      remount the proc filesystem back into the host. This probably isn't the
      best way to do this, but it's the only solution I could think of. If you
      have an idea about how to improve it, please do tell me.
      <br />
      <br />
      Anyway, we should now be able to see our isolated processes.
      <br />
      <br />
      <img src={shell2} alt="" />
      <br />
      <br />
      Great! Now we're one step closer to developing a full container.
      <br />
      <br />
      You probably already noticed that there is one glaring security issue with
      this setup. The processes spanwned within the namespaces we created share
      the same root mount as the host. This is extremely problematic, as any
      application within the container can read, write and execute any files
      within the host.
      <br />
      <br />
      You're probably thinking "why don't we just change the root mount for the
      child process?" and the answer is it's not that simple. If we're going to
      isolate the child process, then we need to provided the resources needed
      for its functions, such as binaries. The best way to do that is to use
      another root filesystem as a root mount.
      <br />
      <br />I decided to use{" "}
      <a target="__blank" href="https://alpinelinux.org/downloads/">
        Alpine Linux
      </a>{" "}
      for this. It's simple, lightweight, and secure. We will also need to use{" "}
      <a
        target="__blank"
        href="https://man7.org/linux/man-pages/man2/pivot_root.2.html"
      >
        pivot_root
      </a>{" "}
      to change the root directory for the child process.
      <br />
      <br />
      <img src={shell3} alt="" />
      <br />
      <br />
      It took me some time to figure out how pivot_root works, but I eventually
      did. First, you have to make sure that the new root directory is on a{" "}
      <span id="keyword">different mount</span> from the current root. We do
      that by mount binding the new root directory. Next, we create a directory
      inside of the new mount. Now we can perform the{" "}
      <span id="keyword">pivot_root</span> syscall to change the root directory
      of our new process. Finally, we chdir into / and detach the old directory
      from the mount to prevent the process from leaving the jail.
      <br />
      <br />
      Notice how I also added the <span id="keyword">CLONE_NEWUSER</span> flag
      because if I don't the process would still be running as the root of the
      original user namespace and that could cause problems. I can also safely
      mount the <span id="keyword">proc filesystem</span> since this process
      uses a different mount root. Now, let's try running it.
      <br />
      <br />
      <img src={shell4} alt="output" />
      <br />
      <br />
      And done! We were able to create an (almost) isolated space to run our
      applications while still making use of the same kernel. There is obviously
      obviously more that goes into docker containers to ensure functionalities
      such as networking, but the principle is the same. At the end of the day,
      it's just making use of the namespaces provided by the Linux kernel.
    </div>
  );
};

export default UDWCC;
