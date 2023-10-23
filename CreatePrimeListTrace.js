/*
 * File: CreatePrimeListTrace.js
 * -----------------------
 * This file traces the CreatePrimeList implementation.
 */

"use strict";

function CreatePrimeListDemo() {
    new CreatePrimeListTrace();
}

class CreatePrimeListTrace extends CodeTrace {

    constructor() {
        super("CreatePrimeListTrace");
        this.reset();
    }

    setParameters() {
        this.setMaxStackDepth(1);
        this.setFrameHeight(CreatePrimeListTrace.FRAME_HEIGHT);
        this.setFrameDeltas(CreatePrimeListTrace.FRAME_DX,
                            CreatePrimeListTrace.FRAME_DY);
        this.keepLastFrame(true);
    }

    defineFunctions() {
        this.defineFunction("create_prime_list", new CreatePrimeList());
    }

    reset() {
        let stdout = document.getElementById("CreatePrimeListConsole");
        stdout.innerHTML = ("<span class='prompt'>&gt;&gt;&gt;</span> " +
                            "create<span class='u'>_</span>" +
                            "prime<span class='u'>_</span>" +
                            "list(20)<br />");
        super.reset();
    }

    run() {
        this.call("create_prime_list", 20);
    }

}

CreatePrimeListTrace.FRAME_HEIGHT = 460;
CreatePrimeListTrace.FRAME_DX = 16;
CreatePrimeListTrace.FRAME_DY = 55;
CreatePrimeListTrace.INT_WIDTH = 160;
CreatePrimeListTrace.VAR_HEIGHT = 50;

class CreatePrimeList extends CTFunction {

    constructor() {
        super(CreatePrimeList.HTML);
    }

    createFrame(ct) {
        let cf = new CTStackFrame(ct, this);
        cf.addVariable("array", CreatePrimeListTrace.INT_WIDTH,
                                CreatePrimeListTrace.VAR_HEIGHT);
        cf.addVariable("limit", CreatePrimeListTrace.INT_WIDTH,
                                CreatePrimeListTrace.VAR_HEIGHT);
        cf.addVariable("n", CreatePrimeListTrace.INT_WIDTH,
                            CreatePrimeListTrace.VAR_HEIGHT);
        cf.addVariable("k", CreatePrimeListTrace.INT_WIDTH,
                            CreatePrimeListTrace.VAR_HEIGHT);
        cf.layoutVariables();
        return cf;
    }

    async run(ct) {
        let cf = ct.getCurrentFrame();
        let limit = ct.pop();
        cf.set("limit", limit);
        let array = undefined;
        let n = 1;
        let i = 0;
        await ct.traceStep("#1",
            function() {
                let x = 15;
                let y = CreatePrimeListTrace.FRAME_HEIGHT + 50;
                cf.addArray(array = new CTArray("", limit), x, y);
                for (let i = 0; i < limit; i++) {
                    array.set(i, "?");
                }
            });
        await ct.traceStep("#2", () => undefined);
        while (await ct.traceStep("#2a",
                   function() {
                       if (++n >= limit) {
                           return false;
                       } else {
                           cf.set("n", n);
                           return true;
                       }
                   })) {
            if (await ct.traceStep("#3", () => array.get(n) === "?")) {
                await ct.traceStep("#4", () => array.set(n, "P"));
                await ct.traceStep("#5", () => undefined);
                let k = n;
                while (await ct.traceStep("#5a",
                           function() {
                               if ((k += n) >= limit) {
                                   return false;
                               } else {
                                   cf.set("k", k);
                                   return true;
                               }
                           })) {
                    await ct.traceStep("#6", () => array.set(k, "C"));
                }
            }
        }
        return await ct.traceStep("#7",
            function() {
                let s = "";
                for (let i = 0; i < limit; i++) {
                    if (array.get(i) === "P") {
                        if (s !== "") {
                            s += ", ";
                        }
                        s += i;
                    }
                }
                println("[" + s + "]");
            });

        function println(s) {
            let stdout = document.getElementById("CreatePrimeListConsole");
            stdout.innerHTML += "<span class='output'>" + s + "</span><br />";
            stdout.scrollTop = stdout.scrollHeight;
        }

    }
}

CreatePrimeList.HTML =
    "<span class='keyword'>def</span> " +
         "create<span class='u'>_</span>prime<span class='u'>_</span>list" +
         "(limit):\n" +
    "    <span class='#1'>array = [ <span class='strlit'>\"?\"</span> ] * " +
         "limit</span>\n" +
    "    <span class='#2'><span class='keyword'>for</span> " +
         "<span class='#2a'>n <span class='keyword'>in</span> " +
         "<span class='builtin'>range</span>(2, limit)</span>:</span>\n" +
    "        <span class='#3'><span class='keyword'>if</span> " +
         "array[n] == <span class='strlit'>\"?\"</span>:</span>\n" +
    "            <span class='#4'>array[n] = " +
         "<span class='strlit'>\"P\"</span></span>\n" +
    "            <span class='#5'><span class='keyword'>for</span> " +
         "<span class='#5a'>k <span class='keyword'>in</span> " +
         "<span class='builtin'>range</span>(2 * n, limit, n)</span>:" +
         "</span>\n" +
    "                <span class='#6'>array[k] = " +
         "<span class='strlit'>\"C\"</span></span>\n" +
    "    <span class='#7'><span class='keyword'>return</span> " +
         "[ i <span class='keyword'>for</span> i " +
         "<span class='keyword'>in</span> " +
         "<span class='builtin'>range</span>(limit) " +
         "<span class='keyword'>if</span> " +
         "array[i] == <span class='strlit'>\"P\"</span> ]</span>\n";