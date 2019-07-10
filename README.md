# It's Fizz Buzz.
# But with Super Mario.
# And it's a clock.

I had this idea about a Mario-themed screensaver a while ago, but never sat down to actually build it. Finally found some time and this is the result. Instead of building a full screen saver, I built a web page and then used https://github.com/liquidx/webviewscreensaver

## the idea

Basically, it's a fizz-buzz where if the minute is:
* divisible by 3, it renders the NES' Super Mario Bros 3 sprites

![Super Mario Bros 3 theme](/images/README/smb3.jpg)

* divisible by 5, it renders the SNES' Super Mario World (from my calculations, that's the 5th mario) sprites

![Super Mario Bros World theme](/images/README/smb5.jpg)


* divisible by anything else, it renders the NES' Super Mario Bros (the first one) sprites

![Super Mario Bros theme](/images/README/smb1.jpg)


Cool cool. But what about 15? Well, I still don't know what to do on that one. Ideally I'd want it to render Super Mario 64 graphics, but it's really hard to get transparent assets out there, and it'd be even harder to record the game myself and remove the background. Remember: Mario on 1, 3 and World didn't have much movement while he was stopped, the camera was mostly fixed and removing the background was much easier because pixels. Anyway, maybe someday I'll manage to do that.

When the minute changes, Mario jumps and hits the block (on a full hour, both blocks are hit). I also doomed a goomba into eternal suffering by spawning it a couple of seconds before the jump. It shall never hit our hero.

It also shows you the date, seconds and epoch time at the top. Because I like epoch and find it interesting.

## tech stuff if you wanna know

It uses all vanilla HTML/CSS/JS (no frameworks/libs), since it's super simple.

There's a `<div class=wrapper>` near the top which, you guessed it, wraps all of the components you see on screen. All the JS logic does is add/remove one class on that div (one of `.smb1`, `.smb3` or `.smb5`). All elements below that have their own classes, with their own `background-image`s, so by assigning `.smb1` class, every background image comes from `images/smb1/`. This allowed me to switch themes halfway through an animation w/o much work.

Since I use 2 monitors, I had to make it responsive so it would look fine on both my mac and on the bigger monitor, so all positions, widths/heights, animations etc are all based on `100vw`. The only `px` values I have are for the top bar, like small margins.

This was only possible because I edited all of the images to normalize them, so:
* all backgrounds have the floor at the exact same height
* all mario and mario-jump sprites have the exact same size
* same for the goomba and the block sprites

## so that's it?

Yeah, pretty much.

I mean, there are some nits I might work on, like the correct time display on each theme (right now, that top bar is only correct for SMB1).

But for now, I'm gonna take it for a spin and see if I enjoy it before continue work on it.