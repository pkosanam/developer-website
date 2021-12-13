const fetch = require('node-fetch');

const NERDGRAPH_URL =
  process.env.NERDGRAPH_URL || 'https://api.newrelic.com/graphql';
const NEW_RELIC_API_KEY =
  process.env.NEW_RELIC_API_KEY || 'NRAA-3aaeaaffc66545145b196556b01';

const nerdgraph = { fragments: {}, queries: {} };

nerdgraph.fragments.quickstart_metadata = `
fragment QuickstartMetadata on Nr1CatalogQuickstart{
  metadata {
    authors {
      name
    }
    categories {
      displayName
      slug
      terms
    }
    categoryTerms
    description
    displayName
    icon {
      url
    }
    installer {
      type
      ... on Nr1CatalogInstallPlan {
        steps {
          description
          displayName
          id
        }
      }
    }
    keywords
    quickstartComponents {
      ... on Nr1CatalogQuickstartAlertCondition {
        id
        metadata {
          description
          displayName
          type
        }
      }
      ... on Nr1CatalogQuickstartDashboard {
        id
        metadata {
          description
          displayName
          previews {
            url
            ... on Nr1CatalogPreview {
              url
            }
            ... on Nr1CatalogScreenshot {
              url
            }
          }
        }
      }
      ... on Nr1CatalogQuickstartDocumentation {
        metadata {
          description
          displayName
          url
        }
      }
    }
    slug
    summary
  }
}
`;

nerdgraph.queries.get_quickstart_by_id = `
${nerdgraph.fragments.quickstart_metadata}
query QuickstartDetailsQuery(
      $quickstartId: ID!
)
{
  actor {
    nr1Catalog {
      quickstart(id: $quickstartId) {
        featured
        id
        sourceUrl
        supportLevel
        ...QuickstartMetadata
      }
    }
  }
}
`;

nerdgraph.getQuickstart = async (id) => {
  const resp = await fetch(NERDGRAPH_URL, {
    method: 'POST',
    body: JSON.stringify({
      query: nerdgraph.queries.get_quickstart_by_id,
      variables: { quickstartId: id },
    }),
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': NEW_RELIC_API_KEY,
    },
  });

  if (!resp.ok) {
    throw Error(`Non 200 status code returned`, resp.status, resp.statusText);
  }

  const json = await resp.json();

  if (json.data?.errors) {
    throw Error(`Errors returned from nerdgraph`, json.data.errors);
  }

  return json.data.actor.nr1Catalog.quickstart;
};

nerdgraph.getAllQuickstarts = async () => {};

module.exports = { Nerdgraph: nerdgraph };
