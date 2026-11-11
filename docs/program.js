/* Browser adaptation of SNAKE.CPP: original board, dice, snakes and ladders. */
window.runProject = async function (ui) {
  const snakes = {98:28,95:24,92:51,83:19,73:1,69:33,64:36,59:17,55:7,52:11,48:9,46:5,44:22};
  const ladders = {8:26,21:82,43:77,50:91,54:93,62:96,66:87,80:100};
  const draw = (n,ch)=>ui.line(ch.repeat(n));
  function board() {
    ui.screen('SNAKE AT POSITION');
    draw(50, '-');
    Object.entries(snakes).sort((a,b)=>Number(b[0])-Number(a[0])).forEach(([a,b])=>ui.line('  From '+String(a).padStart(2)+' to '+String(b).padStart(3)));
    ui.line('\n\tLADDER AT POSITION');
    draw(50, '-');
    Object.entries(ladders).sort((a,b)=>Number(a[0])-Number(b[0])).forEach(([a,b])=>ui.line('  From '+String(a).padStart(2)+' to '+String(b).padStart(3)));
    draw(50, '-');
  }
  function score(name1,name2,p1,p2) {
    draw(50,'~');ui.line('\t\tGAME STATUS');draw(50,'~');
    ui.line('  ---> ' + name1 + ' is at position ' + p1);
    ui.line('  ---> ' + name2 + ' is at position ' + p2);
    draw(50,'_');
  }
  async function play(name, position) {
    await ui.ask('---> ' + name + ' Now your Turn >> Press Enter to play:');
    const dice = Math.floor(Math.random() * 6) + 1;
    const rolled = position + dice;
    ui.line('You got ' + dice + ' Point !! Now you are at position ' + rolled);
    let next = rolled;
    if (Object.hasOwn(snakes, rolled)) {
      next = snakes[rolled];
      ui.line('Oops!! Snake found !! You are at position ' + next);
    } else if (Object.hasOwn(ladders, rolled)) {
      next = ladders[rolled];
      ui.line('Great!! you got a ladder !! You are at position ' + next);
    }
    return next;
  }
  draw(50,'=');ui.line('\n\t\tSNAKE LADDER GAME\n');draw(50,'=');
  const first = await ui.text('Enter Name of player 1:');
  const second = await ui.text('Enter Name of player 2:');
  let p1 = 0, p2 = 0;
  while (p1 < 100 && p2 < 100) {
    board(); score(first,second,p1,p2);
    p1 = await play(first,p1);
    if (p1 >= 100) break; // prevents an unnecessary extra turn at game end
    p2 = await play(second,p2);
  }
  ui.screen('RESULT');score(first,second,p1,p2);
  ui.line((p1 >= p2 ? first : second) + ' !! You are the winner of the game');
  draw(50,'+');
};
