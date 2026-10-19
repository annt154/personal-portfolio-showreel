// Verified portfolio copy. Publication drafts live separately in content/publication-drafts.json.
// Empty fields are deliberate: never infer a year, credit or missing final asset.
window.PORTFOLIO_CONTENT = {
  rose: {
    url:'https://annt154.github.io/assignment2/', preview:'assets/works/odyssey/channel-01-preview.html',
    title:'Rosé Vinyl', subtitle:'Music Album Media Player', year:'2025',
    role:'Interface design and development', tools:'HTML, CSS and JavaScript',
    overview:'Rosé Vinyl is a customised web-based media player designed around the experience of listening to a music album. The interface translates the tactile and emotional qualities of a physical record into a digital format through a rotating disc, playback feedback and an artist-story panel.',
    sections:[
      ['Design context','I wanted to move beyond a generic media player. The Music Album context gave me a way to bring music, visual identity and artist storytelling into one focused experience.'],
      ['Layout and visual development','My design direction separates the playlist, active playback area and artist information into three columns. I used a darker pink direction, clearer spacing and stronger contrast to improve readability. Responsive layout and a credits panel are part of that documented direction.'],
      ['Interaction and UI','The vinyl rotates during playback. Play, pause, previous, next, mute and a seek bar give the listener control. A pulsing playback control and playlist hover states provide visual feedback.'],
      ['Technical development','I store the playlist in an array and use querySelector and ES6 arrow functions to connect the controls to the audio element. CSS hover states, nth-child selectors and animation-play-state support the interface.'],
      ['Version note','The linked live version currently shows navigation, playback and a playlist with p-hase tracks. It does not yet show the artist biography panel, responsive layout or credits panel described in my design notes; references appear in its footer. Updated screenshots and the revised build are still needed.']
    ],
    reflection:'This project helped me understand that interface design is not only about visual style. Layout, feedback and code structure all influence how naturally a person can move through a media experience.',
    credits:'Interface design and development: Thuy An Ngo. Track and image references are listed on the linked website.'
  },
  dress: {
    url:'https://annt154.github.io/assignment3/', preview:'assets/works/odyssey/channel-02-preview.html',
    title:'Dress Up Game', subtitle:'Web Interaction Prototype', year:'',
    role:'Interface development and illustrated clothing assets', tools:'HTML, CSS and JavaScript',
    overview:'I built a dress-up prototype where the main action is dragging illustrated clothes onto a character. Choosing, layering and removing items lets the player try different combinations without starting again each time.',
    sections:[
      ['Context and interaction','The wardrobe groups hair, tops, bottoms, accessories, dresses and shoes around a central character. Dragging an item onto the canvas places it at a predefined position and size. This makes assembling an outfit the central interaction.'],
      ['Visual and usability feedback','An item becomes translucent while it is being dragged. Used items are dimmed and gain a remove control. Hover enlarges wardrobe items, while Back reverses the last addition and Reset clears the outfit.'],
      ['Technical development','HTML draggable elements and dragstart, dragend, dragover and drop listeners handle the interaction. Data attributes store each item’s position and dimensions. JavaScript creates image layers, tracks them in a history array and removes them through DOM updates.'],
      ['What I would develop next','I would add touch and keyboard controls, more reliable layer ordering and a responsive wardrobe. I would also make music explicitly opt-in and improve its state feedback. These are next steps, not features of the current prototype.']
    ],
    credits:'Design, code and illustrated wardrobe: Thuy An Ngo. External media references appear in the live website footer. Project year to be confirmed.'
  },
  beyond: {
    video:'https://youtu.be/G0cSvIk3nr0',
    title:'Beyond the Frame', subtitle:'Solo Experimental Short Film', year:'2025',
    role:'Cinematography, editing, colour grading, visual effects and sound-design layering', tools:'Software details to be confirmed',
    overview:'Beyond the Frame is my solo experimental film about the sublime: the moment when fear, beauty and awe begin to exist together.',
    sections:[
      ['Concept','I wanted to understand whether fear must always end in discomfort, or whether it can lead towards curiosity and liberation.'],
      ['Visual development','The film begins in a quiet, limited environment. I gradually open that space through light and abstraction, moving towards an infinite white space.'],
      ['The starburst experiment','The wormhole scene in 2001: A Space Odyssey influenced this sequence. I used it as a transition between the physical world and something beyond the visible frame.'],
      ['Process and sound','I completed the cinematography, editing, colour grading, visual effects and sound-design layering independently. Sound and image work together to carry the shift from a familiar space into abstraction.']
    ],
    reflection:'This film changed how I understood fear in my work. It can open a path towards curiosity and awe. Making the film independently also helped me see how cinematography, editing, colour and sound shape one another.',
    credits:'Film, editing, VFX and sound design by Thuy An Ngo. Created in 2025. The full film is available in the main player.'
  },
  fresh: {
    title:'Fresh Up', subtitle:'AI-Assisted Experimental Commercial', year:'2025',
    role:'Concept, prompt development, footage selection, editing, colour treatment, compositing and VHS-effect layering', tools:'AI-generated source footage, After Effects and Premiere Pro', video:'https://youtu.be/VAt1Eha2OrI',
    overview:'Fresh Up explores visceral design and cross-modal perception: how an image or sound can create an imagined physical response.',
    sections:[
      ['Concept','To me, visceral means feeling something in the gut before understanding it. Toothpaste and cream can look similar, but their tastes and purposes are different. Putting mint toothpaste on greasy pizza interrupts that expectation without violence or gore.'],
      ['Visual development','I drew on 1990s infomercials: bright product imagery, excessive close-ups, VHS noise and unusual colour. Familiar advertising becomes uncomfortable through the material it presents.'],
      ['Sound and perception','Wet, sticky and slurping sounds strengthen the imagined taste and texture. I used their relationship with the image to make the experience feel physical.'],
      ['AI and post-production','AI generated the source footage. I directed the concept and completed prompt development, footage selection, editing, colour treatment, compositing and VHS-effect layering. The generated footage was a starting point, not the finished commercial.']
    ],
    reflection:'This project helped me connect sound and image through an imagined bodily response. It also showed me how much of an AI-assisted film is shaped by selection and post-production.',
    credits:'Concept and post-production: Thuy An Ngo. Created in 2025. AI-generated source footage. External audio and media credits to be confirmed.'
  },
  ud: {
    title:'Endless Lullaby', subtitle:'Animation 2D', year:'',
    role:'Contributions listed separately for each work', tools:'See individual works',
    overview:'Endless Lullaby is the main project in our investigation into dolls and the uncanny. When Eyes Don’t Blink is a related supporting study, presented within this entry. We explored how movement, stillness, repetition and sound can make a familiar image feel wrong. Our works share this research, while their stories and credits remain separate.',
    reflection:'I learned that sound is not simply added to an image. Stillness can make a small movement more noticeable, repetition can change a familiar action, and sound can change how both are felt. Developing them together helped me think more carefully about timing and sensory tension.',
    works:[
      {title:'Endless Lullaby',thumbnail:'assets/works/thumbnails/ud.png',year:'2025',video:'https://youtu.be/xlfaU6L3B9w',role:'Main visual compositions, doll and toy illustration, storyboard contribution, animation and compositing',tools:'Procreate, After Effects and Premiere Pro',
       overview:'Endless Lullaby explores the uncanny, childhood trauma and a fictional cycle of repeated harm. The story is communicated through metaphor rather than explicit imagery.',
       concept:'We used dolls because they sit between familiarity and discomfort. In our concept, their human resemblance and lifeless stillness can make a childhood object feel unsettling.',
       visual:'I developed the main compositions, illustrated dolls and toy assets, and contributed to the storyboard. Repetition and restrained movement gradually disturb familiar imagery.',
       sound:'Distorted sound works with repetition and restrained movement to create tension. The sound designer’s name is awaiting confirmation.',
       credits:'Created with My Le. Sound design by [INSERT SOUND DESIGNER’S NAME]. Showcased at the end-of-semester BLACK BOX exhibition. Created in 2025.'},
      {title:'When Eyes Don’t Blink',thumbnail:'assets/works/thumbnails/eyes.png',year:'Year to be confirmed',video:'https://youtu.be/kAn4HqIJGyM',role:'Compositing and editing\nSynchronising music to each hand-drawn frame\nBackground creation and visual effects',tools:'Tools to be confirmed',
       overview:'An experimental animation investigating the uncanny through restrained movement, repetition, stillness and sound. The full video is available above.',
       concept:'Small changes in timing can make a familiar image feel subtly wrong. This study builds discomfort through absence, delay and stillness rather than direct horror imagery.',
       visual:'The existing portfolio includes a ballet-doll study and a still from it. Further process images are still to be supplied.',
       sound:'The work was developed in collaboration with Sound Design students. The precise sound credits and process details are still to be confirmed.',
       credits:'Compositing and editing: Thuy An Ngo\nMusic synchronisation: Thuy An Ngo\nBackgrounds and visual effects: Thuy An Ngo\nFrame-by-frame drawings and visual elements: My Le\nSound Design collaborators: names to be confirmed.'}
    ]
  }
};
