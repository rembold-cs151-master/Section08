---
title: "Section 07: Lists"
author: Jed Rembold and Eric Roberts
date: "Week of October 23rd"
slideNumber: true
theme: monokai
highlightjs-theme: monokai
width: 1920
height: 1080
transition: fade
css:
  - css/codetrace.css
  - css/roberts.css
  - CreatePrimeListTrace.css
tracejs:
  - CreatePrimeList
---


## List Comprehensions
- The simplest syntax for a list comprehension is
  ```mypython
  [ |||expression||| |||iterator||| ]
  ```
  where _expression_ is any Python expression and _iterator_ is a `for` loop header that enumerates a sequence of values.
- The _iterator_ component of the comprehension can be followed by any number of additional modifiers, each of which is the header line for either:
  - another `for` loop statement to specify a nested loop
  - or an `if` statement to only select certain values.
  ```mypython
  [ i for i in range(limit) if is_prime(i) ]
  ```

## Problem 1 -- Reading List Comprehensions
What are values of the following Python expressions?

:::incremental
- `[ d for d in range(10) ]`
  - Solution: `[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]`
- `[ x ** 2 for x in range(10) ]`
  - Solution: `[ 0, 1, 4, 9, 16, 25, 36, 59, 64, 81 ]`
- `[ chr(ord("A") + i) for i in range(5) ]`
  - Solution: `[ "A", "B", "C", "D", "E" ]`
- `[ w for w in ENGLISH_WORDS if len(w) == 1 ]`
  - Solution: `[ "a", "i", "o"]`
:::

<!--
```{.mypython data-line-numbers=2}
>>> [d for d in range(10)]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```
-->

## Problem 1 -- Writing List Comprehensions
How would you express the following values using a list comprehension?

:::incremental
- `[ "0", "1", "2", "3", "4", "5", "6", "7" ]`{.mypython}
  - Solution: `[ str(i) for i in range(8) ]`
- `[ 1, 10, 100, 1000, 10000, 100000 ]`{.mypython}
  - Solution: `[ 10 ** x for x in range(6) ]`
- The total number of English palindromes (where a word is the same forward and backwards)
  - Solution: `len([ w for w in ENGLISH_WORDS if w == w[::-1] ])`
:::


## Problem 2
- Each of the films in _The Matrix_ series (including the most recent _The Matrix: Resurrections_ from 2021) opens with an iconic title sequence in which green characters appear in columns down the screen, like this:

![](./video/MatrixTitlesShort.mov){width=50%}


## Simulating Matrix Titles
:::{.incremental style='font-size:.9em'}
To recreate such an effect in PGL, you have simply to:

- Create a `GWindow`
- Add a black `GRect` as a background
- Initialize a list to tabulate how many characters have been added in each column
- On each time step:
  - Pick a number between 12448 (`0x30A0`) and 12543 (`0x30FF`), the unicode block of katakana characters
  - Use `chr` to actually create a katakana character
  - Create a `GLabel` with that character
  - Add the `GLabel` to the bottom of a randomly chosen column, where you can track where the "bottom" is at from your earlier list
- Stop when one column fills
:::

## The Matrix: Solutions
```{.mypython style='max-height:850px; font-size: .75em;'}
from pgl import GWindow, GLabel, GRect
from random import randrange

# Constants
GWINDOW_WIDTH = 1000
GWINDOW_HEIGHT = 500
N_COLUMNS = 50
TIME_STEP = 10
LABEL_FONT = "14px 'Sans-Serif'"
LABEL_COLOR = "#66CC66"
KATAKANA_START = 0x30A0
KATAKANA_END = 0x3100

# Derived constant
COLUMN_WIDTH = GWINDOW_WIDTH / N_COLUMNS

def matrix_titles():

    def step():
        col = randrange(0, N_COLUMNS)
        counts[col] += 1
        label = GLabel(chr(randrange(KATAKANA_START, KATAKANA_END)))
        label.set_font(LABEL_FONT)
        label.set_color(LABEL_COLOR)
        x = (col + 0.5) * COLUMN_WIDTH - label.get_width() / 2
        y = counts[col] * label.get_height()
        if y >= GWINDOW_HEIGHT:
            timer.stop()
        else:
            gw.add(label, x, y)

    gw = GWindow(GWINDOW_WIDTH, GWINDOW_HEIGHT)
    bg = GRect(GWINDOW_WIDTH, GWINDOW_HEIGHT)
    bg.set_filled(True)
    bg.set_color("Black")
    gw.add(bg)
    counts = [ 0 ] * N_COLUMNS
    timer = gw.set_interval(step, TIME_STEP)

# Startup code

if __name__ == "__main__":
    matrix_titles()
```

## Problem 3
- In this problem, your job is to implement an algorithm called the _Sieve of Eratosthenes_ after the 3rd century BCE astronomer who invented it. This algorithm generates a list of _prime numbers_, which are integers greater than 1 that have no divisors except themselves and 1.
- The Sieve of Eratosthenes requires the following steps, illustrated here for the integers between 2 and 19:
  <ul>
    <li class='fragment' data-fragment-index=0> List the integers starting with 2 </li>
    <li class='fragment' data-fragment-index=1> Circle the first unmarked number in the list </li>
    <li class='fragment' data-fragment-index=2> Cross out all multiples of that number </li>
    <li class='fragment' data-fragment-index=3> Repeat from step 2 until no more unmarked numbers </li>
    <li class='fragment' data-fragment-index=11> The prime numbers are the circled values </li>
  </ul>

![](./images/sieve.svg)

## Primes Solved
```{.mypython style='max-height:850px; font-size:.8em'}

def create_prime_list(limit):
    """Returns a list of all primes less than limit."""
    array = [ "?" ] * limit
    for n in range(2, limit):
        if array[n] == "?":
            array[n] = "P"
            for k in range(2 * n, limit, n):
                array[k] = "C"
    return [ i for i in range(limit) if array[i] == "P" ]

# Startup code

if __name__ == "__main__":
    print(create_prime_list(20))
```

## Tracing the Sieve {data-state=CreatePrimeListTrace}

<table id="CreatePrimeListTable">
<tbody style="border:none;">
<tr><td><div id="CreatePrimeListTrace" style="margin:0px;"></div></td></tr>
<tr><td>
<div id="CreatePrimeListBanner" style="margin:0px; padding:0px;">Console</div>
</td></tr>
<tr><td><div id="CreatePrimeListConsole"></div></td></tr>
<tr>
<td style="text-align:center;">
<table class="CTControlStrip">
<tbody>
<tr>
<td>
<img id=CreatePrimeListTraceStepInButton
     class="CTButton"
     src="images/StepInControl.png"
     alt="StepInButton" />
</td>
<td>
<img id=CreatePrimeListTraceResetButton
     class="CTButton"
     src="images/ResetControl.png"
     alt="ResetButton" />
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</table>
