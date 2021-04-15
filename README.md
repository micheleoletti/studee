# Studee
Studee an app that allows to take notes and organize them logically with the minimum possible effort.

There are 2 core concepts:
- strip down words to absolute minimum. The idea is to promote readability and easier global structure overview.

- use tabs to indent logically elements. Tabs allow to instantly create a parent-child association and keep an optimal readability, with just 1 keystroke.


## Nodes
The building block of a document is a **node**, which represents every line of the document. 

A node can:
- have children nodes 
- be a child of another node

Here's a dummy document:
```
animals
    cat
        color
            black
        size
            40cm
        sound
            meow
    dog
        color   
            brown
        size
            100cm
        sound
            bark
```
The `animals` node has 2 children nodes, `cat` and `dog`.
The `cat` node has 3 children nodes, `color`, `size` and `sound` and so on.

Here's more comprehensive example: 
```
# https://capturetheatlas.com/photography-basics/ 

photography basics
    exposure 
        amount of light captured by camera sensor sensor

        composed by 3 elements 
            aperture
                how wide the lens opens

                how does it work?
                    large aperture
                        more light on sensor
                        shallow depth of field 
                        less area in focus
                    small aperture
                        less light on sensor
                        large depth of field 
                        more area in focus
                measure
                    f-stops
                        F/1.4
                        F/4.0
                        ...
                    larger the f-stop
                        smaller the aperture
                settings depend on
                    light available 
                    subject
                    final look desired

            shutter speed
                how much time the shutter stays open

                how does it work?
                    faster
                        less light on sensor
                        freeze motion
                    slower
                        more light on sensor
                        capture motion
                measure
                    seconds
                        1"
                        2"
                        ...
                    fraction of seconds
                        1/2
                        1/125
                        ...
                settings depend on
                    light available
                    how much motion you want to capture in the subject

            ISO
                how much the sensor is sensible to light

                how does it work?
                    higher ISO
                        more brightness
                        more digital noise
                            worse image quality
                    lower ISO
                        less brightness
                        less digital noise
                            better image quality
                measure
                    ISO levels
                        ISO 100
                        ISO 800
                        ...
                settings depends on
                    light available

    exposure triangle
        how does it work?
            every element of the triangle 
                affect the amount of light captured

            if we increase/decrease 1 element 
                we must balance others 2 to achieve optimal exposure

                example
                    increase the aperture to have shallower depth of field 
                        equals more light on sensor
                    we must decrease the amount of light captured
                        faster shutter speed 
                            less time to light to get to sensor
                        lower ISO
                            lower sensor sensibility to light 
```

In the example above we can clearly see the general structure of the elements that compose the photography basics.

We can see what `exposure` is, the elements that compose it like `aperture`, `shutter speed` and `ISO`, whether these elements share common features or not, how do they work, what they depend on.

This methodology encourage a proactive search for structure while typing, which helps to:
- better understand the information 
- write less verbose and more readable notes
