// TODO
// if nw.js support chrome > 41, change to use latest fetch API
var fetchRjsConfig = function() {
  var promise = new Promise(function(resolve) {
    var request = new XMLHttpRequest();
    request.open('GET', 'config/rjs_config.json', true);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        var rjsConfig = JSON.parse(request.responseText);
        resolve(rjsConfig);
      }
    };
    request.send();
  });
  return promise;
};

fetchRjsConfig().then(function(rjsConfig) {
  requirejs.config(rjsConfig);
  requirejs([
    'react',
    'toolbar/container',
    'topranking/container',
    'alltracks/container',
    'player/container',
    'menus/container',
    'history/container',
    'jquery',
    'bootstrap'
  ], function (
    React,
    ToolbarContainer,
    TopRankingContainer,
    AllTracksContainer,
    PlayerContainer,
    MenusContainer,
    HistoryContainer
  ) {
    var KakuApp = React.createClass({
      render: function() {
        /* jshint ignore:start */
        return (
          <div className="root">
            <div className="row row-no-padding top-row">
              <div className="col-md-12">
                <div className="toolbar-slot">
                  <ToolbarContainer/>
                </div>
              </div>
            </div>
            <div className="row row-no-padding bottom-row">
              <div className="col col-md-3">
                <div className="sidebar">
                  <MenusContainer/>
                  <PlayerContainer/>
                </div>
              </div>
              <div className="col col-md-9">
                <div className="tab-content">
                  <div
                    role="tabpanel"
                    className="tab-pane active"
                    id="tab-home">
                      <h1><i className="fa fa-fw fa-line-chart"></i>Top Rankings</h1>
                      <div className="topranking-slot">
                        <TopRankingContainer/>
                      </div>
                  </div>
                  <div
                    role="tabpanel"
                    className="tab-pane"
                    id="tab-search">
                      <h1><i className="fa fa-fw fa-search"></i>Search Results</h1>
                      <div className="alltracks-slot">
                        <AllTracksContainer/>
                      </div>
                  </div>
                  <div
                    role="tabpanel"
                    className="tab-pane"
                    id="tab-history">
                      <h1><i className="fa fa-fw fa-history"></i>Histories</h1>
                      <div className="histories-slot">
                        <HistoryContainer/>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        /* jshint ignore:end */
      }
    });

    /* jshint ignore:start */
    React.render(<KakuApp/>, document.body);
    /* jshint ignore:end */
  });
});
