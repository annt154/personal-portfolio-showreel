// One transport for three media elements; the middle element is the master clock.
(() => {
  window.createForestTransport = function(videos, update, raf=requestAnimationFrame, caf=cancelAnimationFrame) {
    const master=videos[1];let wanted=false,playing=false,disposed=false,frame=0,epoch=0;
    const events=[];
    const duration=()=>Math.min(...videos.map(v=>Number.isFinite(v.duration)&&v.duration>0?v.duration:Infinity));
    const emit=message=>update({playing,wanted,time:master.currentTime||0,duration:Number.isFinite(duration())?duration():0,muted:master.muted,message});
    const pauseAll=()=>{playing=false;epoch++;videos.forEach(v=>v.pause());caf(frame);frame=0;};
    function sync(){
      if(disposed)return;
      videos.forEach((v,i)=>{if(i!==1&&!v.seeking&&Math.abs(v.currentTime-master.currentTime)>0.1)v.currentTime=master.currentTime;});
      emit();
    }
    function tick(){if(!playing||disposed)return;sync();if(master.currentTime>=duration()-.025){restart();return;}frame=raf(tick);}
    function start(){
      if(disposed||!wanted||playing||videos.some(v=>v.seeking))return;
      playing=true;const attempt=++epoch;
      const promises=videos.map(v=>{try{return Promise.resolve(v.play());}catch(error){return Promise.reject(error);}});
      Promise.all(promises).then(()=>{
        if(disposed||attempt!==epoch)return;
        sync();caf(frame);frame=raf(tick);emit('Playing');
      }).catch(()=>{
        if(disposed||attempt!==epoch)return;
        wanted=false;pauseAll();emit('Playback could not start. Check the video files and try again.');
      });
    }
    function ready(){if(wanted&&!playing&&videos.every(v=>v.readyState>=3&&!v.seeking))start();}
    function seek(time){
      pauseAll();const target=Math.max(0,Math.min(Number(time)||0,Number.isFinite(duration())?duration():0));
      videos.forEach(v=>{v.currentTime=target;});emit();ready();
    }
    function restart(){if(wanted)seek(0);}
    function on(v,name,fn){v.addEventListener(name,fn);events.push([v,name,fn]);}
    videos.forEach((v,i)=>{
      v.controls=false;v.loop=false;v.muted=i!==1;v.playsInline=true;
      on(v,'waiting',()=>{if(wanted){pauseAll();emit('Buffering all three channels…');}});
      on(v,'canplay',ready);on(v,'seeked',ready);on(v,'loadedmetadata',()=>emit());
      on(v,'ended',restart);
      on(v,'error',()=>{wanted=false;pauseAll();emit('A channel could not load. Check the supplied video files.');});
    });
    on(master,'timeupdate',()=>{if(playing)sync();});
    emit('Ready');
    return {
      play(){wanted=true;start();},
      pause(){wanted=false;pauseAll();emit('Paused');},
      seek,
      sound(){master.muted=!master.muted;videos[0].muted=true;videos[2].muted=true;emit();},
      sync,
      destroy(){disposed=true;wanted=false;pauseAll();events.forEach(([v,n,f])=>v.removeEventListener(n,f));}
    };
  };
})();
