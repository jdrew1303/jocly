exports.model=Model={Game:{},Board:{},Move:{}},Model.Game.InitGame=function(){for(var i=this.mOptions.width,t=this.mOptions.height,o=[],s=[],e=0;e<t;e++)for(var r=0;r<i;r++){var a=e*i+r;s[a]=[e,r],o[a]=[];for(var n=-1;n<2;n++)for(var h=-1;h<2;h++)0==n&&0==h||(e+n<t&&e+n>=0&&r+h<i&&r+h>=0?o[a].push((e+n)*i+r+h):o[a].push(null))}this.g.Graph=o,this.g.Coord=s,this.zobrist=new JocGame.Zobrist({board:{type:"array",size:this.g.Graph.length,values:["1","-1","-2"]}})},Model.Game.DestroyGame=function(){},Model.Game.ScrumEachDirection=function(i,t){for(var o=0;o<8;o++){var s=this.g.Graph[i][o];null!=s&&t(s,o)}},Model.Move.Init=function(i){void 0!==i.seg&&(this.seg=[{f:i.seg[0].f,t:i.seg[0].t}],void 0!==i.seg[0].b&&(this.seg[0].b=i.seg[0].b),void 0!==i.seg[1]&&(this.seg[1]={f:i.seg[1].f,t:i.seg[1].t},void 0!==i.seg[1].b&&(this.seg[1].b=i.seg[1].b)))},Model.Move.ToString=function(){var i=this.seg[0].f+">"+this.seg[0].t;return void 0!==this.seg[0].b&&(i+=">"+this.seg[0].b),void 0!==this.seg[1]&&(i+=" - "+this.seg[1].f+">"+this.seg[1].t,void 0!==this.seg[1].b&&(i+=">"+this.seg[1].b)),i},Model.Board.Init=function(i){this.zSign=0},Model.Board.InitialPosition=function(i){var t=i.mOptions.width,o=i.mOptions.height,s=i.mOptions.initial;this.first=!0,this.board=[];for(var e=0;e<o;e++)for(var r=0;r<t;r++)this.board[e*t+r]=-1;this.pieces=[];var a=0;for(var n in s.a)if(s.a.hasOwnProperty(n)){var h=s.a[n],l=h[0]*t+h[1];this.pieces.push({s:JocGame.PLAYER_A,p:l,a:180,sc:!1}),this.board[l]=a++,this.zSign=i.zobrist.update(this.zSign,"board","1",l)}for(var n in s.b)if(s.b.hasOwnProperty(n)){var h=s.b[n],l=h[0]*t+h[1];this.pieces.push({s:JocGame.PLAYER_B,p:l,a:0,sc:!1}),this.board[l]=a++,this.zSign=i.zobrist.update(this.zSign,"board","-1",l)}this.ball=s.ball[0]*t+s.ball[1],this.board[this.ball]=-2,this.zSign=i.zobrist.update(this.zSign,"board","-2",this.ball),this.scrum=!1},Model.Board.GenerateMoves=function(i){try{this._GenerateMoves(i)}catch(i){console.error("GenerateMoves: "+i)}},Model.Board._GenerateMoves=function(i){function t(t,o){if(t>o){var s=t;t=o,o=s}var e=t+"/"+o;if(void 0===l[e]){var r=i.g.Coord[t],a=i.g.Coord[o],n=Math.max(Math.abs(r[0]-a[0]),Math.abs(r[1]-a[1]));l[e]=n}return l[e]}function o(t,o,s,e){var r=i.g.Coord[t],a=i.g.Coord[o],n=[0,1,2,3,4,5,6,7];a[0]>r[0]?(n[0]=-1,n[1]=-1,n[2]=-1,s&&(n[3]=-1,n[4]=-1)):a[0]<r[0]&&(n[5]=-1,n[6]=-1,n[7]=-1,s&&(n[3]=-1,n[4]=-1)),a[1]>r[1]?(n[0]=-1,n[3]=-1,n[5]=-1,s&&(n[1]=-1,n[6]=-1)):a[1]<r[1]&&(n[2]=-1,n[4]=-1,n[7]=-1,s&&(n[1]=-1,n[6]=-1));for(var h=0;h<n.length;h++)if(n[h]!=-1){var l=i.g.Graph[t][n[h]];l&&e(l,h)}}function s(i){for(var t=0;t<n.pieces.length;t++){var o=n.pieces[t];o.s==n.mWho&&i(t,o.p)}}function e(t){if(void 0===c[t]){var o=0,s=0,e=0,r=[];i.ScrumEachDirection(t,function(i){var t=n.board[i];t<0?t==-1&&(e++,r.push(i)):n.pieces[t].s==n.mWho?s++:o++});var a={e:e,etab:r,s:s,o:o};return c[t]=a,a}return c[t]}function r(t,o){if(null!=t.b){var s=i.g.Coord[t.b][0];if(0==s&&n.mWho==JocGame.PLAYER_B||s==a-1&&n.mWho==JocGame.PLAYER_A){var e=0;if(i.ScrumEachDirection(t.b,function(i){n.board[i]==-1&&e++}),e>0){0==J&&(E=[],J=!0);var r={seg:[{f:t.f,t:t.t,b:t.b}]};E.push(r)}}}else{var s=i.g.Coord[n.ball][0];if(0==s&&n.mWho==JocGame.PLAYER_B||s==a-1&&n.mWho==JocGame.PLAYER_A){var h=!1,e=0;if(i.ScrumEachDirection(n.ball,function(i){i==t.t?h=!0:n.board[i]==-1&&e++}),h&&e>0){0==J&&(E=[],J=!0);var r={seg:[{f:t.f,t:t.t}]};E.push(r)}}}if(!J){var e=0,l=n.ball;if(null!=t.b&&(l=t.b),null!=o.b&&(l=o.b),i.ScrumEachDirection(l,function(i){n.board[i]<0&&e++,t.t!=i&&o.t!=i||e--,t.f!=i&&o.f!=i||e++}),0!=e){var r={seg:[{f:t.f,t:t.t},{f:o.f,t:o.t}]};null!=t.b&&(r.seg[0].b=t.b),null!=o.b&&(r.seg[1].b=o.b),E.push(r)}}}var a=i.mOptions.height,n=this,h=(new Date).getTime(),l={},c={},b=e(this.ball),d=[],v=i.g.Coord[this.ball][0];if(i.ScrumEachDirection(this.ball,function(t){n.board[t]==-1&&d.push({p:t,c:e(t),g:(i.g.Coord[t][0]-v)*n.mWho})}),this.scrum){var u=-1,f=[];if(i.ScrumEachDirection(this.ball,function(i){var t=n.board[i];t==-1?u=i:t>=0&&n.pieces[t].s==n.mWho&&f.push(t)}),u==-1)return this.mFinished=!0,void(this.mWinner=JocGame.DRAW);for(var g=0;g<f.length;g++){var p=f[g],m=!0;i.ScrumEachDirection(u,function(i){var t=n.board[i];(t==-1||t>=0&&i==n.pieces[p].p)&&(m=!1)}),0==m&&this.mMoves.push({seg:[{f:n.pieces[p].p,t:n.ball,b:u}]})}if(f.length>0)return void(0==this.mMoves.length&&(this.mFinished=!0,this.mWinner=JocGame.DRAW))}var S=[];i.ScrumEachDirection(this.ball,function(i){var t=n.board[i];if(t>=0&&n.pieces[t].s==n.mWho)for(var o=0;o<d.length;o++){var s=d[o],e={i:t,f:i,t:n.ball,b:s.p,c:s.c,g:s.g,d:1};S.push(e)}}),s(function(s,e){function r(i,t){var o={i:s,f:e,t:i,b:null,c:b,g:0,d:t};S.push(o)}var a=t(e,n.ball);1==a?i.ScrumEachDirection(e,function(i){n.board[i]==-1&&r(i,t(i,n.ball))}):a<4?i.ScrumEachDirection(e,function(i){n.board[i]==-1&&r(i,t(i,n.ball))}):o(e,n.ball,!1,function(i){n.board[i]==-1&&r(i,t(i,n.ball))})});for(var g=0;g<S.length;g++){var M=S[g],A=.125*(8-M.c.o)*1+.125*M.c.s*1+.25*(M.g+2)*4+(11-M.d)*(1/11)*2;0==M.e&&(A=-1e3),1==M.e&&(A+=1e3),2==M.e&&(A+=2),M.w=A}S.sort(function(i,t){return t.w-i.w});var E=[];if(this.first){for(var g=0;g<i.mOptions.levelOptions.MIN_MOVES&&g<S.length;g++){var G=S[g],z={seg:[{f:G.f,t:G.t}]};null!=G.b&&(z.seg[0].b=G.b),E.push(z)}return void(this.mMoves=E)}for(var W,J=!1,L=-1,D=0,O={},R={};E.length<i.mOptions.levelOptions.MIN_MOVES&&(W=function(){for(;;){if(L++,L==D&&(D++,L=0),!(D<S.length))return null;var i=S[L],t=S[D];if(!(null!=i.b&&null!=t.b||i.i==t.i||i.t==t.t||t.t==i.b&&null==t.b||t.b==i.t))return[i,t]}}());){var _=W[0];if(r(_,W[1]),null!=_.b&&!_.explored){_.explored=!0;for(var y=function(t){if(void 0===O[t]){O[t]=[];var o=[],s=[];i.ScrumEachDirection(t,function(i){var t=n.board[i];t==-1?o.push(i):t>=0&&n.pieces[t].s==n.mWho&&s.push(t)});for(var e=0;e<s.length;e++)for(var r=s[e],a=0;a<o.length;a++)O[t].push({i:r,f:n.pieces[r].p,t:t,b:o[a]})}return O[t]}(_.b),g=0;g<y.length;g++){var B=y[g];B.i!=_.i&&r(_,B)}for(var y=function(t){return void 0===R[t]&&(R[t]=[],i.ScrumEachDirection(t,function(i){var o=n.board[i];o>=0&&n.pieces[o].s==n.mWho&&R[t].push({i:o,f:n.pieces[o].p,t:t})})),R[t]}(_.f),g=0;g<y.length;g++){var B=y[g];B.i!=_.i&&r(_,B)}}}var P=[];i.ScrumEachDirection(this.ball,function(i){var t=n.board[i];t>=0&&n.pieces[t].s==n.mWho&&P.push(t)});for(var C=[],g=0;g<P.length;g++){var Y=i.g.Coord[this.pieces[P[g]].p][0];(this.mWho==JocGame.PLAYER_A&&Y>=v||this.mWho==JocGame.PLAYER_B&&Y<=v)&&C.push(P[g])}for(var F=E.length,g=0;g<C.length;g++)for(var w=0;w<P.length;w++)if(C[g]!=P[w]){var I=this.pieces[C[g]],x=this.pieces[P[w]];i.ScrumEachDirection(I.p,function(i){n.board[i]==-1&&r({i:C[g],f:I.p,t:i},{i:P[w],f:x.p,t:n.ball,b:I.p})})}var T=E.length-F;this.mMoves=E,0==this.mMoves.length&&this.mMoves.push(function(){var o=[],e=[];s(function(i,o){var s=t(o,n.ball);e.push({i:i,d:s})}),e.sort(function(i,t){return t.d-i.d});for(var r=0;r<e.length;r++){var a=e[r],h=n.pieces[a.i].p,l=t(h,n.ball),c=!1;if(i.ScrumEachDirection(h,function(i){if(!c&&n.board[i]==-1){if(t(i,n.ball)>=l){if(1==o.length&&i==o[0].t)return;o.push({i:a.i,f:h,t:i}),c=!0}}}),2==o.length)return{seg:[{f:o[0].f,t:o[0].t},{f:o[1].f,t:o[1].t}]}}}()),gmStats="undefined"!=typeof gmStats?gmStats:{count:0,time:0,moves:0,segments:0,maxGroup2:0};var N=(new Date).getTime(),V=N-h;gmStats.count++,gmStats.time+=V,gmStats.moves+=E.length,gmStats.segments+=S.length,T>gmStats.maxGroup2&&(gmStats.maxGroup2=T)},Model.Board.Evaluate=function(i,t,o){if(i.GetRepeatOccurence(this)>2)return this.mFinished=!0,void(this.mWinner=JocGame.DRAW);var s=i.mOptions.height,e=this,r=0,a=0,n=0;i.ScrumEachDirection(this.ball,function(i){var t=e.board[i];if(t==-1)r++;else if(t>=0){var o=e.pieces[t];o.s==JocGame.PLAYER_A?a++:n++,0==h&&o.p==JocGame.PLAYER_B?(e.mFinished=!0,e.mWinner=JocGame.PLAYER_B):h==s-1&&o.p==JocGame.PLAYER_A&&(e.mFinished=!0,e.mWinner=JocGame.PLAYER_A)}});var h=i.g.Coord[this.ball][0];0==h&&n>0&&(e.mFinished=!0,e.mWinner=JocGame.PLAYER_B),h==s-1&&a>0&&(e.mFinished=!0,e.mWinner=JocGame.PLAYER_A);var l=h/(s-1),c=1-l,b=l-c,d=0;0==n&&d++,0==a&&d--;for(var v=0,u=0,f=i.g.Coord[this.ball],g=0;g<this.pieces.length;g++){var p=this.pieces[g],m=i.g.Coord[p.p],S=Math.max(Math.abs(f[0]-m[0]),Math.abs(f[1]-m[1]));p.s==JocGame.PLAYER_A?v+=S:u+=S}this.mEvaluation=b*i.mOptions.levelOptions.ROW_FACTOR+d*i.mOptions.levelOptions.NEIGHBOR_FACTOR+(u-v)*i.mOptions.levelOptions.BDIST_FACTOR},Model.Board.CopyFrom=function(i){this.board=[];for(var t=0;t<i.board.length;t++)this.board.push(i.board[t]);this.pieces=[];for(var o=0;o<i.pieces.length;o++){var s=i.pieces[o];this.pieces.push({s:s.s,p:s.p,a:s.a,sc:s.sc})}this.ball=i.ball,this.scrum=i.scrum,this.first=i.first,this.mWho=i.mWho,this.zSign=i.zSign},Model.Board.ApplyMove=function(i,t){var o=this,s=this.board[t.seg[0].f];if(s<0)return void JocLog("!!! ApplyMove",t,this.board,"seg0: no piece at start");if(this.pieces[s].s!=this.mWho)return void console.error("!!! ApplyMove",t,this.board,"seg0: piece at start is not self");var e=this.board[t.seg[0].t];if(e!=-1&&e!=-2)return void JocLog("!!! ApplyMove",t,this.board,"seg0: cell at dest not avail",e);if(e==-2&&void 0===t.seg[0].b)return void JocLog("!!! ApplyMove",t,this.board,"seg0: to ball but no ball depl");if(e!=-2&&void 0!==t.seg[0].b)return void JocLog("!!! ApplyMove",t,this.board,"seg0: no ball but ball depl");var r=t.seg[0],a=this.board[r.f];if(this.zSign=i.zobrist.update(this.zSign,"board",this.mWho,r.f),this.board[r.f]=-1,this.zSign=i.zobrist.update(this.zSign,"board",this.mWho,r.t),this.board[r.t]=a,this.pieces[s].p=r.t,void 0!==r.b&&(this.zSign=i.zobrist.update(this.zSign,"board",-2,this.ball),this.ball=r.b,this.zSign=i.zobrist.update(this.zSign,"board",-2,this.ball),this.board[this.ball]=-2),void 0!==t.seg[1]){var n=this.board[t.seg[1].f];if(s==n)return void JocLog("!!! ApplyMove",t,this.board,"seg1: move same piece");if(n<0)return JocLog("!!! ApplyMove",t,this.board,"seg1: no piece at start"),void JocLog(t,this);if(this.pieces[n].s!=this.mWho)return void JocLog("!!! ApplyMove",t,this.board,"seg1: piece at start is not self");var h=this.board[t.seg[1].t];if(h!=-1&&h!=-2)return void JocLog("!!! ApplyMove",t,this.board,"seg1: cell at dest not avail");if(h==-2&&void 0===t.seg[1].b)return void JocLog("!!! ApplyMove",t,this.board,"seg1: to ball but no ball depl");if(h!=-2&&void 0!==t.seg[1].b)return void JocLog("!!! ApplyMove",t,this.board,"seg1: no ball but ball depl");var r=t.seg[1],a=this.board[r.f];this.zSign=i.zobrist.update(this.zSign,"board",this.mWho,r.f),this.board[r.f]=-1,this.zSign=i.zobrist.update(this.zSign,"board",this.mWho,r.t),this.board[r.t]=a,this.pieces[n].p=r.t,void 0!==r.b&&(this.zSign=i.zobrist.update(this.zSign,"board",-2,this.ball),this.ball=r.b,this.zSign=i.zobrist.update(this.zSign,"board",-2,this.ball),this.board[this.ball]=-2)}var l=0;i.ScrumEachDirection(this.ball,function(i){o.board[i]==-1&&(l++,o.scrumExit=i)}),this.scrum=!1,1==l?this.scrum=!0:0==l&&JocLog("!!! ApplyMove: ball enclosed");var c={};this.scrum&&i.ScrumEachDirection(this.ball,function(i,t){var s=o.board[i];s>=0&&(c[s]=t)});for(var b=0;b<this.pieces.length;b++){var d=this.pieces[b],v=0;void 0!==c[b]?(v=[135,180,-135,90,-90,45,0,-45][c[b]],d.a=v,d.sc=!0):(d.a=v+(1==d.s?180:0),d.sc=!1)}this.first=!1},Model.Board.IsValidMove=function(i,t){var o=this,s=0,e=this.ball,r=t.seg[0],a=t.seg[1];return r.b&&(e=r.b),a&&a.b&&(e=a.b),i.ScrumEachDirection(e,function(i){o.board[i]<0&&s++,(r.t==i||a&&a.t==i)&&s--,(r.f==i||a&&a.f==i)&&s++}),0!=s||(this.mInvalidMoveMessage=i.mStrings["no-surround"],!1)},Model.Board.GetSignature=function(){return this.zSign};