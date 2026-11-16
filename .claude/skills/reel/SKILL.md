---
name: reel
description: Make a finished vertical reel (1080 × 1920, voice, word-timed captions, motion graphics in code) from one line. Use when the person types /reel or asks for a reel, a short or an animated explainer.
---

# Make a reel

One line in, one finished video out, saved as `reels/<short-name>/<short-name>.mp4`. Read `style.md` first, every
time. The person approves two things, the script and the storyboard. Never skip either.

**Before you start.** Reels come out best on Claude Opus 5.5, or a newer and stronger model, at high effort. If that
is what you are running, say nothing. If it isn't, or you can't tell, tell the person how to switch and ask whether
they want to switch first.

1. **The idea.** If the line doesn't make clear what the reel should say or who it is for, talk it through with the
   person first: two or three short questions, then go on.
2. **Script.** 70 to 130 spoken words (25 to 45 seconds).
   - The first line says what the reel is for and gives a reason to stay. Real value starts by 10 seconds.
   - Complete sentences a person would say. Specific, true numbers. Never invent results.
   - One idea per sentence, because each sentence becomes one picture. End on the last idea, with no summary.
   - Show the script and wait. Go on only when the person approves it; change it when they ask.
3. **Voice.** Use the voice in `style.md`, and save the audio and the time each word starts and ends.
   - **The free voice (Kokoro):** speak the whole script, a sentence at a time with natural pauses between them,
     into one audio file. Then get the word times from that audio with Remotion's Whisper tooling. The script is the
     truth: keep its words and spelling, and take only the times from what Whisper heard.
   - **ElevenLabs:** one request for the whole script, using the "with timestamps" endpoint and the key in `.env`. It
     returns the time of every character; work out each word's start and end from those.
   - **No voice:** skip it and time the words at a natural reading speed.
4. **Plan.** Write `plan.md`: one scene per sentence, with its words, its start and end from the word times, and what
   is on screen. Check the plan against "Make it look good" before drawing anything.
5. **Storyboard.** Draw each scene as one still, at its fullest moment, and put them on one sheet, each numbered and
   with its words under it.
   - Show the sheet and wait. Go on only when the person approves it; redraw the scenes they want changed.
6. **Build.** Animate each approved scene in Remotion, following Remotion's agent skills.
   - Every movement is calculated from the current frame. No CSS animations or transitions: they flicker in renders.
   - Each change on screen lands on the word it belongs to.
7. **Captions.** Each word appears when it is spoken, and the spoken word is highlighted.
   - In English, two to five words a line.
   - In any other language, break the lines the way that language reads best. Use your own knowledge of it.
8. **Sound.** A few small effects on the moments that land, made in code. The voice is always the loudest thing.
9. **Render** to MP4: 1080 × 1920, 30 frames a second.
10. **Check your own work:** measure first, then look.
    - **Dead spots.** Take a frame every half second and compare each with the one before. A stretch where almost
      nothing in the picture changes for longer than `style.md` allows is a dead spot.
    - **Too busy.** A moment with more things moving at once than `style.md` allows, or most of the picture changing
      with no scene change, is too busy.
    - **Reading.** Put those frames on one sheet with their times and look: text blurred, cut off, too small for a
      phone, or inside the edges Instagram covers.
    - **Sound.** Every line of the script plays to its end: compare the audio's length with the last word's time.
    - Fix what fails and render again, three rounds at most. Say what you measured, what failed and what you changed.
11. **Hand over.** Give the file's path and one thing you'd improve next.

When the person asks for a change ("make the hook bigger"), change only that and render again.

When they say how it should feel ("calmer", "more going on", "bigger text"), change the reel, then change the numbers
and rules in `style.md` to match, so the next reel starts from their taste. Tell them what you changed there.

## Make it look good

- Show the idea as a drawing: a diagram, a chart, an object, a small machine at work. Few words on screen.
- One focus at a time. Change what is already there (grow it, fill it, break it) before replacing it.
- The picture changes with every sentence, always with motion. Nothing sits still while the voice moves on.
- Moves are short and land with weight: things arrive fast and settle. No slow fades, no spinning, no drifting.
- Numbers count up. Lines draw themselves. When the words are about an app, draw its screen and make it move.
- One font, the colours in `style.md`, the accent only on what matters. No gradients, glows, emoji or stock icons.
- The first frame already shows the hook as text, and something is moving.
- Instagram covers the edges. Keep everything that must be read out of the top 220 px, the bottom 420 px and the
  right 140 px.
- Everything reads on a phone. If a frame could belong to any video, make it belong to this one.
