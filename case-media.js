// Stills and short excerpts extracted from An's final project presentation.
// Unavailable original process files are intentionally not substituted with finals.
(() => {
  const file = name => 'assets/works/case-studies/' + name;
  window.CASE_MEDIA = {
    beyond: {
      hero:file('beyond-starburst.jpg'),overview:file('beyond-calm.jpg'),
      calm:file('beyond-calm.jpg'),transition:file('beyond-starburst.jpg'),release:file('beyond-release.jpg'),
      starburst:file('starburst.webm'),projection:file('beyond-projection.jpg'),
      mapping:file('beyond-mapping.jpg'),editing:file('beyond-editing.jpg')
    },
    ud: {
      hero:file('ud-doll.jpg'),overview:'assets/works/Uncannydoll.png',
      study:file('ballet-study.webm'),studyStill:file('ud-study.jpg'),
      illustration:file('ud-character.jpg'),character:file('ud-character.jpg'),room:'assets/works/Uncannydoll.png',
      final1:file('ud-doll.jpg'),final2:'assets/works/Uncannydoll.png',final3:file('ud-final.jpg')
    },
    fresh: {
      hero:file('fresh-pizza.jpg'),overview:file('fresh-product.jpg'),cream:file('fresh-cream.jpg'),
      toothpaste:file('fresh-toothpaste.jpg'),texture1:file('fresh-cream.jpg'),texture2:file('fresh-pizza.jpg'),texture3:file('fresh-final.jpg'),
      final1:file('fresh-product.jpg'),final2:file('fresh-pizza.jpg'),final3:file('fresh-final.jpg'),composite:file('fresh-toothpaste.jpg')
    }
  };
})();
