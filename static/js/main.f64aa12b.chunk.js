(this.webpackJsonpterminal=this.webpackJsonpterminal||[]).push([[0],{30:function(e,t,s){},31:function(e,t,s){"use strict";s.r(t);var i=s(1),c=s.n(i),r=s(14),n=s.n(r),a=s(7),o=s(0),j=function(){return Object(o.jsx)("header",{children:Object(o.jsxs)("nav",{children:[Object(o.jsx)(a.b,{to:"/",className:"underline",children:"/About"}),Object(o.jsx)(a.b,{to:"/Projects",className:"underline",children:"/Projects"}),Object(o.jsx)(a.b,{to:"/Writeups",className:"underline",children:"/Writeups"}),Object(o.jsx)("a",{href:"mailto:yassine.sebri@enetcom.u-sfax.tn ",className:"underline",children:"/Contact"})]})})},d=function(){return Object(o.jsx)("div",{className:"site-title",children:Object(o.jsxs)("h1",{children:["yassine@dev:$",Object(o.jsx)("span",{class:"cursor",children:"\u2588"})]})})},b=s(16),l=s.n(b),h=function(){return Object(o.jsx)(l.a,{options:{loop:!1,delay:65,autoStart:!0,cursor:"\u2588",strings:[""]},onInit:function(e){e.typeString("Hi! <br>").pauseFor(300).typeString(" I'm Yassine,").pauseFor(100).typeString(" a student,").pauseFor(100).typeString(" developer and hacker.<br/>").pauseFor(500).typeString("I love tinkering with different technologies and exploring their inner workings.<br/>").pauseFor(300).typeString("My interests include CTF challenges and competitive programming.<br/>").pauseFor(300).typeString("Feel free to check my work.<br/>")}})},p=function(){return Object(o.jsxs)("footer",{children:[Object(o.jsx)("a",{href:"https://www.linkedin.com/in/yassinesebri/",class:"svglink",target:"__blank",children:Object(o.jsx)("i",{class:"fab fa-linkedin"})}),Object(o.jsx)("a",{href:"https://github.com/Yassine-Sebri/",class:"svglink",target:"__blank",children:Object(o.jsx)("i",{class:"fab fa-github"})}),Object(o.jsx)("a",{href:"https://twitter.com/root0x03",class:"svglink",target:"__blank",children:Object(o.jsx)("i",{class:"fab fa-twitter"})}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"\xa9 Copyright 2021 - Yassine Sebri."]})},x=function(){return Object(o.jsxs)("div",{id:"Writeups",children:["2021-03-01 -"," ",Object(o.jsx)(a.b,{to:"/Writeups/Microcorruption-Sydney",className:"highlight",children:"Microcorruption: Sydney"}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"2021-02-28 -"," ",Object(o.jsx)(a.b,{to:"/Writeups/Microcorruption-New-Orleans",className:"highlight",children:"Microcorruption: New Orleans"})]})},u=s.p+"static/media/NOmain.ae5582a9.png",O=s.p+"static/media/NOcreate.f20144c7.png",m=s.p+"static/media/NOcheck.4df114ba.png",g=s.p+"static/media/NOmemory.5e47a375.png",f=s.p+"static/media/NOsolved.79735ff6.png",w=function(){return Object(o.jsxs)("div",{children:[Object(o.jsx)("br",{}),Object(o.jsx)("h1",{children:"Microcorruption: New Orleans"}),"2021-02-28",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"This will be the first of a series of posts where I detail my answers to various"," ",Object(o.jsx)("a",{href:"https://microcorruption.com/",target:"__blank",children:"microcorruption"})," ","ctf challenges. The objective of these challenges is to unlock a device by reverse-engineering its code and exploiting its vulnerabilities. With that out of the way, let's get hacking!",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"The first thing I did was set up a break point at"," ",Object(o.jsx)("span",{id:"code",children:"main"}),", since that's the entry point for our program.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("img",{src:u,alt:"main"}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"This code might seem intimidating if you aren't familiar with assembly, but it's actually quite simple. First, it calls a"," ",Object(o.jsx)("span",{id:"code",children:"create_password"})," function, then it prints a string with the ",Object(o.jsx)("span",{id:"code",children:"puts"})," function. Next, it gets a password from the user and checks if it's correct. Depending on the content of"," ",Object(o.jsx)("span",{id:"code",children:"r15"})," after ",Object(o.jsx)("span",{id:"code",children:"check_password"})," is executed, the door will either unlock or remain locked.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"First of all, Let's take a closer look at"," ",Object(o.jsx)("span",{id:"code",children:"create_password"}),", since it seems like a promising function.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("img",{src:O,alt:"create_password"}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"The first instruction seems to be saving a hex number into"," ",Object(o.jsx)("span",{id:"code",children:"r15"})," which will act as a memory address, then it proceeds to move 8 bytes into memory address ",Object(o.jsx)("span",{id:"code",children:"0x2400"})," ","to ",Object(o.jsx)("span",{id:"code",children:"0x2407"}),". it's probably safe to assume that the program will compare this sequence of bytes to the password given by the user later on, but let's follow along for now.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("img",{src:m,alt:"check_password"}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"A quick read through ",Object(o.jsx)("span",{id:"code",children:"check_password"})," shows us that it follows the structure of a while loop, where"," ",Object(o.jsx)("span",{id:"code",children:"r14"})," acts as a counter starting from 0 till it reaches the value 8. ",Object(o.jsx)("span",{id:"code",children:"r14"})," will increment if the bytes at address ",Object(o.jsx)("span",{id:"code",children:"0x2400"})," previously set by the"," ",Object(o.jsx)("span",{id:"code",children:"create_password"})," function match the user input stored at the memory address in r13. if ",Object(o.jsx)("span",{id:"code",children:"r14"})," reaches 8, ",Object(o.jsx)("span",{id:"code",children:"r15"})," receives the value 1 which will then unlock the door.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"Knowing that, we just have to enter the string stored"," ",Object(o.jsx)("span",{id:"code",children:"0x2400"})," to solve the challenge. We can copy the string using the Live Memory Dump window.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("img",{src:g,alt:"Live Memory Dump"}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"Et voila! It was a pretty straightforward solution meant to familiarize newcomers with reading and understanding assembly code.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("img",{src:f,alt:"Challenge solved"})]})},y=s.p+"static/media/Smain.95a7407e.png",v=s.p+"static/media/Scheck.e265bc37.png",k=s.p+"static/media/Ssolved.acc97ee8.png",S=function(){return Object(o.jsxs)("div",{children:[Object(o.jsx)("br",{}),Object(o.jsx)("h1",{children:"Microcorruption: Sydney"}),"2021-03-01",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"As usual, let's start by taking a look at the ",Object(o.jsx)("span",{id:"code",children:"main"})," ","function.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("img",{src:y,alt:"main"}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"Unlike last time, there doesn't seem to be a"," ",Object(o.jsx)("span",{id:"code",children:"create_password"})," function, but the flow is pretty similar. First it gets a password from the user then it executes the"," ",Object(o.jsx)("span",{id:"code",children:"check_password"})," function, and depending on the value of ",Object(o.jsx)("span",{id:"code",children:"r15"})," after the execution it decides whether to open the lock or not. It seems that the"," ",Object(o.jsx)("span",{id:"code",children:"check_password"})," function is key in this whole thing, so let's check it out.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("img",{src:v,alt:"check_password"}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"The ",Object(o.jsx)("span",{id:"code",children:"check_password"})," performs a series of comparisons between the values stored at an offset from memory address"," ",Object(o.jsx)("span",{id:"code",children:"r15"})," and a set of hexadecimal values. If the values match then ",Object(o.jsx)("span",{id:"code",children:"r15"})," would receive the value 1, fulfilling the condition for unlocking the door. The memory values stored at ",Object(o.jsx)("span",{id:"code",children:"r15"})," represent the password entered by the user, so all we have to do to solve the challenge is submit the hexadecimal values found in this function.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),'Submitting the values as is won\'t solve the challenge, however. This challenge was probably designed to teach people about the concepts of "big endian" and "little endian". A big endian system stores the most significant byte of a word at the smallest memory address while a little endian system does the opposite. This might seem a bit confusing but it just means that if you give a 16 bit CPU that uses little endian a value of ',Object(o.jsx)("span",{id:"code",children:"0x4142"}),", for example, it will be stored in memory as ",Object(o.jsx)("span",{id:"code",children:"0x4241"}),".",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"So in order to solve the challenge, we have to invert the hexadecimal values in the ",Object(o.jsx)("span",{id:"code",children:"check_password"})," function two by two. So in this case the password would be (in hexadecimal)"," ",Object(o.jsx)("span",{id:"code",children:"2e3c62496638332b"}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("img",{src:k,alt:"solved"})]})},_=s(2);var N=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)(a.a,{children:[Object(o.jsxs)("div",{id:"container",children:[Object(o.jsx)(j,{}),Object(o.jsx)(d,{}),Object(o.jsx)(_.a,{path:"/",exact:!0,render:function(e){return Object(o.jsx)("span",{id:"type",children:Object(o.jsx)(h,{})})}}),Object(o.jsx)(_.a,{path:"/Writeups",exact:!0,component:x}),Object(o.jsx)(_.a,{path:"/Writeups/Microcorruption-New-Orleans",component:w}),Object(o.jsx)(_.a,{path:"/Writeups/Microcorruption-Sydney",component:S})]}),Object(o.jsx)(p,{})]})})};s(30);n.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(N,{})}),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.f64aa12b.chunk.js.map