$(function () {
	'use strict';
	var gameId = _windowFunctions.getParam('game');
	mysetupGameAdvance($('#gameAdvance'), gameId, true);


	var scorestab = createTab('scores', 'scorestab');
	document.getElementById('scorestab').style.pointerEvents = 'none';
	var sk1 = $('<div>').addClass('T1 SKS Sheet ').appendTo(scorestab);
	var sk2 = $('<div>').addClass('T2 SKS Sheet ').appendTo(scorestab);
	prepareSkSheetTable(sk1, gameId, '1', 'edit');
	prepareSkSheetTable(sk2, gameId, '2', 'edit');

	var pttab = createTab('penalties', 'pttab');
	document.getElementById('pttab').style.pointerEvents = 'none';

	var pt1 = $('<div>').addClass('T1 pt Sheet ').appendTo(pttab);
	var pt2 = $('<div>').addClass('T2 pt Sheet ').appendTo(pttab);

	preparePltInputTable(pt1, gameId, '1', 'pt', null, 'whiteboard');

	preparePltInputTable(pt2, gameId, '2', 'pt', null, 'whiteboard');


	WS.AutoRegister();
	WS.Connect();

	$('#tabsDiv').tabs();

});


function createTab(title, tabId) {
  'use strict';
  if (typeof title === 'string') {
    title = $('<a>').html(title);
  }
  $('<li>')
    .append(title.attr('href', '#' + tabId))
    .appendTo('#tabsDiv>ul');
  return $('<div>').attr('id', tabId).addClass('TabContent').appendTo('#tabsDiv');
}


function mysetupGameAdvance(element, gameId, auto) {
// stole the one from plt-input.js but fixed it to throw in the ? before game=
  'use strict';
  element
    .addClass('Hide GameAdvance')
    .text('Go To Current Game')
    .click(function () {
var	  savepath=window.location.pathname;
      // window.location.href = window.location.href.replace(/game=[^&]*(&|$)|$/, 'game=' + WS.state['ScoreBoard.CurrentGame.Game']);
      window.location.href='?game=' + WS.state['ScoreBoard.CurrentGame.Game'];
    });
    
  WS.Register('ScoreBoard.CurrentGame.Game', function (k, v) {
    var change = !(v === gameId || v == null);
    element.toggleClass('Hide', !change);
    if (auto && change) {
      element.click(); 
    }
  });
}     

