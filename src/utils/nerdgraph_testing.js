const { Nerdgraph } = require('./nerdgraph');

const main = async () => {
  const quickstart = await Nerdgraph.getQuickstart(
    '29bd9a4a-1c19-4219-9694-0942f6411ce7'
  );

  console.dir(quickstart);
};

main();
