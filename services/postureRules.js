export const evaluatePosture = (kps, mode) => {
  const get = name => kps.find(p=>p.name===name);
  const angle = (A,B,C) => {
    if (!A||!B||!C) return 180;
    const ab = {x:A.x-B.x, y:A.y-B.y}, cb = {x:C.x-B.x, y:C.y-B.y};
    const dot = ab.x*cb.x + ab.y*cb.y;
    const a = Math.hypot(ab.x,ab.y), c = Math.hypot(cb.x,cb.y);
    return Math.round(Math.acos(dot/(a*c))*180/Math.PI);
  };

  const Ls=get('left_shoulder'), Lh=get('left_hip'), Lk=get('left_knee'),
        La=get('left_ankle'), Le=get('left_ear'), LeY=get('left_eye');
  
  let status='good', score=100, instructions='Perfect 😃';
  if (mode==='squat') {
    if (angle(Ls,Lh,Lk) < 150) { status='bad'; score-=30; instructions='Straighten your back'; }
    if (Lk && La && Lk.x > La.x) { status='bad'; score-=30; instructions='Push your knee back'; }
  } else {
    if (angle(Ls,Le,LeY) > 30) { status='bad'; score-=40; instructions='Raise your chin'; }
    if (angle(Ls,Lh,Lk) < 150) { status='bad'; score-=40; instructions='Sit up straight'; }
  }
  score = Math.max(0,Math.min(100,score));
  console.debug('evaluatePosture:', {mode, status, score, instructions});
  return { status, score, keypoints: kps, instructions };
};
