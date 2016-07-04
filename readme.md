# Passband - A Game for Electrical Engineers and Math Nerds 

## Overview
Passband is an electrical engineering game designed to train you to estimate critical frequencies of first order electrical networks.

It's great for anyone who wants to get better at any of the following:

- Mentally approximating inverses
- Learning common electrical component values
- Estimating the frequency response of a discrete, two-component passive network.

It's designed to step players through exercises to hone each of those skills, in that order.

## How It Works
Passband is a browser game written in Javascript with a dash of HTML. (Eventually, this will include some more advanced web stuff to make it render prettily and transition between actions nicely.) On page load, the game generates a random number based on a default difficulty setting. It then presents this number in an HTML element with a challenge: "What is the inverse of this fraction?" Some additional information is also loaded into the page via hidden HTML elements; these are used after page submit to help check the user's answer. Users are then invited to check their answer by entering a value in the provided text box. This value is passed back to the game application by submission of the web form.

Since the goal of Passband is to teach estimation rather than rote memorization, the game assigns feedback to the user based on whether their answer is in the ballpark of the correct answer. "In the ballpark", in this case, means within +/-10% of the actual answer. To further increase the focus on estimation, the game only checks answers to within three decimal places.

Game difficulty, ideally, increases as the user becomes comfortable at a given level. Initially, we'll rely on the user to evaluate their own comfort level and pick their difficulty level accordingly. Eventually, "comfortable" will be evaluated using some sort of backend analytics that monitors their recent performance and their overall history, and then suggesting they move up a level.

## Levels and Desired Outcomes

- First Level
    - Inverses with a Tight Range of Integer Denominators (Denominator: 1-10)
	- Inverses with Single Digit Decimal Denominators (Denominator: 0.1-0.9)
	- __Desired Outcome:__ Comfort with basic inverses
- Second Level
    - Inverses with a wider range of Integer Denominators (Denominator: 1-100)
    - Inverses with a wider range of Decimal Denominators (Denominator: 0.01 - 0.99)
    - __Desired Outcome:__ Skill in mentally calculating inverses
- Third Level
	- Inverses with a Broad Range of Decimal Denominators (Denominator: (0.1-0.9) * 10 ^ (-1 thru -9) )
    - Inverses with a Broad Range of Integer Denominators (Denominator: (0.1 - 9.9 * 10 ^ (0 thru 9) )
    - __Desired Outcome:__ Scaling mental inverses using scientific notation
- Fourth Level
    - Frequency of Unity Impedance given value of Capacitor ( |Z| = 1/ ( 2 * pi * f * C) = 1 ohm)
    - Capacitance of Unity Impedance given Frequency ( |Z| = 1/ ( 2 * pi * f * C) = 1 ohm)
    - Frequency of Unity Impedance given value of Inductor ( |Z| = ( 2 * pi * f * L) = 1 ohm )
    - Inductance of Unity Impedance given Frequency ( |Z| = ( 2 * pi * f * L) = 1 ohm)
    - __Desired Outcome:__ Adding a simple multiplication (2* pi) to a scaled mental inverse
- Fifth Level
    - Picking a resistor to select a 3dB frequency given a capacitor and a frequency
    - Picking a resistor to select a 3dB frequency given an inductor and a frequency
    - __Desired Outcome:__ Adding a larger scaling factor/multiplication to a scaled inverse
